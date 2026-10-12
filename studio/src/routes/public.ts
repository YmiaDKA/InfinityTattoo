import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

import type { Env } from "../env";
import { afterConfirmed, afterRequestCreated, DEPOSIT_HOLD_MIN, depositCheckoutUrl, recordCheckoutPaid, stripeEnabled } from "../lib/bookings";
import { loadFeatures } from "../lib/features";
import { giftCardExpiry, newGiftCardCode } from "../lib/giftcards";
import { giftCardTerms, loadBookingSettings, loadGiftCardSettings, loadSupport, SIZE_OPTIONS } from "../lib/site-settings";
import { notifyStudio } from "../lib/notify";
import { createCheckout, verifyStripeEvent } from "../lib/stripe";
import { freeSlots, type Busy, type WorkingHours } from "../lib/slots";
import { addDays, businessDate, isDateString, localTime } from "../lib/time";

type ServiceRow = {
  id: number;
  name_no: string;
  name_en: string;
  kind: string;
  duration_min: number;
  buffer_min?: number;
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
    allowHeaders: ["Content-Type"],
    maxAge: 86400,
  }),
);

/** What the website form can offer, so it never shows a feature that isn't set up. */
publicApi.get("/config", async (c) => {
  const [features, booking, gift, support, flash] = await Promise.all([
    loadFeatures(c.env),
    loadBookingSettings(c.env),
    loadGiftCardSettings(c.env),
    loadSupport(c.env),
    c.env.DB.prepare("SELECT COUNT(*) AS n FROM flash WHERE on_booking = 1 AND status = 'available'").first<{ n: number }>(),
  ]);
  const giftCards = stripeEnabled(c.env) && features.gift_cards && gift.store;
  // PLACEHOLDER-RESCAN: which of these the website form uses, and how, is our guess at Linework's request form.
  return c.json({
    online_payments: stripeEnabled(c.env),
    gift_cards: giftCards,
    photos: Boolean(c.env.PHOTOS) && features.photos,
    flash: features.flash && (flash?.n ?? 0) > 0,
    reviews: features.reviews,
    open_requests: booking.openRequests,
    request_form: {
      sizes: SIZE_OPTIONS.filter(([k]) => booking.sizes.includes(k)).map(([key, label, hint]) => ({ key, label, hint })),
      colors: booking.colors,
      skin_tone: booking.skinTone,
      budget: booking.budget,
      reference_images: features.photos && c.env.PHOTOS ? booking.references : "off",
    },
    booking_terms: booking.terms.mode === "none" ? null : booking.terms.mode === "link" ? { url: booking.terms.url } : { text: booking.terms.text },
    meta_pixel: booking.pixel.id ? { id: booking.pixel.id, privacy_url: booking.pixel.privacyUrl } : null,
    gift_card: giftCards ? { min_kr: gift.minKr, max_kr: gift.maxKr, valid_months: gift.validityMonths, info: gift.info, terms: giftCardTerms(gift) } : null,
    contact: support,
  });
});

// ---------- Flash on the booking page ----------

publicApi.get("/flash", async (c) => {
  if (!(await loadFeatures(c.env)).flash) return c.json({ flash: [] });
  const rows = await c.env.DB.prepare(
    `SELECT f.id, f.title, f.description, f.price_ore, f.size, f.duration_min, f.r2_key, f.image_url, f.repeatable, s.id AS staff_id, s.name AS staff_name
     FROM flash f LEFT JOIN staff s ON s.id = f.staff_id WHERE f.on_booking = 1 AND f.status = 'available' ORDER BY f.sort, f.id DESC`,
  ).all<{ id: number; title: string; description: string | null; price_ore: number | null; size: string | null; duration_min: number | null; r2_key: string | null; image_url: string | null; repeatable: number; staff_id: number | null; staff_name: string | null }>();
  const base = new URL(c.req.url).origin;
  return c.json({
    flash: rows.results.map((f) => ({
      id: f.id,
      title: f.title,
      description: f.description,
      price_ore: f.price_ore,
      size: f.size,
      duration_min: f.duration_min,
      repeatable: Boolean(f.repeatable),
      artist: f.staff_id ? { id: f.staff_id, name: f.staff_name } : null,
      image: f.r2_key ? `${base}/api/flash/${f.id}/image` : f.image_url,
    })),
  });
});

