import type { Context } from "hono";

import { activateGiftCard, stripeEnabled } from "../lib/bookings";
import { giftCardBalance, giftCardExpiry, newGiftCardCode, normalizeCode } from "../lib/giftcards";
import { formatOre, parseKroner } from "../lib/report";
import { addDays, businessDate, isDateString, localTime, osloToUtc } from "../lib/time";
import { FEATURES, setFeature, type FeatureKey } from "../lib/features";
import { Icon, Layout } from "../views/layout";
import { Empty, FilterSelect, PageHead, PeriodNav, periodRange, SegTabs, type PeriodUnit } from "../views/ui";
import { SettingsPage } from "./admin-settings";
import { adminApp, audit, KIND_LABELS, METHOD_LABELS, str, today, type AdminEnv } from "./admin-shared";

export const extra = adminApp();

const WEEKDAYS = ["", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
const ROLES: Record<string, string> = { owner: "Eier", artist: "Tatovør", piercer: "Piercer", guest: "Gjesteartist", reception: "Resepsjon" };
const KINDS: Record<string, string> = { consultation: "Konsultasjon", tattoo: "Tatovering", piercing: "Piercing", tooth_gem: "Tooth gem", other: "Annet" };

function isOwner(c: Context<AdminEnv>) {
  return c.get("user").role === "owner";
}

function ownerOnly(c: Context<AdminEnv>) {
  return c.html(
    <Layout title="Ingen tilgang" path="/admin/settings" user={c.get("user")}>
      <p>Bare eieren kan endre dette.</p>
    </Layout>,
    403,
  );
}

const flash = (c: Context<AdminEnv>) => ({ flash: c.req.query("ok"), error: c.req.query("error") });
const checked = (body: Record<string, unknown>, key: string) => (str(body, key) === "1" ? 1 : 0);

// =====================================================================
// Settings
// =====================================================================

type StaffRow = {
  id: number;
  name: string;
  email: string | null;
  role: string;
  studio_share_pct: number;
  monthly_rent_ore?: number;
  color: string;
  bookable: number;
  active: number;
  birth_date: string | null;
  national_id: string | null;
  ical_token: string | null;
};

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
  public: number;
  active: number;
  sort: number;
  needs_consent: number;
  vat_pct?: number;
  aftercare_no: string | null;
  aftercare_en: string | null;
};

extra.post("/settings/features", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const body = await c.req.parseBody();
  for (const key of Object.keys(FEATURES) as FeatureKey[]) await setFeature(c.env, key, checked(body, `f_${key}`) === 1);
  await audit(c.env, c.get("user"), "update", "features", null, body);
  return c.redirect("/admin/settings/features?ok=Funksjoner+lagret");
});

// ---------- Staff ----------

// =====================================================================
// Artists and managers (separate menu items, as in Linework)
// =====================================================================

const MANAGER_ROLES = ["owner", "reception"];
const staffSection = (role: string) => (role === "reception" ? "/admin/managers" : "/admin/artists");

