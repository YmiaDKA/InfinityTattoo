import type { Env } from "../env";
import { loadAccounting, monthRange, vatOf, voucherLines, type AccountingSettings, type VoucherLine } from "./accounting";
import { monthName } from "./accounting-pdf";
import { loadFeatures } from "./features";
import { artistEntries, attachPdf, loadFiken, postJournal, PUSH_SELECT, toFikenLine, type FikenLine, type PushPayment } from "./fiken";
import { A4, PdfDoc } from "./pdf";
import { formatOre } from "./report";
import { businessDate } from "./time";

/**
 * The semi-automatic Fiken flow (Rapporter → Regnskap → Fiken-bilag): the month in a handful of
 * lines, summed per account pair, to type into a "fri postering" in Fiken, plus a PDF to attach. The
 * owner checks the totals against the payouts seen in the bank first. With a Fiken API token the same
 * approval posts the lines. Payments already posted by the nightly Fiken push are left out, and the
 * other way round.
 */

export type PayoutProvider = "zettle" | "sumup" | "stripe";
export type BankInput = Partial<Record<PayoutProvider, number>>;

export type BilagLine = FikenLine & { description: string };

export type Overview = {
  sources: { name: string; gross: number; fee: number | null; count: number }[];
  payouts: { provider: PayoutProvider; label: string; expected: number | null; bank: number | null; note: string }[];
  artists: number;
  rent: number;
};

export type Bilag = { month: string; date: string; lines: BilagLine[]; overview: Overview; paymentIds: number[]; payoutIds: string[]; rent: boolean; unmapped: string[] };

export const VAT_CODE_LABELS: Record<number, string> = { 3: "3 · utgående mva 25 %", 31: "31 · utgående mva 15 %", 33: "33 · utgående mva 12 %" };
const PAYOUT_LABELS: Record<PayoutProvider, string> = { zettle: "Zettle", sumup: "SumUp", stripe: "Stripe" };

/** Pure: sums voucher lines per account pair and VAT rate, so refunds net against sales. Exported for tests. */
export function sumLines(lines: VoucherLine[], s: AccountingSettings, bankMap: Record<string, string>): BilagLine[] {
  const groups = new Map<string, VoucherLine & { sources: Set<string> }>();
  for (const l of lines) {
    if (!l.post) continue;
    const key = `${l.debit}|${l.credit}|${l.vatPct}`;
    const g = groups.get(key) ?? { ...l, gross: 0, vat: 0, sources: new Set<string>() };
    g.gross += l.gross;
    g.sources.add(l.source);
    groups.set(key, g);
  }
  const out: BilagLine[] = [];
  for (const g of groups.values()) {
    if (!g.gross) continue;
    g.vat = vatOf(g.gross, g.vatPct);
    out.push({ description: [...g.sources].join(", ").slice(0, 200), ...toFikenLine(g, s, bankMap) });
  }
  return out;
}