publicApi.get("/flash/:id/image", async (c) => {
  if (!c.env.PHOTOS) return c.notFound();
  const row = await c.env.DB.prepare("SELECT r2_key, content_type FROM flash WHERE id = ? AND r2_key IS NOT NULL").bind(Number(c.req.param("id"))).first<{ r2_key: string; content_type: string }>();
  const object = row ? await c.env.PHOTOS.get(row.r2_key) : null;
  if (!row || !object) return c.notFound();
  return c.body(object.body, 200, { "Content-Type": row.content_type, "Cache-Control": "public, max-age=86400" });
});

// ---------- Reviews the clients allowed showing (for the website) ----------

publicApi.get("/reviews", async (c) => {
  if (!(await loadFeatures(c.env)).reviews) return c.json({ reviews: [], average: null, count: 0 });
  const [rows, all] = await Promise.all([
    c.env.DB.prepare(
      `SELECT r.rating, r.comment, r.submitted_at, cl.name, s.name AS staff_name FROM reviews r
       JOIN bookings b ON b.id = r.booking_id JOIN clients cl ON cl.id = b.client_id LEFT JOIN staff s ON s.id = r.staff_id
       WHERE r.may_publish = 1 AND r.hidden = 0 AND r.submitted_at IS NOT NULL ORDER BY r.submitted_at DESC LIMIT 20`,
    ).all<{ rating: number; comment: string | null; submitted_at: string; name: string; staff_name: string | null }>(),
    c.env.DB.prepare("SELECT AVG(rating) AS avg, COUNT(*) AS n FROM reviews WHERE hidden = 0 AND submitted_at IS NOT NULL").first<{ avg: number | null; n: number }>(),
  ]);
  return c.json({
    average: all?.avg ? Math.round(all.avg * 10) / 10 : null,
    count: all?.n ?? 0,
    // First name only on the public website.
    reviews: rows.results.map((r) => ({ rating: r.rating, comment: r.comment, date: r.submitted_at.slice(0, 10), name: r.name.split(" ")[0], artist: r.staff_name })),
  });
});

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
      const slots = freeSlots({ date, durationMin: service.duration_min, hours: hours.results, busy, now, bufferMin: service.buffer_min ?? 0 });
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
  // Optional; needed on the invoice in invoice mode (otherwise asked on the health form).
  address: z.string().trim().max(200).nullish(),
  postcode: z.string().trim().max(10).nullish(),
  city: z.string().trim().max(100).nullish(),
  idea: z.string().trim().max(4000).nullish(),
  placement: z.string().trim().max(200).nullish(),
  size: z.string().trim().max(100).nullish(),
  style: z.string().trim().max(200).nullish(),
  first_tattoo: z.boolean().nullish(),
  budget: z.string().trim().max(100).nullish(),
  timing: z.string().trim().max(200).nullish(),
  // Online booking settings (PLACEHOLDER-RESCAN: Linework's request form fields).
  flash_id: z.coerce.number().int().positive().nullish(),
  cover_up: z.boolean().nullish(),
  colors: z.enum(["color", "black_grey"]).nullish(),
  skin_tone: z.enum(["pale", "olive", "tan", "dark"]).nullish(),
  language: z.enum(["no", "en"]).default("no"),
  marketing_consent: z.boolean().default(false),
  // Honeypot: real people never fill this in.
  website: z.string().max(500).optional(),
  turnstile_token: z.string().optional(),
});

const SKIN = { pale: "lys", olive: "oliven", tan: "brun", dark: "mørk" } as const;

