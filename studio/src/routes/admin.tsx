import type { Env } from "../env";
import { staffFromRequest } from "../lib/auth";
import {
  buildDayReport,
  formatOre,
  parseKroner,
  PAYMENT_KINDS,
  PAYMENT_METHODS,
  type DayReport,
  type ReportPayment,
  type ReportStaff,
} from "../lib/report";
import { addDays, businessDate, isDateString, localTime, osloToUtc } from "../lib/time";
import { afterCancelled, afterCompleted, afterConfirmed, consentUrl, sendDepositLink, stripeEnabled } from "../lib/bookings";
import { ageOn, flaggedQuestions, type ConsentAnswers } from "../lib/consent";
import { giftCardBalance, normalizeCode } from "../lib/giftcards";
import { syncZettle, zettleEnabled } from "../lib/zettle";
import { Layout, StatusPill } from "../views/layout";
import { extra } from "./admin-extra";
import {
  adminApp,
  METHOD_LABELS,
  KIND_LABELS,
  BookingRow,
  BOOKING_SELECT,
  today,
  dayRange,
  when,
  audit,
  staffList,
  serviceList,
  str,
  EMAIL_LABELS,
} from "./admin-shared";


export const admin = adminApp();

admin.use("*", async (c, next) => {
  const user = await staffFromRequest(c.req.raw, c.env);
  if (!user) return c.text("Ingen tilgang. Logg inn via Cloudflare Access med en ansatt-e-post.", 403);
  c.set("user", user);
  await next();
});

admin.route("/", extra);

// ---------- Today ----------

admin.get("/", async (c) => {
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : today();
  const [from, to] = dayRange(date);
  const [bookings, requests, paid] = await Promise.all([
    c.env.DB.prepare(`${BOOKING_SELECT} WHERE b.starts_at >= ? AND b.starts_at < ? AND b.status != 'cancelled' ORDER BY b.starts_at`)
      .bind(from, to)
      .all<BookingRow>(),
    c.env.DB.prepare("SELECT COUNT(*) AS n FROM bookings WHERE status = 'requested'").first<{ n: number }>(),
    c.env.DB.prepare("SELECT COALESCE(SUM(amount_ore), 0) AS total, COUNT(*) AS n FROM payments WHERE business_date = ?")
      .bind(date)
      .first<{ total: number; n: number }>(),
  ]);

  return c.html(
    <Layout title="I dag" path="/admin" user={c.get("user")} flash={c.req.query("ok")}>
      <div class="row noprint" style="justify-content:space-between">
        <h1>{date === today() ? "I dag" : date}</h1>
        <div style="flex:0 0 auto">
          <a class="button secondary" href={`/admin?date=${addDays(date, -1)}`}>←</a>{" "}
          <a class="button secondary" href={`/admin?date=${addDays(date, 1)}`}>→</a>{" "}
          <a class="button" href="/admin/bookings/new">Ny avtale</a>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <div class="muted">Avtaler</div>
          <div class="big">{bookings.results.length}</div>
        </div>
        <div class="card">
          <div class="muted">Åpne forespørsler</div>
          <div class="big">
            <a href="/admin/requests">{requests?.n ?? 0}</a>
          </div>
        </div>
        <div class="card">
          <div class="muted">Registrert betalt</div>
          <div class="big">{formatOre(paid?.total ?? 0)}</div>
          <div class="muted">{paid?.n ?? 0} betalinger</div>
        </div>
      </div>
      <BookingTable rows={bookings.results} />
    </Layout>,
  );
});