export async function buildBilag(env: Env, month: string, bank: BankInput, now = new Date()): Promise<Bilag> {
  const { from, to } = monthRange(month);
  const date = to;
  const [s, f, features] = await Promise.all([loadAccounting(env), loadFiken(env), loadFeatures(env)]);
  const [payments, payouts, rentDone] = await Promise.all([
    env.DB.prepare(`${PUSH_SELECT} WHERE p.fiken_push_id IS NULL AND p.fiken_bilag_id IS NULL AND p.business_date BETWEEN ? AND ? ORDER BY p.id`)
      .bind(from, to)
      .all<PushPayment>(),
    env.DB.prepare("SELECT id, amount_ore, arrival_date FROM stripe_payouts WHERE fiken_push_id IS NULL AND fiken_bilag_id IS NULL AND status = 'paid' AND arrival_date BETWEEN ? AND ?")
      .bind(from, to)
      .all<{ id: string; amount_ore: number; arrival_date: string }>(),
    env.DB.prepare("SELECT 1 FROM fiken_pushes WHERE kind = 'rent' AND ref = ?1 AND status = 'sent' UNION SELECT 1 FROM fiken_bilag WHERE month = ?1 AND rent = 1 AND status != 'failed'")
      .bind(month)
      .first(),
  ]);
  const ps = payments.results;
  const vls = voucherLines(ps, payouts.results, s, { postZettle: true });
  const lines = sumLines(vls, s, f.bankMap);
  const a = s.accounts;
  const map = (acc: string) => f.bankMap[acc] ?? acc;

  // What came into the bank from Zettle and SumUp, as typed in from the bank: closes their clearing accounts.
  for (const [provider, clearing] of [["zettle", a.zettle_clearing], ["sumup", a.sumup_clearing]] as const) {
    const amount = bank[provider];
    if (amount && amount > 0) lines.push({ description: `Utbetalt fra ${PAYOUT_LABELS[provider]} i ${monthName(month)}`, amount, debitAccount: map(a.bank), creditAccount: map(clearing) });
  }

  const artist = artistEntries(date, ps, s);
  for (const e of artist) lines.push({ description: e.description, ...e.lines[0] });

  // Chair rent once the month is over, unless the nightly push already posted it.
  let rentTotal = 0;
  const monthOver = date < businessDate(now);
  if (features.rent && monthOver && !rentDone) {
    const staff = (await env.DB.prepare("SELECT name, monthly_rent_ore FROM staff WHERE active = 1 AND monthly_rent_ore > 0").all<{ name: string; monthly_rent_ore: number }>()).results;
    for (const x of staff) {
      rentTotal += x.monthly_rent_ore;
      lines.push({ description: `Stolleie ${month}, ${x.name}`, amount: x.monthly_rent_ore, debitAccount: a.artist_payable, creditAccount: a.rent_income });
    }
  }

  // Overview: totals per source, and what each payment service should have paid into the bank.
  const sources = new Map<string, { gross: number; fee: number | null; count: number }>();
  for (const l of vls) {
    if (l.source.endsWith("-gebyr") || l.source === "Utbetaling fra Stripe") continue;
    const t = sources.get(l.source) ?? { gross: 0, fee: null, count: 0 };
    t.gross += l.gross;
    if (l.fee != null) t.fee = (t.fee ?? 0) + l.fee;
    t.count += Number(l.description.match(/, (\d+) betaling/)?.[1] ?? 1);
    sources.set(l.source, t);
  }
  const net = (provider: string) => {
    const rows = ps.filter((p) => p.provider === provider);
    if (!rows.length) return null;
    return rows.reduce((n, p) => n + p.amount_ore - (p.fee_ore ?? 0), 0);
  };
  const feesKnown = (provider: string) => ps.filter((p) => p.provider === provider).every((p) => p.fee_ore != null);
  const payoutsRow = (provider: PayoutProvider, expected: number | null, note: string) => ({ provider, label: PAYOUT_LABELS[provider], expected, bank: bank[provider] ?? null, note });
  const overview: Overview = {
    sources: [...sources.entries()].map(([name, t]) => ({ name, ...t })),
    payouts: [
      payoutsRow("zettle", net("zettle"), feesKnown("zettle") ? "salg minus gebyr" : "salg; gebyret er ikke med (det står i Zettle-rapporten)"),
      payoutsRow("sumup", net("sumup"), feesKnown("sumup") ? "salg minus gebyr" : "salg; noen gebyr mangler"),
      payoutsRow(
        "stripe",
        payouts.results.length ? payouts.results.reduce((n, p) => n + p.amount_ore, 0) : null,
        "utbetalinger fra Stripe denne måneden",
      ),
    ].filter((p) => p.expected != null || p.bank != null),
    artists: artist.reduce((n, e) => n + (e.lines[0].debitAccount === a.artist_share ? e.lines[0].amount : -e.lines[0].amount), 0),
    rent: rentTotal,
  };

  const unmapped = [...new Set(lines.flatMap((l) => [l.debitAccount, l.creditAccount]))].filter((x) => /^19\d\d$/.test(x));
  return { month, date, lines, overview, paymentIds: ps.map((p) => p.id), payoutIds: payouts.results.map((p) => p.id), rent: rentTotal > 0, unmapped };
}

export type BilagRow = { id: number; month: string; status: string; lines_json: string; overview_json: string; rent: number; location: string | null; error: string | null; approved_by: string; created_at: string };