/** The extra request-form answers that have no column of their own go in the internal notes. */
function requestNotes(input: z.infer<typeof bookingSchema>) {
  return [
    input.timing ? `Ønsket tid: ${input.timing}` : "",
    input.cover_up ? "Cover-up av eksisterende tatovering" : "",
    input.colors ? `Farge: ${input.colors === "color" ? "farger" : "svart/grå"}` : "",
    input.skin_tone ? `Hudtone: ${SKIN[input.skin_tone]}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

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
  const flash = input.flash_id
    ? await c.env.DB.prepare("SELECT id, title FROM flash WHERE id = ? AND on_booking = 1 AND status = 'available'").bind(input.flash_id).first<{ id: number; title: string }>()
    : null;
  if (input.flash_id && !flash) return c.json({ error: "invalid", fields: ["flash_id"] }, 400);
  if (flash && !input.idea) input.idea = `Flash: ${flash.title}`;
  if (service.kind === "tattoo" && !input.idea) return c.json({ error: "invalid", fields: ["idea"] }, 400);
  if (service.requires_approval && service.kind === "tattoo" && !(await loadBookingSettings(c.env)).openRequests) return c.json({ error: "requests_closed" }, 409);

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
  // Instant bookings with a deposit hold the slot until the deposit is paid online.
  const needsDeposit = status === "confirmed" && service.deposit_ore > 0 && stripeEnabled(c.env);
  const holdUntil = needsDeposit ? new Date(Date.now() + (DEPOSIT_HOLD_MIN + 5) * 60000).toISOString() : null;

  const client = await upsertClient(c.env, input);

  // Insert only if nobody grabbed the same time in the meantime (single atomic statement).
  const insert = await c.env.DB.prepare(
    `INSERT INTO bookings (public_id, client_id, staff_id, service_id, status, starts_at, ends_at,
        idea, placement, size, style, first_tattoo, budget, deposit_ore, price_ore, internal_notes, source, language, hold_until)
     SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'web', ?, ?
     WHERE ? IS NULL OR NOT EXISTS (
       SELECT 1 FROM bookings WHERE staff_id = ? AND status IN ('requested', 'confirmed')
         AND starts_at < ? AND ends_at > ?)`,
  )
    .bind(
      publicId, client, staffId, service.id, status, startsAt, endsAt,
      input.idea ?? null, input.placement ?? null, input.size ?? null, input.style ?? null,
      input.first_tattoo == null ? null : Number(input.first_tattoo), input.budget ?? null,
      service.deposit_ore, service.price_ore, requestNotes(input) || null, input.language, holdUntil,
      startsAt, staffId, endsAt, startsAt,
    )
    .run();
  if (!insert.meta.changes) return c.json({ error: "slot_taken" }, 409);
  const bookingId = Number(insert.meta.last_row_id);
  if (flash) await c.env.DB.prepare("UPDATE bookings SET flash_id = ? WHERE id = ?").bind(flash.id, bookingId).run();

  let paymentUrl: string | null = null;
  if (needsDeposit) {
    try {
      paymentUrl = await depositCheckoutUrl(c.env, bookingId, DEPOSIT_HOLD_MIN);
    } catch (error) {
      // Keep the booking; the studio can send a deposit link from the admin.
      console.error("deposit checkout failed", error);
      await c.env.DB.prepare("UPDATE bookings SET hold_until = NULL WHERE id = ?").bind(bookingId).run();
    }
  }
  c.executionCtx.waitUntil(
    status === "requested" ? afterRequestCreated(c.env, bookingId) : paymentUrl ? Promise.resolve() : afterConfirmed(c.env, bookingId),
  );

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

  return c.json({ ok: true, status, booking_id: publicId, starts_at: startsAt, payment_url: paymentUrl }, 201);
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
         marketing_consent = MAX(marketing_consent, ?), address = COALESCE(?, address), postcode = COALESCE(?, postcode), city = COALESCE(?, city) WHERE id = ?`,
    )
      .bind(input.name, input.email, input.phone, input.birth_date ?? null, Number(input.marketing_consent), input.address || null, input.postcode || null, input.city || null, existing.id)
      .run();
    return existing.id;
  }
  const created = await env.DB.prepare(
    "INSERT INTO clients (name, email, phone, birth_date, marketing_consent, address, postcode, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id",
  )
    .bind(input.name, input.email, input.phone, input.birth_date ?? null, Number(input.marketing_consent), input.address || null, input.postcode || null, input.city || null)
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

// ---------- Reference photos ----------

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

