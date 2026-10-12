import { Hono } from "hono";

import type { Env } from "../env";
import { ageOn, CONFIRMATIONS, HEALTH_QUESTIONS, type ConsentAnswers } from "../lib/consent";
import { loadFeatures } from "../lib/features";
import { STUDIO } from "../lib/messages";
import { businessDate, localTime } from "../lib/time";
import { PublicLayout } from "../views/layout";

/** Pages clients open from links in their emails. */
export const client = new Hono<{ Bindings: Env }>();

type ConsentBooking = {
  id: number;
  public_id: string;
  status: string;
  starts_at: string | null;
  client_name: string;
  birth_date: string | null;
  address: string | null;
  postcode: string | null;
  city: string | null;
  service_no: string;
  service_en: string;
  kind: string;
  language: string;
};

async function bookingFor(env: Env, publicId: string) {
  return env.DB.prepare(
    `SELECT b.id, b.public_id, b.status, b.starts_at, b.language, c.name AS client_name, c.birth_date,
            c.address, c.postcode, c.city, sv.name_no AS service_no, sv.name_en AS service_en, sv.kind
     FROM bookings b JOIN clients c ON c.id = b.client_id JOIN services sv ON sv.id = b.service_id
     WHERE b.public_id = ?`,
  )
    .bind(publicId)
    .first<ConsentBooking>();
}

client.get("/skjema/:publicId", async (c) => {
  const b = await bookingFor(c.env, c.req.param("publicId"));
  if (!b || b.status === "cancelled") return c.notFound();
  const lang = (c.req.query("lang") ?? b.language) === "en" ? "en" : "no";
  const t = (no: string, en: string) => (lang === "no" ? no : en);
  const signed = await c.env.DB.prepare("SELECT signed_at FROM consents WHERE booking_id = ? ORDER BY id DESC LIMIT 1")
    .bind(b.id)
    .first<{ signed_at: string }>();
  const error = c.req.query("error");
  // Invoice mode: the address goes on the invoice for the session.
  const askAddress = (await loadFeatures(c.env)).invoices;

  return c.html(
    <PublicLayout title={t("Egenerklæring", "Consent form")} lang={lang}>
      <div class="row" style="justify-content:space-between">
        <h1>{t("Egenerklæring", "Health & consent form")}</h1>
        <a class="muted" style="flex:0 0 auto" href={`?lang=${lang === "no" ? "en" : "no"}`}>
          {lang === "no" ? "English" : "Norsk"}
        </a>
      </div>
      <p class="muted">
        {lang === "no" ? b.service_no : b.service_en}
        {b.starts_at && ` · ${businessDate(b.starts_at)} ${localTime(b.starts_at)}`} · {STUDIO.name}
      </p>
      {signed && (
        <div class="flash">
          {t("Takk! Skjemaet er mottatt", "Thanks! The form has been received")} ({businessDate(signed.signed_at)}).{" "}
          {t("Du kan sende det på nytt hvis noe har endret seg.", "You can send it again if anything has changed.")}
        </div>
      )}
      {error && (
        <div class="flash error">
          {error === "tattoo_age"
            ? t("Vi tatoverer ikke personer under 18 år. Ta kontakt med studioet.", "We don't tattoo anyone under 18. Please contact the studio.")
            : error === "age"
              ? t("Under 18 år krever samtykke fra foresatt.", "Under 18s need consent from a parent or guardian.")
              : t("Fyll ut alle feltene som kreves.", "Please fill in all required fields.")}
        </div>
      )}
      <form method="post" class="card">
        <input type="hidden" name="lang" value={lang} />
        <div class="row">
          <label>
            {t("Fullt navn", "Full name")}
            <input name="signed_name" required value={b.client_name} autocomplete="name" />
          </label>
          <label>
            {t("Fødselsdato", "Date of birth")}
            <input name="birth_date" type="date" required value={b.birth_date ?? ""} autocomplete="bday" />
          </label>
        </div>
        {askAddress && (
          <div class="row">
            <label>
              {t("Adresse (står på fakturaen)", "Address (for your invoice)")}
              <input name="address" required value={b.address ?? ""} autocomplete="street-address" />
            </label>
            <label>
              {t("Postnummer", "Postcode")}
              <input name="postcode" required value={b.postcode ?? ""} inputmode="numeric" autocomplete="postal-code" />
            </label>
            <label>
              {t("Sted", "City")}
              <input name="city" required value={b.city ?? ""} autocomplete="address-level2" />
            </label>
          </div>
        )}
        <fieldset>
          <legend>{t("Helse", "Health")}</legend>
          {HEALTH_QUESTIONS.map((q) => (
            <div class="row" style="align-items:center;border-bottom:1px solid var(--line);padding:.4rem 0">
              <div style="flex:3 1 260px">{q[lang]}</div>
              <div style="flex:0 0 auto">
                <label class="check" style="display:inline-flex;margin:0 1rem 0 0">
                  <input type="radio" name={`h_${q.key}`} value="no" required />
                  {t("Nei", "No")}
                </label>
                <label class="check" style="display:inline-flex;margin:0">
                  <input type="radio" name={`h_${q.key}`} value="yes" />
                  {t("Ja", "Yes")}
                </label>
              </div>
            </div>
          ))}
          <label style="margin-top:.8rem">
            {t("Svarte du ja, eller er det noe annet vi bør vite (medisiner, tidligere reaksjoner)?", "If you answered yes, or there's anything else we should know (medication, earlier reactions), tell us here")}
            <textarea name="details" rows={3} />
          </label>
        </fieldset>
        {b.kind !== "tattoo" && (
        <fieldset>
          <legend>{t("Under 18 år", "Under 18")}</legend>
          <label>
            {t("Navn på foresatt som samtykker", "Name of the parent/guardian giving consent")}
            <input name="guardian_name" />
          </label>
        </fieldset>
        )}
        {CONFIRMATIONS.map((q) => (
          <label class="check">
            <input type="checkbox" name={`c_${q.key}`} value="1" required />
            <span>{q[lang]}</span>
          </label>
        ))}
        <label class="check">
          <input type="checkbox" name="photo_consent" value="1" />
          <span>{t("Studioet kan bruke bilder av resultatet på nettsiden og Instagram (valgfritt).", "The studio may use photos of the result on the website and Instagram (optional).")}</span>
        </label>
        <p class="muted" style="font-size:.85rem">
          {t(
            "Opplysningene lagres trygt og brukes bare av studioet for å gjøre behandlingen trygg.",
            "Your answers are stored securely and only used by the studio to keep the treatment safe.",
          )}
        </p>
        <button>{t("Signer og send", "Sign and send")}</button>
      </form>
    </PublicLayout>,
  );
});

