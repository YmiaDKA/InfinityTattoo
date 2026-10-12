import type { Context } from "hono";
import type { Child } from "hono/jsx";

import { stripeEnabled } from "../lib/bookings";
import { formatOrgNumber, loadCompany, saveCompany } from "../lib/company";
import { CONFIRMATIONS, HEALTH_QUESTIONS } from "../lib/consent";
import { ALWAYS_ON, FEATURES, type FeatureKey } from "../lib/features";
import { formatOre } from "../lib/report";
import { businessDate, localTime } from "../lib/time";
import { zettleEnabled } from "../lib/zettle";
import { Icon, Layout, STUDIO_ADDRESS, STUDIO_NAME } from "../views/layout";
import { SettingsTitle } from "../views/ui";
import { AccountingSettingsSection } from "./admin-accounting";
import { adminApp, audit, str, today, type AdminEnv } from "./admin-shared";

/**
 * Innstillinger with a menu on the left, in the same order as Linework's settings. Only what the
 * studio needs; Linework's Theme, Skins, Flash, Client support and Subscription have no
 * counterpart (there is no subscription to manage).
 */
export const settings = adminApp();

const MENU = [
  { href: "/admin/settings", label: "Studio", icon: "home" },
  { href: "/admin/settings/payments", label: "Betalingsmåter", icon: "card" },
  { href: "/admin/settings/services", label: "Behandlinger", icon: "booking" },
  { href: "/admin/settings/booking", label: "Nettbooking", icon: "calendar" },
  { href: "/admin/settings/forms", label: "Skjema", icon: "forms" },
  { href: "/admin/settings/instructions", label: "Instruksjoner", icon: "info" },
  { href: "/admin/settings/register", label: "Kassesystem", icon: "register" },
  { href: "/admin/settings/company", label: "Firmaopplysninger", icon: "home" },
  { href: "/admin/settings/accounting", label: "Regnskap", icon: "ledger", owner: true },
  { href: "/admin/settings/integrations", label: "Integrasjoner", icon: "plug" },
  { href: "/admin/settings/time-off", label: "Fravær og stengt", icon: "away" },
  { href: "/admin/settings/features", label: "Funksjoner", icon: "toggles" },
];

const KINDS: Record<string, string> = { consultation: "Konsultasjon", tattoo: "Tatovering", piercing: "Piercing", tooth_gem: "Tooth gem", other: "Annet" };

const isOwner = (c: Context<AdminEnv>) => c.get("user").role === "owner";

export function SettingsPage(props: { c: Context<AdminEnv>; active: string; title?: string; children: Child }) {
  const { c } = props;
  return (
    <Layout title={props.title ?? "Innstillinger"} path="/admin/settings" user={c.get("user")} flash={c.req.query("ok")} error={c.req.query("error")}>
      <div class="settings">
        <nav class="settings-nav">
          <h1>Innstillinger</h1>
          {MENU.filter((m) => !m.owner || isOwner(c)).map((m) => (
            <a href={m.href} aria-current={m.href === props.active ? "page" : undefined}>
              <Icon name={m.icon} size={18} />
              {m.label}
            </a>
          ))}
        </nav>
        <div class="settings-body">{props.children}</div>
      </div>
    </Layout>
  );
}

const On = ({ on, yes = "På", no = "Ikke satt opp" }: { on: boolean; yes?: string; no?: string }) =>
  on ? <span class="pill confirmed">{yes}</span> : <span class="pill">{no}</span>;

type ServiceRow = {
  id: number;
  name_no: string;
  kind: string;
  duration_min: number;
  price_ore: number | null;
  deposit_ore: number;
  requires_approval: number;
  public: number;
  active: number;
  needs_consent: number;
  vat_pct: number;
  aftercare_no: string | null;
  aftercare_en: string | null;
};

const services = async (c: Context<AdminEnv>) =>
  (await c.env.DB.prepare("SELECT * FROM services ORDER BY active DESC, sort, id").all<ServiceRow>()).results;

// ---------- Studio ----------

