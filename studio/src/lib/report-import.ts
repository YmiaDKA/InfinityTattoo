import type { Env } from "../env";
import type { PaymentMethod } from "./report";
import { osloToUtc } from "./time";

/**
 * Reads a till's transaction export (CSV) so its sales count in the settlement, the artist split and
 * the Fiken entry: SumUp, or Zettle when its API isn't connected. A fixed parser, not AI: it finds the
 * columns by their Norwegian or English header names, so the order of columns doesn't matter.
 * The till stays the legal record; this only mirrors its payments.
 */

export type ReportProvider = "sumup" | "zettle";

export type ReportRow = {
  ref: string;
  date: string; // YYYY-MM-DD
  time: string | null; // HH:MM
  amount: number; // øre, negative for refunds
  fee: number | null; // øre
  method: PaymentMethod;
  staff: string | null;
};

export type ParsedReport = { rows: ReportRow[]; read: number; skipped: number; missing: string[] };

// Header names seen in SumUp and Zettle exports, in Norwegian and English (lower case, without punctuation).
const COLUMNS = {
  ref: ["transaksjonsid", "transaksjonskode", "transaction id", "transaction code", "kvitteringsnummer", "receipt number", "id"],
  date: ["dato", "date", "tidspunkt", "time", "opprettet", "created", "transaction date", "transaksjonsdato"],
  time: ["klokkeslett", "tid", "time of day"],
  amount: ["totalbeløp", "total amount", "beløp", "amount", "sum", "total", "brutto", "gross"],
  fee: ["gebyr", "fee", "fees", "transaksjonsgebyr", "transaction fee"],
  status: ["status"],
  type: ["type", "transaksjonstype", "transaction type"],
  method: ["betalingsmåte", "payment method", "betalingsmetode", "payment type", "kortType", "card type"],
  staff: ["ansatt", "personal", "staff", "employee", "selger", "user", "bruker", "betjent av", "served by"],
} as const;

const norm = (s: string) => s.replace(/^\uFEFF/, "").trim().toLowerCase().replace(/[()"'.:_-]/g, "").replace(/\s+/g, " ");

/** Splits CSV text into rows, with quotes, and the separator guessed from the header (; , or tab). */
export function parseCsv(text: string): string[][] {
  const body = text.replace(/^﻿/, "");
  const firstLine = body.split(/\r?\n/, 1)[0] ?? "";
  const sep = [";", "\t", ","].map((s) => [s, firstLine.split(s).length] as const).sort((x, y) => y[1] - x[1])[0][0];
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quoted) {
      if (ch === '"' && body[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === sep) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && body[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim())) rows.push(row);
  return rows;
}

/** "1 234,50", "1234.50", "-500", "kr 1.234,50" → øre. */
export function parseMoney(value: string): number | null {
  let v = value.replace(/kr|nok|\s| /gi, "").replace(/−/g, "-");
  if (!v) return null;
  if (/,\d{1,2}$/.test(v)) v = v.replace(/\./g, "").replace(",", ".");
  else v = v.replace(/,/g, "");
  return /^-?\d+(\.\d+)?$/.test(v) ? Math.round(Number(v) * 100) : null;
}

/** "2026-10-12", "12.10.2026", "12/10/2026", optionally followed by a time → [date, time]. */
export function parseDateTime(value: string): [string, string | null] | null {
  const v = value.trim();
  const time = v.match(/(\d{1,2}):(\d{2})/);
  const hhmm = time ? `${time[1].padStart(2, "0")}:${time[2]}` : null;
  let m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return [`${m[1]}-${m[2]}-${m[3]}`, hhmm];
  m = v.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})/);
  if (m) return [`${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`, hhmm];
  return null;
}

function method(text: string): PaymentMethod {
  const t = text.toLowerCase();
  if (/vipps|mobilepay/.test(t)) return "vipps";
  if (/kontant|cash/.test(t)) return "cash";
  if (/faktura|invoice/.test(t)) return "bank";
  return "card";
}