// Linework's Artists/Managers pages: Aktive · Inviterte · Inaktive · Alle, with the invite button on the right.
async function staffPage(c: Context<AdminEnv>, kind: "artists" | "managers") {
  const all = (await c.env.DB.prepare("SELECT * FROM staff ORDER BY active DESC, id").all<StaffRow & { last_login_at: string | null }>()).results.filter((s) =>
    kind === "managers" ? MANAGER_ROLES.includes(s.role) : !MANAGER_ROLES.includes(s.role) || (s.role === "owner" && s.bookable),
  );
  const groups = {
    active: all.filter((s) => s.active && (!s.email || s.last_login_at)),
    invited: all.filter((s) => s.active && s.email && !s.last_login_at),
    inactive: all.filter((s) => !s.active),
    all,
  };
  const tab = (["active", "invited", "inactive", "all"] as const).find((t) => t === c.req.query("tab")) ?? "active";
  const rows = groups[tab];
  const linked = await c.env.DB.prepare(
    "SELECT ss.staff_id, COUNT(*) AS n FROM staff_services ss JOIN services sv ON sv.id = ss.service_id WHERE sv.active = 1 GROUP BY ss.staff_id",
  ).all<{ staff_id: number; n: number }>();
  const servicesOf = (id: number) => linked.results.find((l) => l.staff_id === id)?.n ?? 0;
  const base = c.env.PUBLIC_BASE_URL.replace(/\/$/, "");
  const owner = isOwner(c);
  const rentOn = c.get("user").features?.rent !== false;
  const title = kind === "artists" ? "Artister" : "Ledere";
  const path = `/admin/${kind}`;
  const tabHref = (t: string) => (t === "active" ? path : `${path}?tab=${t}`);
  return c.html(
    <Layout title={title} path={path} user={c.get("user")} {...flash(c)}>
      <PageHead
        title={title}
        sub={kind === "artists" ? "Artistene i studioet og innstillingene deres: timer, behandlinger, andel og leie." : "De som driver studioet og kan logge inn."}
      />
      <div class="toolbar" style="justify-content:space-between">
        <SegTabs
          active={tabHref(tab)}
          tabs={[
            { href: tabHref("active"), label: "Aktive", count: groups.active.length },
            { href: tabHref("invited"), label: "Inviterte", count: groups.invited.length },
            { href: tabHref("inactive"), label: "Inaktive", count: groups.inactive.length },
            { href: tabHref("all"), label: kind === "artists" ? "Alle artister" : "Alle" },
          ]}
        />
        {owner && (
          <a class="button" href={`/admin/settings/staff/new?role=${kind === "artists" ? "artist" : "reception"}`}>
            {kind === "artists" ? "Inviter artist" : "Inviter leder"}
          </a>
        )}
      </div>
      {rows.length === 0 ? (
        <div class="card" style="margin-top:1rem">
          <Empty icon={kind} text={tab === "invited" ? "Ingen venter på å logge inn" : kind === "artists" ? "Ingen artister her ennå" : "Ingen ledere her ennå"} />
        </div>
      ) : (
        <div class="list" style="margin-top:1rem">
          <table>
            <thead>
              <tr>
                <th>Navn</th>
                <th>Rolle</th>
                <th>Innlogging</th>
                {kind === "artists" && <th class="num">Studioandel</th>}
                {kind === "artists" && rentOn && <th class="num">Stolleie</th>}
                {kind === "artists" && <th class="num">Behandlinger</th>}
                <th>Kalender på telefonen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr class={s.active ? "" : "muted"}>
                  <td>
                    <span class="dot" style={`background:${s.color}`} />
                    {owner ? <a href={`/admin/settings/staff/${s.id}`}>{s.name}</a> : s.name}
                  </td>
                  <td>{ROLES[s.role] ?? s.role}</td>
                  <td>
                    {s.email ?? <span class="muted">Ikke invitert</span>}
                    {s.email && !s.last_login_at && <span class="pill requested" style="margin-left:.4rem">Invitert</span>}
                  </td>
                  {kind === "artists" && <td class="num">{s.studio_share_pct} %</td>}
                  {kind === "artists" && rentOn && <td class="num">{formatOre(s.monthly_rent_ore ?? 0)}</td>}
                  {kind === "artists" && <td class="num">{servicesOf(s.id)}</td>}
                  <td style="font-size:.8rem;word-break:break-all">{s.ical_token ? `${base}/cal/${s.ical_token}.ics` : "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p class="muted" style="margin-top:1.5rem">
        Inviter med e-posten personen logger inn med. Kalender på telefonen: lim inn lenken i iPhone (Innstillinger → Kalender → Kontoer → Legg til abonnement)
        eller Google Kalender.
      </p>
    </Layout>,
  );
}

extra.get("/artists", (c) => staffPage(c, "artists"));
extra.get("/managers", (c) => staffPage(c, "managers"));

extra.get("/settings/staff/:id", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const isNew = c.req.param("id") === "new";
  const id = Number(c.req.param("id"));
  const s = isNew
    ? ({ id: 0, name: "", email: null, role: ROLES[c.req.query("role") ?? ""] ? c.req.query("role")! : "artist", studio_share_pct: 0, color: "#2563eb", bookable: 1, active: 1, birth_date: null, national_id: null, ical_token: null } as StaffRow)
    : await c.env.DB.prepare("SELECT * FROM staff WHERE id = ?").bind(id).first<StaffRow>();
  if (!s) return c.notFound();
  const [services, hours, linked] = await Promise.all([
    c.env.DB.prepare("SELECT id, name_no FROM services WHERE active = 1 ORDER BY sort, id").all<{ id: number; name_no: string }>(),
    c.env.DB.prepare("SELECT weekday, start_time, end_time FROM working_hours WHERE staff_id = ? ORDER BY weekday, start_time").bind(id || -1).all<{ weekday: number; start_time: string; end_time: string }>(),
    c.env.DB.prepare("SELECT service_id FROM staff_services WHERE staff_id = ?").bind(id || -1).all<{ service_id: number }>(),
  ]);
  const linkedIds = new Set(linked.results.map((l) => l.service_id));
  const hoursFor = (d: number) => hours.results.find((h) => h.weekday === d);

  return c.html(
    <Layout title={isNew ? "Ny ansatt" : s.name} path={staffSection(s.role)} user={c.get("user")} {...flash(c)}>
      <h1>{isNew ? "Ny ansatt" : s.name}</h1>
      <form method="post" class="card">
        <div class="row">
          <label>
            Navn
            <input name="name" required value={s.name} />
          </label>
          <label>
            E-post (for innlogging)
            <input name="email" type="email" value={s.email ?? ""} />
          </label>
          <label>
            Rolle
            <select name="role">
              {Object.entries(ROLES).map(([k, v]) => (
                <option value={k} selected={k === s.role}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div class="row">
          <label>
            Studioandel av omsetning (%)
            <input name="studio_share_pct" type="number" min="0" max="100" value={String(s.studio_share_pct)} />
          </label>
          <label style={c.get("user").features?.rent === false ? "display:none" : undefined}>
            Fast stolleie per måned (kr)
            <input name="monthly_rent" inputmode="decimal" value={String((s.monthly_rent_ore ?? 0) / 100)} />
          </label>
          <label>
            Farge i kalenderen
            <input name="color" type="color" value={s.color} style="height:2.4rem" />
          </label>
          <label>
            Fødselsdato (personalliste)
            <input name="birth_date" type="date" value={s.birth_date ?? ""} />
          </label>
          <label>
            Fødselsnummer / D-nummer (personalliste)
            <input name="national_id" inputmode="numeric" autocomplete="off" value={s.national_id ?? ""} />
          </label>
        </div>
        <label class="check">
          <input type="checkbox" name="bookable" value="1" checked={Boolean(s.bookable)} />
          <span>Kan bookes på nettsiden</span>
        </label>
        <label class="check">
          <input type="checkbox" name="active" value="1" checked={Boolean(s.active)} />
          <span>Aktiv</span>
        </label>

        <fieldset>
          <legend>Behandlinger</legend>
          {services.results.map((sv) => (
            <label class="check">
              <input type="checkbox" name={`service_${sv.id}`} value="1" checked={linkedIds.has(sv.id)} />
              <span>{sv.name_no}</span>
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Arbeidstid (tom = fri)</legend>
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <div class="row" style="align-items:center">
              <div style="flex:0 0 6rem">{WEEKDAYS[d]}</div>
              <label style="margin:0">
                <input name={`start_${d}`} type="time" value={hoursFor(d)?.start_time ?? ""} />
              </label>
              <label style="margin:0">
                <input name={`end_${d}`} type="time" value={hoursFor(d)?.end_time ?? ""} />
              </label>
            </div>
          ))}
        </fieldset>
        <button>Lagre</button>
      </form>
      {!isNew && (
        <form method="post" action={`/admin/settings/staff/${s.id}/new-calendar-link`}>
          <button class="secondary">Lag ny kalenderlenke (den gamle slutter å virke)</button>
        </form>
      )}
    </Layout>,
  );
});

extra.post("/settings/staff/:id", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const body = await c.req.parseBody();
  const isNew = c.req.param("id") === "new";
  const name = str(body, "name");
  const role = str(body, "role");
  const share = Math.min(100, Math.max(0, Math.round(Number(str(body, "studio_share_pct")) || 0)));
  const birth = str(body, "birth_date");
  const rent = str(body, "monthly_rent") ? parseKroner(str(body, "monthly_rent")) : 0;
  if (rent == null || rent < 0) return c.redirect(`/admin/settings/staff/${c.req.param("id")}?error=Sjekk+stolleien`);
  if (!name || !(role in ROLES)) return c.redirect(`/admin/settings/staff/${c.req.param("id")}?error=Mangler+navn+eller+rolle`);

  const hours: { weekday: number; start: string; end: string }[] = [];
  for (let d = 1; d <= 7; d++) {
    const start = str(body, `start_${d}`);
    const end = str(body, `end_${d}`);
    if (!start && !end) continue;
    if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end) || start >= end) {
      return c.redirect(`/admin/settings/staff/${c.req.param("id")}?error=${encodeURIComponent(`Sjekk arbeidstiden for ${WEEKDAYS[d].toLowerCase()}`)}`);
    }
    hours.push({ weekday: d, start, end });
  }
  const values = [name, str(body, "email").toLowerCase() || null, role, share, str(body, "color") || "#b91c1c", checked(body, "bookable"), checked(body, "active"), isDateString(birth) ? birth : null, str(body, "national_id").replace(/\s/g, "") || null, rent];

  let id: number;
  if (isNew) {
    const row = await c.env.DB.prepare(
      `INSERT INTO staff (name, email, role, studio_share_pct, color, bookable, active, birth_date, national_id, monthly_rent_ore, ical_token)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, lower(hex(randomblob(16)))) RETURNING id`,
    )
      .bind(...values)
      .first<{ id: number }>();
    id = row!.id;
  } else {
    id = Number(c.req.param("id"));
    await c.env.DB.prepare(
      "UPDATE staff SET name = ?, email = ?, role = ?, studio_share_pct = ?, color = ?, bookable = ?, active = ?, birth_date = ?, national_id = ?, monthly_rent_ore = ? WHERE id = ?",
    )
      .bind(...values, id)
      .run();
  }

  const services = await c.env.DB.prepare("SELECT id FROM services").all<{ id: number }>();
  await c.env.DB.batch([
    c.env.DB.prepare("DELETE FROM staff_services WHERE staff_id = ?").bind(id),
    ...services.results.filter((sv) => checked(body, `service_${sv.id}`)).map((sv) => c.env.DB.prepare("INSERT INTO staff_services (staff_id, service_id) VALUES (?, ?)").bind(id, sv.id)),
    c.env.DB.prepare("DELETE FROM working_hours WHERE staff_id = ?").bind(id),
    ...hours.map((h) => c.env.DB.prepare("INSERT INTO working_hours (staff_id, weekday, start_time, end_time) VALUES (?, ?, ?, ?)").bind(id, h.weekday, h.start, h.end)),
  ]);
  await audit(c.env, c.get("user"), isNew ? "create" : "update", "staff", id, { name, role, share });
  return c.redirect(`/admin/settings/staff/${id}?ok=Lagret`);
});

extra.post("/settings/staff/:id/new-calendar-link", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const id = Number(c.req.param("id"));
  await c.env.DB.prepare("UPDATE staff SET ical_token = lower(hex(randomblob(16))) WHERE id = ?").bind(id).run();
  return c.redirect("/admin/settings?ok=Ny+kalenderlenke+laget");
});

// ---------- Services ----------

extra.get("/settings/services/:id", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const isNew = c.req.param("id") === "new";
  const s = isNew
    ? ({ id: 0, name_no: "", name_en: "", kind: "tattoo", duration_min: 60, price_ore: null, deposit_ore: 0, requires_approval: 0, public: 1, active: 1, sort: 50, needs_consent: 1, aftercare_no: null, aftercare_en: null } as ServiceRow)
    : await c.env.DB.prepare("SELECT * FROM services WHERE id = ?").bind(Number(c.req.param("id"))).first<ServiceRow>();
  if (!s) return c.notFound();
  return c.html(
    <SettingsPage c={c} active="/admin/settings/services" title={isNew ? "Ny behandling" : s.name_no}>
      <p>
        <a href="/admin/settings/services">← Behandlinger</a>
      </p>
      <h2 style="margin-top:0;font-size:1.3rem">{isNew ? "Ny behandling" : s.name_no}</h2>
      <form method="post" class="card">
        <div class="row">
          <label>
            Navn (norsk)
            <input name="name_no" required value={s.name_no} />
          </label>
          <label>
            Navn (engelsk)
            <input name="name_en" required value={s.name_en} />
          </label>
          <label>
            Type
            <select name="kind">
              {Object.entries(KINDS).map(([k, v]) => (
                <option value={k} selected={k === s.kind}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div class="row">
          <label>
            Varighet (min)
            <input name="duration_min" type="number" min="15" step="15" required value={String(s.duration_min)} />
          </label>
          <label>
            Rydding etter (min)
            <input name="buffer_min" type="number" min="0" step="5" value={String(s.buffer_min ?? 0)} />
          </label>
          <label>
            Pris (kr, tom = etter avtale)
            <input name="price" inputmode="decimal" value={s.price_ore == null ? "" : String(s.price_ore / 100)} />
          </label>
          <label>
            Depositum (kr)
            <input name="deposit" inputmode="decimal" value={String(s.deposit_ore / 100)} />
          </label>
          <label>
            Mva-sats
            <select name="vat_pct">
              {[25, 15, 12, 0].map((v) => (
                <option value={v} selected={(s.vat_pct ?? 25) === v}>
                  {v} %
                </option>
              ))}
            </select>
          </label>
          <label>
            Rekkefølge
            <input name="sort" type="number" value={String(s.sort)} />
          </label>
        </div>
        <label class="check">
          <input type="checkbox" name="requires_approval" value="1" checked={Boolean(s.requires_approval)} />
          <span>Forespørsel – studioet setter tid og pris (ellers velger kunden ledig tid selv)</span>
        </label>
        <label class="check">
          <input type="checkbox" name="public" value="1" checked={Boolean(s.public)} />
          <span>Vis på nettsiden</span>
        </label>
        <label class="check">
          <input type="checkbox" name="needs_consent" value="1" checked={Boolean(s.needs_consent)} />
          <span>Krever egenerklæring</span>
        </label>
        <label class="check">
          <input type="checkbox" name="active" value="1" checked={Boolean(s.active)} />
          <span>Aktiv</span>
        </label>
        <label>
          Etterbehandling (norsk) – sendes når avtalen settes til fullført
          <textarea name="aftercare_no" rows={6} id="etterbehandling">
            {s.aftercare_no ?? ""}
          </textarea>
        </label>
        <label>
          Etterbehandling (engelsk)
          <textarea name="aftercare_en" rows={6}>
            {s.aftercare_en ?? ""}
          </textarea>
        </label>
        <button>Lagre</button>
      </form>
    </SettingsPage>,
  );
});

extra.post("/settings/services/:id", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const body = await c.req.parseBody();
  const isNew = c.req.param("id") === "new";
  const back = `/admin/settings/services/${c.req.param("id")}`;
  const kind = str(body, "kind");
  const duration = Number(str(body, "duration_min"));
  const price = str(body, "price") ? parseKroner(str(body, "price")) : null;
  const deposit = str(body, "deposit") ? parseKroner(str(body, "deposit")) : 0;
  if (!str(body, "name_no") || !str(body, "name_en") || !(kind in KINDS) || !(duration > 0) || (str(body, "price") && price == null) || deposit == null) {
    return c.redirect(`${back}?error=Sjekk+navn,+varighet+og+beløp`);
  }
  const values = [
    str(body, "name_no"),
    str(body, "name_en"),
    kind,
    Math.round(duration),
    price,
    deposit,
    checked(body, "requires_approval"),
    checked(body, "public"),
    checked(body, "active"),
    Math.round(Number(str(body, "sort")) || 0),
    checked(body, "needs_consent"),
    str(body, "aftercare_no") || null,
    str(body, "aftercare_en") || null,
    Math.max(0, Math.round(Number(str(body, "buffer_min")) || 0)),
    [0, 12, 15, 25].includes(Number(str(body, "vat_pct"))) ? Number(str(body, "vat_pct")) : 25,
  ];
  let id: number;
  if (isNew) {
    const row = await c.env.DB.prepare(
      `INSERT INTO services (name_no, name_en, kind, duration_min, price_ore, deposit_ore, requires_approval, public, active, sort, needs_consent, aftercare_no, aftercare_en, buffer_min, vat_pct)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    )
      .bind(...values)
      .first<{ id: number }>();
    id = row!.id;
  } else {
    id = Number(c.req.param("id"));
    await c.env.DB.prepare(
      `UPDATE services SET name_no = ?, name_en = ?, kind = ?, duration_min = ?, price_ore = ?, deposit_ore = ?, requires_approval = ?,
         public = ?, active = ?, sort = ?, needs_consent = ?, aftercare_no = ?, aftercare_en = ?, buffer_min = ?, vat_pct = ? WHERE id = ?`,
    )
      .bind(...values, id)
      .run();
  }
  await audit(c.env, c.get("user"), isNew ? "create" : "update", "service", id);
  return c.redirect(`/admin/settings/services/${id}?ok=Lagret.+Husk+å+koble+behandlingen+til+riktige+ansatte.`);
});

// ---------- Time off ----------

extra.post("/settings/time-off", async (c) => {
  const body = await c.req.parseBody();
  const fromDate = str(body, "from_date");
  const toDate = str(body, "to_date");
  const fromTime = str(body, "from_time") || "00:00";
  const toTime = str(body, "to_time") || "23:59";
  if (!isDateString(fromDate) || !isDateString(toDate)) return c.redirect("/admin/settings/time-off?error=Ugyldig+dato");
  const starts = osloToUtc(fromDate, fromTime).toISOString();
  const ends = osloToUtc(toDate, toTime).toISOString();
  if (ends <= starts) return c.redirect("/admin/settings/time-off?error=Slutt+må+være+etter+start");
  await c.env.DB.prepare("INSERT INTO time_off (staff_id, starts_at, ends_at, reason) VALUES (?, ?, ?, ?)")
    .bind(Number(str(body, "staff_id")) || null, starts, ends, str(body, "reason") || null)
    .run();
  await audit(c.env, c.get("user"), "create", "time_off", null, { starts, ends });
  return c.redirect("/admin/settings/time-off?ok=Fravær+lagt+til");
});

extra.post("/settings/time-off/:id/delete", async (c) => {
  const id = Number(c.req.param("id"));
  await c.env.DB.prepare("DELETE FROM time_off WHERE id = ?").bind(id).run();
  await audit(c.env, c.get("user"), "delete", "time_off", id);
  return c.redirect("/admin/settings/time-off?ok=Fravær+fjernet");
});

// =====================================================================
// Gift cards
// =====================================================================

type CardRow = {
  id: number;
  code: string;
  initial_ore: number;
  status: string;
  buyer_name: string | null;
  buyer_email: string | null;
  recipient_name: string | null;
  source: string;
  expires_on: string;
  created_at: string;
  balance_ore: number;
};

const CARD_SELECT = `SELECT g.*, COALESCE((SELECT SUM(amount_ore) FROM gift_card_movements m WHERE m.gift_card_id = g.id), 0) AS balance_ore FROM gift_cards g`;

/** Selling a gift card in the studio: from the gift card page and from "Nytt salg". */
export function GiftCardSaleForm({ methods }: { methods: string[] }) {
  return (
    <form method="post" action="/admin/gift-cards">
      <div class="row">
        <label>
          Beløp (kr)
          <input name="amount" inputmode="decimal" required />
        </label>
        <label>
          Betalt med
          <select name="method">
            {methods.map((m) => (
              <option value={m}>{METHOD_LABELS[m]}</option>
            ))}
          </select>
        </label>
        <label>
          Kjøpers navn
          <input name="buyer_name" />
        </label>
        <label>
          Til (mottaker)
          <input name="recipient_name" />
        </label>
      </div>
      <p class="muted">Ta betalt i kassen som vanlig. Her registreres gavekortet og betalingen, og koden skrives på kortet.</p>
      <button>Lag gavekort</button>
    </form>
  );
}

const CARD_STATUS: Record<string, string> = { valid: "Gyldig", used: "Brukt", expired: "Utløpt", void: "Annullert", pending: "Venter på betaling" };
const cardStatus = (g: CardRow) =>
  g.status === "void" ? "void" : g.status === "pending" ? "pending" : g.balance_ore <= 0 ? "used" : g.expires_on < today() ? "expired" : "valid";
const dmy = (d: string) => d.slice(0, 10).split("-").reverse().join(".");

// Same layout as Linework's Gift Cards: store status, search and filters, list, totals bar.
extra.get("/gift-cards", async (c) => {
  const q = (c.req.query("q") ?? "").trim();
  const source = c.req.query("source") ?? "";
  const status = c.req.query("status") ?? "";
  const all = (
    q
      ? await c.env.DB.prepare(`${CARD_SELECT} WHERE g.code = ? OR g.buyer_name LIKE ?2 OR g.recipient_name LIKE ?2 OR g.buyer_email LIKE ?2 ORDER BY g.id DESC LIMIT 200`)
          .bind(normalizeCode(q), `%${q}%`)
          .all<CardRow>()
      : await c.env.DB.prepare(`${CARD_SELECT} WHERE g.status != 'pending' ORDER BY g.id DESC LIMIT 500`).all<CardRow>()
  ).results;
  const rows = all.filter((g) => (!source || (source === "online") === (g.source === "online")) && (!status || cardStatus(g) === status));
  const sold = all.filter((g) => g.status === "active");
  const valid = sold.filter((g) => cardStatus(g) === "valid");
  const online = stripeEnabled(c.env);
  const csv = `/admin/gift-cards.csv${q || source || status ? `?${new URLSearchParams({ q, source, status })}` : ""}`;

  return c.html(
    <Layout title="Gavekort" path="/admin/gift-cards" user={c.get("user")} {...flash(c)}>
      <PageHead title="Gavekort" sub="Se alle solgte gavekort og hvordan nettbutikken for gavekort står.">
        <a class="button secondary" href="https://infinitytattoo.no/#gift-cards" target="_blank" rel="noopener">
          <Icon name="share" size={16} /> Del gavekortbutikken
        </a>
        <a class="button" href="/admin/payments/new?tab=gift" data-drawer>
          + Selg gavekort
        </a>
      </PageHead>
      <p class="toolbar">
        <span class="sectionhead" style="margin:0">
          <span class="dot" style={`background:${online ? "var(--ok)" : "var(--faint)"}`} />
          {online ? "Gavekortbutikken er på" : "Gavekortbutikken er av"}
        </span>
        {isOwner(c) && (
          <a class="button secondary small" href="/admin/settings/payments">
            Innstillinger
          </a>
        )}
      </p>
      <form method="get" class="toolbar">
        <label class="search">
          <Icon name="search" size={16} />
          <input name="q" value={q} placeholder="Søk" type="search" />
        </label>
        <span class="filters" style="margin:0">
          <FilterSelect name="source" value={source} all="Alle kilder" options={[["online", "På nett"], ["studio", "I studio"]]} />
          <FilterSelect name="status" value={status} all="Alle statuser" options={Object.entries(CARD_STATUS).filter(([k]) => k !== "pending")} />
        </span>
      </form>
      {rows.length === 0 ? (
        <Empty icon="gift" text="Fant ingen gavekort" />
      ) : (
        <div class="list">
          <table>
            <thead>
              <tr>
                <th>Kode</th>
                <th>Status</th>
                <th>Kjøpt</th>
                <th>Utløper</th>
                <th>Kilde</th>
                <th>Til / kjøpt av</th>
                <th class="num">Igjen</th>
                <th class="num">Opprinnelig verdi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((g) => (
                <tr>
                  <td>
                    <a href={`/admin/gift-cards/${g.id}`}>{g.code}</a>
                  </td>
                  <td>{CARD_STATUS[cardStatus(g)]}</td>
                  <td>{dmy(businessDate(g.created_at))}</td>
                  <td>{dmy(g.expires_on)}</td>
                  <td>{g.source === "online" ? "På nett" : "I studio"}</td>
                  <td class="muted">
                    {g.recipient_name ?? "–"} / {g.buyer_name ?? "–"}
                  </td>
                  <td class="num">{formatOre(g.balance_ore)}</td>
                  <td class="num">{formatOre(g.initial_ore)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div class="sumbar">
        <span>
          <strong>{sold.length}</strong> solgt · {formatOre(sold.reduce((s, g) => s + g.initial_ore, 0))}
        </span>
        <span>
          <strong>{valid.length}</strong> gyldige · {formatOre(valid.reduce((s, g) => s + g.balance_ore, 0))} utestående
        </span>
        <span>
          <a class="button secondary small" href={csv}>
            <Icon name="download" size={14} /> Eksporter
          </a>
        </span>
      </div>
    </Layout>,
  );
});

extra.get("/gift-cards.csv", async (c) => {
  const rows = (await c.env.DB.prepare(`${CARD_SELECT} WHERE g.status != 'pending' ORDER BY g.id`).all<CardRow>()).results;
  const header = "kode;status;kjopt;utloper;kilde;kjoper;mottaker;opprinnelig;igjen";
  const kr = (o: number) => (o / 100).toFixed(2).replace(".", ",");
  const lines = rows.map((g) =>
    [g.code, CARD_STATUS[cardStatus(g)], businessDate(g.created_at), g.expires_on, g.source, g.buyer_name ?? "", g.recipient_name ?? "", kr(g.initial_ore), kr(g.balance_ore)]
      .map((v) => (/[;"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v))
      .join(";"),
  );
  return c.body(`﻿${[header, ...lines].join("\r\n")}\r\n`, 200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="gavekort-${today()}.csv"`,
  });
});

extra.post("/gift-cards", async (c) => {
  const body = await c.req.parseBody();
  const amount = parseKroner(str(body, "amount"));
  const method = str(body, "method");
  if (!amount || amount <= 0 || !["card", "vipps", ...(c.get("user").features?.cash ? ["cash"] : [])].includes(method)) return c.redirect("/admin/gift-cards?error=Sjekk+beløp");
  const user = c.get("user");
  const date = today();
  const closed = await c.env.DB.prepare("SELECT 1 FROM day_reports WHERE business_date = ?").bind(date).first();
  if (closed) return c.redirect("/admin/gift-cards?error=Dagen+er+avsluttet");

  const card = await c.env.DB.prepare(
    `INSERT INTO gift_cards (code, initial_ore, status, buyer_name, recipient_name, source, expires_on, created_by)
     VALUES (?, ?, 'pending', ?, ?, 'studio', ?, ?) RETURNING id, code`,
  )
    .bind(newGiftCardCode(), amount, str(body, "buyer_name") || null, str(body, "recipient_name") || null, giftCardExpiry(), user.email)
    .first<{ id: number; code: string }>();
  const now = new Date().toISOString();
  await c.env.DB.prepare(
    `INSERT INTO payments (kind, method, amount_ore, provider, provider_ref, note, paid_at, business_date, recorded_by)
     VALUES ('gift_card_sale', ?, ?, 'manual', ?, ?, ?, ?, ?)`,
  )
    .bind(method, amount, `giftcard:${card!.code}`, `Gavekort ${card!.code}`, now, date, user.email)
    .run();
  await activateGiftCard(c.env, card!.id, user.email);
  await audit(c.env, user, "create", "gift_card", card!.id, { amount });
  return c.redirect(`/admin/gift-cards/${card!.id}?ok=${encodeURIComponent(`Gavekort ${card!.code} laget`)}`);
});

extra.get("/gift-cards/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const g = await c.env.DB.prepare(`${CARD_SELECT} WHERE g.id = ?`).bind(id).first<CardRow & { message: string | null }>();
  if (!g) return c.notFound();
  const moves = await c.env.DB.prepare("SELECT * FROM gift_card_movements WHERE gift_card_id = ? ORDER BY id").bind(id).all<{
    id: number;
    amount_ore: number;
    booking_id: number | null;
    note: string | null;
    at: string;
    by: string | null;
  }>();
  return c.html(
    <Layout title={g.code} path="/admin/gift-cards" user={c.get("user")} {...flash(c)}>
      <h1>Gavekort {g.code}</h1>
      <div class="grid">
        <div class="card">
          <div class="muted">Saldo</div>
          <div class="big">{formatOre(g.balance_ore)}</div>
          <div class="muted">av {formatOre(g.initial_ore)}</div>
        </div>
        <div class="card">
          <div class="muted">Gyldig til</div>
          <div>{g.expires_on}</div>
          <div class="muted">{g.source === "online" ? "Kjøpt på nett" : "Solgt i studio"}</div>
        </div>
        <div class="card">
          <div class="muted">Kjøper / mottaker</div>
          <div>
            {g.buyer_name ?? "–"} {g.buyer_email && <span class="muted">({g.buyer_email})</span>}
          </div>
          <div>{g.recipient_name ?? "–"}</div>
          {g.message && <div class="muted">«{g.message}»</div>}
        </div>
      </div>
      <div class="card">
        <table>
          <tbody>
            {moves.results.map((m) => (
              <tr>
                <td>
                  {businessDate(m.at)} {localTime(m.at)}
                </td>
                <td>
                  {m.note}
                  {m.booking_id && (
                    <>
                      {" "}
                      · <a href={`/admin/bookings/${m.booking_id}`}>avtale</a>
                    </>
                  )}
                </td>
                <td class="muted">{m.by}</td>
                <td class="num">{formatOre(m.amount_ore)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p class="muted">Bruk gavekortet ved å registrere en betaling med metode «Gavekort» og denne koden.</p>
      {isOwner(c) && g.status === "active" && (
        <form method="post" action={`/admin/gift-cards/${g.id}/void`} class="card">
          <label>
            Annuller gavekortet (f.eks. ved refusjon). Grunn:
            <input name="reason" required />
          </label>
          <button class="secondary">Annuller</button>
        </form>
      )}
    </Layout>,
  );
});

extra.post("/gift-cards/:id/void", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const id = Number(c.req.param("id"));
  const reason = str(await c.req.parseBody(), "reason");
  if (!reason) return c.redirect(`/admin/gift-cards/${id}?error=Oppgi+grunn`);
  const balance = await giftCardBalance(c.env, id);
  await c.env.DB.batch([
    c.env.DB.prepare("UPDATE gift_cards SET status = 'void' WHERE id = ?").bind(id),
    c.env.DB.prepare("INSERT INTO gift_card_movements (gift_card_id, amount_ore, note, by) VALUES (?, ?, ?, ?)").bind(id, -balance, `Annullert: ${reason}`, c.get("user").email),
  ]);
  await audit(c.env, c.get("user"), "void", "gift_card", id, { reason, balance });
  return c.redirect(`/admin/gift-cards/${id}?ok=Annullert`);
});

// =====================================================================
// Personalliste
// =====================================================================

type ShiftRow = {
  id: number;
  staff_id: number;
  staff_name: string;
  birth_date: string | null;
  national_id: string | null;
  business_date: string;
  started_at: string;
  ended_at: string | null;
  registered_by: string;
  corrections: number;
};

extra.get("/shifts", async (c) => {
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : today();
  const [staff, shifts, corrections] = await Promise.all([
    c.env.DB.prepare("SELECT id, name FROM staff WHERE active = 1 ORDER BY id").all<{ id: number; name: string }>(),
    c.env.DB.prepare(
      `SELECT sh.*, s.name AS staff_name, s.birth_date, s.national_id,
              (SELECT COUNT(*) FROM shift_corrections sc WHERE sc.shift_id = sh.id) AS corrections
       FROM shifts sh JOIN staff s ON s.id = sh.staff_id WHERE sh.business_date = ? ORDER BY sh.started_at`,
    )
      .bind(date)
      .all<ShiftRow>(),
    c.env.DB.prepare(
      "SELECT sc.* FROM shift_corrections sc JOIN shifts sh ON sh.id = sc.shift_id WHERE sh.business_date = ? ORDER BY sc.id",
    )
      .bind(date)
      .all<{ id: number; shift_id: number; old_started_at: string | null; old_ended_at: string | null; new_started_at: string | null; new_ended_at: string | null; reason: string; corrected_by: string; at: string }>(),
  ]);
  const onShift = new Set(shifts.results.filter((s) => !s.ended_at).map((s) => s.staff_id));
  const isToday = date === today();
  const showId = isOwner(c);

  return c.html(
    <Layout title="Personalliste" path="/admin/shifts" user={c.get("user")} {...flash(c)}>
      <div class="row" style="justify-content:space-between">
        <h1>Personalliste {date}</h1>
        <div style="flex:0 0 auto" class="noprint">
          <a class="button secondary" href={`/admin/shifts?date=${addDays(date, -1)}`}>←</a>{" "}
          <a class="button secondary" href={`/admin/shifts?date=${addDays(date, 1)}`}>→</a>{" "}
          <button class="secondary" onclick="window.print()">
            Skriv ut
          </button>
        </div>
      </div>
      <p class="muted noprint">
        Registrer når arbeidet starter og slutter, også for gjesteartister. Listen kan ikke slettes; rettelser logges med grunn.
      </p>
      {isToday && (
        <div class="card noprint">
          <div class="row">
            {staff.results.map((s) => (
              <form method="post" action="/admin/shifts/toggle" style="flex:0 0 auto">
                <input type="hidden" name="staff_id" value={String(s.id)} />
                <button class={onShift.has(s.id) ? "secondary" : ""}>
                  {s.name}: {onShift.has(s.id) ? "Avslutt" : "Start"}
                </button>
              </form>
            ))}
          </div>
        </div>
      )}
      <div class="card">
        <p style="margin-top:0">
          <strong>{c.env.ORG_NAME ?? "Infinity Tattoo"}</strong> {c.env.ORG_NUMBER && `· org.nr. ${c.env.ORG_NUMBER}`} · {date}
        </p>
        <table>
          <thead>
            <tr>
              <th>Navn</th>
              <th>{showId ? "Fødselsnr. / fødselsdato" : "Fødselsdato"}</th>
              <th>Start</th>
              <th>Slutt</th>
              <th>Registrert av</th>
            </tr>
          </thead>
          <tbody>
            {shifts.results.map((s) => (
              <tr>
                <td>{s.staff_name}</td>
                <td>{showId ? (s.national_id ?? s.birth_date ?? "–") : (s.birth_date ?? "–")}</td>
                <td>{localTime(s.started_at)}</td>
                <td>{s.ended_at ? localTime(s.ended_at) : "–"}</td>
                <td class="muted">
                  {s.registered_by}
                  {s.corrections > 0 && " (rettet)"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {corrections.results.length > 0 && (
          <>
            <h2>Rettelser</h2>
            <table>
              <tbody>
                {corrections.results.map((r) => (
                  <tr>
                    <td>#{r.shift_id}</td>
                    <td>
                      {r.old_started_at ? localTime(r.old_started_at) : "–"}–{r.old_ended_at ? localTime(r.old_ended_at) : "–"} →{" "}
                      {r.new_started_at ? localTime(r.new_started_at) : "–"}–{r.new_ended_at ? localTime(r.new_ended_at) : "–"}
                    </td>
                    <td>{r.reason}</td>
                    <td class="muted">
                      {r.corrected_by} {businessDate(r.at)} {localTime(r.at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {isOwner(c) && shifts.results.length > 0 && (
        <form method="post" action="/admin/shifts/correct" class="card noprint">
          <strong>Rett en registrering</strong>
          <div class="row">
            <label>
              Registrering
              <select name="shift_id">
                {shifts.results.map((s) => (
                  <option value={s.id}>
                    {s.staff_name} {localTime(s.started_at)}–{s.ended_at ? localTime(s.ended_at) : ""}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Ny start
              <input name="start" type="time" required />
            </label>
            <label>
              Ny slutt
              <input name="end" type="time" />
            </label>
            <label>
              Grunn
              <input name="reason" required />
            </label>
          </div>
          <input type="hidden" name="date" value={date} />
          <button class="secondary">Lagre rettelse</button>
        </form>
      )}
    </Layout>,
  );
});

extra.post("/shifts/toggle", async (c) => {
  const staffId = Number(str(await c.req.parseBody(), "staff_id"));
  const date = today();
  const now = new Date().toISOString();
  const open = await c.env.DB.prepare("SELECT id FROM shifts WHERE staff_id = ? AND ended_at IS NULL ORDER BY id DESC LIMIT 1").bind(staffId).first<{ id: number }>();
  if (open) {
    await c.env.DB.prepare("UPDATE shifts SET ended_at = ? WHERE id = ?").bind(now, open.id).run();
  } else {
    await c.env.DB.prepare("INSERT INTO shifts (staff_id, business_date, started_at, registered_by) VALUES (?, ?, ?, ?)").bind(staffId, date, now, c.get("user").email).run();
  }
  return c.redirect(`/admin/shifts?ok=${open ? "Avsluttet" : "Startet"}`);
});

extra.post("/shifts/correct", async (c) => {
  if (!isOwner(c)) return ownerOnly(c);
  const body = await c.req.parseBody();
  const id = Number(str(body, "shift_id"));
  const date = str(body, "date");
  const reason = str(body, "reason");
  const start = str(body, "start");
  const end = str(body, "end");
  const shift = await c.env.DB.prepare("SELECT * FROM shifts WHERE id = ?").bind(id).first<{ started_at: string; ended_at: string | null; business_date: string }>();
  if (!shift || !reason || !/^\d{2}:\d{2}$/.test(start)) return c.redirect(`/admin/shifts?date=${date}&error=Sjekk+feltene`);
  const newStart = osloToUtc(shift.business_date, start).toISOString();
  const newEnd = end ? osloToUtc(shift.business_date, end).toISOString() : null;
  if (newEnd && newEnd <= newStart) return c.redirect(`/admin/shifts?date=${date}&error=Slutt+må+være+etter+start`);
  await c.env.DB.batch([
    c.env.DB.prepare(
      "INSERT INTO shift_corrections (shift_id, old_started_at, old_ended_at, new_started_at, new_ended_at, reason, corrected_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ).bind(id, shift.started_at, shift.ended_at, newStart, newEnd, reason, c.get("user").email),
    c.env.DB.prepare("UPDATE shifts SET started_at = ?, ended_at = ? WHERE id = ?").bind(newStart, newEnd, id),
  ]);
  return c.redirect(`/admin/shifts?date=${shift.business_date}&ok=Rettet`);
});

// =====================================================================
// Monthly artist settlement
// =====================================================================

// Linework's Settlements page: totals on top, then the studio's share per artist for a month or year.
extra.get("/settlements", async (c) => {
  // Old links used ?month=2026-10 or ?year=2026.
  const qYear = /^\d{4}$/.test(c.req.query("year") ?? "") ? c.req.query("year")! : null;
  const qMonth = /^\d{4}-\d{2}$/.test(c.req.query("month") ?? "") ? c.req.query("month")! : null;
  const unit: PeriodUnit = c.req.query("unit") === "year" || qYear ? "year" : "month";
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : qYear ? `${qYear}-01-01` : qMonth ? `${qMonth}-01` : `${today().slice(0, 7)}-01`;
  const { from, to } = periodRange(unit, date);
  const rentMonths = unit === "year" ? 12 : 1;
  const onlyActive = c.req.query("all") !== "1";

  const [staff, payments] = await Promise.all([
    c.env.DB.prepare("SELECT id, name, color, studio_share_pct, monthly_rent_ore FROM staff ORDER BY id").all<{ id: number; name: string; color: string; studio_share_pct: number; monthly_rent_ore: number }>(),
    c.env.DB.prepare(
      "SELECT id, staff_id, kind, method, amount_ore, business_date, note FROM payments WHERE business_date BETWEEN ? AND ? AND kind != 'gift_card_sale' ORDER BY business_date, id",
    )
      .bind(from, to)
      .all<{ id: number; staff_id: number | null; kind: string; method: string; amount_ore: number; business_date: string; note: string | null }>(),
  ]);
  const user = c.get("user");
  const showRent = user.features?.rent !== false;
  // Artists see only their own settlement; the owner sees everyone.
  const visible = staff.results.filter((s) => isOwner(c) || s.id === user.staffId);
  const lines = visible
    .map((s) => {
      const own = payments.results.filter((p) => p.staff_id === s.id);
      const gross = own.reduce((sum, p) => sum + p.amount_ore, 0);
      const studio = Math.round((gross * s.studio_share_pct) / 100) || 0;
      const rent = showRent ? s.monthly_rent_ore * rentMonths : 0;
      return { ...s, own, gross, studio, rent, artist: gross - studio - rent };
    })
    .filter((l) => l.own.length > 0 || l.rent > 0 || (!onlyActive && isOwner(c)));
  const sum = (k: "gross" | "studio" | "rent" | "artist") => lines.reduce((t, l) => t + l[k], 0);
  const href = (u: PeriodUnit, d: string) => `/admin/settlements?unit=${u}&date=${d}${onlyActive ? "" : "&all=1"}`;

  return c.html(
    <Layout title="Oppgjør" path="/admin/settlements" user={user}>
      <PageHead title="Oppgjør" sub={`Studioandel${showRent ? " og stolleie" : ""} per artist. Andel og leie settes på hver artist.`}>
        <button class="secondary noprint" onclick="window.print()">
          Skriv ut / PDF
        </button>
      </PageHead>
      <div class="grid" style="margin-bottom:1.5rem">
        {showRent && (
          <div class="card" style="margin:0">
            <div class="muted">Stolleie i perioden</div>
            <div class="big">{formatOre(sum("rent"))}</div>
            <div class="muted">{lines.filter((l) => l.rent > 0).length} artister betaler fast leie</div>
          </div>
        )}
        <div class="card" style="margin:0">
          <div class="muted">Omsetning på artistene</div>
          <div class="big">{formatOre(sum("gross"))}</div>
          <div class="muted">Gavekortsalg telles først når kortet brukes</div>
        </div>
      </div>
      <h2 style="font-size:1.15rem;margin-top:0">Studioandel</h2>
      <div class="toolbar">
        <PeriodNav unit={unit} date={date} units={["month", "year"]} href={href} />
        <label class="check noprint" style="margin:0 0 1rem">
          <input type="checkbox" checked={onlyActive} onchange={`location=${JSON.stringify(href(unit, date).replace("&all=1", ""))}+(this.checked?'':'&all=1')`} />
          Vis bare artister med omsetning eller leie
        </label>
      </div>
      <div class="toolbar">
        <div class="stat">
          <Icon name="percent" />
          <div>
            <strong>{formatOre(sum("studio"))}</strong>
            <span>Studioandel totalt</span>
          </div>
        </div>
        <div class="stat">
          <Icon name="artists" />
          <div>
            <strong>{formatOre(sum("artist"))}</strong>
            <span>Til artistene</span>
          </div>
        </div>
      </div>
      {lines.length === 0 ? (
        <div class="card muted" style="text-align:center;background:var(--soft);border:0">Ingen omsetning er registrert i denne perioden</div>
      ) : (
        <div class="list">
          <table>
            <thead>
              <tr>
                <th>Artist</th>
                <th class="num">Antall</th>
                <th class="num">Omsetning</th>
                <th class="num">Studioandel</th>
                {showRent && <th class="num">Stolleie</th>}
                <th class="num">Til artist</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr>
                  <td>
                    <span class="dot" style={`background:${l.color}`} />
                    {l.name} <span class="muted">({l.studio_share_pct} %)</span>
                  </td>
                  <td class="num">{l.own.length}</td>
                  <td class="num">{formatOre(l.gross)}</td>
                  <td class="num">{formatOre(l.studio)}</td>
                  {showRent && <td class="num">{formatOre(l.rent)}</td>}
                  <td class="num">{formatOre(l.artist)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {lines
        .filter((l) => l.own.length)
        .map((l) => (
          <details class="card" style="margin-top:1rem">
            <summary>
              <strong>{l.name}</strong> <span class="muted">· {l.own.length} betalinger</span>
            </summary>
            <table>
              <tbody>
                {l.own.map((p) => (
                  <tr>
                    <td>{p.business_date}</td>
                    <td>{KIND_LABELS[p.kind]}</td>
                    <td>{METHOD_LABELS[p.method]}</td>
                    <td class="muted">{p.note}</td>
                    <td class="num">{formatOre(p.amount_ore)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        ))}
    </Layout>,
  );
});
