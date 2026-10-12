import type { Context } from "hono";

import {
  ACCOUNTS,
  artistCsv,
  buildMonth,
  isMonth,
  loadAccounting,
  monthRange,
  PROGRAMS,
  revenueSummary,
  saveAccounting,
  sourceTotals,
  voucherCsv,
  type AccountKey,
} from "../lib/accounting";
import { monthName, summaryPdf } from "../lib/accounting-pdf";
import { sendEmail, toBase64 } from "../lib/email";
import { formatOre } from "../lib/report";
import { syncStripeMoney } from "../lib/stripe-sync";
import { addDays, isDateString } from "../lib/time";
import { Icon, Layout } from "../views/layout";
import { PageHead, PeriodNav, periodRange, Tabs, type PeriodUnit } from "../views/ui";
import { adminApp, audit, str, today, type AdminEnv } from "./admin-shared";

/** Rapporter → Regnskap: the month's files for the accountant (vouchers CSV, artist CSV, summary PDF). */
export const accounting = adminApp();

const ownerOnly = (c: Context<AdminEnv>) => c.get("user").role === "owner";

/** Last full month by default: that's the one the accountant asks for. */
function pickMonth(c: Context<AdminEnv>) {
  const q = c.req.query("month");
  if (isMonth(q)) return q;
  return addDays(`${today().slice(0, 7)}-01`, -1).slice(0, 7);
}

function shiftMonth(month: string, by: number) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + by, 1));
  return d.toISOString().slice(0, 7);
}

const orgOf = (c: Context<AdminEnv>) => ({ name: c.env.ORG_NAME ?? "Infinity Tattoo", number: c.env.ORG_NUMBER });

async function monthFor(c: Context<AdminEnv>, month: string, sync: boolean) {
  if (sync && c.env.STRIPE_SECRET_KEY) {
    const { from, to } = monthRange(month);
    try {
      await syncStripeMoney(c.env, from, addDays(to, 1));
    } catch (error) {
      console.error("stripe sync", error);
    }
  }
  return buildMonth(c.env, month, c.get("user").features?.rent !== false);
}

