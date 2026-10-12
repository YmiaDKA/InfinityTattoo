import type { Env } from "../env";
import { loadAccounting, monthRange, PAYMENT_ACCOUNTING_SELECT, vatOf, voucherLines, type AccountingSettings, type PaymentForAccounting, type VoucherLine } from "./accounting";
import { loadFeatures } from "./features";
import { addDays, businessDate } from "./time";

/**
 * Fiken push (Innstillinger → Integrasjoner → Fiken, off by default). Each night the previous days
 * are posted as one general journal entry ("fri postering") per day through Fiken's API module
 * (99 kr/month, personal API token): Zettle sales, Stripe deposits and gift cards with fees and
 * payouts, gift cards used as payment, sales registered by hand, and each artist's share. Chair rent
 * goes in one entry per month. This replaces a paid Zettle→Fiken connector; it is not a till and
 * never produces a Z-report (that comes from Zettle).
 *
 * Fiken API v2: https://api.fiken.no/api/v2, amounts in øre, one request at a time. VAT codes are
 * Fiken's (3 = sales 25 %, 31 = 15 %, 33 = 12 %). Not yet tried against a live Fiken company, so
 * entries are sent "open" (deletable in Fiken) until the owner switches off trial mode.
 */

const API = "https://api.fiken.no/api/v2";

export type FikenSettings = {
  token: string;
  /** True when the token comes from the FIKEN_API_TOKEN secret instead of the settings table. */
  tokenFromEnv: boolean;
  company: string;
  /** Our 19xx account (bank, Stripe, Zettle) → Fiken's bank account code, e.g. 1920 → 1920:10001. */
  bankMap: Record<string, string>;
  trial: boolean;
};

export async function loadFiken(env: Env): Promise<FikenSettings> {
  const rows = await env.DB.prepare("SELECT key, value FROM settings WHERE key LIKE 'fiken.%'").all<{ key: string; value: string }>();
  const get = (k: string) => rows.results.find((r) => r.key === `fiken.${k}`)?.value ?? "";
  const bankMap: Record<string, string> = {};
  for (const r of rows.results) if (r.key.startsWith("fiken.bank.")) bankMap[r.key.slice("fiken.bank.".length)] = r.value;
  return {
    token: env.FIKEN_API_TOKEN || get("token"),
    tokenFromEnv: Boolean(env.FIKEN_API_TOKEN),
    company: get("company"),
    bankMap,
    trial: get("trial") !== "0",
  };
}

