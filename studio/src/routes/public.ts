import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

import type { Env } from "../env";
import { notifyStudio } from "../lib/notify";
import { freeSlots, type Busy, type WorkingHours } from "../lib/slots";
import { addDays, businessDate, isDateString, localTime } from "../lib/time";

type ServiceRow = {
  id: number;
  name_no: string;
  name_en: string;
  kind: string;
  duration_min: number;
  price_ore: number | null;
  deposit_ore: number;
  requires_approval: number;
};

export const publicApi = new Hono<{ Bindings: Env }>();

publicApi.use(
  "*",
  cors({
    origin: (origin, c) =>
      (c.env as Env).ALLOWED_ORIGINS.split(",").map((o: string) => o.trim()).includes(origin) ? origin : null,
    allowMethods: ["GET", "POST"],
    maxAge: 86400,
  }),
);

publicApi.get("/services", async (c) => {
  const services = await c.env.DB.prepare(
    `SELECT id, name_no, name_en, kind, duration_min, price_ore, deposit_ore, requires_approval
     FROM services WHERE public = 1 AND active = 1 ORDER BY sort, id`,
  ).all<ServiceRow>();
  const staff = await c.env.DB.prepare(
    `SELECT s.id, s.name, s.role, ss.service_id FROM staff s
     JOIN staff_services ss ON ss.staff_id = s.id
     WHERE s.active = 1 AND s.bookable = 1 ORDER BY s.id`,
  ).all<{ id: number; name: string; role: string; service_id: number }>();

  return c.json({
    services: services.results.map((s) => ({
      ...s,
      requires_approval: Boolean(s.requires_approval),
      staff: staff.results.filter((m) => m.service_id === s.id).map(({ id, name, role }) => ({ id, name, role })),
    })),
  });
});

/** Free start times for a service over a range of days, per staff member. */
publicApi.get("/availability", async (c) => {
  const serviceId = Number(c.req.query("service"));
  const staffFilter = c.req.query("staff") ? Number(c.req.query("staff")) : null;
  const from = c.req.query("from") ?? businessDate(new Date());
  const days = Math.min(Math.max(Number(c.req.query("days") ?? 14), 1), 31);
  if (!Number.isInteger(serviceId) || !isDateString(from)) return c.json({ error: "bad_request" }, 400);

  const service = await c.env.DB.prepare("SELECT * FROM services WHERE id = ? AND active = 1 AND public = 1")
    .bind(serviceId)
    .first<ServiceRow>();
  if (!service) return c.json({ error: "not_found" }, 404);

  const days_ = Array.from({ length: days }, (_, i) => addDays(from, i));
  const result = await availabilityFor(c.env, service, staffFilter, days_);
  return c.json({ service_id: serviceId, days: result });
});

async function availabilityFor(env: Env, service: ServiceRow, staffFilter: number | null, dates: string[]) {
  const staff = await env.DB.prepare(
    `SELECT s.id, s.name FROM staff s JOIN staff_services ss ON ss.staff_id = s.id
     WHERE ss.service_id = ? AND s.active = 1 AND s.bookable = 1`,
  )
    .bind(service.id)
    .all<{ id: number; name: string }>();
  const members = staff.results.filter((s) => staffFilter == null || s.id === staffFilter);
  const rangeStart = `${dates[0]}T00:00:00Z`;
  const rangeEnd = `${addDays(dates[dates.length - 1], 2)}T00:00:00Z`;
  const now = new Date();

  const out: { date: string; staff_id: number; staff_name: string; slots: { starts_at: string; time: string }[] }[] = [];
  for (const member of members) {
    const [hours, busy] = await Promise.all([
      env.DB.prepare("SELECT weekday, start_time, end_time FROM working_hours WHERE staff_id = ?")
        .bind(member.id)
        .all<WorkingHours>(),
      busyFor(env, member.id, rangeStart, rangeEnd),
    ]);
    for (const date of dates) {
      const slots = freeSlots({ date, durationMin: service.duration_min, hours: hours.results, busy, now });
      if (slots.length) {
        out.push({
          date,
          staff_id: member.id,
          staff_name: member.name,
          slots: slots.map((s) => ({ starts_at: s, time: localTime(s) })),
        });
      }
    }
  }
  return out;
}

async function busyFor(env: Env, staffId: number, from: string, to: string): Promise<Busy[]> {
  const rows = await env.DB.prepare(
    `SELECT starts_at, ends_at FROM bookings
       WHERE staff_id = ? AND status IN ('requested', 'confirmed') AND starts_at IS NOT NULL
         AND starts_at < ? AND ends_at > ?
     UNION ALL
     SELECT starts_at, ends_at FROM time_off
       WHERE (staff_id = ? OR staff_id IS NULL) AND starts_at < ? AND ends_at > ?`,
  )
    .bind(staffId, to, from, staffId, to, from)
    .all<Busy>();
  return rows.results;
}

const bookingSchema = z.object({
  service_id: z.coerce.number().int().positive(),
  staff_id: z.coerce.number().int().positive().nullish(),
  starts_at: z.iso.datetime().nullish(),
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  phone: z.string().trim().min(5).max(30),
  birth_date: z.iso.date().nullish(),
  idea: z.string().trim().max(4000).nullish(),
  placement: z.string().trim().max(200).nullish(),
  size: z.string().trim().max(100).nullish(),
  style: z.string().trim().max(200).nullish(),
  first_tattoo: z.boolean().nullish(),
  budget: z.string().trim().max(100).nullish(),
  timing: z.string().trim().max(200).nullish(),
  language: z.enum(["no", "en"]).default("no"),
  marketing_consent: z.boolean().default(false),
  // Honeypot: real people never fill this in.
  website: z.string().max(500).optional(),
  turnstile_token: z.string().optional(),
});