/** Approves the month: saves the lines, marks the payments, and posts to Fiken when a token is set. */
export async function approveBilag(env: Env, month: string, bank: BankInput, by: string, org: { name: string; number?: string }): Promise<{ row: BilagRow; posted: boolean; error?: string }> {
  const b = await buildBilag(env, month, bank);
  const f = await loadFiken(env);
  const viaApi = Boolean(f.token && f.company);
  if (!b.lines.length) throw new Error("Ingenting å bokføre for måneden");
  if (viaApi && b.unmapped.length) throw new Error(`Velg Fiken-bankkonto for ${b.unmapped.join(", ")} under Integrasjoner → Fiken`);

  let location: string | null = null;
  let error: string | undefined;
  if (viaApi) {
    try {
      location = await postJournal(f.token, f.company, {
        description: `Studio ${monthName(month)}`.slice(0, 200),
        open: f.trial,
        journalEntries: b.lines.map(({ description, ...line }) => ({ description, date: b.date, lines: [line] })),
      });
    } catch (e) {
      error = String(e instanceof Error ? e.message : e).slice(0, 500);
    }
  }
  const status = error ? "failed" : viaApi ? "posted" : "approved";
  const row = await env.DB.prepare(
    "INSERT INTO fiken_bilag (month, status, lines_json, overview_json, rent, location, error, approved_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *",
  )
    .bind(month, status, JSON.stringify(b.lines), JSON.stringify({ ...b.overview, date: b.date }), b.rent ? 1 : 0, location, error ?? null, by)
    .first<BilagRow>();
  if (status !== "failed") {
    const marks = [
      ...chunk(b.paymentIds, 90).map((ids) => env.DB.prepare(`UPDATE payments SET fiken_bilag_id = ? WHERE id IN (${ids.map(() => "?").join(",")})`).bind(row!.id, ...ids)),
      ...chunk(b.payoutIds, 90).map((ids) => env.DB.prepare(`UPDATE stripe_payouts SET fiken_bilag_id = ? WHERE id IN (${ids.map(() => "?").join(",")})`).bind(row!.id, ...ids)),
    ];
    if (marks.length) await env.DB.batch(marks);
  }
  if (location) {
    try {
      await attachPdf(f.token, f.company, location, bilagPdf(row!, org), `bilag-${month}.pdf`);
    } catch (e) {
      console.error("fiken attachment", e);
    }
  }
  return { row: row!, posted: status === "posted", error };
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/** The approved entry as a PDF: the lines in the order Fiken's "fri postering" asks for them, then the overview. */
export function bilagPdf(row: Pick<BilagRow, "id" | "month" | "lines_json" | "overview_json" | "approved_by" | "created_at" | "status">, org: { name: string; number?: string }): Uint8Array {
  const lines = JSON.parse(row.lines_json) as BilagLine[];
  const o = JSON.parse(row.overview_json) as Overview & { date: string };
  const M = 40;
  const R = A4.width - M;
  const doc = new PdfDoc(M, (n) => `${org.name} · Fiken-bilag ${row.month} (nr. ${row.id}) · side ${n}`);
  doc.text({ x: M, text: `Bilag til Fiken: ${monthName(row.month)}`, size: 16, bold: true }, 20);
  doc.text(
    { x: M, text: `${org.name}${org.number ? ` · org.nr. ${org.number}` : ""} · bilagsdato ${o.date} · godkjent ${row.created_at.slice(0, 10)} av ${row.approved_by}`, size: 9, gray: true },
    24,
  );

  doc.text({ x: M, text: "Føres som fri postering i Fiken, én linje per rad:", size: 11, bold: true }, 16);
  const cols = { d: M, debit: 300, credit: 370, vat: 440, amount: R };
  const head = () => {
    doc.text({ x: cols.d, text: "Beskrivelse", size: 8, gray: true });
    doc.text({ x: cols.debit, text: "Debet", size: 8, gray: true });
    doc.text({ x: cols.credit, text: "Kredit", size: 8, gray: true });
    doc.text({ x: cols.vat, text: "Mva-kode", size: 8, gray: true });
    doc.text({ x: cols.amount, text: "Beløp", size: 8, gray: true, align: "right" }, 14);
    doc.rule();
  };
  head();
  for (const l of lines) {
    doc.ensure(16);
    const code = l.creditVatCode ?? l.debitVatCode;
    doc.text({ x: cols.d, text: l.description.length > 48 ? `${l.description.slice(0, 47)}…` : l.description, size: 9 });
    doc.text({ x: cols.debit, text: l.debitAccount, size: 9 });
    doc.text({ x: cols.credit, text: l.creditAccount, size: 9 });
    doc.text({ x: cols.vat, text: code ? `${code}${l.debitVatCode ? " (debet)" : ""}` : "–", size: 9 });
    doc.text({ x: cols.amount, text: formatOre(l.amount), size: 9, align: "right" }, 14);
  }
  doc.gap(6);
  doc.text(
    { x: M, text: "Mva-kode 3 = utgående 25 %. Beløpet er inkl. mva når koden står på kredit, og eks. mva når den står på debet (refusjon).", size: 8, gray: true },
    20,
  );

  doc.text({ x: M, text: "Oversikt", size: 11, bold: true }, 16);
  for (const t of o.sources) {
    doc.ensure(14);
    doc.text({ x: M, text: `${t.name} (${t.count})`, size: 9 });
    doc.text({ x: 400, text: t.fee != null ? `gebyr ${formatOre(t.fee)}` : "", size: 9, gray: true, align: "right" });
    doc.text({ x: R, text: formatOre(t.gross), size: 9, align: "right" }, 14);
  }
  if (o.artists) {
    doc.text({ x: M, text: "Artistenes andel", size: 9 });
    doc.text({ x: R, text: formatOre(o.artists), size: 9, align: "right" }, 14);
  }
  if (o.rent) {
    doc.text({ x: M, text: "Stolleie", size: 9 });
    doc.text({ x: R, text: formatOre(o.rent), size: 9, align: "right" }, 14);
  }
  doc.gap(8);
  if (o.payouts.length) {
    doc.text({ x: M, text: "Sjekk mot banken", size: 11, bold: true }, 16);
    for (const p of o.payouts) {
      const diff = p.expected != null && p.bank != null ? p.bank - p.expected : null;
      doc.text({ x: M, text: `${p.label}: forventet ${p.expected == null ? "–" : formatOre(p.expected)} (${p.note})`, size: 9 });
      doc.text({ x: R, text: p.bank == null ? "ikke sjekket" : `i banken ${formatOre(p.bank)}${diff ? `, avvik ${formatOre(diff)}` : ", stemmer"}`, size: 9, align: "right" }, 14);
    }
  }
  doc.gap(8);
  doc.text({ x: M, text: "Z-rapporten for hver dag tas ut i kassesystemet. Dette bilaget er studioets egen oppstilling, ikke en kasserapport.", size: 8, gray: true }, 12);
  return doc.finish(`Fiken-bilag ${row.month}`);
}