export async function saveFikenSetting(env: Env, key: string, value: string) {
  await env.DB.prepare(
    `INSERT INTO settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
  )
    .bind(`fiken.${key}`, value)
    .run();
}

/** First day to post: the day the push was switched on. Null when it's off. */
export async function fikenSince(env: Env): Promise<string | null> {
  const row = await env.DB.prepare("SELECT updated_at FROM features WHERE key = 'fiken' AND enabled = 1").first<{ updated_at: string }>();
  return row ? businessDate(row.updated_at) : null;
}

// ---------- API ----------

async function call<T>(token: string, path: string, init: RequestInit = {}): Promise<{ data: T | null; location: string | null }> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json", ...(init.body ? { "Content-Type": "application/json" } : {}) },
  });
  if (!res.ok) throw new Error(`Fiken ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const text = await res.text();
  return { data: text ? (JSON.parse(text) as T) : null, location: res.headers.get("Location") };
}

/** Posts a general journal entry ("fri postering") and returns its URL in Fiken. */
export async function postJournal(token: string, company: string, body: { description: string; open: boolean; journalEntries: FikenEntry[] }): Promise<string | null> {
  return (await call<unknown>(token, `/companies/${encodeURIComponent(company)}/generalJournalEntries`, { method: "POST", body: JSON.stringify(body) })).location;
}

/** Attaches a PDF to the journal entry just created (best effort: the Location URL is read back for its id). */
export async function attachPdf(token: string, company: string, location: string, pdf: Uint8Array, filename: string): Promise<void> {
  const res = await fetch(location, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
  if (!res.ok) throw new Error(`Fiken ${res.status}`);
  const data = (await res.json()) as { journalEntryId?: number; journalEntries?: { journalEntryId?: number }[] };
  const id = data.journalEntryId ?? data.journalEntries?.[0]?.journalEntryId;
  if (!id) throw new Error("fant ikke bilaget i Fiken");
  const form = new FormData();
  form.append("filename", filename);
  form.append("file", new Blob([pdf], { type: "application/pdf" }), filename);
  const up = await fetch(`${API}/companies/${encodeURIComponent(company)}/journalEntries/${id}/attachments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!up.ok) throw new Error(`Fiken ${up.status}: ${(await up.text()).slice(0, 200)}`);
}

export type FikenCompany = { slug: string; name: string; organizationNumber?: string; hasApiAccess?: boolean };
export type FikenBankAccount = { accountCode: string; name: string; bankAccountNumber?: string; inactive?: boolean };

export async function fikenCompanies(token: string): Promise<FikenCompany[]> {
  return (await call<FikenCompany[]>(token, "/companies?pageSize=100")).data ?? [];
}

export async function fikenBankAccounts(token: string, company: string): Promise<FikenBankAccount[]> {
  return ((await call<FikenBankAccount[]>(token, `/companies/${encodeURIComponent(company)}/bankAccounts?pageSize=100`)).data ?? []).filter((b) => !b.inactive);
}

// ---------- Building the entries ----------

export type FikenLine = { amount: number; debitAccount: string; creditAccount: string; debitVatCode?: number; creditVatCode?: number };
export type FikenEntry = { description: string; date: string; lines: FikenLine[] };
export type FikenBatch = { ref: string; kind: "day" | "rent"; date: string; total: number; entries: FikenEntry[]; paymentIds: number[]; payoutIds: string[] };

const SALES_VAT_CODE: Record<number, number> = { 25: 3, 15: 31, 12: 33 };

/** Pure: turns one voucher line into a Fiken line, mapping bank accounts and putting VAT on the revenue side. Exported for tests. */
export function toFikenLine(l: VoucherLine, s: AccountingSettings, bankMap: Record<string, string>): FikenLine {
  const map = (acc: string) => (acc.startsWith("19") ? (bankMap[acc] ?? acc) : acc);
  const revenue = [s.accounts.sales_tattoo, s.accounts.sales_piercing];
  const code = s.vatRegistered && l.vatPct ? SALES_VAT_CODE[l.vatPct] : undefined;
  if (l.gross >= 0) {
    return { amount: l.gross, debitAccount: map(l.debit), creditAccount: map(l.credit), ...(code && revenue.includes(l.credit) ? { creditVatCode: code } : {}) };
  }
  // A refund reverses the sale: revenue is debited, and Fiken wants the net amount when the VAT is on the debit side.
  const onDebit = code && revenue.includes(l.credit);
  return {
    amount: onDebit ? -l.gross - vatOf(-l.gross, l.vatPct) : -l.gross,
    debitAccount: map(l.credit),
    creditAccount: map(l.debit),
    ...(onDebit ? { debitVatCode: code } : {}),
  };
}

export type PushPayment = PaymentForAccounting & { staff_id: number | null; studio_share_pct: number | null; staff_name: string | null };

/** Pure: one day's entries (sales lines plus each artist's share). Exported for tests. */
export function dayEntries(date: string, payments: PushPayment[], payouts: { id: string; amount_ore: number; arrival_date: string }[], s: AccountingSettings, bankMap: Record<string, string>): FikenEntry[] {
  const entries: FikenEntry[] = voucherLines(payments, payouts, s, { postZettle: true })
    .filter((l) => l.post && l.gross !== 0)
    .map((l) => ({ description: l.description.slice(0, 200), date, lines: [toFikenLine(l, s, bankMap)] }));

  return [...entries, ...artistEntries(date, payments, s)];
}

/** Pure: each artist's part of what they took in (gift card sales count when the card is used). */
export function artistEntries(date: string, payments: PushPayment[], s: AccountingSettings): FikenEntry[] {
  const byArtist = new Map<string, number>();
  for (const p of payments) {
    if (p.kind === "gift_card_sale" || p.staff_id == null || !p.staff_name) continue;
    const share = p.amount_ore - Math.round((p.amount_ore * (p.studio_share_pct ?? 0)) / 100);
    byArtist.set(p.staff_name, (byArtist.get(p.staff_name) ?? 0) + share);
  }
  const entries: FikenEntry[] = [];
  for (const [name, amount] of byArtist) {
    if (!amount) continue;
    const [debit, credit] = amount > 0 ? [s.accounts.artist_share, s.accounts.artist_payable] : [s.accounts.artist_payable, s.accounts.artist_share];
    entries.push({ description: `Artistens andel, ${name}`, date, lines: [{ amount: Math.abs(amount), debitAccount: debit, creditAccount: credit }] });
  }
  return entries;
}

const lastDay = (month: string) => monthRange(month).to;

/** Payments with what the Fiken entries need: the accounting fields plus the artist and their share. */
export const PUSH_SELECT = PAYMENT_ACCOUNTING_SELECT.replace("SELECT p.id,", "SELECT p.id, p.staff_id, s.studio_share_pct, s.name AS staff_name,");

/** Everything not yet posted, up to yesterday, as batches ready to send. Also used for the preview. */
export async function pendingBatches(env: Env, now = new Date()): Promise<{ batches: FikenBatch[]; unmapped: string[] }> {
  const since = await fikenSince(env);
  if (!since) return { batches: [], unmapped: [] };
  const today = businessDate(now);
  const [s, f, features] = await Promise.all([loadAccounting(env), loadFiken(env), loadFeatures(env)]);
  const [payments, payouts] = await Promise.all([
    env.DB.prepare(
      `${PUSH_SELECT}
       WHERE p.fiken_push_id IS NULL AND p.fiken_bilag_id IS NULL AND p.business_date >= ? AND p.business_date < ?
         AND NOT (p.provider = 'stripe' AND st.fee_ore IS NULL AND p.business_date > ?)
       ORDER BY p.business_date, p.id`,
    )
      // Stripe fees arrive with the nightly sync; wait up to three days for them.
      .bind(since, today, addDays(today, -4))
      .all<PushPayment>(),
    env.DB.prepare("SELECT id, amount_ore, arrival_date FROM stripe_payouts WHERE fiken_push_id IS NULL AND fiken_bilag_id IS NULL AND status = 'paid' AND arrival_date >= ? AND arrival_date < ?")
      .bind(since, today)
      .all<{ id: string; amount_ore: number; arrival_date: string }>(),
  ]);

  const dates = [...new Set([...payments.results.map((p) => p.business_date), ...payouts.results.map((p) => p.arrival_date)])].sort();
  const batches: FikenBatch[] = [];
  for (const date of dates) {
    const ps = payments.results.filter((p) => p.business_date === date);
    const pos = payouts.results.filter((p) => p.arrival_date === date);
    const entries = dayEntries(date, ps, pos, s, f.bankMap);
    batches.push({ ref: date, kind: "day", date, total: ps.reduce((n, p) => n + p.amount_ore, 0), entries, paymentIds: ps.map((p) => p.id), payoutIds: pos.map((p) => p.id) });
  }

  // Chair rent: one entry per finished month.
  if (features.rent) {
    const sent = new Set(
      (
        await env.DB.prepare("SELECT ref FROM fiken_pushes WHERE kind = 'rent' AND status = 'sent' UNION SELECT month FROM fiken_bilag WHERE rent = 1 AND status != 'failed'").all<{
          ref: string;
        }>()
      ).results.map((r) => r.ref),
    );
    const staff = (await env.DB.prepare("SELECT name, monthly_rent_ore FROM staff WHERE active = 1 AND monthly_rent_ore > 0").all<{ name: string; monthly_rent_ore: number }>()).results;
    for (let m = since.slice(0, 7); lastDay(m) < today; m = addDays(lastDay(m), 1).slice(0, 7)) {
      if (sent.has(m) || !staff.length) continue;
      const date = lastDay(m);
      batches.push({
        ref: m,
        kind: "rent",
        date,
        total: staff.reduce((n, x) => n + x.monthly_rent_ore, 0),
        entries: staff.map((x) => ({
          description: `Stolleie ${m}, ${x.name}`,
          date,
          lines: [{ amount: x.monthly_rent_ore, debitAccount: s.accounts.artist_payable, creditAccount: s.accounts.rent_income }],
        })),
        paymentIds: [],
        payoutIds: [],
      });
    }
  }

  const unmapped = [...new Set(batches.flatMap((b) => b.entries.flatMap((e) => e.lines.flatMap((l) => [l.debitAccount, l.creditAccount]))))].filter(
    (a) => /^19\d\d$/.test(a),
  );
  return { batches, unmapped };
}

export type PushResult = { sent: number; failed: number; error?: string };

/** Sends every pending batch, oldest first, one request at a time. Stops at the first failure. */
export async function pushToFiken(env: Env, by: string, now = new Date()): Promise<PushResult> {
  const f = await loadFiken(env);
  if (!f.token || !f.company) return { sent: 0, failed: 0, error: "Fiken er ikke satt opp (API-nøkkel og firma mangler)" };
  const { batches, unmapped } = await pendingBatches(env, now);
  if (unmapped.length) return { sent: 0, failed: 0, error: `Velg Fiken-bankkonto for konto ${unmapped.join(", ")}` };

  let sent = 0;
  for (const b of batches) {
    if (!b.entries.length) continue;
    const body = {
      description: (b.kind === "rent" ? `Stolleie ${b.ref}` : `Studio-salg ${b.ref}`).slice(0, 200),
      open: f.trial,
      journalEntries: b.entries,
    };
    try {
      const location = await postJournal(f.token, f.company, body);
      const row = await env.DB.prepare("INSERT INTO fiken_pushes (kind, ref, status, total_ore, lines_json, location, pushed_by) VALUES (?, ?, 'sent', ?, ?, ?, ?) RETURNING id")
        .bind(b.kind, b.ref, b.total, JSON.stringify(b.entries), location, by)
        .first<{ id: number }>();
      const marks = [
        ...chunk(b.paymentIds, 90).map((ids) => env.DB.prepare(`UPDATE payments SET fiken_push_id = ? WHERE id IN (${ids.map(() => "?").join(",")})`).bind(row!.id, ...ids)),
        ...chunk(b.payoutIds, 90).map((ids) => env.DB.prepare(`UPDATE stripe_payouts SET fiken_push_id = ? WHERE id IN (${ids.map(() => "?").join(",")})`).bind(row!.id, ...ids)),
      ];
      if (marks.length) await env.DB.batch(marks);
      sent++;
    } catch (error) {
      const message = String(error instanceof Error ? error.message : error).slice(0, 500);
      await env.DB.prepare("INSERT INTO fiken_pushes (kind, ref, status, total_ore, lines_json, error, pushed_by) VALUES (?, ?, 'failed', ?, ?, ?, ?)")
        .bind(b.kind, b.ref, b.total, JSON.stringify(b.entries), message, by)
        .run();
      return { sent, failed: 1, error: message };
    }
  }
  return { sent, failed: 0 };
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
