import type { Context } from "hono";

import { isMonth, loadAccounting, type AccountKey } from "../lib/accounting";
import { monthName } from "../lib/accounting-pdf";
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
import { approveBilag, bilagPdf, buildBilag, VAT_CODE_LABELS, type BankInput, type BilagRow, type PayoutProvider } from "../lib/fiken-bilag";
import { formatOre, parseKroner } from "../lib/report";
import { importReport } from "../lib/report-import";
import { addDays } from "../lib/time";
import { zettleEnabled } from "../lib/zettle";
import { Layout } from "../views/layout";
import { SettingsTitle, shiftMonth as shiftDate } from "../views/ui";
import { ReportTabs } from "./admin-accounting";
import { SettingsPage } from "./admin-settings";
import { adminApp, audit, str, today, type AdminEnv } from "./admin-shared";

const shiftMonth = (month: string, by: number) => shiftDate(`${month}-01`, by).slice(0, 7);

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

// =====================================================================
// Rapporter → Regnskap → Fiken-bilag: the semi-automatic month entry
// =====================================================================

const PROVIDER_FIELDS: PayoutProvider[] = ["zettle", "sumup", "stripe"];

function bankFrom(get: (k: string) => string | undefined): BankInput {
  const bank: BankInput = {};
  for (const p of PROVIDER_FIELDS) {
    const v = parseKroner(get(`bank_${p}`) ?? "");
    if (v != null) bank[p] = v;
  }
  return bank;
}

const monthOf = (q: string | undefined) => (isMonth(q) ? q : addDays(`${today().slice(0, 7)}-01`, -1).slice(0, 7));
const orgOf = (c: Context<AdminEnv>) => ({ name: c.env.ORG_NAME ?? "Infinity Tattoo", number: c.env.ORG_NUMBER });