/** Upload right after creating a booking. The unguessable booking id is the credential; uploads close after an hour. */
publicApi.post("/bookings/:publicId/photos", async (c) => {
  if (!c.env.PHOTOS || !(await loadFeatures(c.env)).photos) return c.json({ error: "photos_disabled" }, 404);
  const booking = await c.env.DB.prepare("SELECT id, created_at FROM bookings WHERE public_id = ?")
    .bind(c.req.param("publicId"))
    .first<{ id: number; created_at: string }>();
  if (!booking || Date.now() - Date.parse(booking.created_at) > 3600 * 1000) return c.json({ error: "not_found" }, 404);

  const existing = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM booking_photos WHERE booking_id = ?").bind(booking.id).first<{ n: number }>();
  const form = await c.req.formData();
  const files = form.getAll("photos").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f);
  if (!files.length) return c.json({ error: "invalid" }, 400);
  if ((existing?.n ?? 0) + files.length > MAX_PHOTOS) return c.json({ error: "too_many" }, 400);
  for (const file of files) {
    if (!PHOTO_TYPES.includes(file.type) || file.size > MAX_PHOTO_BYTES) return c.json({ error: "invalid_file" }, 400);
  }
  for (const file of files) {
    const key = `bookings/${booking.id}/${crypto.randomUUID()}`;
    await c.env.PHOTOS.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
    await c.env.DB.prepare("INSERT INTO booking_photos (booking_id, r2_key, content_type, bytes) VALUES (?, ?, ?, ?)")
      .bind(booking.id, key, file.type, file.size)
      .run();
  }
  return c.json({ ok: true, count: files.length }, 201);
});

// ---------- Gift cards sold online ----------

const giftCardSchema = z.object({
  amount_kr: z.coerce.number().int().positive(),
  buyer_name: z.string().trim().min(2).max(120),
  buyer_email: z.email().max(200),
  recipient_name: z.string().trim().max(120).nullish(),
  message: z.string().trim().max(300).nullish(),
  website: z.string().max(500).optional(),
});

publicApi.post("/gift-cards", async (c) => {
  if (!stripeEnabled(c.env) || !(await loadFeatures(c.env)).gift_cards) return c.json({ error: "disabled" }, 404);
  const parsed = giftCardSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, 400);
  const input = parsed.data;
  if (input.website) return c.json({ ok: true, payment_url: null }, 201);
  const store = await loadGiftCardSettings(c.env);
  if (!store.store) return c.json({ error: "disabled" }, 404);
  if (input.amount_kr < store.minKr || input.amount_kr > store.maxKr) return c.json({ error: "invalid", fields: ["amount_kr"] }, 400);

  const amountOre = input.amount_kr * 100;
  const card = await c.env.DB.prepare(
    `INSERT INTO gift_cards (code, initial_ore, status, buyer_name, buyer_email, recipient_name, message, source, expires_on)
     VALUES (?, ?, 'pending', ?, ?, ?, ?, 'online', ?) RETURNING id`,
  )
    .bind(newGiftCardCode(), amountOre, input.buyer_name, input.buyer_email, input.recipient_name ?? null, input.message ?? null, giftCardExpiry(new Date(), store.validityMonths))
    .first<{ id: number }>();

  const site = c.env.SITE_URL.replace(/\/$/, "");
  const checkout = await createCheckout(c.env, {
    amountOre,
    name: `Gavekort ${input.amount_kr} kr – Infinity Tattoo`,
    email: input.buyer_email,
    successUrl: `${site}/?giftcard=paid#booking`,
    cancelUrl: `${site}/?giftcard=cancelled#booking`,
    metadata: { purpose: "gift_card", gift_card_id: String(card!.id) },
  });
  await c.env.DB.prepare("INSERT INTO online_payments (purpose, gift_card_id, amount_ore, provider, session_id, url) VALUES ('gift_card', ?, ?, 'stripe', ?, ?)")
    .bind(card!.id, amountOre, checkout.id, checkout.url)
    .run();
  return c.json({ ok: true, payment_url: checkout.url }, 201);
});

// ---------- Stripe webhook ----------

publicApi.post("/stripe/webhook", async (c) => {
  if (!c.env.STRIPE_WEBHOOK_SECRET) return c.json({ error: "disabled" }, 404);
  const payload = await c.req.text();
  const event = await verifyStripeEvent(payload, c.req.header("Stripe-Signature") ?? null, c.env.STRIPE_WEBHOOK_SECRET);
  if (!event) return c.json({ error: "bad_signature" }, 400);

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as { id: string; payment_status?: string; payment_intent?: string | null };
    if (session.payment_status === "paid") await recordCheckoutPaid(c.env, session.id, session.payment_intent ?? null);
  }
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as { id: string };
    await c.env.DB.prepare("UPDATE online_payments SET status = 'expired' WHERE session_id = ? AND status = 'open'").bind(session.id).run();
  }
  return c.json({ received: true });
});