publicApi.post("/bookings", async (c) => {
  const parsed = bookingSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) {
    return c.json({ error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, 400);
  }
  const input = parsed.data;
  // Pretend success for bots so they don't learn about the trap.
  if (input.website) return c.json({ ok: true, status: "requested", booking_id: crypto.randomUUID(), starts_at: null }, 201);

  if (c.env.TURNSTILE_SECRET && !(await turnstileOk(c.env.TURNSTILE_SECRET, input.turnstile_token, c.req.header("CF-Connecting-IP")))) {
    return c.json({ error: "captcha" }, 400);
  }

  const service = await c.env.DB.prepare("SELECT * FROM services WHERE id = ? AND active = 1 AND public = 1")
    .bind(input.service_id)
    .first<ServiceRow>();
  if (!service) return c.json({ error: "invalid", fields: ["service_id"] }, 400);
  if (service.kind === "tattoo" && !input.idea) return c.json({ error: "invalid", fields: ["idea"] }, 400);

  let staffId = input.staff_id ?? null;
  let startsAt: string | null = null;
  let endsAt: string | null = null;

  if (input.starts_at) {
    // The chosen time must still be free for that person (or anyone, if "any artist").
    const date = businessDate(input.starts_at);
    const days = await availabilityFor(c.env, service, staffId, [date]);
    const wanted = new Date(input.starts_at).toISOString();
    const match = days.find((d) => d.slots.some((s) => s.starts_at === wanted));
    if (!match) return c.json({ error: "slot_taken" }, 409);
    staffId = match.staff_id;
    startsAt = wanted;
    endsAt = new Date(Date.parse(wanted) + service.duration_min * 60000).toISOString();
  } else if (!service.requires_approval) {
    return c.json({ error: "invalid", fields: ["starts_at"] }, 400);
  }

  const status = service.requires_approval ? "requested" : "confirmed";
  const publicId = crypto.randomUUID();

  const client = await upsertClient(c.env, input);

  // Insert only if nobody grabbed the same time in the meantime (single atomic statement).
  const insert = await c.env.DB.prepare(
    `INSERT INTO bookings (public_id, client_id, staff_id, service_id, status, starts_at, ends_at,
        idea, placement, size, style, first_tattoo, budget, deposit_ore, price_ore, internal_notes, source, language)
     SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'web', ?
     WHERE ? IS NULL OR NOT EXISTS (
       SELECT 1 FROM bookings WHERE staff_id = ? AND status IN ('requested', 'confirmed')
         AND starts_at < ? AND ends_at > ?)`,
  )
    .bind(
      publicId, client, staffId, service.id, status, startsAt, endsAt,
      input.idea ?? null, input.placement ?? null, input.size ?? null, input.style ?? null,
      input.first_tattoo == null ? null : Number(input.first_tattoo), input.budget ?? null,
      service.deposit_ore, service.price_ore, input.timing ? `Ønsket tid: ${input.timing}` : null, input.language,
      startsAt, staffId, endsAt, startsAt,
    )
    .run();
  if (!insert.meta.changes) return c.json({ error: "slot_taken" }, 409);

  const when = startsAt ? `${businessDate(startsAt)} kl. ${localTime(startsAt)}` : "ingen tid valgt";
  c.executionCtx.waitUntil(
    notifyStudio(
      c.env,
      `${status === "requested" ? "Ny forespørsel" : "Ny booking"}: ${service.name_no} – ${input.name}`,
      [
        `${service.name_no} (${when})`,
        `Navn: ${input.name}`,
        `Telefon: ${input.phone}`,
        `E-post: ${input.email}`,
        input.idea ? `\nIdé: ${input.idea}` : "",
        input.placement ? `Plassering: ${input.placement}` : "",
        input.size ? `Størrelse: ${input.size}` : "",
        input.style ? `Stil: ${input.style}` : "",
        input.timing ? `Ønsket tid: ${input.timing}` : "",
        input.budget ? `Budsjett: ${input.budget}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    ),
  );

  return c.json({ ok: true, status, booking_id: publicId, starts_at: startsAt }, 201);
});

async function upsertClient(env: Env, input: z.infer<typeof bookingSchema>): Promise<number> {
  const existing = await env.DB.prepare(
    "SELECT id FROM clients WHERE lower(email) = lower(?) OR phone = ? ORDER BY id LIMIT 1",
  )
    .bind(input.email, input.phone)
    .first<{ id: number }>();
  if (existing) {
    await env.DB.prepare(
      `UPDATE clients SET name = ?, email = ?, phone = ?, birth_date = COALESCE(?, birth_date),
         marketing_consent = MAX(marketing_consent, ?) WHERE id = ?`,
    )
      .bind(input.name, input.email, input.phone, input.birth_date ?? null, Number(input.marketing_consent), existing.id)
      .run();
    return existing.id;
  }
  const created = await env.DB.prepare(
    "INSERT INTO clients (name, email, phone, birth_date, marketing_consent) VALUES (?, ?, ?, ?, ?) RETURNING id",
  )
    .bind(input.name, input.email, input.phone, input.birth_date ?? null, Number(input.marketing_consent))
    .first<{ id: number }>();
  return created!.id;
}

async function turnstileOk(secret: string, token: string | undefined, ip: string | undefined): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
