import type { Context } from "hono";

import { CONFIRMATIONS, DEFAULT_FORM, HEALTH_QUESTIONS, ID_TYPES, parseFormConfig, type ExtraItem, type FormConfig } from "../lib/consent";
import { MAX_INSTRUCTIONS, TEMPLATES, TIMING_LABELS, type Instruction } from "../lib/instructions";
import { formatOre } from "../lib/report";
import { saveSettings } from "../lib/settings";
import { DEFAULT_GIFT_TERMS, giftCardTerms, loadBookingSettings, loadGiftCardSettings, loadSupport, SIZE_OPTIONS, VALIDITY_OPTIONS } from "../lib/site-settings";
import { stripeEnabled } from "../lib/bookings";
import { Layout } from "../views/layout";
import { PageHead, SegTabs, SettingsTitle } from "../views/ui";
import { SettingsPage } from "./admin-settings";
import { adminApp, audit, str, type AdminEnv } from "./admin-shared";

/**
 * Settings for what clients see: Nettbooking, Skjema, Instruksjoner, Kundeservice and the gift card
 * store. Laid out after Linework's pages; the parts the trial couldn't show are marked PLACEHOLDER-RESCAN.
 */
export const clientSettings = adminApp();

const isManager = (c: Context<AdminEnv>) => ["owner", "reception"].includes(c.get("user").role);
const KINDS: Record<string, string> = { consultation: "Konsultasjon", tattoo: "Tatovering", piercing: "Piercing", tooth_gem: "Tooth gem", other: "Annet" };
const all = (body: Record<string, unknown>, key: string) => {
  const v = body[key];
  return (Array.isArray(v) ? v : v == null ? [] : [v]).filter((x): x is string => typeof x === "string");
};

const Radio = (p: { name: string; value: string; checked: boolean; label: string; hint?: string }) => (
  <label class="check">
    <input type="radio" name={p.name} value={p.value} checked={p.checked} />
    <span>
      {p.label}
      {p.hint && <span class="muted"> · {p.hint}</span>}
    </span>
  </label>
);

const copyButton = (text: string) => (
  <button type="button" class="secondary small" onclick={`navigator.clipboard.writeText(${JSON.stringify(text)});this.textContent='Kopiert'`}>
    Kopier lenke
  </button>
);

// ---------- Nettbooking ----------