/** Pure: the payments in a report file. Exported for tests. */
export function parseReport(text: string): ParsedReport {
  const [header, ...lines] = parseCsv(text);
  if (!header) return { rows: [], read: 0, skipped: 0, missing: ["date", "amount"] };
  const names = header.map(norm);
  const col = (key: keyof typeof COLUMNS) => {
    for (const candidate of COLUMNS[key]) {
      const i = names.indexOf(norm(candidate));
      if (i >= 0) return i;
    }
    return names.findIndex((n) => COLUMNS[key].some((c) => c.length > 3 && n.startsWith(norm(c))));
  };
  const idx = { ref: col("ref"), date: col("date"), time: col("time"), amount: col("amount"), fee: col("fee"), status: col("status"), type: col("type"), method: col("method"), staff: col("staff") };
  const missing = (["date", "amount"] as const).filter((k) => idx[k] < 0);
  if (missing.length) return { rows: [], read: lines.length, skipped: lines.length, missing };

  const get = (r: string[], i: number) => (i >= 0 ? (r[i] ?? "").trim() : "");
  const rows: ReportRow[] = [];
  const seen = new Map<string, number>();
  let skipped = 0;
  for (const r of lines) {
    const status = get(r, idx.status).toLowerCase();
    const type = get(r, idx.type).toLowerCase();
    const when = parseDateTime(get(r, idx.date));
    let amount = parseMoney(get(r, idx.amount));
    // Only completed sales and refunds: no failed or cancelled attempts, no payouts to the bank.
    if (
      !when ||
      amount == null ||
      amount === 0 ||
      /feil|fail|avbrut|cancel|avvist|declin|kansell|pending|venter/.test(status) ||
      /utbetal|payout|overføring|transfer|gebyr|fee/.test(type)
    ) {
      skipped++;
      continue;
    }
    if (/refus|refund|tilbake|retur|chargeback/.test(`${type} ${status}`)) amount = -Math.abs(amount);
    const fee = idx.fee >= 0 ? parseMoney(get(r, idx.fee)) : null;
    const time = get(r, idx.time) ? (parseDateTime(`2000-01-01 ${get(r, idx.time)}`)?.[1] ?? when[1]) : when[1];
    // Files without an id get one from the row's own content, so importing the same file twice adds nothing.
    let ref = get(r, idx.ref);
    if (!ref) {
      const key = `${when[0]}T${time ?? ""}|${amount}`;
      const n = (seen.get(key) ?? 0) + 1;
      seen.set(key, n);
      ref = `${key}#${n}`;
    }
    rows.push({ ref, date: when[0], time, amount, fee: fee == null ? null : Math.abs(fee), method: method(get(r, idx.method)), staff: get(r, idx.staff) || null });
  }
  return { rows, read: lines.length, skipped, missing: [] };
}

export type ImportResult = { read: number; imported: number; skipped: number; from: string | null; to: string | null; missing: string[] };

/** Saves a parsed report as payments. Rows already imported (same provider and id) are skipped. */
export async function importReport(env: Env, provider: ReportProvider, filename: string, text: string, by: string): Promise<ImportResult> {
  const parsed = parseReport(text);
  if (parsed.missing.length) return { read: parsed.read, imported: 0, skipped: parsed.read, from: null, to: null, missing: parsed.missing };
  const staff = (await env.DB.prepare("SELECT id, name FROM staff").all<{ id: number; name: string }>()).results;
  const label = provider === "sumup" ? "SumUp" : "Zettle";
  let imported = 0;
  let skipped = parsed.skipped;
  for (const row of parsed.rows) {
    const who = (row.staff ?? "").toLowerCase();
    const member = staff.find((s) => who && (who === s.name.toLowerCase() || who.startsWith(`${s.name.toLowerCase()} `)));
    const result = await env.DB.prepare(
      `INSERT OR IGNORE INTO payments (staff_id, kind, method, amount_ore, fee_ore, provider, provider_ref, note, paid_at, business_date, recorded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        member?.id ?? null,
        row.amount < 0 ? "refund" : "payment",
        row.method,
        row.amount,
        row.fee,
        provider,
        `file:${row.ref}`,
        `${label}-rapport: ${filename}`.slice(0, 200),
        osloToUtc(row.date, row.time ?? "12:00").toISOString(),
        row.date,
        by,
      )
      .run();
    if (result.meta.changes) imported++;
    else skipped++;
  }
  const dates = parsed.rows.map((r) => r.date).sort();
  const res = { read: parsed.read, imported, skipped, from: dates[0] ?? null, to: dates[dates.length - 1] ?? null, missing: [] };
  await env.DB.prepare("INSERT INTO report_imports (provider, filename, rows_read, imported, skipped, from_date, to_date, imported_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(provider, filename.slice(0, 200), res.read, imported, skipped, res.from, res.to, by)
    .run();
  return res;
}