settings.get("/settings", async (c) => {
  const company = await loadCompany(c.env);
  return c.html(
    <SettingsPage c={c} active="/admin/settings">
      <SettingsTitle icon="home" title="Studio" sub="Studioet slik det vises i menyen, på e-poster og på nettsiden." />
      <div class="card">
        <div class="toolbar" style="margin:0">
          <span class="studio-avatar" style="width:3.5rem;height:3.5rem;flex-basis:3.5rem;font-size:1.1rem">IT</span>
          <div style="flex:1">
            <div class="muted">Studionavn</div>
            <strong style="font-size:1.3rem">{STUDIO_NAME}</strong>
          </div>
        </div>
      </div>
      <h2>Studioadresse</h2>
      <div class="card toolbar" style="margin-bottom:1rem">
        <div style="flex:1">
          <strong>{STUDIO_NAME}</strong>
          <div class="muted">{[STUDIO_ADDRESS, "Lørenskog"].join(", ")}</div>
        </div>
      </div>
      <h2>SMS-avsender</h2>
      <div class="card toolbar">
        <div style="flex:1">
          <strong>{c.env.SMS_FROM || "Infinity"}</strong>
          <div class="muted">Navnet kundene ser på påminnelsene.</div>
        </div>
        <On on={Boolean(c.env.ELKS_API_USER && c.env.ELKS_API_PASSWORD)} />
      </div>
      <h2>Ansatte</h2>
      <p>
        <a href="/admin/artists">Artister</a> og <a href="/admin/managers">ledere</a> har egne sider i menyen. Firmanavn og org.nr. ({company.name}
        {company.orgNumber && `, ${formatOrgNumber(company.orgNumber) || company.orgNumber}`}) står under <a href="/admin/settings/company">Firmaopplysninger</a>.
      </p>
      <p>
        <a class="button secondary" href="/admin/setup/show">
          Vis «Kom i gang»-listen
        </a>
      </p>
    </SettingsPage>,
  );
});

// ---------- Betalingsmåter ----------

settings.get("/settings/payments", (c) => {
  const zettle = zettleEnabled(c.env);
  const stripe = stripeEnabled(c.env);
  return c.html(
    <SettingsPage c={c} active="/admin/settings/payments">
      <SettingsTitle icon="card" title="Betalingsmåter" sub="Hvordan kundene betaler, i studio og på nett." />
      <div class="card toolbar">
        <div style="flex:1">
          <strong>I studio: Zettle</strong>
          <div class="muted">Kort, Vipps og kontant i Zettle-appen (Tap to Pay på iPhone). Salgene kommer inn under Salg av seg selv.</div>
        </div>
        <On on={zettle} yes="Koblet til" />
      </div>
      <div class="card toolbar">
        <div style="flex:1">
          <strong>På nett: depositum og gavekort</strong>
          <div class="muted">Kunden betaler med kort fra lenken i e-posten, eller kjøper gavekort på nettsiden.</div>
        </div>
        <On on={stripe} yes="Koblet til" />
      </div>
      <div class="card toolbar">
        <div style="flex:1">
          <strong>Gavekort som betaling</strong>
          <div class="muted">Skriv inn koden når du registrerer betalingen, så trekkes saldoen.</div>
        </div>
        <On on={c.get("user").features?.gift_cards !== false} yes="På" no="Av" />
      </div>
      <p class="muted">Koblingene settes opp én gang med nøkler fra Zettle og Stripe (se studio/README.md).</p>
    </SettingsPage>,
  );
});

// ---------- Behandlinger ----------

settings.get("/settings/services", async (c) => {
  const rows = await services(c);
  const groups = Object.entries(KINDS)
    .map(([kind, label]) => ({ kind, label, items: rows.filter((s) => s.kind === kind) }))
    .filter((g) => g.items.length);
  return c.html(
    <SettingsPage c={c} active="/admin/settings/services">
      <SettingsTitle icon="booking" title="Behandlinger" sub="Behandlingene studioet tilbyr, med tid, pris og depositum." />
      <div class="toolbar" style="justify-content:space-between">
        <strong>{rows.filter((s) => s.active).length} behandlinger</strong>
        {isOwner(c) && (
          <a class="button secondary" href="/admin/settings/services/new">
            + Legg til behandling
          </a>
        )}
      </div>
      {groups.map((g) => (
        <div class="card" style="background:var(--soft);border:0">
          <strong style="font-size:1.05rem">{g.label}</strong>
          {g.items.map((s) => (
            <a class="req toolbar" style="margin:.6rem 0 0" href={`/admin/settings/services/${s.id}`}>
              <span style="flex:1">
                <strong>{s.name_no}</strong>
                {!s.active && <span class="muted"> (inaktiv)</span>}
                <div class="muted">{!s.public ? "Bare internt" : s.requires_approval ? "Forespørsel på nett" : "Direkte booking på nett"}</div>
              </span>
              <span class="pill">{s.duration_min} min</span>
              <span class="pill">{s.price_ore == null ? "Pris etter avtale" : formatOre(s.price_ore)}</span>
              {s.deposit_ore > 0 && <span class="pill">Depositum {formatOre(s.deposit_ore)}</span>}
              <Icon name="right" size={16} />
            </a>
          ))}
        </div>
      ))}
    </SettingsPage>,
  );
});