clientSettings.get("/settings/booking", async (c) => {
  const tab = ["direct", "page"].includes(c.req.query("tab") ?? "") ? c.req.query("tab")! : "requests";
  const [s, services] = await Promise.all([
    loadBookingSettings(c.env),
    c.env.DB.prepare("SELECT id, name_no, requires_approval, public, deposit_ore FROM services WHERE active = 1 ORDER BY sort, id").all<{ id: number; name_no: string; requires_approval: number; public: number; deposit_ore: number }>(),
  ]);
  const site = c.env.SITE_URL.replace(/\/$/, "");
  const tabHref = (t: string) => `/admin/settings/booking${t === "requests" ? "" : `?tab=${t}`}`;
  return c.html(
    <SettingsPage c={c} active="/admin/settings/booking" title="Nettbooking">
      <SettingsTitle icon="calendar" title="Nettbooking" sub="Tattoo-forespørsler, direkte booking og bookingsiden på nettsiden." />
      <div class="card toolbar">
        <div style="flex:1">
          <div class="muted">Lenke til bookingsiden</div>
          <strong>{site}</strong>
        </div>
        <a class="button secondary small" href={site} target="_blank" rel="noopener">
          Åpne
        </a>
        {copyButton(site)}
      </div>
      <p>
        <SegTabs
          tabs={[
            { href: tabHref("requests"), label: "Tattoo-forespørsler" },
            { href: tabHref("direct"), label: "Direkte booking" },
            { href: tabHref("page"), label: "Bookingside" },
          ]}
          active={tabHref(tab)}
        />
      </p>
      {tab === "requests" && (
        <form method="post" action="/admin/settings/booking" class="card">
          <input type="hidden" name="tab" value="requests" />
          <div class="sectionhead" style="margin-top:0">Ta imot tattoo-forespørsler</div>
          <label class="check">
            <input type="checkbox" name="open_requests" value="1" checked={s.openRequests} />
            <span>
              Åpne forespørsler <span class="muted">· kunden trenger ikke velge artist, og dere fordeler forespørselen</span>
            </span>
          </label>
          {/* PLACEHOLDER-RESCAN: Linework's link/text fields for booking terms weren't captured. */}
          <div class="sectionhead">Bookingvilkår</div>
          <Radio name="terms_mode" value="none" checked={s.terms.mode === "none"} label="Ingen egne vilkår" />
          <Radio name="terms_mode" value="link" checked={s.terms.mode === "link"} label="Lenke til vilkår på nettsiden" />
          <Radio name="terms_mode" value="text" checked={s.terms.mode === "text"} label="Skriv vilkårene her" />
          <div class="row">
            <label>
              Lenke
              <input name="terms_url" type="url" value={s.terms.url} placeholder="https://infinitytattoo.no/vilkar" />
            </label>
          </div>
          <label>
            Vilkår
            <textarea name="terms_text" rows={3} maxlength={3000}>
              {s.terms.text}
            </textarea>
          </label>

          <div class="sectionhead">Skjemaet for forespørsler</div>
          <p class="muted" style="margin-top:0">Hva kunden kan velge i tillegg til å skrive mål selv.</p>
          <strong>Størrelser</strong>
          <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:.1rem .75rem;margin:.4rem 0 1rem">
            {SIZE_OPTIONS.map(([key, label, hint]) => (
              <label class="check" style="margin:0">
                <input type="checkbox" name="sizes" value={key} checked={s.sizes.includes(key)} />
                <span>
                  {label} <span class="muted">· {hint}</span>
                </span>
              </label>
            ))}
          </div>
          <strong>Farger</strong>
          <Radio name="colors" value="both" checked={s.colors === "both"} label="Begge" />
          <Radio name="colors" value="color" checked={s.colors === "color"} label="Bare farger" />
          <Radio name="colors" value="black_grey" checked={s.colors === "black_grey"} label="Bare svart og grå" />
          <strong>Hudtone</strong>
          <Radio name="skin_tone" value="0" checked={!s.skinTone} label="Ikke spør" />
          <Radio name="skin_tone" value="1" checked={s.skinTone} label="Spør om hudtone" hint="lys, oliven, brun eller mørk, alltid valgfritt" />
          <strong>Budsjett</strong>
          <Radio name="budget" value="0" checked={!s.budget} label="Ikke spør" />
          <Radio name="budget" value="1" checked={s.budget} label="Spør om budsjett" />
          <strong>Referansebilder</strong>
          <Radio name="references" value="optional" checked={s.references === "optional"} label="Valgfritt" />
          <Radio name="references" value="required" checked={s.references === "required"} label="Påkrevd" />
          <Radio name="references" value="off" checked={s.references === "off"} label="Ikke spør" />

          <div class="sectionhead">Spørsmål som alltid er med</div>
          <ul class="muted" style="margin-top:0;padding-left:1.2rem">
            <li>Er det en cover-up? Hvis ja, laster kunden opp bilde av tatoveringen som skal dekkes.</li>
            <li>Hvor på kroppen tatoveringen skal være.</li>
            <li>Beskrivelse av ideen.</li>
            <li>Når kunden kan, og annet dere bør vite.</li>
          </ul>
          <button>Lagre</button>
        </form>
      )}
      {tab === "direct" && (
        <>
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
                {services.results.map((sv) => (
                  <tr>
                    <td>
                      <a href={`/admin/settings/services/${sv.id}`}>{sv.name_no}</a>
                    </td>
                    <td>{!sv.public ? "Vises ikke" : sv.requires_approval ? "Forespørsel" : "Direkte booking"}</td>
                    <td class="num">{formatOre(sv.deposit_ore)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p class="muted">Depositum er 500 kr som standard (opptil 1000 kr), trekkes fra prisen, refunderes ikke, og flyttes med ved ombooking minst 48 timer før.</p>
        </>
      )}
      {tab === "page" && (
        <form method="post" action="/admin/settings/booking" class="card">
          <input type="hidden" name="tab" value="page" />
          <div class="sectionhead" style="margin-top:0">Annonsesporing</div>
          <p class="muted" style="margin-top:0">Legg til en Meta-piksel for å måle hvordan annonsene fungerer. Gjelder bare bookingsiden.</p>
          <div class="row">
            <label>
              Meta-piksel-ID
              <input name="pixel_id" inputmode="numeric" maxlength={20} value={s.pixel.id} placeholder="123456789012345" />
            </label>
            <label>
              Lenke til personvernerklæringen
              <input name="pixel_privacy" type="url" value={s.pixel.privacyUrl} placeholder="https://" />
            </label>
          </div>
          <p class="muted">
            Meta leser navn, e-post og telefon fra bookingskjemaet og hasher dem («automatic advanced matching»). Slå det av i Meta Events Manager under Data sources hvis dere ikke vil det.
          </p>
          <label class="check">
            <input type="checkbox" name="pixel_ok" value="1" checked={Boolean(s.pixel.id)} />
            <span>Jeg er ansvarlig for denne sporingen, og personvernerklæringen forklarer den for kundene.</span>
          </label>
          <button>Lagre</button>
        </form>
      )}
    </SettingsPage>,
  );
});

clientSettings.post("/settings/booking", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settings/booking?error=Ingen+tilgang");
  const body = await c.req.parseBody({ all: true });
  if (str(body, "tab") === "page") {
    const id = str(body, "pixel_id").replace(/\D/g, "");
    const privacy = str(body, "pixel_privacy");
    if (id && (str(body, "pixel_ok") !== "1" || !/^https:\/\//.test(privacy))) {
      return c.redirect("/admin/settings/booking?tab=page&error=Pikselen+krever+lenke+til+personvernerklæringen+og+avkrysning");
    }
    await saveSettings(c.env, "booking.", { pixel_id: id, pixel_privacy: id ? privacy : "" });
    return c.redirect("/admin/settings/booking?tab=page&ok=Lagret");
  }
  const mode = str(body, "terms_mode");
  const url = str(body, "terms_url");
  if (mode === "link" && !/^https:\/\//.test(url)) return c.redirect("/admin/settings/booking?error=Vilkårslenken+må+starte+med+https://");
  const sizes = all(body, "sizes").filter((k) => SIZE_OPTIONS.some(([key]) => key === k));
  await saveSettings(c.env, "booking.", {
    open_requests: str(body, "open_requests") === "1" ? "" : "0",
    terms_mode: ["link", "text"].includes(mode) ? mode : "",
    terms_url: url,
    terms_text: str(body, "terms_text").slice(0, 3000),
    sizes: sizes.length === SIZE_OPTIONS.length ? "" : sizes.join(",") || "none",
    colors: ["color", "black_grey"].includes(str(body, "colors")) ? str(body, "colors") : "",
    skin_tone: str(body, "skin_tone") === "1" ? "1" : "",
    budget: str(body, "budget") === "1" ? "1" : "",
    references: ["required", "off"].includes(str(body, "references")) ? str(body, "references") : "",
  });
  await audit(c.env, c.get("user"), "update", "settings", null, { area: "booking" });
  return c.redirect("/admin/settings/booking?ok=Lagret");
});

// ---------- Skjema ----------

async function loadForm(c: Context<AdminEnv>) {
  return parseFormConfig((await c.env.DB.prepare("SELECT value FROM settings WHERE key = 'forms.config'").first<{ value: string }>())?.value);
}

const ExtraRows = (p: { name: string; items: ExtraItem[]; placeholder: string }) => (
  <>
    {[...p.items, { key: "", no: "", en: "" }].map((q, i) => (
      <div class="row" style="margin-bottom:.4rem">
        <input type="hidden" name={`${p.name}_key`} value={q.key || `${p.name[0]}${Date.now().toString(36)}${i}`} />
        <label>
          {i === p.items.length ? "Nytt (norsk)" : "Norsk"}
          <input name={`${p.name}_no`} value={q.no} maxlength={300} placeholder={i === p.items.length ? p.placeholder : ""} />
        </label>
        <label>
          Engelsk
          <input name={`${p.name}_en`} value={q.en} maxlength={300} />
        </label>
      </div>
    ))}
    <p class="muted" style="font-size:.85rem;margin-top:0">Tøm feltene for å fjerne en linje.</p>
  </>
);

clientSettings.get("/settings/forms", async (c) => {
  const [f, services] = await Promise.all([loadForm(c), c.env.DB.prepare("SELECT name_no FROM services WHERE active = 1 AND needs_consent = 1 ORDER BY sort, id").all<{ name_no: string }>()]);
  const Section = (p: { name: keyof FormConfig; title: string; sub: string }) => (
    <label class="check" style="margin-top:1rem">
      <input type="checkbox" name={p.name} value="1" checked={Boolean(f[p.name])} />
      <span>
        <strong>{p.title}</strong>
        <span class="muted" style="display:block">{p.sub}</span>
      </span>
    </label>
  );
  return c.html(
    <SettingsPage c={c} active="/admin/settings/forms" title="Skjema">
      <SettingsTitle icon="forms" title="Skjema" sub="Egenerklæringen kunden fyller ut og signerer på telefonen før timen. Norsk og engelsk." />
      <p class="muted">
        Brukes på: {services.results.map((s) => s.name_no).join(", ") || "ingen behandlinger"}. Slås av eller på per behandling. Teksten er en mal, ikke juridisk rådgivning.
      </p>
      <form method="post" action="/admin/settings/forms" class="card">
        <div class="sectionhead" style="margin-top:0">
          Introduksjon
        </div>
        <div class="row">
          <label>
            Norsk
            <textarea name="intro_no" rows={2} maxlength={1000} placeholder="Fyll ut skjemaet før timen. Det tar to minutter.">
              {f.intro_no}
            </textarea>
          </label>
          <label>
            Engelsk
            <textarea name="intro_en" rows={2} maxlength={1000}>
              {f.intro_en}
            </textarea>
          </label>
        </div>
        <div class="sectionhead">Personopplysninger</div>
        <p class="muted" style="margin:0">Fullt navn og fødselsdato er alltid med. Under 18 år: tatovering avvises, andre behandlinger krever foresatt.</p>
        <Section name="identification" title="Legitimasjon" sub="Kunden velger hvilken legitimasjon hen viser i studio som bevis på alder." />
        <div style="display:flex;gap:.25rem 1rem;flex-wrap:wrap;margin-left:1.6rem">
          {ID_TYPES.map(([k, no]) => (
            <label class="check" style="margin:0">
              <input type="checkbox" name="id_types" value={k} checked={f.id_types.includes(k)} />
              {no}
            </label>
          ))}
        </div>
        <Section name="address" title="Hjemmeadresse" sub="Spør alltid om adresse (i fakturamodus spørres det uansett)." />
        <Section name="procedure_info" title="Om behandlingen" sub="Tekst om risiko og forventninger som kunden leser før signering." />
        <div class="row" style="margin-left:1.6rem">
          <label>
            Norsk
            <textarea name="procedure_no" rows={4} maxlength={4000}>
              {f.procedure_no}
            </textarea>
          </label>
          <label>
            Engelsk
            <textarea name="procedure_en" rows={4} maxlength={4000}>
              {f.procedure_en}
            </textarea>
          </label>
        </div>
        <Section name="procedure_description" title="Beskrivelse av behandlingen" sub="Et felt der kunden beskriver hva som skal gjøres." />

        <div class="sectionhead">Helsespørsmål</div>
        <p class="muted" style="margin-top:0">Kryss av for spørsmålene som skal stilles. Spørsmål besvart med «ja» vises som varsel på avtalen.</p>
        {HEALTH_QUESTIONS.map((q) => (
          <label class="check" style="margin:0 0 .25rem">
            <input type="checkbox" name="ask" value={q.key} checked={!f.skip_questions.includes(q.key)} />
            {q.no}
          </label>
        ))}
        <strong style="display:block;margin-top:.75rem">Egne spørsmål (ja/nei)</strong>
        <ExtraRows name="question" items={f.custom_questions} placeholder="Har du tatt Roaccutan det siste halve året?" />

        <div class="sectionhead">Bekreftelser kunden må krysse av</div>
        <ul style="margin-top:0;padding-left:1.2rem">
          {CONFIRMATIONS.map((q) => (
            <li>{q.no}</li>
          ))}
        </ul>
        <strong>Egne bekreftelser</strong>
        <ExtraRows name="consent" items={f.extra_consents} placeholder="Jeg er ikke påvirket av alkohol eller rusmidler." />
        <label class="check">
          <input type="checkbox" name="photo_consent" value="1" checked={f.photo_consent} />
          <span>Spør om studioet kan bruke bilder av resultatet (valgfritt for kunden)</span>
        </label>
        <div class="sectionhead">Signatur</div>
        <p class="muted" style="margin-top:0">Kunden skriver navnet sitt som signatur. Tid og IP lagres. Alltid med.</p>
        <button>Lagre skjemaet</button>
        <a class="button secondary" href="/skjema/forhandsvisning" target="_blank" style="margin-left:.5rem">
          Forhåndsvis
        </a>
      </form>
    </SettingsPage>,
  );
});

function extraItems(body: Record<string, unknown>, name: string): ExtraItem[] {
  const keys = all(body, `${name}_key`);
  const no = all(body, `${name}_no`);
  const en = all(body, `${name}_en`);
  return keys
    .map((key, i) => ({ key: key.replace(/[^a-z0-9]/gi, "").slice(0, 20), no: (no[i] ?? "").trim().slice(0, 300), en: (en[i] ?? "").trim().slice(0, 300) }))
    .filter((q) => q.key && q.no)
    .slice(0, 20);
}

clientSettings.post("/settings/forms", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settings/forms?error=Ingen+tilgang");
  const body = await c.req.parseBody({ all: true });
  const ask = new Set(all(body, "ask"));
  const on = (k: string) => str(body, k) === "1";
  const config: FormConfig = {
    intro_no: str(body, "intro_no").slice(0, 1000),
    intro_en: str(body, "intro_en").slice(0, 1000),
    identification: on("identification"),
    id_types: all(body, "id_types").filter((k) => ID_TYPES.some(([key]) => key === k)),
    address: on("address"),
    procedure_info: on("procedure_info"),
    procedure_no: str(body, "procedure_no").slice(0, 4000) || DEFAULT_FORM.procedure_no,
    procedure_en: str(body, "procedure_en").slice(0, 4000),
    procedure_description: on("procedure_description"),
    skip_questions: HEALTH_QUESTIONS.filter((q) => !ask.has(q.key)).map((q) => q.key),
    custom_questions: extraItems(body, "question"),
    extra_consents: extraItems(body, "consent"),
    photo_consent: on("photo_consent"),
  };
  if (config.identification && !config.id_types.length) return c.redirect("/admin/settings/forms?error=Velg+minst+én+type+legitimasjon");
  await saveSettings(c.env, "forms.", { config: JSON.stringify(config) });
  await audit(c.env, c.get("user"), "update", "settings", null, { area: "forms" });
  return c.redirect("/admin/settings/forms?ok=Skjemaet+er+lagret");
});

// ---------- Instruksjoner ----------

clientSettings.get("/settings/instructions", async (c) => {
  const [rows, services] = await Promise.all([
    c.env.DB.prepare("SELECT * FROM instructions ORDER BY timing DESC, sort, id").all<Instruction>(),
    c.env.DB.prepare("SELECT id, name_no, kind, aftercare_no FROM services WHERE active = 1 AND kind != 'consultation' ORDER BY sort, id").all<{ id: number; name_no: string; kind: string; aftercare_no: string | null }>(),
  ]);
  const list = rows.results;
  const template = TEMPLATES[c.req.query("template") ?? ""];
  const editing = list.find((r) => r.id === Number(c.req.query("edit")));
  const draft = editing ?? (template ? { ...template, id: 0, enabled: 1, sort: 0 } : c.req.query("new") ? { ...TEMPLATES.before_tattoo, name: "", email_subject: "", body_no: "", body_en: "", sms_text: "", kinds: null, timing: c.req.query("new") === "after" ? "after" : "before", id: 0, enabled: 1, sort: 0 } : null);
  const full = list.length >= MAX_INSTRUCTIONS;
  const Group = ({ timing }: { timing: "before" | "after" }) => {
    const items = list.filter((r) => r.timing === timing);
    return (
      <div class="card">
        <div class="toolbar" style="margin:0 0 .5rem">
          <strong style="flex:1">Instruksjoner {timing === "before" ? "før timen" : "etter timen"}</strong>
          {!full && (
            <a class="button secondary small" href={`/admin/settings/instructions?new=${timing}#editor`}>
              Legg til
            </a>
          )}
        </div>
        {items.length === 0 ? (
          <p class="muted" style="margin:0">Ingen instruksjoner lagt til ennå.</p>
        ) : (
          <table>
            <tbody>
              {items.map((r) => (
                <tr class={r.enabled ? "" : "muted"}>
                  <td>
                    <strong>{r.name}</strong>
                    <div class="muted" style="font-size:.85rem">
                      {r.kinds ? r.kinds.split(",").map((k) => KINDS[k] ?? k).join(", ") : "Alle behandlinger"}
                      {r.sms_text ? " · med SMS" : ""}
                    </div>
                  </td>
                  <td class="num">
                    <form method="post" action={`/admin/settings/instructions/${r.id}`} style="display:flex;gap:.3rem;justify-content:flex-end">
                      <button class="secondary small" name="action" value={r.enabled ? "disable" : "enable"}>
                        {r.enabled ? "Slå av" : "Slå på"}
                      </button>
                      <a class="button secondary small" href={`/admin/settings/instructions?edit=${r.id}#editor`}>
                        Rediger
                      </a>
                      <button class="secondary small" name="action" value="delete" onclick="return confirm('Slette instruksjonen?')">
                        Slett
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  return c.html(
    <SettingsPage c={c} active="/admin/settings/instructions" title="Instruksjoner">
      <SettingsTitle icon="info" title="Instruksjoner" sub="Lag instruksjoner som sendes til kundene før eller etter timen." />
      <div class="toolbar">
        <span class="pill">
          {list.length}/{MAX_INSTRUCTIONS} laget
        </span>
        <span class="pill">
          {list.filter((r) => r.enabled).length}/{MAX_INSTRUCTIONS} på
        </span>
      </div>
      <p class="muted" style="font-size:.88rem">
        «Før timen» står i bekreftelsen og påminnelsen. «Etter timen» sendes med etterbehandlingen når timen settes til fullført. SMS-teksten legges på påminnelses-SMS-en (før) eller sendes som egen SMS (etter),
        når SMS er slått på.
      </p>
      <Group timing="before" />
      <Group timing="after" />

      <h2 id="editor">{editing ? `Rediger «${editing.name}»` : draft ? "Ny instruksjon" : "Start med en mal"}</h2>
      {!draft ? (
        <div class="card toolbar">
          {full ? (
            <span class="muted">Du har {MAX_INSTRUCTIONS} instruksjoner. Slett én for å lage en ny.</span>
          ) : (
            <>
              <a class="button secondary small" href="/admin/settings/instructions?new=before#editor">
                Lag fra bunnen av
              </a>
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <a class="button secondary small" href={`/admin/settings/instructions?template=${key}#editor`}>
                  Mal: {t.name}
                </a>
              ))}
            </>
          )}
        </div>
      ) : (
        <form method="post" action="/admin/settings/instructions" class="card">
          <input type="hidden" name="id" value={String(draft.id)} />
          <div class="row">
            <label>
              Navn <span class="muted">(maks 60)</span>
              <input name="name" required maxlength={60} value={draft.name} placeholder="Etterbehandling tatovering" />
            </label>
            <label>
              Når den sendes
              <select name="timing">
                {(["before", "after"] as const).map((t) => (
                  <option value={t} selected={draft.timing === t}>
                    {TIMING_LABELS[t]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              E-postemne <span class="muted">(maks 50)</span>
              <input name="email_subject" maxlength={50} value={draft.email_subject ?? ""} />
            </label>
          </div>
          <div style="display:flex;gap:.25rem 1rem;flex-wrap:wrap;margin-bottom:.75rem">
            <span class="muted">Gjelder:</span>
            {Object.entries(KINDS)
              .filter(([k]) => k !== "consultation")
              .map(([k, label]) => (
                <label class="check" style="margin:0">
                  <input type="checkbox" name="kinds" value={k} checked={!draft.kinds || draft.kinds.split(",").includes(k)} />
                  {label}
                </label>
              ))}
          </div>
          <div class="row">
            <label>
              Tekst (norsk)
              <textarea name="body_no" rows={7} required maxlength={4000}>
                {draft.body_no}
              </textarea>
            </label>
            <label>
              Tekst (engelsk)
              <textarea name="body_en" rows={7} maxlength={4000}>
                {draft.body_en ?? ""}
              </textarea>
            </label>
          </div>
          <label>
            SMS <span class="muted">(maks 120 tegn, valgfritt)</span>
            <input name="sms_text" maxlength={120} value={draft.sms_text ?? ""} />
          </label>
          <button>Lagre</button>
          <a class="button secondary" href="/admin/settings/instructions" style="margin-left:.5rem">
            Avbryt
          </a>
        </form>
      )}

      <h2>Etterbehandling per behandling</h2>
      <p class="muted">Skrives på hver behandling og sendes sammen med instruksjonene «etter timen».</p>
      <div class="list">
        <table>
          <tbody>
            {services.results.map((s) => (
              <tr>
                <td>{s.name_no}</td>
                <td>{s.aftercare_no ? <span class="muted">{s.aftercare_no.slice(0, 90)}…</span> : <span class="pill">Ingen egen tekst</span>}</td>
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

clientSettings.post("/settings/instructions", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settings/instructions?error=Ingen+tilgang");
  const body = await c.req.parseBody({ all: true });
  const id = Number(str(body, "id"));
  const name = str(body, "name").slice(0, 60);
  const bodyNo = str(body, "body_no").slice(0, 4000);
  const timing = str(body, "timing") === "after" ? "after" : "before";
  const kinds = all(body, "kinds").filter((k) => k in KINDS && k !== "consultation");
  const allKinds = Object.keys(KINDS).filter((k) => k !== "consultation");
  if (!name || !bodyNo || !kinds.length) return c.redirect(`/admin/settings/instructions?${id ? `edit=${id}` : `new=${timing}`}&error=Fyll+inn+navn,+tekst+og+minst+én+behandling#editor`);
  const values = [name, timing, kinds.length === allKinds.length ? null : kinds.join(","), str(body, "email_subject").slice(0, 50) || null, bodyNo, str(body, "body_en").slice(0, 4000) || null, str(body, "sms_text").slice(0, 120) || null];
  if (id) {
    await c.env.DB.prepare("UPDATE instructions SET name = ?, timing = ?, kinds = ?, email_subject = ?, body_no = ?, body_en = ?, sms_text = ? WHERE id = ?").bind(...values, id).run();
  } else {
    const count = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM instructions").first<{ n: number }>();
    if ((count?.n ?? 0) >= MAX_INSTRUCTIONS) return c.redirect(`/admin/settings/instructions?error=Maks+${MAX_INSTRUCTIONS}+instruksjoner`);
    await c.env.DB.prepare("INSERT INTO instructions (name, timing, kinds, email_subject, body_no, body_en, sms_text) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(...values).run();
  }
  await audit(c.env, c.get("user"), id ? "update" : "create", "instruction", id || null);
  return c.redirect("/admin/settings/instructions?ok=Lagret");
});

clientSettings.post("/settings/instructions/:id", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settings/instructions");
  const id = Number(c.req.param("id"));
  const action = str(await c.req.parseBody(), "action");
  if (action === "delete") await c.env.DB.prepare("DELETE FROM instructions WHERE id = ?").bind(id).run();
  else if (action === "enable" || action === "disable") await c.env.DB.prepare("UPDATE instructions SET enabled = ? WHERE id = ?").bind(action === "enable" ? 1 : 0, id).run();
  return c.redirect("/admin/settings/instructions");
});

// ---------- Kundeservice ----------

clientSettings.get("/settings/client-support", async (c) => {
  const s = await loadSupport(c.env);
  return c.html(
    <SettingsPage c={c} active="/admin/settings/client-support" title="Kundeservice">
      <SettingsTitle icon="clients" title="Kundeservice" sub="Kontaktinformasjonen som står på e-poster og SMS til kundene." />
      <form method="post" action="/admin/settings/client-support" class="card">
        <div class="row">
          <label>
            Telefonnummer
            <input name="phone" type="tel" value={s.phone} placeholder="+47 917 45 834" />
          </label>
          <label>
            E-postadresse (valgfritt)
            <input name="email" type="email" value={s.email} />
          </label>
        </div>
        <button>Lagre</button>
      </form>
    </SettingsPage>,
  );
});

clientSettings.post("/settings/client-support", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/settings/client-support?error=Ingen+tilgang");
  const body = await c.req.parseBody({ all: true });
  const phone = str(body, "phone").slice(0, 30);
  const email = str(body, "email").slice(0, 200);
  if (phone && !/^\+?[\d\s-]{5,}$/.test(phone)) return c.redirect("/admin/settings/client-support?error=Sjekk+telefonnummeret");
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return c.redirect("/admin/settings/client-support?error=Sjekk+e-postadressen");
  await saveSettings(c.env, "support.", { phone, email });
  return c.redirect("/admin/settings/client-support?ok=Lagret");
});

// ---------- Gavekort → Innstillinger ----------
// PLACEHOLDER-RESCAN: the tabs follow Linework's store settings; its public store page, English terms
// and "pay out expired cards automatically" (not built) were never seen in use.

clientSettings.get("/gift-cards/settings", async (c) => {
  const tab = ["card", "terms"].includes(c.req.query("tab") ?? "") ? c.req.query("tab")! : "store";
  const s = await loadGiftCardSettings(c.env);
  const online = stripeEnabled(c.env);
  const storeUrl = `${c.env.SITE_URL.replace(/\/$/, "")}/#gift-cards`;
  const tabHref = (t: string) => `/admin/gift-cards/settings${t === "store" ? "" : `?tab=${t}`}`;
  const editTerms = c.req.query("edit") === "1" || s.customTerms;
  return c.html(
    <Layout title="Gavekort" path="/admin/gift-cards" user={c.get("user")} flash={c.req.query("ok")} error={c.req.query("error")}>
      <PageHead title="Innstillinger for gavekort" sub="Nettbutikken for gavekort, kortene og vilkårene.">
        <a class="button secondary" href="/admin/gift-cards">
          Tilbake
        </a>
      </PageHead>
      <p>
        <SegTabs
          tabs={[
            { href: tabHref("store"), label: "Nettbutikk" },
            { href: tabHref("card"), label: "Gavekort" },
            { href: tabHref("terms"), label: "Vilkår" },
          ]}
          active={tabHref(tab)}
        />
      </p>
      <form method="post" action="/admin/gift-cards/settings" class="card">
        <input type="hidden" name="tab" value={tab} />
        {tab === "store" && (
          <>
            <label class="check">
              <input type="checkbox" name="store" value="1" checked={s.store} disabled={!online} />
              <span>
                <strong>Gavekort på nettsiden</strong>
                <span class="muted" style="display:block">
                  {online ? (s.store ? "Nettbutikken er åpen." : "Nettbutikken er stengt.") : "Krever nettbetaling (Stripe) under Betalingsmåter."}
                </span>
              </span>
            </label>
            <div class="toolbar" style="margin:.5rem 0 1rem">
              <span>
                <span class="muted">Lenke: </span>
                {storeUrl}
              </span>
              {copyButton(storeUrl)}
            </div>
            <label>
              Informasjon til kjøperen
              <textarea name="info" rows={3} maxlength={1000} placeholder="Gavekortet sendes på e-post med en gang og kan skrives ut.">
                {s.info}
              </textarea>
            </label>
          </>
        )}
        {tab === "card" && (
          <>
            <div class="row">
              <label>
                Minste beløp (kr)
                <input name="min_kr" inputmode="numeric" value={String(s.minKr)} />
              </label>
              <label>
                Største beløp (kr)
                <input name="max_kr" inputmode="numeric" value={String(s.maxKr)} />
              </label>
              <label>
                Gyldig fra kjøpet
                <select name="validity_months">
                  {VALIDITY_OPTIONS.map((m) => (
                    <option value={m} selected={m === s.validityMonths}>
                      {m / 12} år
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p class="muted" style="font-size:.88rem">
              Gjelder nye kort. 3 år er standard (den alminnelige foreldelsesfristen). Kortere enn ett år tilbys ikke, fordi det er vanskelig å forsvare etter forbrukerreglene.
            </p>
          </>
        )}
        {tab === "terms" && (
          <>
            <p class="muted" style="margin-top:0">Vises før kjøpet fullføres. Linjen om hvor lenge kortet gjelder legges til automatisk.</p>
            {editTerms ? (
              <>
                {[...s.terms, ""].map((t, i) => (
                  <label>
                    {i < s.terms.length ? `Punkt ${i + 1}` : "Nytt punkt"}
                    <textarea name="terms" rows={2} maxlength={500}>
                      {t}
                    </textarea>
                  </label>
                ))}
                <p class="muted" style="font-size:.85rem">Tøm et felt for å fjerne punktet.</p>
                <label class="check">
                  <input type="checkbox" name="reset_terms" value="1" />
                  Bruk standardvilkårene igjen
                </label>
              </>
            ) : (
              <>
                <ol style="padding-left:1.2rem">
                  {giftCardTerms(s).map((t) => (
                    <li>{t}</li>
                  ))}
                </ol>
                <a class="button secondary small" href="/admin/gift-cards/settings?tab=terms&edit=1">
                  Tilpass vilkårene
                </a>
              </>
            )}
          </>
        )}
        {(tab !== "terms" || editTerms) && <button style="margin-top:.75rem">Lagre</button>}
      </form>
    </Layout>,
  );
});

clientSettings.post("/gift-cards/settings", async (c) => {
  if (!isManager(c)) return c.redirect("/admin/gift-cards/settings?error=Ingen+tilgang");
  const body = await c.req.parseBody({ all: true });
  const tab = str(body, "tab");
  if (tab === "card") {
    const min = Number(str(body, "min_kr"));
    const max = Number(str(body, "max_kr"));
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 100 || max < min || max > 100000) return c.redirect("/admin/gift-cards/settings?tab=card&error=Sjekk+beløpene+(100–100 000 kr)");
    const months = Number(str(body, "validity_months"));
    await saveSettings(c.env, "giftcards.", { min_kr: String(min), max_kr: String(max), validity_months: VALIDITY_OPTIONS.includes(months as never) ? String(months) : "" });
    return c.redirect("/admin/gift-cards/settings?tab=card&ok=Lagret");
  }
  if (tab === "terms") {
    const terms = all(body, "terms").map((t) => t.trim().slice(0, 500)).filter(Boolean);
    const reset = str(body, "reset_terms") === "1" || !terms.length || JSON.stringify(terms) === JSON.stringify(DEFAULT_GIFT_TERMS);
    await saveSettings(c.env, "giftcards.", { terms: reset ? "" : JSON.stringify(terms.slice(0, 10)) });
    return c.redirect("/admin/gift-cards/settings?tab=terms&ok=Lagret");
  }
  await saveSettings(c.env, "giftcards.", { store: str(body, "store") === "1" || !stripeEnabled(c.env) ? "" : "0", info: str(body, "info").slice(0, 1000) });
  return c.redirect("/admin/gift-cards/settings?ok=Lagret");
});