function BookingTable({ rows, showDate }: { rows: BookingRow[]; showDate?: boolean }) {
  if (!rows.length) return <p class="muted">Ingenting her.</p>;
  return (
    <div class="card" style="overflow-x:auto">
      <table>
        <thead>
          <tr>
            <th>{showDate ? "Når" : "Tid"}</th>
            <th>Kunde</th>
            <th>Behandling</th>
            <th>Artist</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr>
              <td>
                <a href={`/admin/bookings/${b.id}`}>
                  {showDate ? when(b) : b.starts_at ? `${localTime(b.starts_at)}–${b.ends_at ? localTime(b.ends_at) : ""}` : "–"}
                </a>
              </td>
              <td>
                <a href={`/admin/clients/${b.client_id}`}>{b.client_name}</a>
                <div class="muted">{b.client_phone}</div>
              </td>
              <td>
                {b.service_name}
                {b.idea && <div class="muted">{b.idea.slice(0, 90)}</div>}
              </td>
              <td>
                {b.staff_name ? (
                  <>
                    <span class="dot" style={`background:${b.staff_color}`} />
                    {b.staff_name}
                  </>
                ) : (
                  <span class="muted">Hvem som helst</span>
                )}
              </td>
              <td>
                <StatusPill status={b.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Requests & calendar ----------

admin.get("/requests", async (c) => {
  const rows = await c.env.DB.prepare(`${BOOKING_SELECT} WHERE b.status = 'requested' ORDER BY b.created_at DESC`).all<BookingRow>();
  return c.html(
    <Layout title="Forespørsler" path="/admin/requests" user={c.get("user")} flash={c.req.query("ok")}>
      <h1>Forespørsler</h1>
      <p class="muted">Nye forespørsler fra nettsiden. Åpne en for å sette tid, pris og depositum, og bekreft.</p>
      <BookingTable rows={rows.results} showDate />
    </Layout>,
  );
});

admin.get("/calendar", async (c) => {
  const start = isDateString(c.req.query("from") ?? "") ? c.req.query("from")! : today();
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const [from] = dayRange(days[0]);
  const [, to] = dayRange(days[6]);
  const rows = (
    await c.env.DB.prepare(`${BOOKING_SELECT} WHERE b.starts_at >= ? AND b.starts_at < ? AND b.status IN ('requested','confirmed','completed') ORDER BY b.starts_at`)
      .bind(from, to)
      .all<BookingRow>()
  ).results;
  const weekday = new Intl.DateTimeFormat("nb-NO", { weekday: "long", day: "numeric", month: "short", timeZone: "UTC" });

  return c.html(
    <Layout title="Kalender" path="/admin/calendar" user={c.get("user")}>
      <div class="row" style="justify-content:space-between">
        <h1>Kalender</h1>
        <div style="flex:0 0 auto">
          <a class="button secondary" href={`/admin/calendar?from=${addDays(start, -7)}`}>← Forrige uke</a>{" "}
          <a class="button secondary" href={`/admin/calendar?from=${addDays(start, 7)}`}>Neste uke →</a>
        </div>
      </div>
      {days.map((d) => {
        const list = rows.filter((b) => b.starts_at && businessDate(b.starts_at) === d);
        return (
          <div class="card">
            <div class="row" style="justify-content:space-between">
              <strong style="text-transform:capitalize">{weekday.format(new Date(`${d}T12:00:00Z`))}</strong>
              <a class="muted" style="flex:0 0 auto" href={`/admin?date=${d}`}>
                Åpne dag
              </a>
            </div>
            {list.length ? (
              <table>
                <tbody>
                  {list.map((b) => (
                    <tr>
                      <td style="width:8rem">
                        <a href={`/admin/bookings/${b.id}`}>{`${localTime(b.starts_at!)}–${b.ends_at ? localTime(b.ends_at) : ""}`}</a>
                      </td>
                      <td>
                        <span class="dot" style={`background:${b.staff_color ?? "#555"}`} />
                        {b.staff_name ?? "?"}
                      </td>
                      <td>{b.client_name}</td>
                      <td>{b.service_name}</td>
                      <td>
                        <StatusPill status={b.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div class="muted">Ingen avtaler</div>
            )}
          </div>
        );
      })}
    </Layout>,
  );
});

// ---------- Bookings ----------

admin.get("/bookings/new", async (c) => {
  const [staff, services] = await Promise.all([staffList(c.env), serviceList(c.env)]);
  return c.html(
    <Layout title="Ny avtale" path="/admin/bookings" user={c.get("user")} error={c.req.query("error")}>
      <h1>Ny avtale</h1>
      <form method="post" action="/admin/bookings" class="card">
        <div class="row">
          <label>
            Kundenavn
            <input name="name" required />
          </label>
          <label>
            Telefon
            <input name="phone" type="tel" />
          </label>
          <label>
            E-post
            <input name="email" type="email" />
          </label>
        </div>
        <div class="row">
          <label>
            Behandling
            <select name="service_id">
              {services.map((s) => (
                <option value={s.id}>{s.name_no}</option>
              ))}
            </select>
          </label>
          <label>
            Artist
            <select name="staff_id">
              {staff.map((s) => (
                <option value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            Kilde
            <select name="source">
              <option value="phone">Telefon</option>
              <option value="instagram">Instagram</option>
              <option value="walk_in">Walk-in</option>
              <option value="staff">Annet</option>
            </select>
          </label>
        </div>
        <div class="row">
          <label>
            Dato
            <input name="date" type="date" value={today()} required />
          </label>
          <label>
            Tid
            <input name="time" type="time" step="900" required />
          </label>
          <label>
            Varighet (min)
            <input name="duration" type="number" min="15" step="15" placeholder="fra behandling" />
          </label>
        </div>
        <label>
          Notat
          <textarea name="internal_notes" rows={3} />
        </label>
        <button>Lagre avtale</button>
      </form>
    </Layout>,
  );
});

admin.post("/bookings", async (c) => {
  const body = await c.req.parseBody();
  const user = c.get("user");
  const name = str(body, "name");
  const date = str(body, "date");
  const time = str(body, "time");
  if (!name || !isDateString(date) || !/^\d{2}:\d{2}$/.test(time)) return c.redirect("/admin/bookings/new?error=Mangler+navn,+dato+eller+tid");

  const service = await c.env.DB.prepare("SELECT id, duration_min, price_ore, deposit_ore FROM services WHERE id = ?")
    .bind(Number(str(body, "service_id")))
    .first<{ id: number; duration_min: number; price_ore: number | null; deposit_ore: number }>();
  if (!service) return c.redirect("/admin/bookings/new?error=Ukjent+behandling");

  const duration = Number(str(body, "duration")) || service.duration_min;
  const startsAt = osloToUtc(date, time).toISOString();
  const endsAt = new Date(Date.parse(startsAt) + duration * 60000).toISOString();
  const phone = str(body, "phone") || null;
  const email = str(body, "email") || null;

  let client = phone || email
    ? await c.env.DB.prepare("SELECT id FROM clients WHERE (? IS NOT NULL AND phone = ?) OR (? IS NOT NULL AND lower(email) = lower(?)) LIMIT 1")
        .bind(phone, phone, email, email)
        .first<{ id: number }>()
    : null;
  if (!client) {
    client = await c.env.DB.prepare("INSERT INTO clients (name, phone, email) VALUES (?, ?, ?) RETURNING id")
      .bind(name, phone, email)
      .first<{ id: number }>();
  }

  const source = ["phone", "instagram", "walk_in", "staff"].includes(str(body, "source")) ? str(body, "source") : "staff";
  const created = await c.env.DB.prepare(
    `INSERT INTO bookings (public_id, client_id, staff_id, service_id, status, starts_at, ends_at, price_ore, deposit_ore, internal_notes, source)
     VALUES (?, ?, ?, ?, 'confirmed', ?, ?, ?, ?, ?, ?) RETURNING id`,
  )
    .bind(crypto.randomUUID(), client!.id, Number(str(body, "staff_id")) || null, service.id, startsAt, endsAt, service.price_ore, service.deposit_ore, str(body, "internal_notes") || null, source)
    .first<{ id: number }>();
  await audit(c.env, user, "create", "booking", created!.id);
  return c.redirect(`/admin/bookings/${created!.id}?ok=Avtale+lagret`);
});

admin.get("/bookings/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const b = await c.env.DB.prepare(`${BOOKING_SELECT} WHERE b.id = ?`).bind(id).first<BookingRow>();
  if (!b) return c.notFound();
  const [staff, services, payments, consent, photos, emails, openPayment, hold] = await Promise.all([
    staffList(c.env),
    serviceList(c.env),
    c.env.DB.prepare("SELECT * FROM payments WHERE booking_id = ? ORDER BY paid_at").bind(id).all<PaymentRow>(),
    c.env.DB.prepare("SELECT * FROM consents WHERE booking_id = ? ORDER BY id DESC LIMIT 1").bind(id).first<{
      signed_name: string;
      signed_at: string;
      answers_json: string;
      birth_date: string | null;
      guardian_name: string | null;
      photo_consent: number;
    }>(),
    c.env.DB.prepare("SELECT id, content_type FROM booking_photos WHERE booking_id = ? ORDER BY id").bind(id).all<{ id: number; content_type: string }>(),
    c.env.DB.prepare("SELECT kind, to_address, status, error, sent_at FROM emails WHERE booking_id = ? ORDER BY id DESC LIMIT 20").bind(id).all<{
      kind: string;
      to_address: string;
      status: string;
      error: string | null;
      sent_at: string;
    }>(),
    c.env.DB.prepare("SELECT url, amount_ore FROM online_payments WHERE booking_id = ? AND status = 'open' ORDER BY id DESC LIMIT 1").bind(id).first<{ url: string; amount_ore: number }>(),
    c.env.DB.prepare("SELECT hold_until, public_id, cancel_reason FROM bookings WHERE id = ?").bind(id).first<{ hold_until: string | null; public_id: string; cancel_reason: string | null }>(),
  ]);
  const depositPaid = payments.results.filter((p) => p.kind === "deposit").reduce((sum, p) => sum + p.amount_ore, 0);
  const answers = consent ? (JSON.parse(consent.answers_json) as ConsentAnswers) : null;
  const flags = answers ? flaggedQuestions(answers) : [];
  const age = consent?.birth_date ? ageOn(consent.birth_date, b.starts_at ? businessDate(b.starts_at) : today()) : null;
  const consentLink = consentUrl(c.env, hold!.public_id);
  const paidTotal = payments.results.reduce((sum, p) => sum + p.amount_ore, 0);
  const duration = b.starts_at && b.ends_at ? Math.round((Date.parse(b.ends_at) - Date.parse(b.starts_at)) / 60000) : "";

  return c.html(
    <Layout title={b.client_name} path="/admin/bookings" user={c.get("user")} flash={c.req.query("ok")} error={c.req.query("error")}>
      <h1>
        {b.service_name} · {b.client_name} <StatusPill status={b.status} />
      </h1>
      <div class="grid">
        <div class="card">
          <div class="muted">Kunde</div>
          <a href={`/admin/clients/${b.client_id}`}>{b.client_name}</a>
          <div>{b.client_phone && <a href={`tel:${b.client_phone}`}>{b.client_phone}</a>}</div>
          <div>{b.client_email && <a href={`mailto:${b.client_email}`}>{b.client_email}</a>}</div>
        </div>
        <div class="card">
          <div class="muted">Tid</div>
          <div>{when(b)}</div>
          <div class="muted">Kilde: {b.source}</div>
        </div>
        <div class="card">
          <div class="muted">Betalt / pris</div>
          <div class="big">{formatOre(paidTotal)}</div>
          <div class="muted">
            Pris {formatOre(b.price_ore)} · depositum {formatOre(b.deposit_ore)}
          </div>
        </div>
        <div class="card">
          <div class="muted">Egenerklæring</div>
          {consent ? (
            <>
              <div>
                Signert av {consent.signed_name} {businessDate(consent.signed_at)}
              </div>
              {age != null && <div class={age < 18 ? "" : "muted"}>{age < 18 ? `⚠ ${age} år – foresatt: ${consent.guardian_name}` : `${age} år`}</div>}
              {flags.length > 0 ? <div style="color:var(--warn)">⚠ {flags.length} helsesvar «ja» – se under</div> : <div class="muted">Ingen helseforbehold</div>}
            </>
          ) : (
            <>
              <div class="muted">Ikke signert</div>
              <div style="font-size:.8rem;word-break:break-all" class="muted">{consentLink}</div>
            </>
          )}
        </div>
      </div>
      {hold?.hold_until && (
        <div class="flash error">Venter på depositum fra nettbooking. Timen frigjøres automatisk {localTime(hold.hold_until)} hvis den ikke betales.</div>
      )}
      {b.status === "cancelled" && hold?.cancel_reason && <div class="flash error">Avlyst: {hold.cancel_reason}</div>}
      {answers && (flags.length > 0 || answers.details) && (
        <div class="card">
          <strong>Helseopplysninger</strong>
          <ul>
            {flags.map((f) => (
              <li>{f}</li>
            ))}
          </ul>
          {answers.details && <p style="white-space:pre-wrap">{answers.details}</p>}
          <div class="muted">{consent?.photo_consent ? "Samtykker til bilder i portefølje" : "Ikke samtykke til bilder"}</div>
        </div>
      )}
      {photos.results.length > 0 && (
        <div class="card" style="display:flex;gap:.5rem;flex-wrap:wrap">
          {photos.results.map((p) => (
            <a href={`/admin/photos/${p.id}`} target="_blank">
              <img src={`/admin/photos/${p.id}`} alt="Referansebilde" style="height:140px;border-radius:10px;object-fit:cover" />
            </a>
          ))}
        </div>
      )}

      {(b.idea || b.placement || b.size || b.style || b.budget) && (
        <div class="card">
          {b.idea && <p style="white-space:pre-wrap;margin-top:0">{b.idea}</p>}
          <div class="muted">
            {[b.placement && `Plassering: ${b.placement}`, b.size && `Størrelse: ${b.size}`, b.style && `Stil: ${b.style}`, b.budget && `Budsjett: ${b.budget}`, b.first_tattoo === 1 && "Første tatovering"]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </div>
      )}

      <h2>Oppdater avtale</h2>
      <form method="post" action={`/admin/bookings/${b.id}`} class="card">
        <div class="row">
          <label>
            Status
            <select name="status">
              {["requested", "confirmed", "completed", "cancelled", "no_show"].map((s) => (
                <option value={s} selected={s === b.status}>
                  {{ requested: "Forespørsel", confirmed: "Bekreftet", completed: "Fullført", cancelled: "Avlyst", no_show: "Møtte ikke" }[s]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Artist
            <select name="staff_id">
              <option value="">Ikke valgt</option>
              {staff.map((s) => (
                <option value={s.id} selected={s.id === b.staff_id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Behandling
            <select name="service_id">
              {services.map((s) => (
                <option value={s.id} selected={s.id === b.service_id}>
                  {s.name_no}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div class="row">
          <label>
            Dato
            <input name="date" type="date" value={b.starts_at ? businessDate(b.starts_at) : ""} />
          </label>
          <label>
            Tid
            <input name="time" type="time" step="900" value={b.starts_at ? localTime(b.starts_at) : ""} />
          </label>
          <label>
            Varighet (min)
            <input name="duration" type="number" min="15" step="15" value={String(duration)} />
          </label>
        </div>
        <div class="row">
          <label>
            Pris (kr)
            <input name="price" inputmode="decimal" value={b.price_ore == null ? "" : String(b.price_ore / 100)} />
          </label>
          <label>
            Depositum (kr)
            <input name="deposit" inputmode="decimal" value={String(b.deposit_ore / 100)} />
          </label>
        </div>
        <label>
          Internt notat
          <textarea name="internal_notes" rows={3}>
            {b.internal_notes ?? ""}
          </textarea>
        </label>
        <label class="check">
          <input type="checkbox" name="notify" value="1" checked />
          <span>Send e-post til kunden når status endres (bekreftet, avlyst, fullført = etterbehandling)</span>
        </label>
        <button>Lagre</button>
      </form>

      <h2>Kunden</h2>
      <div class="card">
        <div class="row" style="align-items:center">
          <form method="post" action={`/admin/bookings/${b.id}/send`} style="flex:0 0 auto">
            <input type="hidden" name="what" value="confirmation" />
            <button class="secondary" disabled={!b.client_email || !b.starts_at}>Send bekreftelse på nytt</button>
          </form>
          {b.deposit_ore > depositPaid && (
            <form method="post" action={`/admin/bookings/${b.id}/send`} style="flex:0 0 auto">
              <input type="hidden" name="what" value="deposit" />
              <button class="secondary" disabled={!stripeEnabled(c.env)}>
                Send depositum-lenke ({formatOre(b.deposit_ore - depositPaid)})
              </button>
            </form>
          )}
          {openPayment && (
            <div class="muted" style="font-size:.8rem;word-break:break-all">
              Betalingslenke: <a href={openPayment.url}>{openPayment.url.slice(0, 60)}…</a>
            </div>
          )}
        </div>
        {!stripeEnabled(c.env) && b.deposit_ore > depositPaid && <p class="muted">Nettbetaling er ikke satt opp ennå. Ta depositum i kassen og registrer det under.</p>}
        {emails.results.length > 0 && (
          <table style="margin-top:.5rem">
            <tbody>
              {emails.results.map((e) => (
                <tr>
                  <td>{EMAIL_LABELS[e.kind] ?? e.kind}</td>
                  <td class="muted">{e.to_address}</td>
                  <td>{e.status === "sent" ? "Sendt" : e.status === "skipped" ? "Ikke sendt (e-post ikke satt opp)" : `Feilet: ${e.error ?? ""}`}</td>
                  <td class="muted">
                    {businessDate(e.sent_at)} {localTime(e.sent_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <h2>Betalinger på avtalen</h2>
      <PaymentTable rows={payments.results} staff={staff} />
      <PaymentForm staff={staff} bookingId={b.id} staffId={b.staff_id} date={today()} back={`/admin/bookings/${b.id}`} />
    </Layout>,
  );
});

admin.post("/bookings/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.parseBody();
  const existing = await c.env.DB.prepare("SELECT id, status, starts_at FROM bookings WHERE id = ?").bind(id).first<{ id: number; status: string; starts_at: string | null }>();
  if (!existing) return c.notFound();

  const status = str(body, "status");
  if (!["requested", "confirmed", "completed", "cancelled", "no_show"].includes(status)) return c.redirect(`/admin/bookings/${id}?error=Ugyldig+status`);
  const date = str(body, "date");
  const time = str(body, "time");
  const duration = Number(str(body, "duration"));
  let startsAt: string | null = null;
  let endsAt: string | null = null;
  if (date || time) {
    if (!isDateString(date) || !/^\d{2}:\d{2}$/.test(time) || !(duration > 0)) return c.redirect(`/admin/bookings/${id}?error=Dato,+tid+og+varighet+må+fylles+ut+sammen`);
    startsAt = osloToUtc(date, time).toISOString();
    endsAt = new Date(Date.parse(startsAt) + duration * 60000).toISOString();
  }
  if (status === "confirmed" && !startsAt) return c.redirect(`/admin/bookings/${id}?error=Sett+en+tid+før+du+bekrefter`);
  const price = str(body, "price") ? parseKroner(str(body, "price")) : null;
  const deposit = str(body, "deposit") ? parseKroner(str(body, "deposit")) : 0;
  if ((str(body, "price") && price == null) || deposit == null) return c.redirect(`/admin/bookings/${id}?error=Ugyldig+beløp`);
  const staffId = Number(str(body, "staff_id")) || null;

  if (startsAt && staffId && ["requested", "confirmed"].includes(status)) {
    const clash = await c.env.DB.prepare(
      "SELECT id FROM bookings WHERE staff_id = ? AND id != ? AND status IN ('requested','confirmed') AND starts_at < ? AND ends_at > ? LIMIT 1",
    )
      .bind(staffId, id, endsAt, startsAt)
      .first<{ id: number }>();
    if (clash) return c.redirect(`/admin/bookings/${id}?error=Kolliderer+med+avtale+%23${clash.id}`);
  }

  await c.env.DB.prepare(
    `UPDATE bookings SET status = ?, staff_id = ?, service_id = ?, starts_at = ?, ends_at = ?, price_ore = ?, deposit_ore = ?,
       internal_notes = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?`,
  )
    .bind(status, staffId, Number(str(body, "service_id")), startsAt, endsAt, price, deposit, str(body, "internal_notes") || null, id)
    .run();
  await audit(c.env, c.get("user"), "update", "booking", id, { status, staffId, startsAt, price, deposit });

  if (str(body, "notify") === "1") {
    const moved = startsAt !== existing.starts_at;
    if (status === "confirmed" && (existing.status !== "confirmed" || moved)) {
      if (existing.status === "confirmed") await afterConfirmed(c.env, id, { force: true });
      else await afterConfirmed(c.env, id);
    } else if (status === "cancelled" && existing.status !== "cancelled") await afterCancelled(c.env, id);
    else if (status === "completed" && existing.status !== "completed") await afterCompleted(c.env, id);
  }
  if (status === "cancelled") await c.env.DB.prepare("UPDATE bookings SET hold_until = NULL WHERE id = ?").bind(id).run();
  return c.redirect(`/admin/bookings/${id}?ok=Lagret`);
});

admin.post("/bookings/:id/send", async (c) => {
  const id = Number(c.req.param("id"));
  const what = str(await c.req.parseBody(), "what");
  if (what === "confirmation") {
    await afterConfirmed(c.env, id, { force: true });
    return c.redirect(`/admin/bookings/${id}?ok=Bekreftelse+sendt`);
  }
  if (what === "deposit") {
    try {
      const url = await sendDepositLink(c.env, id);
      return c.redirect(`/admin/bookings/${id}?${url ? "ok=Depositum-lenke+sendt" : "error=Ingen+depositum+å+betale"}`);
    } catch (error) {
      return c.redirect(`/admin/bookings/${id}?error=${encodeURIComponent(String(error).slice(0, 120))}`);
    }
  }
  return c.redirect(`/admin/bookings/${id}`);
});

admin.get("/photos/:id", async (c) => {
  if (!c.env.PHOTOS) return c.notFound();
  const row = await c.env.DB.prepare("SELECT r2_key, content_type FROM booking_photos WHERE id = ?").bind(Number(c.req.param("id"))).first<{ r2_key: string; content_type: string }>();
  const object = row ? await c.env.PHOTOS.get(row.r2_key) : null;
  if (!row || !object) return c.notFound();
  return c.body(object.body, 200, { "Content-Type": row.content_type, "Cache-Control": "private, max-age=3600" });
});

// ---------- Clients ----------

admin.get("/clients", async (c) => {
  const q = (c.req.query("q") ?? "").trim();
  const rows = (
    await (q
      ? c.env.DB.prepare(
          "SELECT id, name, phone, email, created_at FROM clients WHERE name LIKE ?1 OR phone LIKE ?1 OR email LIKE ?1 ORDER BY name LIMIT 100",
        ).bind(`%${q}%`)
      : c.env.DB.prepare("SELECT id, name, phone, email, created_at FROM clients ORDER BY id DESC LIMIT 50")
    ).all<{ id: number; name: string; phone: string | null; email: string | null; created_at: string }>()
  ).results;
  return c.html(
    <Layout title="Kunder" path="/admin/clients" user={c.get("user")}>
      <h1>Kunder</h1>
      <form method="get" class="row card">
        <label>
          Søk på navn, telefon eller e-post
          <input name="q" value={q} autofocus />
        </label>
        <div style="flex:0 0 auto">
          <button>Søk</button>
        </div>
      </form>
      <div class="card">
        <table>
          <tbody>
            {rows.map((r) => (
              <tr>
                <td>
                  <a href={`/admin/clients/${r.id}`}>{r.name}</a>
                </td>
                <td>{r.phone}</td>
                <td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>,
  );
});

admin.get("/clients/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const client = await c.env.DB.prepare("SELECT * FROM clients WHERE id = ?").bind(id).first<{
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    birth_date: string | null;
    notes: string | null;
    marketing_consent: number;
  }>();
  if (!client) return c.notFound();
  const bookings = await c.env.DB.prepare(`${BOOKING_SELECT} WHERE b.client_id = ? ORDER BY COALESCE(b.starts_at, b.created_at) DESC`).bind(id).all<BookingRow>();
  return c.html(
    <Layout title={client.name} path="/admin/clients" user={c.get("user")} flash={c.req.query("ok")}>
      <h1>{client.name}</h1>
      <form method="post" action={`/admin/clients/${id}`} class="card">
        <div class="row">
          <label>
            Navn
            <input name="name" value={client.name} required />
          </label>
          <label>
            Telefon
            <input name="phone" value={client.phone ?? ""} />
          </label>
          <label>
            E-post
            <input name="email" type="email" value={client.email ?? ""} />
          </label>
          <label>
            Fødselsdato
            <input name="birth_date" type="date" value={client.birth_date ?? ""} />
          </label>
        </div>
        <label>
          Notater (allergier, hudtype, tidligere arbeid…)
          <textarea name="notes" rows={4}>
            {client.notes ?? ""}
          </textarea>
        </label>
        <button>Lagre kunde</button>
      </form>
      <h2>Avtaler</h2>
      <BookingTable rows={bookings.results} showDate />
    </Layout>,
  );
});

admin.post("/clients/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.parseBody();
  const birth = str(body, "birth_date");
  await c.env.DB.prepare("UPDATE clients SET name = ?, phone = ?, email = ?, birth_date = ?, notes = ? WHERE id = ?")
    .bind(str(body, "name"), str(body, "phone") || null, str(body, "email") || null, isDateString(birth) ? birth : null, str(body, "notes") || null, id)
    .run();
  await audit(c.env, c.get("user"), "update", "client", id);
  return c.redirect(`/admin/clients/${id}?ok=Lagret`);
});

// ---------- Payments ----------

type PaymentRow = {
  id: number;
  booking_id: number | null;
  staff_id: number | null;
  kind: string;
  method: string;
  amount_ore: number;
  provider: string | null;
  provider_ref: string | null;
  note: string | null;
  paid_at: string;
  business_date: string;
  report_id: number | null;
  recorded_by: string | null;
};

function PaymentTable({ rows, staff }: { rows: PaymentRow[]; staff: { id: number; name: string }[] }) {
  if (!rows.length) return <p class="muted">Ingen betalinger.</p>;
  const names = new Map(staff.map((s) => [s.id, s.name]));
  return (
    <div class="card" style="overflow-x:auto">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tid</th>
            <th>Type</th>
            <th>Metode</th>
            <th>Artist</th>
            <th>Ref.</th>
            <th class="num">Beløp</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr>
              <td>{p.id}</td>
              <td>
                {p.business_date} {localTime(p.paid_at)}
              </td>
              <td>
                {KIND_LABELS[p.kind]}
                {p.booking_id && (
                  <>
                    {" "}
                    · <a href={`/admin/bookings/${p.booking_id}`}>avtale</a>
                  </>
                )}
              </td>
              <td>{METHOD_LABELS[p.method]}</td>
              <td>{p.staff_id ? names.get(p.staff_id) : "Studio"}</td>
              <td class="muted">{[p.provider, p.provider_ref, p.note].filter(Boolean).join(" · ")}</td>
              <td class="num">{formatOre(p.amount_ore)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaymentForm(props: { staff: { id: number; name: string }[]; bookingId?: number; staffId?: number | null; date: string; back: string }) {
  return (
    <form method="post" action="/admin/payments" class="card noprint">
      <input type="hidden" name="booking_id" value={props.bookingId ? String(props.bookingId) : ""} />
      <input type="hidden" name="back" value={props.back} />
      <div class="row">
        <label>
          Beløp (kr)
          <input name="amount" inputmode="decimal" required placeholder="1500" />
        </label>
        <label>
          Type
          <select name="kind">
            {PAYMENT_KINDS.map((k) => (
              <option value={k} selected={k === "payment"}>
                {KIND_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Metode
          <select name="method">
            {PAYMENT_METHODS.map((m) => (
              <option value={m}>{METHOD_LABELS[m]}</option>
            ))}
          </select>
        </label>
        <label>
          Artist
          <select name="staff_id">
            <option value="">Studio</option>
            {props.staff.map((s) => (
              <option value={s.id} selected={s.id === props.staffId}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div class="row">
        <label>
          Dato
          <input name="date" type="date" value={props.date} required />
        </label>
        <label>
          Betalingsløsning
          <select name="provider">
            <option value="zettle">Zettle</option>
            <option value="vippskassa">Vippskassa</option>
            <option value="sumup">SumUp</option>
            <option value="stripe">Stripe (nett)</option>
            <option value="manual">Manuelt</option>
          </select>
        </label>
        <label>
          Gavekortkode (ved gavekort)
          <input name="gift_card_code" placeholder="INF-XXXX-XXXX" />
        </label>
        <label>
          Transaksjons-ID (valgfritt)
          <input name="provider_ref" />
        </label>
        <label>
          Notat
          <input name="note" />
        </label>
      </div>
      <button>Registrer betaling</button>
    </form>
  );
}

admin.get("/payments", async (c) => {
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : today();
  const [rows, staff, closed] = await Promise.all([
    c.env.DB.prepare("SELECT * FROM payments WHERE business_date = ? ORDER BY paid_at, id").bind(date).all<PaymentRow>(),
    staffList(c.env),
    c.env.DB.prepare("SELECT seq FROM day_reports WHERE business_date = ?").bind(date).first<{ seq: number }>(),
  ]);
  const total = rows.results.reduce((s, p) => s + p.amount_ore, 0);
  return c.html(
    <Layout title="Betalinger" path="/admin/payments" user={c.get("user")} flash={c.req.query("ok")} error={c.req.query("error")}>
      <div class="row" style="justify-content:space-between">
        <h1>Betalinger {date}</h1>
        <div style="flex:0 0 auto">
          <a class="button secondary" href={`/admin/payments?date=${addDays(date, -1)}`}>←</a>{" "}
          <a class="button secondary" href={`/admin/payments?date=${addDays(date, 1)}`}>→</a>{" "}
          <a class="button secondary" href={`/admin/export.csv?from=${date.slice(0, 8)}01&to=${date}`}>CSV for regnskap</a>
        </div>
      </div>
      {zettleEnabled(c.env) && (
        <form method="post" action="/admin/zettle-sync" class="noprint" style="margin-bottom:1rem">
          <input type="hidden" name="back" value={`/admin/payments?date=${date}`} />
          <button class="secondary">Hent nye betalinger fra Zettle</button>
        </form>
      )}
      <PaymentTable rows={rows.results} staff={staff} />
      <p>
        Sum: <strong>{formatOre(total)}</strong>
      </p>
      {closed ? (
        <p class="muted">
          Dagen er avsluttet (<a href={`/admin/report/${closed.seq}`}>dagsoppgjør nr. {closed.seq}</a>). Rettelser registreres som refusjon på
          dagens dato.
        </p>
      ) : (
        <PaymentForm staff={staff} date={date} back={`/admin/payments?date=${date}`} />
      )}
    </Layout>,
  );
});

admin.post("/payments", async (c) => {
  const body = await c.req.parseBody();
  const user = c.get("user");
  const back = str(body, "back").startsWith("/admin") ? str(body, "back") : "/admin/payments";
  const sep = back.includes("?") ? "&" : "?";
  const kind = str(body, "kind");
  const method = str(body, "method");
  const date = str(body, "date");
  let amount = parseKroner(str(body, "amount"));
  if (amount == null || amount === 0 || !PAYMENT_KINDS.includes(kind as never) || !PAYMENT_METHODS.includes(method as never) || !isDateString(date)) {
    return c.redirect(`${back}${sep}error=Sjekk+beløp,+type+og+dato`);
  }
  if (date > today()) return c.redirect(`${back}${sep}error=Kan+ikke+registrere+på+en+fremtidig+dato`);
  // Refunds are always stored as negative amounts so sums stay correct.
  amount = kind === "refund" ? -Math.abs(amount) : Math.abs(amount);

  const closed = await c.env.DB.prepare("SELECT seq FROM day_reports WHERE business_date = ?").bind(date).first();
  if (closed) return c.redirect(`${back}${sep}error=Dagen+er+avsluttet.+Registrer+rettelsen+på+dagens+dato`);

  const paidAt = date === today() ? new Date().toISOString() : osloToUtc(date, "12:00").toISOString();
  const providerRef = str(body, "provider_ref") || null;

  // Paying with a gift card draws down its balance in the same batch as the payment.
  let giftCard: { id: number; code: string } | null = null;
  if (method === "gift_card" && kind !== "refund") {
    const code = normalizeCode(str(body, "gift_card_code"));
    const card = await c.env.DB.prepare("SELECT id, code, status, expires_on FROM gift_cards WHERE code = ?").bind(code).first<{ id: number; code: string; status: string; expires_on: string }>();
    if (!card || card.status !== "active") return c.redirect(`${back}${sep}error=Fant+ikke+aktivt+gavekort+med+den+koden`);
    if (card.expires_on < date) return c.redirect(`${back}${sep}error=Gavekortet+er+utløpt+${card.expires_on}`);
    const balance = await giftCardBalance(c.env, card.id);
    if (balance < amount) return c.redirect(`${back}${sep}error=${encodeURIComponent(`Gavekortet har bare ${formatOre(balance)} igjen`)}`);
    giftCard = card;
  }
  try {
    const row = await c.env.DB.prepare(
      `INSERT INTO payments (booking_id, staff_id, kind, method, amount_ore, provider, provider_ref, note, paid_at, business_date, recorded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    )
      .bind(Number(str(body, "booking_id")) || null, Number(str(body, "staff_id")) || null, kind, method, amount, giftCard ? "gift_card" : str(body, "provider") || "manual", giftCard ? `${giftCard.code}:${crypto.randomUUID().slice(0, 8)}` : providerRef, str(body, "note") || (giftCard ? `Gavekort ${giftCard.code}` : null), paidAt, date, user.email)
      .first<{ id: number }>();
    if (giftCard) {
      await c.env.DB.prepare("INSERT INTO gift_card_movements (gift_card_id, amount_ore, booking_id, note, by) VALUES (?, ?, ?, ?, ?)")
        .bind(giftCard.id, -amount, Number(str(body, "booking_id")) || null, `Betaling #${row!.id}`, user.email)
        .run();
    }
    await audit(c.env, user, "create", "payment", row!.id, { amount, kind, method });
  } catch (error) {
    if (String(error).includes("UNIQUE")) return c.redirect(`${back}${sep}error=Transaksjonen+er+allerede+registrert`);
    throw error;
  }
  return c.redirect(`${back}${sep}ok=Betaling+registrert`);
});

admin.get("/export.csv", async (c) => {
  const from = c.req.query("from") ?? "";
  const to = c.req.query("to") ?? "";
  if (!isDateString(from) || !isDateString(to)) return c.text("from/to må være YYYY-MM-DD", 400);
  const rows = (
    await c.env.DB.prepare(
      `SELECT p.*, s.name AS staff_name, r.seq AS report_seq FROM payments p
       LEFT JOIN staff s ON s.id = p.staff_id LEFT JOIN day_reports r ON r.id = p.report_id
       WHERE p.business_date BETWEEN ? AND ? ORDER BY p.business_date, p.id`,
    )
      .bind(from, to)
      .all<PaymentRow & { staff_name: string | null; report_seq: number | null }>()
  ).results;
  const cell = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = ["id", "dato", "tid", "dagsoppgjor", "type", "metode", "artist", "belop", "losning", "transaksjon", "avtale", "notat"];
  const lines = rows.map((p) =>
    [p.id, p.business_date, localTime(p.paid_at), p.report_seq, KIND_LABELS[p.kind], METHOD_LABELS[p.method], p.staff_name ?? "Studio", (p.amount_ore / 100).toFixed(2).replace(".", ","), p.provider, p.provider_ref, p.booking_id, p.note]
      .map(cell)
      .join(";"),
  );
  return c.body(`﻿${[header.join(";"), ...lines].join("\r\n")}\r\n`, 200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="betalinger-${from}-${to}.csv"`,
  });
});

// ---------- Daily settlement ----------

async function computeReport(env: Env, date: string, counted: number | null): Promise<DayReport> {
  const [payments, staff] = await Promise.all([
    env.DB.prepare("SELECT id, staff_id, kind, method, amount_ore FROM payments WHERE business_date = ? ORDER BY id").bind(date).all<ReportPayment>(),
    env.DB.prepare("SELECT id, name, studio_share_pct FROM staff").all<ReportStaff>(),
  ]);
  return buildDayReport(date, payments.results, staff.results, counted);
}

function ReportView({ report, seq, closedBy, closedAt, note }: { report: DayReport; seq?: number; closedBy?: string; closedAt?: string; note?: string | null }) {
  return (
    <>
      <div class="card">
        <div class="row">
          <div>
            <div class="muted">Dato</div>
            <strong>{report.business_date}</strong>
          </div>
          <div>
            <div class="muted">Oppgjør nr.</div>
            <strong>{seq ?? "Ikke avsluttet"}</strong>
          </div>
          <div>
            <div class="muted">Betalinger</div>
            <strong>
              {report.payment_count}
              {report.first_payment_id != null && ` (#${report.first_payment_id}–#${report.last_payment_id})`}
            </strong>
          </div>
          <div>
            <div class="muted">Netto</div>
            <strong class="big">{formatOre(report.net_ore)}</strong>
          </div>
        </div>
        {closedBy && (
          <p class="muted">
            Avsluttet av {closedBy} {closedAt && `${businessDate(closedAt)} ${localTime(closedAt)}`}
            {note && ` · ${note}`}
          </p>
        )}
      </div>
      <div class="grid">
        <div class="card">
          <h2 style="margin-top:0">Per betalingsmåte</h2>
          <table>
            <tbody>
              {PAYMENT_METHODS.map((m) => (
                <tr>
                  <td>{METHOD_LABELS[m]}</td>
                  <td class="num">{formatOre(report.by_method[m])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="card">
          <h2 style="margin-top:0">Per type</h2>
          <table>
            <tbody>
              {PAYMENT_KINDS.map((k) => (
                <tr>
                  <td>{KIND_LABELS[k]}</td>
                  <td class="num">{formatOre(report.by_kind[k])}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Salg</strong>
                </td>
                <td class="num">{formatOre(report.sales_ore)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Nye penger inn</strong> <span class="muted">(uten innløste gavekort)</span>
                </td>
                <td class="num">{formatOre(report.new_money_ore)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card">
          <h2 style="margin-top:0">Kontanter</h2>
          <table>
            <tbody>
              <tr>
                <td>Forventet</td>
                <td class="num">{formatOre(report.cash_expected_ore)}</td>
              </tr>
              <tr>
                <td>Talt</td>
                <td class="num">{formatOre(report.cash_counted_ore)}</td>
              </tr>
              <tr>
                <td>Differanse</td>
                <td class="num">{formatOre(report.cash_difference_ore)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <h2 style="margin-top:0">Per artist</h2>
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th class="num">Antall</th>
              <th class="num">Omsetning</th>
              <th class="num">Studio</th>
              <th class="num">Artist</th>
            </tr>
          </thead>
          <tbody>
            {report.by_staff.map((s) => (
              <tr>
                <td>{s.name}</td>
                <td class="num">{s.count}</td>
                <td class="num">{formatOre(s.gross_ore)}</td>
                <td class="num">{formatOre(s.studio_ore)}</td>
                <td class="num">{formatOre(s.artist_ore)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

admin.get("/report", async (c) => {
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : today();
  const [closed, history] = await Promise.all([
    c.env.DB.prepare("SELECT seq FROM day_reports WHERE business_date = ?").bind(date).first<{ seq: number }>(),
    c.env.DB.prepare("SELECT seq, business_date, totals_json, closed_by FROM day_reports ORDER BY seq DESC LIMIT 30").all<{
      seq: number;
      business_date: string;
      totals_json: string;
      closed_by: string;
    }>(),
  ]);
  if (closed) return c.redirect(`/admin/report/${closed.seq}`);
  const report = await computeReport(c.env, date, null);

  return c.html(
    <Layout title="Dagsoppgjør" path="/admin/report" user={c.get("user")} flash={c.req.query("ok")} error={c.req.query("error")}>
      <div class="row" style="justify-content:space-between">
        <h1>Dagsoppgjør {date}</h1>
        <div style="flex:0 0 auto">
          <a class="button secondary" href={`/admin/report?date=${addDays(date, -1)}`}>←</a>{" "}
          <a class="button secondary" href={`/admin/report?date=${addDays(date, 1)}`}>→</a>
        </div>
      </div>
      <p class="muted">
        Foreløpig oppgjør (X). Når dagen avsluttes blir oppgjøret nummerert og låst, og betalinger kan ikke lenger endres for denne datoen.
      </p>
      <ReportView report={report} />
      <form method="post" action="/admin/report/close" class="card">
        <input type="hidden" name="date" value={date} />
        <div class="row">
          <label>
            Talt kontantbeholdning (kr)
            <input name="counted" inputmode="decimal" placeholder={String(report.cash_expected_ore / 100)} />
          </label>
          <label>
            Kommentar
            <input name="note" />
          </label>
          <div style="flex:0 0 auto">
            <button>Avslutt dagen</button>
          </div>
        </div>
      </form>
      <h2>Tidligere oppgjør</h2>
      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Dato</th>
              <th class="num">Netto</th>
              <th>Avsluttet av</th>
            </tr>
          </thead>
          <tbody>
            {history.results.map((r) => (
              <tr>
                <td>
                  <a href={`/admin/report/${r.seq}`}>{r.seq}</a>
                </td>
                <td>{r.business_date}</td>
                <td class="num">{formatOre((JSON.parse(r.totals_json) as DayReport).net_ore)}</td>
                <td>{r.closed_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>,
  );
});

admin.post("/report/close", async (c) => {
  const body = await c.req.parseBody();
  const date = str(body, "date");
  if (!isDateString(date) || date > today()) return c.redirect("/admin/report?error=Ugyldig+dato");
  const counted = str(body, "counted") ? parseKroner(str(body, "counted")) : null;
  if (str(body, "counted") && counted == null) return c.redirect(`/admin/report?date=${date}&error=Ugyldig+kontantbeløp`);

  const already = await c.env.DB.prepare("SELECT seq FROM day_reports WHERE business_date = ?").bind(date).first<{ seq: number }>();
  if (already) return c.redirect(`/admin/report/${already.seq}`);
  // Make sure the latest till payments are in before the day is locked.
  if (zettleEnabled(c.env)) {
    try {
      await syncZettle(c.env);
    } catch (error) {
      return c.redirect(`/admin/report?date=${date}&error=${encodeURIComponent(`Fikk ikke hentet fra Zettle: ${String(error).slice(0, 100)}`)}`);
    }
  }

  const report = await computeReport(c.env, date, counted);
  const user = c.get("user");
  // Sequence number and locking happen in one batch so two people closing at once can't collide.
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO day_reports (seq, business_date, totals_json, counted_cash_ore, note, closed_by)
       SELECT (SELECT COALESCE(MAX(seq), 0) + 1 FROM day_reports), ?, ?, ?, ?, ?
       WHERE NOT EXISTS (SELECT 1 FROM day_reports WHERE business_date = ?)`,
    ).bind(date, JSON.stringify(report), counted, str(body, "note") || null, user.email, date),
    c.env.DB.prepare("UPDATE payments SET report_id = (SELECT id FROM day_reports WHERE business_date = ?) WHERE business_date = ? AND report_id IS NULL").bind(date, date),
    c.env.DB.prepare("SELECT seq FROM day_reports WHERE business_date = ?").bind(date),
  ]);
  const seq = (results[2].results[0] as { seq: number } | undefined)?.seq;
  await audit(c.env, user, "close", "day_report", seq ?? null, { date, net: report.net_ore });
  return c.redirect(`/admin/report/${seq}?ok=Dagen+er+avsluttet`);
});

admin.get("/report/:seq", async (c) => {
  const seq = Number(c.req.param("seq"));
  const row = await c.env.DB.prepare("SELECT * FROM day_reports WHERE seq = ?").bind(seq).first<{
    seq: number;
    business_date: string;
    totals_json: string;
    note: string | null;
    closed_by: string;
    closed_at: string;
  }>();
  if (!row) return c.notFound();
  return c.html(
    <Layout title={`Dagsoppgjør nr. ${seq}`} path="/admin/report" user={c.get("user")} flash={c.req.query("ok")}>
      <div class="row" style="justify-content:space-between">
        <h1>Dagsoppgjør nr. {seq}</h1>
        <div style="flex:0 0 auto" class="noprint">
          <button class="secondary" onclick="window.print()">
            Skriv ut / PDF
          </button>
        </div>
      </div>
      <ReportView report={JSON.parse(row.totals_json)} seq={row.seq} closedBy={row.closed_by} closedAt={row.closed_at} note={row.note} />
      <p class="muted">
        Dette er studioets interne dagsoppgjør, ikke en kassasystem-Z-rapport. Den lovpålagte Z-rapporten kommer fra det
        produkterklærte kassasystemet (f.eks. Vippskassa eller Zettle).
      </p>
    </Layout>,
  );
});

admin.post("/zettle-sync", async (c) => {
  const back = str(await c.req.parseBody(), "back");
  const target = back.startsWith("/admin") ? back : "/admin/payments";
  const sep = target.includes("?") ? "&" : "?";
  try {
    const result = await syncZettle(c.env);
    return c.redirect(`${target}${sep}ok=${encodeURIComponent(`Hentet ${result.imported} nye betalinger fra Zettle`)}`);
  } catch (error) {
    return c.redirect(`${target}${sep}error=${encodeURIComponent(String(error).slice(0, 150))}`);
  }
});