// ---------- Nettbooking ----------

settings.get("/settings/booking", async (c) => {
  const rows = (await services(c)).filter((s) => s.active);
  const site = "https://infinitytattoo.no/";
  return c.html(
    <SettingsPage c={c} active="/admin/settings/booking">
      <SettingsTitle icon="calendar" title="Nettbooking" sub="Hva kundene kan bestille selv på nettsiden." />
      <div class="card toolbar">
        <div style="flex:1">
          <strong>Bookingside</strong>
          <div class="muted">Bookingskjemaet ligger på nettsiden.</div>
        </div>
        <a class="button secondary small" href={site} target="_blank" rel="noopener">
          Åpne
        </a>
      </div>
      <h2>Tattoo-forespørsler</h2>
      <p class="muted">Kunden beskriver ideen, plassering og størrelse og kan legge ved bilder. Du setter tid, pris og depositum og bekrefter.</p>
      <h2>Direkte booking</h2>
      <p class="muted">Kunden velger en ledig tid selv. Med depositum holdes tiden i 30 minutter til det er betalt.</p>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>Behandling</th>
              <th>På nettsiden</th>
              <th class="num">Depositum</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr>
                <td>
                  <a href={`/admin/settings/services/${s.id}`}>{s.name_no}</a>
                </td>
                <td>{!s.public ? "Vises ikke" : s.requires_approval ? "Forespørsel" : "Direkte booking"}</td>
                <td class="num">{formatOre(s.deposit_ore)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p class="muted">Depositum er 500 kr som standard (opptil 1000 kr), trekkes fra prisen, refunderes ikke, og flyttes med ved ombooking minst 48 timer før.</p>
    </SettingsPage>,
  );
});

// ---------- Skjema ----------

settings.get("/settings/forms", async (c) => {
  const rows = (await services(c)).filter((s) => s.active);
  return c.html(
    <SettingsPage c={c} active="/admin/settings/forms">
      <SettingsTitle icon="forms" title="Skjema" sub="Egenerklæringen kunden signerer på telefonen før timen. Sendes med bekreftelsen og påminnelsen." />
      <div class="card">
        <strong>Egenerklæring og samtykke</strong>
        <div class="muted" style="margin-bottom:.75rem">Norsk og engelsk. Krever 18 år eller mer, og viser helsesvarene på avtalen.</div>
        <div class="sectionhead">Personopplysninger</div>
        <p style="margin:0">Fullt navn, fødselsdato, eventuelt foresatt, samtykke til bilder.</p>
        <div class="sectionhead">Helsespørsmål</div>
        <ol style="margin:0;padding-left:1.2rem">
          {HEALTH_QUESTIONS.map((q) => (
            <li>{q.no}</li>
          ))}
        </ol>
        <div class="sectionhead">Bekreftelser</div>
        <ul style="margin:0;padding-left:1.2rem">
          {CONFIRMATIONS.map((q) => (
            <li>{q.no}</li>
          ))}
        </ul>
        <div class="sectionhead">Signatur</div>
        <p style="margin:0">Kunden skriver navnet sitt som signatur. Tid og IP lagres.</p>
      </div>
      <h2>Brukes på</h2>
      <p>
        {rows
          .filter((s) => s.needs_consent)
          .map((s) => s.name_no)
          .join(", ") || "Ingen behandlinger"}
        . Slås av eller på per behandling.
      </p>
    </SettingsPage>,
  );
});

// ---------- Instruksjoner ----------

settings.get("/settings/instructions", async (c) => {
  const rows = (await services(c)).filter((s) => s.active && s.kind !== "consultation");
  return c.html(
    <SettingsPage c={c} active="/admin/settings/instructions">
      <SettingsTitle icon="info" title="Instruksjoner" sub="Etterbehandling sendes på e-post når timen settes til fullført. Skrives per behandling, på norsk og engelsk." />
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>Behandling</th>
              <th>Etterbehandling</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr>
                <td>{s.name_no}</td>
                <td>{s.aftercare_no ? <span class="muted">{s.aftercare_no.slice(0, 90)}…</span> : <span class="pill requested">Mangler</span>}</td>
                <td class="num">
                  <a href={`/admin/settings/services/${s.id}#etterbehandling`}>Rediger</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SettingsPage>,
  );
});

// ---------- Kassesystem ----------

settings.get("/settings/register", (c) =>
  c.html(
    <SettingsPage c={c} active="/admin/settings/register">
      <SettingsTitle icon="register" title="Kassesystem" sub="Betaling i studio skal gå gjennom et godkjent kassesystem. Det er Zettle." />
      <div class="card toolbar">
        <div style="flex:1">
          <strong>Zettle</strong>
          <div class="muted">Kassen lager kvitteringer og den lovpålagte dagsrapporten (Z-rapport) når dagen lukkes i Zettle.</div>
        </div>
        <On on={zettleEnabled(c.env)} yes="Koblet til" />
      </div>
      <p class="muted">
        Studio-systemet tar ikke betalt selv. Det henter salgene fra Zettle, fordeler dem på artistene og lager dagsoppgjøret for studioet og filene til regnskapet.
      </p>
    </SettingsPage>,
  ),
);

// ---------- Firmaopplysninger ----------

settings.get("/settings/company", async (c) => {
  const co = await loadCompany(c.env);
  const owner = isOwner(c);
  const field = (name: keyof typeof co, label: string, extra: Record<string, string> = {}) => (
    <label>
      {label}
      <input name={name} value={co[name]} disabled={!owner} {...extra} />
    </label>
  );
  return c.html(
    <SettingsPage c={c} active="/admin/settings/company">
      <SettingsTitle icon="home" title="Firmaopplysninger" sub="Brukes på personallisten, regnskapsfilene og fakturaer." />
      <form method="post" action="/admin/settings/company" class="card">
        <div class="row">
          {field("name", "Firmanavn", { required: "" })}
          {field("orgNumber", "Organisasjonsnummer", { inputmode: "numeric", placeholder: "123 456 789" })}
        </div>
        <div class="row">
          {field("address", "Adresse")}
          {field("postcode", "Postnummer", { inputmode: "numeric" })}
          {field("city", "Sted")}
        </div>
        <div class="row">
          {field("email", "E-post", { type: "email" })}
          {field("phone", "Telefon", { type: "tel" })}
          {field("bankAccount", "Kontonummer", { inputmode: "numeric", placeholder: "1234 56 78901" })}
        </div>
        {owner && <button>Lagre</button>}
      </form>
    </SettingsPage>,
  );
});

settings.post("/settings/company", async (c) => {
  if (!isOwner(c)) return c.text("Ingen tilgang", 403);
  const body = await c.req.parseBody();
  const org = str(body, "orgNumber");
  if (org && !formatOrgNumber(org)) return c.redirect("/admin/settings/company?error=Organisasjonsnummeret+må+ha+9+siffer");
  await saveCompany(c.env, {
    name: str(body, "name") || "Infinity Tattoo",
    orgNumber: formatOrgNumber(org),
    address: str(body, "address"),
    postcode: str(body, "postcode"),
    city: str(body, "city"),
    email: str(body, "email"),
    phone: str(body, "phone"),
    bankAccount: str(body, "bankAccount"),
  });
  await audit(c.env, c.get("user"), "update", "company", null);
  return c.redirect("/admin/settings/company?ok=Lagret");
});

// ---------- Regnskap ----------

settings.get("/settings/accounting", (c) => {
  if (!isOwner(c)) return c.redirect("/admin/settings");
  return c.html(
    <SettingsPage c={c} active="/admin/settings/accounting">
      <SettingsTitle icon="ledger" title="Regnskap" sub="Regnskapsprogram, mva og kontonumre til månedsfilen for regnskapsføreren." />
      <AccountingSettingsSection c={c} />
    </SettingsPage>,
  );
});

// ---------- Integrasjoner ----------

settings.get("/settings/integrations", (c) => {
  const rows: [string, string, boolean][] = [
    ["Zettle", "Henter salg fra kassen", zettleEnabled(c.env)],
    ["Stripe", "Depositum og gavekort på nett", stripeEnabled(c.env)],
    ["E-post (Resend)", "Bekreftelser, påminnelser, skjema og etterbehandling", Boolean(c.env.RESEND_API_KEY && c.env.EMAIL_FROM)],
    ["SMS (46elks)", "Påminnelse dagen før", Boolean(c.env.ELKS_API_USER && c.env.ELKS_API_PASSWORD)],
    ["Referansebilder", "Bilder kunden legger ved forespørselen", Boolean(c.env.PHOTOS)],
    ["Varsel om nye forespørsler", "E-post til studioet", Boolean(c.env.NOTIFY && c.env.NOTIFY_TO)],
    ["Spamsjekk (Turnstile)", "Stopper roboter på bookingskjemaet", Boolean(c.env.TURNSTILE_SECRET)],
  ];
  return c.html(
    <SettingsPage c={c} active="/admin/settings/integrations">
      <SettingsTitle icon="plug" title="Integrasjoner" sub="Tjenestene systemet er koblet til." />
      {rows.map(([name, what, on]) => (
        <div class="card toolbar" style="margin-bottom:.6rem">
          <div style="flex:1">
            <strong>{name}</strong>
            <div class="muted">{what}</div>
          </div>
          <On on={on} />
        </div>
      ))}
      <p class="muted">Oppsett er beskrevet i studio/README.md.</p>
    </SettingsPage>,
  );
});

// ---------- Fravær og stengt ----------

settings.get("/settings/time-off", async (c) => {
  const [staff, timeOff] = await Promise.all([
    c.env.DB.prepare("SELECT id, name FROM staff WHERE active = 1 ORDER BY id").all<{ id: number; name: string }>(),
    c.env.DB.prepare("SELECT t.*, s.name AS staff_name FROM time_off t LEFT JOIN staff s ON s.id = t.staff_id WHERE t.ends_at > ? ORDER BY t.starts_at")
      .bind(new Date().toISOString())
      .all<{ id: number; staff_name: string | null; starts_at: string; ends_at: string; reason: string | null }>(),
  ]);
  return c.html(
    <SettingsPage c={c} active="/admin/settings/time-off">
      <SettingsTitle icon="away" title="Fravær og stengt" sub="Ferie, guest spots og dager studioet er stengt. Tidene blir grå i kalenderen og kan ikke bookes." />
      <div class="card">
        {timeOff.results.length ? (
          <table>
            <tbody>
              {timeOff.results.map((t) => (
                <tr>
                  <td>{t.staff_name ?? "Hele studioet"}</td>
                  <td>
                    {businessDate(t.starts_at)} {localTime(t.starts_at)} – {businessDate(t.ends_at)} {localTime(t.ends_at)}
                  </td>
                  <td class="muted">{t.reason}</td>
                  <td>
                    <form method="post" action={`/admin/settings/time-off/${t.id}/delete`}>
                      <button class="secondary small">Fjern</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p class="muted" style="margin-top:0">Ingen planlagt fravær.</p>
        )}
      </div>
      <h2>Legg til</h2>
      <form method="post" action="/admin/settings/time-off" class="card">
        <div class="row">
          <label>
            Hvem
            <select name="staff_id">
              <option value="">Hele studioet</option>
              {staff.results.map((s) => (
                <option value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            Grunn
            <input name="reason" placeholder="Ferie, guest spot, syk…" />
          </label>
        </div>
        <div class="row">
          <label>
            Fra dato
            <input name="from_date" type="date" required value={today()} />
          </label>
          <label>
            Fra kl.
            <input name="from_time" type="time" value="00:00" />
          </label>
          <label>
            Til dato
            <input name="to_date" type="date" required value={today()} />
          </label>
          <label>
            Til kl.
            <input name="to_time" type="time" value="23:59" />
          </label>
        </div>
        <button>Legg til fravær</button>
      </form>
    </SettingsPage>,
  );
});

// ---------- Funksjoner ----------

settings.get("/settings/features", (c) => {
  const features = c.get("user").features!;
  return c.html(
    <SettingsPage c={c} active="/admin/settings/features">
      <SettingsTitle
        icon="toggles"
        title="Funksjoner"
        sub="Slå av det studioet ikke bruker. Det skjules fra menyen og skjemaene, men ingenting slettes, og du kan slå det på igjen."
      />
      <form method="post" action="/admin/settings/features" class="card">
        {(Object.keys(FEATURES) as FeatureKey[]).map((key) => (
          <label class="check">
            <input type="checkbox" name={`f_${key}`} value="1" checked={features[key]} disabled={!isOwner(c)} />
            <span>
              {FEATURES[key].label} <span class="muted">– {FEATURES[key].note}</span>
            </span>
          </label>
        ))}
        <p class="muted" style="margin-bottom:.3rem">Alltid på:</p>
        <ul class="muted" style="margin-top:0">
          {ALWAYS_ON.map(([label, why]) => (
            <li>
              {label} – {why}
            </li>
          ))}
        </ul>
        {isOwner(c) && <button>Lagre funksjoner</button>}
      </form>
    </SettingsPage>,
  );
});