client.post("/skjema/:publicId", async (c) => {
  const publicId = c.req.param("publicId");
  const b = await bookingFor(c.env, publicId);
  if (!b || b.status === "cancelled") return c.notFound();
  const body = await c.req.parseBody();
  const get = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const lang = get("lang") === "en" ? "en" : "no";
  const back = `/skjema/${publicId}?lang=${lang}`;

  const signedName = get("signed_name");
  const birthDate = get("birth_date");
  const health: Record<string, boolean> = {};
  for (const q of HEALTH_QUESTIONS) {
    const v = get(`h_${q.key}`);
    if (v !== "yes" && v !== "no") return c.redirect(`${back}&error=missing`);
    health[q.key] = v === "yes";
  }
  const confirmations: Record<string, boolean> = {};
  for (const q of CONFIRMATIONS) confirmations[q.key] = get(`c_${q.key}`) === "1";
  if (signedName.length < 2 || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) || Object.values(confirmations).some((v) => !v)) {
    return c.redirect(`${back}&error=missing`);
  }
  const guardian = get("guardian_name");
  const onDate = b.starts_at ? businessDate(b.starts_at) : businessDate(new Date());
  const age = ageOn(birthDate, onDate);
  // The studio doesn't tattoo anyone under 18; other services need a guardian's consent.
  if (age < 18 && b.kind === "tattoo") return c.redirect(`${back}&error=tattoo_age`);
  if (age < 18 && guardian.length < 2) return c.redirect(`${back}&error=age`);

  const address = { address: get("address").slice(0, 200), postcode: get("postcode").slice(0, 10), city: get("city").slice(0, 100) };
  if ((await loadFeatures(c.env)).invoices && (!address.address || !address.postcode || !address.city)) return c.redirect(`${back}&error=missing`);

  const answers: ConsentAnswers = { health, details: get("details").slice(0, 2000), confirmations };
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO consents (booking_id, answers_json, signed_name, signed_at, ip, birth_date, guardian_name, photo_consent, language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(b.id, JSON.stringify(answers), signedName, new Date().toISOString(), c.req.header("CF-Connecting-IP") ?? null, birthDate, guardian || null, get("photo_consent") === "1" ? 1 : 0, lang),
    c.env.DB.prepare(
      `UPDATE clients SET birth_date = ?, address = COALESCE(NULLIF(?, ''), address), postcode = COALESCE(NULLIF(?, ''), postcode),
         city = COALESCE(NULLIF(?, ''), city) WHERE id = (SELECT client_id FROM bookings WHERE id = ?)`,
    ).bind(birthDate, address.address, address.postcode, address.city, b.id),
  ]);
  return c.redirect(back);
});

