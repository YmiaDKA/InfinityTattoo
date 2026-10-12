import { loadAccounting, type AccountKey } from "../lib/accounting";
import { setFeature } from "../lib/features";
import {
  fikenBankAccounts,
  fikenCompanies,
  fikenSince,
  loadFiken,
  pendingBatches,
  pushToFiken,
  saveFikenSetting,
  type FikenBankAccount,
  type FikenCompany,
} from "../lib/fiken";
import { formatOre } from "../lib/report";
import { SettingsTitle } from "../views/ui";
import { SettingsPage } from "./admin-settings";
import { adminApp, audit, str } from "./admin-shared";

/** Innstillinger → Integrasjoner → Fiken: API token, company, bank accounts, preview and history. Owner only. */
export const fiken = adminApp();

const BANKISH: [AccountKey, string][] = [
  ["bank", "Bank"],
  ["stripe_clearing", "Stripe"],
  ["zettle_clearing", "Zettle"],
];

fiken.get("/settings/fiken", async (c) => {
  if (c.get("user").role !== "owner") return c.redirect("/admin/settings/integrations");
  const on = Boolean(c.get("user").features?.fiken);
  const [f, acc, since, pushes] = await Promise.all([
    loadFiken(c.env),
    loadAccounting(c.env),
    fikenSince(c.env),
    c.env.DB.prepare("SELECT kind, ref, status, total_ore, error, created_at FROM fiken_pushes ORDER BY id DESC LIMIT 15").all<{
      kind: string;
      ref: string;
      status: string;
      total_ore: number;
      error: string | null;
      created_at: string;
    }>(),
  ]);
  // Ask Fiken for the companies and bank accounts the token can see (one request at a time).
  let companies: FikenCompany[] = [];
  let banks: FikenBankAccount[] = [];
  let apiError = "";
  if (f.token) {
    try {
      companies = await fikenCompanies(f.token);
      if (f.company) banks = await fikenBankAccounts(f.token, f.company);
    } catch (error) {
      apiError = String(error instanceof Error ? error.message : error);
    }
  }
  const pending = on ? await pendingBatches(c.env) : { batches: [], unmapped: [] };
  const company = companies.find((x) => x.slug === f.company);

  return c.html(
    <SettingsPage c={c} active="/admin/settings/integrations" title="Fiken">
      <SettingsTitle icon="ledger" title="Fiken" sub="Bokfører studioets salg i Fiken hver natt, så ingen trenger å taste dem inn." />
      <div class="card">
        <p style="margin-top:0">
          Hver natt sendes gårsdagens salg til Fiken som én postering per dag: salg i Zettle, depositum og gavekort på nett med Stripe-gebyr og utbetalinger, gavekort brukt som
          betaling, salg registrert for hånd og artistenes andel. Stolleie posteres etter hver måned.
        </p>
        <p class="muted">
          Krever Fikens API-modul (99 kr/mnd, bestilles i Fiken under Abonnement). Lag en personlig API-nøkkel i Fiken under Rediger konto → API. Z-rapporten kommer fortsatt fra
          Zettle. Kontonumrene står under <a href="/admin/settings/accounting">Regnskap</a>; sjekk dem med regnskapsføreren.
        </p>
      </div>

      <form method="post" action="/admin/settings/fiken" class="card" style="margin-top:.6rem">
        <label class="check">
          <input type="checkbox" name="on" value="1" checked={on} />
          <span>Send til Fiken hver natt{since ? ` (på siden ${since})` : ""}</span>
        </label>
        <label class="check">
          <input type="checkbox" name="trial" value="1" checked={f.trial} />
          <span>Prøvemodus: posteringene sendes som åpne, så de kan slettes i Fiken hvis noe er feil. Slå av når regnskapsføreren har sjekket de første dagene.</span>
        </label>
        <div class="row">
          <label>
            API-nøkkel
            <input
              name="token"
              type="password"
              autocomplete="off"
              disabled={f.tokenFromEnv}
              placeholder={f.tokenFromEnv ? "Satt som hemmelighet i Cloudflare" : f.token ? `Lagret (slutter på ${f.token.slice(-4)})` : "Lim inn nøkkelen fra Fiken"}
            />
          </label>
          <label>
            Firma i Fiken
            <select name="company" disabled={!companies.length}>
              <option value="">{companies.length ? "Velg firma" : "Lagre API-nøkkelen først"}</option>
              {companies.map((x) => (
                <option value={x.slug} selected={x.slug === f.company}>
                  {x.name}
                  {x.organizationNumber ? ` (${x.organizationNumber})` : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
        {company && company.hasApiAccess === false && <p class="muted">Fiken sier at API-modulen ikke er bestilt for dette firmaet ennå.</p>}
        {apiError && <p class="muted">Fiken svarte: {apiError}</p>}
        {banks.length > 0 && (
          <div class="row">
            {BANKISH.map(([key, label]) => (
              <label>
                {label} ({acc.accounts[key]}) i Fiken
                <select name={`bank_${acc.accounts[key]}`}>
                  <option value="">Velg konto</option>
                  {banks.map((b) => (
                    <option value={b.accountCode} selected={f.bankMap[acc.accounts[key]] === b.accountCode}>
                      {b.name} ({b.accountCode})
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}
        {banks.length > 0 && <p class="muted">Stripe og Zettle trenger hver sin konto i Fiken (opprett dem som bankkonto av typen «Annet» hvis de mangler).</p>}
        <button>Lagre</button>
      </form>

      {on && (
        <div class="card" style="margin-top:.6rem">
          <div class="toolbar" style="margin:0">
            <strong style="flex:1">Klar til å sendes</strong>
            <form method="post" action="/admin/settings/fiken/push">
              <button class="secondary" disabled={!pending.batches.length || !f.token || !f.company}>
                Send nå
              </button>
            </form>
          </div>
          {pending.unmapped.length > 0 && (
            <p class="muted">
              {banks.length ? "Velg" : "Koble til Fiken over, og velg"} Fiken-konto for {pending.unmapped.join(", ")} før noe kan sendes.
            </p>
          )}
          {pending.batches.length === 0 ? (
            <p class="muted">Ingenting nytt. Salg sendes dagen etter, og nettbetalinger når Stripe-gebyret er kjent.</p>
          ) : (
            <table>
              <tbody>
                {pending.batches.map((b) => (
                  <tr>
                    <td>{b.kind === "rent" ? `Stolleie ${b.ref}` : b.ref}</td>
                    <td class="muted">{b.entries.length} linjer</td>
                    <td class="num">{formatOre(b.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {pushes.results.length > 0 && (
        <div class="card" style="margin-top:.6rem">
          <strong>Sendt til Fiken</strong>
          <table>
            <tbody>
              {pushes.results.map((p) => (
                <tr>
                  <td>{p.kind === "rent" ? `Stolleie ${p.ref}` : p.ref}</td>
                  <td>{p.status === "sent" ? <span class="pill confirmed">Sendt</span> : <span class="pill cancelled">Feilet</span>}</td>
                  <td class="muted">{p.error ?? p.created_at.slice(0, 16).replace("T", " ")}</td>
                  <td class="num">{formatOre(p.total_ore)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SettingsPage>,
  );
});

fiken.post("/settings/fiken", async (c) => {
  if (c.get("user").role !== "owner") return c.text("Ingen tilgang", 403);
  const body = await c.req.parseBody();
  const token = str(body, "token");
  if (token) await saveFikenSetting(c.env, "token", token);
  if (typeof body.company === "string") await saveFikenSetting(c.env, "company", str(body, "company"));
  await saveFikenSetting(c.env, "trial", str(body, "trial") === "1" ? "1" : "0");
  for (const [k, v] of Object.entries(body)) {
    if (/^bank_19\d\d$/.test(k) && typeof v === "string") await saveFikenSetting(c.env, `bank.${k.slice(5)}`, v.trim());
  }
  await setFeature(c.env, "fiken", str(body, "on") === "1");
  await audit(c.env, c.get("user"), "update", "fiken", null, { on: str(body, "on") === "1", token: token ? "changed" : "kept" });
  return c.redirect("/admin/settings/fiken?ok=Lagret");
});

fiken.post("/settings/fiken/push", async (c) => {
  if (c.get("user").role !== "owner") return c.text("Ingen tilgang", 403);
  const r = await pushToFiken(c.env, c.get("user").email);
  await audit(c.env, c.get("user"), "send", "fiken", null, r);
  return c.redirect(r.error ? `/admin/settings/fiken?error=${encodeURIComponent(r.error)}` : `/admin/settings/fiken?ok=${encodeURIComponent(`${r.sent} posteringer sendt til Fiken`)}`);
});