const download = (body: string | Uint8Array, type: string, name: string) =>
  new Response(body, { headers: { "Content-Type": type, "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "no-store" } });

/** Rapporter has Linework's Revenue report first, then our daily settlement and the accountant's files. */
export function ReportTabs({ active, owner }: { active: "revenue" | "day" | "accounting"; owner: boolean }) {
  const tabs = [
    { href: "/admin/reports", label: "Omsetning" },
    { href: "/admin/report", label: "Dagsoppgjør" },
    ...(owner ? [{ href: "/admin/accounting", label: "Regnskap" }] : []),
  ];
  return (
    <div class="noprint">
      <PageHead title="Rapporter" />
      <Tabs tabs={tabs} active={{ revenue: "/admin/reports", day: "/admin/report", accounting: "/admin/accounting" }[active]} />
    </div>
  );
}

accounting.get("/reports", async (c) => {
  const unit: PeriodUnit = (["day", "week", "month", "year"] as const).find((u) => u === c.req.query("unit")) ?? "day";
  const date = isDateString(c.req.query("date") ?? "") ? c.req.query("date")! : today();
  const { from, to } = periodRange(unit, date);
  const withRent = c.get("user").features?.rent !== false;
  const rentMonths = withRent ? (unit === "month" ? 1 : unit === "year" ? 12 : 0) : 0;
  const r = await revenueSummary(c.env, from, to, rentMonths);
  const row = (label: string, value: number, total = false) => (
    <tr class={total ? "total" : undefined}>
      <td>{label}</td>
      <td class="num">{formatOre(value)}</td>
    </tr>
  );
  return c.html(
    <Layout title="Rapporter" path="/admin/reports" user={c.get("user")}>
      <ReportTabs active="revenue" owner={ownerOnly(c)} />
      <div class="card" style="max-width:53rem;padding:1.5rem 2rem">
        <h2 style="margin:0 0 1rem;font-size:1.3rem">Omsetning</h2>
        <PeriodNav unit={unit} date={date} units={["day", "week", "month", "year"]} href={(u, d) => `/admin/reports?unit=${u}&date=${d}`} />
        <table class="lines">
          <tbody>
            {withRent && row(rentMonths ? "Stolleie" : "Stolleie (vises per måned og år)", r.rent)}
            {row("Behandlinger", r.service)}
            {row("Produkter", r.product)}
            {row("Totalt salg", r.total, true)}
            {row("Gebyrer (nettbetaling)", r.fees)}
            {row("Totale kostnader", r.fees, true)}
            {row("MVA", r.vat, true)}
            {row("Netto totalt", r.net, true)}
          </tbody>
        </table>
        {r.giftCardsSold > 0 && <p class="muted">Gavekort solgt i perioden: {formatOre(r.giftCardsSold)}. Regnes som salg først når kortet brukes.</p>}
        <div class="sectionhead">Last ned</div>
        <div class="toolbar">
          <a class="button secondary" href={`/admin/export.csv?from=${from}&to=${to}`}>
            <Icon name="download" size={16} /> CSV
          </a>
          <a class="button secondary" href={`/admin/payments?unit=${unit === "year" ? "month" : unit}&date=${date}`}>
            <Icon name="sales" size={16} /> Salgsrapport
          </a>
        </div>
      </div>
    </Layout>,
  );
});

accounting.get("/accounting", async (c) => {
  if (!ownerOnly(c)) return c.redirect("/admin/report");
  const month = pickMonth(c);
  const d = await monthFor(c, month, false);
  const totals = sourceTotals(d);
  const sends = (
    await c.env.DB.prepare("SELECT to_address, status, error, sent_by, sent_at FROM accounting_sends WHERE month = ? ORDER BY id DESC LIMIT 5")
      .bind(month)
      .all<{ to_address: string; status: string; error: string | null; sent_by: string; sent_at: string }>()
  ).results;
  const q = `month=${month}`;
  const s = d.settings;

  return c.html(
    <Layout title="Regnskap" path="/admin/report" user={c.get("user")} flash={c.req.query("ok")} error={c.req.query("error")}>
      <ReportTabs active="accounting" owner />
      <div class="row" style="justify-content:space-between;align-items:center">
        <h2 style="text-transform:capitalize;margin:0;font-size:1.3rem">Regnskap {monthName(month)}</h2>
        <div style="flex:0 0 auto">
          <a class="button secondary" href={`/admin/accounting?month=${shiftMonth(month, -1)}`} aria-label="Forrige måned">
            ←
          </a>{" "}
          <a class="button secondary" href={`/admin/accounting?month=${shiftMonth(month, 1)}`} aria-label="Neste måned">
            →
          </a>
        </div>
      </div>
      <p class="muted">
        Filene regnskapsføreren trenger for det kassen ikke ser: depositum og gavekort på nett, gavekort brukt som betaling, betalinger registrert for hånd og
        artistenes andel. Salg i Zettle kommer inn i {PROGRAMS[s.program]} gjennom Zettle-koblingen og er bare med for kontroll.
      </p>

      <div class="grid">
        <a class="card filecard" href={`/admin/accounting/bilag.csv?${q}`}>
          <strong>Bilagsliste</strong>
          <span class="muted">CSV, én linje per dag og kilde, med konto, mva og gebyr</span>
        </a>
        <a class="card filecard" href={`/admin/accounting/artister.csv?${q}`}>
          <strong>Artistoppgjør</strong>
          <span class="muted">CSV, omsetning, studioandel, stolleie og hva hver artist skal ha</span>
        </a>
        <a class="card filecard" href={`/admin/accounting/oppsummering.pdf?${q}`}>
          <strong>Månedsoppsummering</strong>
          <span class="muted">PDF med summer, gavekortsaldo, depositum og dag for dag</span>
        </a>
        <a class="card filecard" href={`/admin/accounting/fiken?${q}`}>
          <strong>Lag Fiken-bilag</strong>
          <span class="muted">Hele måneden, også Zettle og SumUp, som noen få linjer til Fiken, sjekket mot banken</span>
        </a>
      </div>

      <form method="post" action={`/admin/accounting/send?${q}`} class="card row" style="align-items:center">
        <div style="flex:1 1 280px">
          <strong>Send til regnskapsfører</strong>
          <div class="muted">
            {s.accountantEmail ? (
              <>Alle tre filene sendes på e-post til {s.accountantEmail}.</>
            ) : (
              <>
                Legg inn e-posten under <a href="/admin/settings/accounting">Innstillinger → Regnskap</a> først.
              </>
            )}
          </div>
        </div>
        <button style="flex:0 0 auto" disabled={!s.accountantEmail || !c.env.RESEND_API_KEY}>
          Send {monthName(month)}
        </button>
      </form>
      {!c.env.RESEND_API_KEY && <p class="muted">E-post er ikke satt opp ennå, så filene må lastes ned og sendes manuelt.</p>}
      {sends.length > 0 && (
        <p class="muted">
          Sendt:{" "}
          {sends.map((x) => `${x.sent_at.slice(0, 16).replace("T", " ")} til ${x.to_address} (${x.status === "sent" ? "ok" : `feilet: ${x.error ?? ""}`})`).join(" · ")}
        </p>
      )}

      <h2>Per kilde</h2>
      <div class="card scroll">
        <table>
          <thead>
            <tr>
              <th>Kilde</th>
              <th class="num">Brutto</th>
              <th class="num">Herav mva</th>
              <th>Bokføres her</th>
            </tr>
          </thead>
          <tbody>
            {totals.map((t) => (
              <tr>
                <td>{t.source}</td>
                <td class="num">{formatOre(t.gross)}</td>
                <td class="num">{formatOre(t.vat)}</td>
                <td>{t.post ? "Ja" : <span class="muted">Nei, kommer fra Zettle</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!totals.length && <p class="muted">Ingen betalinger denne måneden.</p>}
      </div>

      <div class="grid">
        <div class="card">
          <div class="muted">Gavekort som ikke er brukt</div>
          <div class="big">{formatOre(d.giftCardLiability)}</div>
          <div class="muted">Gjeld til kunder ved månedsslutt</div>
        </div>
        <div class="card">
          <div class="muted">Depositum for kommende timer</div>
          <div class="big">{formatOre(d.depositsHeld)}</div>
          <div class="muted">Betalt, men timen har ikke vært ennå</div>
        </div>
        <div class="card">
          <div class="muted">Mva</div>
          <div class="big" style="font-size:1.2rem">{s.vatRegistered ? "Mva-registrert" : "Ikke mva-registrert"}</div>
          <div class="muted">Endres under Innstillinger → Regnskap</div>
        </div>
      </div>
      {d.stripeMissingFees > 0 && (
        <p class="muted">
          {d.stripeMissingFees} nettbetalinger mangler gebyr fra Stripe ennå. Det hentes hver natt og når filene sendes.
        </p>
      )}

      <h2>Bilagsliste</h2>
      <div class="card scroll">
        <table>
          <thead>
            <tr>
              <th>Dato</th>
              <th>Kilde</th>
              <th class="num">Brutto</th>
              <th class="num">Mva</th>
              <th class="num">Gebyr</th>
              <th>Debet</th>
              <th>Kredit</th>
              <th>Utbetalt</th>
            </tr>
          </thead>
          <tbody>
            {d.lines.map((l) => (
              <tr class={l.post ? "" : "muted"}>
                <td>{l.date}</td>
                <td>{l.description}</td>
                <td class="num">{formatOre(l.gross)}</td>
                <td class="num">{l.vatPct ? `${formatOre(l.vat)} (${l.vatPct} %)` : "–"}</td>
                <td class="num">{l.fee == null ? "–" : formatOre(l.fee)}</td>
                <td>{l.debit}</td>
                <td>{l.credit}</td>
                <td>{l.payoutDate ?? "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!d.lines.length && <p class="muted">Ingen linjer.</p>}
      </div>
      <p class="muted">Kontonumrene følger NS 4102 og kan endres under Innstillinger → Regnskap. Be regnskapsføreren se over dem første gang.</p>
    </Layout>,
  );
});

accounting.get("/accounting/bilag.csv", async (c) => {
  if (!ownerOnly(c)) return c.text("Ingen tilgang", 403);
  const month = pickMonth(c);
  return download(voucherCsv(await monthFor(c, month, true)), "text/csv; charset=utf-8", `bilag-${month}.csv`);
});

accounting.get("/accounting/artister.csv", async (c) => {
  if (!ownerOnly(c)) return c.text("Ingen tilgang", 403);
  const month = pickMonth(c);
  return download(artistCsv(await monthFor(c, month, false)), "text/csv; charset=utf-8", `artistoppgjor-${month}.csv`);
});

accounting.get("/accounting/oppsummering.pdf", async (c) => {
  if (!ownerOnly(c)) return c.text("Ingen tilgang", 403);
  const month = pickMonth(c);
  return download(summaryPdf(await monthFor(c, month, true), orgOf(c)), "application/pdf", `manedsoppsummering-${month}.pdf`);
});

const base64 = toBase64;

accounting.post("/accounting/send", async (c) => {
  if (!ownerOnly(c)) return c.text("Ingen tilgang", 403);
  const month = pickMonth(c);
  const d = await monthFor(c, month, true);
  const to = d.settings.accountantEmail;
  if (!to) return c.redirect(`/admin/accounting?month=${month}&error=${encodeURIComponent("Legg inn regnskapsførerens e-post først")}`);
  const org = orgOf(c);
  const result = await sendEmail(c.env, {
    to,
    subject: `Regnskap ${monthName(month)} – ${org.name}`,
    text: [
      "Hei!",
      "",
      `Her er filene for ${monthName(month)} fra ${org.name}:`,
      "- bilag: én linje per dag og kilde med konto, mva, Stripe-gebyr og utbetalingsdato",
      "- artistoppgjør: omsetning, studioandel og stolleie per artist",
      "- månedsoppsummering (PDF): summer, gavekortsaldo, depositum for kommende timer og dag for dag",
      "",
      "Salg i kassen (Zettle) med Z-rapport kommer gjennom Zettle-integrasjonen og er bare med for kontroll (merket «Nei» i kolonnen Bokføres her).",
      "",
      `Hilsen ${org.name}`,
    ].join("\n"),
    attachments: [
      { filename: `bilag-${month}.csv`, content: base64(voucherCsv(d)) },
      { filename: `artistoppgjor-${month}.csv`, content: base64(artistCsv(d)) },
      { filename: `manedsoppsummering-${month}.pdf`, content: base64(summaryPdf(d, org)) },
    ],
  });
  const user = c.get("user");
  await c.env.DB.prepare("INSERT INTO accounting_sends (month, to_address, status, error, sent_by) VALUES (?, ?, ?, ?, ?)")
    .bind(month, to, result.status, result.error ?? null, user.email)
    .run();
  await audit(c.env, user, "send", "accounting", null, { month, to, status: result.status });
  return c.redirect(
    result.status === "sent"
      ? `/admin/accounting?month=${month}&ok=${encodeURIComponent(`Sendt til ${to}`)}`
      : `/admin/accounting?month=${month}&error=${encodeURIComponent(`Ikke sendt: ${result.error ?? result.status}`)}`,
  );
});

// ---------- Settings → Regnskap ----------

export async function AccountingSettingsSection({ c }: { c: Context<AdminEnv> }) {
  const s = await loadAccounting(c.env);
  return (
    <>
      <form method="post" action="/admin/settings/accounting" class="card">
        <div class="row">
          <label>
            Regnskapsprogram
            <select name="program">
              {Object.entries(PROGRAMS).map(([k, v]) => (
                <option value={k} selected={k === s.program}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label>
            Regnskapsførerens e-post
            <input name="accountant_email" type="email" value={s.accountantEmail} placeholder="regnskap@eksempel.no" />
          </label>
        </div>
        <label class="check">
          <input type="checkbox" name="vat_registered" value="1" checked={s.vatRegistered} />
          Studioet er mva-registrert (mva-sats per behandling settes under Behandlinger, vanligvis 25 %)
        </label>
        <div class="row">
          {(Object.keys(ACCOUNTS) as AccountKey[]).map((k) => (
            <label>
              {ACCOUNTS[k].label}
              <input name={`account_${k}`} inputmode="numeric" pattern="[0-9]{4,6}" value={s.accounts[k]} />
            </label>
          ))}
        </div>
        <p class="muted">Standard kontoplan (NS 4102). Sjekk kontonumrene med regnskapsføreren første gang.</p>
        <button>Lagre regnskap</button>
      </form>
    </>
  );
}

accounting.post("/settings/accounting", async (c) => {
  if (!ownerOnly(c)) return c.text("Ingen tilgang", 403);
  const body = await c.req.parseBody();
  const current = await loadAccounting(c.env);
  const program = str(body, "program");
  const accounts = { ...current.accounts };
  for (const k of Object.keys(ACCOUNTS) as AccountKey[]) {
    const v = str(body, `account_${k}`);
    if (/^\d{4,6}$/.test(v)) accounts[k] = v;
  }
  const email = str(body, "accountant_email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return c.redirect("/admin/settings/accounting?error=Ugyldig+e-post");
  await saveAccounting(c.env, {
    program: program in PROGRAMS ? (program as keyof typeof PROGRAMS) : current.program,
    accountantEmail: email,
    vatRegistered: str(body, "vat_registered") === "1",
    accounts,
  });
  await audit(c.env, c.get("user"), "update", "accounting_settings", null, { program, vat: str(body, "vat_registered") === "1" });
  return c.redirect("/admin/settings/accounting?ok=Regnskap+lagret");
});