// ---------- Calendar feed per staff member (subscribe from the phone's calendar app) ----------

client.get("/cal/:token", async (c) => {
  const token = c.req.param("token").replace(/\.ics$/, "");
  if (!/^[0-9a-f]{32}$/.test(token)) return c.notFound();
  const staff = await c.env.DB.prepare("SELECT id, name FROM staff WHERE ical_token = ? AND active = 1").bind(token).first<{ id: number; name: string }>();
  if (!staff) return c.notFound();
  const since = new Date(Date.now() - 30 * 86400000).toISOString();
  const rows = await c.env.DB.prepare(
    `SELECT b.id, b.status, b.starts_at, b.ends_at, b.updated_at, c.name AS client, c.phone, sv.name_no AS service, b.idea, b.placement
     FROM bookings b JOIN clients c ON c.id = b.client_id JOIN services sv ON sv.id = b.service_id
     WHERE b.staff_id = ? AND b.starts_at IS NOT NULL AND b.starts_at >= ? AND b.status IN ('requested', 'confirmed', 'completed')
     ORDER BY b.starts_at`,
  )
    .bind(staff.id, since)
    .all<{ id: number; status: string; starts_at: string; ends_at: string; updated_at: string; client: string; phone: string | null; service: string; idea: string | null; placement: string | null }>();

  const base = c.env.PUBLIC_BASE_URL.replace(/\/$/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Infinity Tattoo//Studio//NO",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${icsText(`Infinity – ${staff.name}`)}`,
    "X-PUBLISHED-TTL:PT15M",
    ...rows.results.flatMap((r) => [
      "BEGIN:VEVENT",
      `UID:booking-${r.id}@infinitytattoo.no`,
      `DTSTAMP:${icsDate(r.updated_at)}`,
      `DTSTART:${icsDate(r.starts_at)}`,
      `DTEND:${icsDate(r.ends_at)}`,
      `SUMMARY:${icsText(`${r.service} – ${r.client}${r.status === "requested" ? " (ikke bekreftet)" : ""}`)}`,
      `DESCRIPTION:${icsText([r.phone, r.placement, r.idea].filter(Boolean).join("\n"))}`,
      `URL:${base}/admin/bookings/${r.id}`,
      `STATUS:${r.status === "requested" ? "TENTATIVE" : "CONFIRMED"}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  return c.body(lines.map(foldIcsLine).join("\r\n") + "\r\n", 200, {
    "Content-Type": "text/calendar; charset=utf-8",
    "Cache-Control": "private, max-age=300",
  });
});

function icsDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsText(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (m) => `\\${m}`);
}

function foldIcsLine(line: string) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let current = "";
  for (const ch of line) {
    if (new TextEncoder().encode(current + ch).length > (out.length ? 74 : 75)) {
      out.push(current);
      current = ch;
    } else current += ch;
  }
  out.push(current);
  return out.join("\r\n ");
}