fiken.get("/accounting/fiken", async (c) => {
  if (c.get("user").role !== "owner") return c.redirect("/admin/report");
  const month = monthOf(c.req.query("month"));
  const bank = bankFrom((k) => c.req.query(k));
  const [b, f, history, imports] = await Promise.all([
    buildBilag(c.env, month, bank),
    loadFiken(c.env),
    c.env.DB.prepare("SELECT id, status, error, approved_by, created_at, location FROM fiken_bilag WHERE month = ? ORDER BY id DESC").bind(month).all<{
      id: number;
      status: string;
      error: string | null;
      approved_by: string;
      created_at: string;
      location: string | null;
    }>(),
    c.env.DB.prepare("SELECT provider, filename, imported, skipped, from_date, to_date, created_at FROM report_imports ORDER BY id DESC LIMIT 5").all<{
      provider: string;
      filename: string;
      imported: number;
      skipped: number;
      from_date: string | null;
      to_date: string | null;
      created_at: string;
    }>(),
  ]);
  const viaApi = Boolean(f.token && f.company);
  const bankVal = (p: PayoutProvider) => (bank[p] != null ? (bank[p]! / 100).toFixed(2).replace(".", ",") : "");
  const q = (m: string) => `/admin/accounting/fiken?month=${m}`;
  const o = b.overview;

  return c.html(
    <Layout title="Fiken-bilag" path="/admin/report" user={c.get("user")} flash={c.req.query("ok")} error={c.req.query("error")}>
      <ReportTabs active="accounting" owner />
      <div class="row" style="justify-content:space-between;align-items:center">
        <h2 style="margin:0;font-size:1.3rem">Fiken-bilag for {monthName(month)}</h2>
        <div style="flex:0 0 auto">
          <a class="button secondary" href={q(shiftMonth(month, -1))} aria-label="Forrige måned">
            ←
          </a>{" "}
          <a class="button secondary" href={q(shiftMonth(month, 1))} aria-label="Neste måned">
            →
          </a>
        </div>
      </div>
      <p class="muted">
        Hele måneden som noen få linjer til en fri postering i Fiken. Sjekk utbetalingene mot banken, godkjenn, og før linjene inn i Fiken med PDF-en som vedlegg.
        {viaApi ? " Fiken er koblet til, så godkjenning sender linjene dit med en gang." : ""}
      </p>

      <form method="post" action="/admin/accounting/import" enctype="multipart/form-data" class="card toolbar" style="flex-wrap:wrap">
        <div style="flex:1 1 260px">
          <strong>Legg til rapport fra kassen</strong>
          <div class="muted">
            CSV med transaksjoner fra SumUp{zettleEnabled(c.env) ? "" : " eller Zettle"}. Samme fil to ganger legger ikke inn noe dobbelt.
            {zettleEnabled(c.env) ? " Zettle hentes automatisk." : ""}
          </div>
        </div>
        <select name="provider" style="flex:0 0 auto;width:auto">
          <option value="sumup">SumUp</option>
          {!zettleEnabled(c.env) && <option value="zettle">Zettle</option>}
        </select>
        <input type="file" name="file" accept=".csv,text/csv" required style="flex:0 1 auto;width:auto" />
        <button class="secondary" style="flex:0 0 auto">
          Les inn
        </button>
      </form>
      {imports.results.length > 0 && (
        <p class="muted">
          Siste: {imports.results.map((r) => `${r.filename} (${r.imported} nye, ${r.from_date ?? "?"}–${r.to_date ?? "?"})`).join(" · ")}
        </p>
      )}

      <h2>Oversikt</h2>
      <div class="card scroll">
        <table>
          <thead>
            <tr>
              <th>Kilde</th>
              <th class="num">Antall</th>
              <th class="num">Gebyr</th>
              <th class="num">Brutto</th>
            </tr>
          </thead>
          <tbody>
            {o.sources.map((t) => (
              <tr>
                <td>{t.name}</td>
                <td class="num">{t.count}</td>
                <td class="num">{t.fee == null ? "–" : formatOre(t.fee)}</td>
                <td class="num">{formatOre(t.gross)}</td>
              </tr>
            ))}
            {o.artists !== 0 && (
              <tr>
                <td>Artistenes andel</td>
                <td></td>
                <td></td>
                <td class="num">{formatOre(o.artists)}</td>
              </tr>
            )}
            {o.rent > 0 && (
              <tr>
                <td>Stolleie</td>
                <td></td>
                <td></td>
                <td class="num">{formatOre(o.rent)}</td>
              </tr>
            )}
          </tbody>
        </table>
        {!o.sources.length && <p class="muted">Ingen salg som ikke allerede er bokført denne måneden.</p>}
      </div>

      <h2>Sjekk mot banken</h2>
      <form method="get" action="/admin/accounting/fiken" class="card">
        <input type="hidden" name="month" value={month} />
        <p class="muted" style="margin-top:0">
          Skriv inn hva som kom inn på konto fra hver av dem i {monthName(month)} (se Folio). Utbetalinger kommer 1–2 dager etter salget, så små avvik rundt månedsskiftet er
          normalt.
        </p>
        <table>
          <thead>
            <tr>
              <th>Fra</th>
              <th class="num">Forventet</th>
              <th>I banken</th>
              <th class="num">Avvik</th>
            </tr>
          </thead>
          <tbody>
            {PROVIDER_FIELDS.map((p) => {
              const row = o.payouts.find((x) => x.provider === p);
              const diff = row?.expected != null && row.bank != null ? row.bank - row.expected : null;
              return (
                <tr>
                  <td>
                    {{ zettle: "Zettle", sumup: "SumUp", stripe: "Stripe" }[p]}
                    {row && <div class="muted" style="font-size:.8rem">{row.note}</div>}
                  </td>
                  <td class="num">{row?.expected == null ? "–" : formatOre(row.expected)}</td>
                  <td>
                    <input name={`bank_${p}`} value={bankVal(p)} inputmode="decimal" placeholder="kr" style="max-width:9rem" />
                  </td>
                  <td class="num" style={diff && Math.abs(diff) > 100 ? "color:var(--err,#c0392b);font-weight:600" : undefined}>
                    {diff == null ? "–" : Math.abs(diff) <= 100 ? "Stemmer" : formatOre(diff)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button class="secondary">Sjekk</button>
      </form>

      <h2>Linjer til Fiken</h2>
      <div class="card scroll">
        <table>
          <thead>
            <tr>
              <th>Beskrivelse</th>
              <th>Debet</th>
              <th>Kredit</th>
              <th>Mva-kode</th>
              <th class="num">Beløp</th>
            </tr>
          </thead>
          <tbody>
            {b.lines.map((l) => (
              <tr>
                <td>{l.description}</td>
                <td>{l.debitAccount}</td>
                <td>{l.creditAccount}</td>
                <td>{l.creditVatCode ? VAT_CODE_LABELS[l.creditVatCode] : l.debitVatCode ? `${VAT_CODE_LABELS[l.debitVatCode]} (på debet)` : "–"}</td>
                <td class="num">{formatOre(l.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!b.lines.length && <p class="muted">Ingenting å bokføre.</p>}
        <p class="muted">
          Dato {b.date}. Beløpet er inkl. mva når mva-koden står på kredit. Kontoene endres under <a href="/admin/settings/accounting">Innstillinger → Regnskap</a>
          {b.unmapped.length > 0 && <>; i Fiken heter bankkontoene noe som {b.unmapped[0]}:10001 (velg dem under Integrasjoner → Fiken)</>}.
        </p>
      </div>

      <form method="post" action={`/admin/accounting/fiken/approve?month=${month}`} class="card toolbar">
        {PROVIDER_FIELDS.map((p) => (
          <input type="hidden" name={`bank_${p}`} value={bankVal(p)} />
        ))}
        <div style="flex:1">
          <strong>Godkjenn {monthName(month)}</strong>
          <div class="muted">
            {viaApi
              ? `Linjene sendes til Fiken${f.trial ? " som åpen postering (prøvemodus)" : ""} med PDF-en som vedlegg.`
              : "Du får en PDF med linjene. Før dem inn i Fiken under Bilag → Fri postering og legg ved PDF-en."}{" "}
            Salgene merkes som bokført, så de ikke kommer med to ganger.
          </div>
        </div>
        <button disabled={!b.lines.length || (viaApi && b.unmapped.length > 0)}>{viaApi ? "Godkjenn og send til Fiken" : "Godkjenn"}</button>
      </form>

      {history.results.length > 0 && (
        <div class="card" style="margin-top:.6rem">
          <strong>Godkjent for {monthName(month)}</strong>
          <table>
            <tbody>
              {history.results.map((h) => (
                <tr>
                  <td>
                    <a href={`/admin/accounting/fiken/${h.id}/pdf`} target="_blank">
                      Bilag nr. {h.id}
                    </a>
                  </td>
                  <td>
                    {h.status === "posted" ? (
                      <span class="pill confirmed">Sendt til Fiken</span>
                    ) : h.status === "approved" ? (
                      <span class="pill">Føres for hånd</span>
                    ) : (
                      <span class="pill cancelled">Feilet</span>
                    )}
                  </td>
                  <td class="muted">{h.error ?? `${h.created_at.slice(0, 16).replace("T", " ")} · ${h.approved_by}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>,
  );
});

fiken.post("/accounting/fiken/approve", async (c) => {
  if (c.get("user").role !== "owner") return c.text("Ingen tilgang", 403);
  const month = monthOf(c.req.query("month"));
  const body = await c.req.parseBody();
  const bank = bankFrom((k) => (typeof body[k] === "string" ? (body[k] as string) : undefined));
  const back = `/admin/accounting/fiken?month=${month}`;
  try {
    const r = await approveBilag(c.env, month, bank, c.get("user").email, orgOf(c));
    await audit(c.env, c.get("user"), "approve", "fiken_bilag", r.row.id, { month, status: r.row.status });
    if (r.error) return c.redirect(`${back}&error=${encodeURIComponent(`Fiken svarte: ${r.error}. Ingenting er merket som bokført; prøv igjen.`)}`);
    return c.redirect(`${back}&ok=${encodeURIComponent(r.posted ? `Bilag nr. ${r.row.id} sendt til Fiken` : `Bilag nr. ${r.row.id} godkjent. Last ned PDF-en og før linjene i Fiken.`)}`);
  } catch (error) {
    return c.redirect(`${back}&error=${encodeURIComponent(String(error instanceof Error ? error.message : error))}`);
  }
});

fiken.get("/accounting/fiken/:id/pdf", async (c) => {
  if (c.get("user").role !== "owner") return c.text("Ingen tilgang", 403);
  const row = await c.env.DB.prepare("SELECT * FROM fiken_bilag WHERE id = ?").bind(Number(c.req.param("id"))).first<BilagRow>();
  if (!row) return c.notFound();
  return new Response(bilagPdf(row, orgOf(c)), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="fiken-bilag-${row.month}-${row.id}.pdf"`, "Cache-Control": "no-store" },
  });
});

fiken.post("/accounting/import", async (c) => {
  if (c.get("user").role !== "owner") return c.text("Ingen tilgang", 403);
  const body = await c.req.parseBody();
  const file = body.file;
  const provider = str(body, "provider") === "zettle" && !zettleEnabled(c.env) ? "zettle" : "sumup";
  const back = c.req.header("Referer")?.includes("/admin/accounting/fiken") ? new URL(c.req.header("Referer")!).pathname + new URL(c.req.header("Referer")!).search.replace(/&?(ok|error)=[^&]*/g, "") : "/admin/accounting/fiken";
  const sep = back.includes("?") ? "&" : "?";
  if (!(file instanceof File) || file.size === 0) return c.redirect(`${back}${sep}error=Velg+en+CSV-fil`);
  if (file.size > 3 * 1024 * 1024) return c.redirect(`${back}${sep}error=Filen+er+for+stor+(maks+3+MB)`);
  const r = await importReport(c.env, provider, file.name, await file.text(), c.get("user").email);
  await audit(c.env, c.get("user"), "import", "report", null, { provider, file: file.name, ...r });
  if (r.missing.length) return c.redirect(`${back}${sep}error=${encodeURIComponent(`Fant ikke kolonnene for ${r.missing.map((m) => (m === "date" ? "dato" : "beløp")).join(" og ")} i filen`)}`);
  return c.redirect(`${back}${sep}ok=${encodeURIComponent(`${r.imported} salg lest inn${r.skipped ? `, ${r.skipped} hoppet over` : ""}${r.from ? ` (${r.from}–${r.to})` : ""}`)}`);
});
