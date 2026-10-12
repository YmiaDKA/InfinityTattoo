import type { Env } from "../env";
import { addDays } from "./time";

/**
 * The monthly file for the accountant. It covers what the till (Zettle) never sees: online deposits
 * and gift cards through Stripe, gift cards used as payment, payments typed in by hand, and each
 * artist's share. Zettle's own sales reach the accounting program through Zettle's connector, so
 * they are listed for checking only and marked "not posted here". This is never a till report.
 */

export const ACCOUNTS = {
  sales_tattoo: { label: "Salg tatovering", default: "3000" },
  sales_piercing: { label: "Salg piercing, tooth gems og smykker", default: "3010" },
  gift_card_liability: { label: "Gavekort (gjeld til kunder)", default: "2900" },
  stripe_clearing: { label: "Stripe (mellomkonto)", default: "1940" },
  fees: { label: "Kortgebyrer", default: "7770" },
  bank: { label: "Bank", default: "1920" },
  cash: { label: "Kontanter", default: "1900" },
  rent_income: { label: "Stolleie fra artister", default: "3600" },
  sumup_clearing: { label: "SumUp (mellomkonto)", default: "1942" },
  // Only used by the Fiken push, which also posts Zettle's sales and the artists' share.
  zettle_clearing: { label: "Zettle (mellomkonto, brukes med Fiken)", default: "1941" },
  artist_share: { label: "Artistenes andel (brukes med Fiken)", default: "4500" },
  artist_payable: { label: "Skyldig artister (brukes med Fiken)", default: "2990" },
} as const;

export type AccountKey = keyof typeof ACCOUNTS;

export const PROGRAMS = { fiken: "Fiken", tripletex: "Tripletex", poweroffice: "PowerOffice Go", other: "Annet" } as const;

export type AccountingSettings = {
  vatRegistered: boolean;
  program: keyof typeof PROGRAMS;
  accountantEmail: string;
  accounts: Record<AccountKey, string>;
};

export async function loadAccounting(env: Env): Promise<AccountingSettings> {
  const rows = await env.DB.prepare("SELECT key, value FROM settings WHERE key LIKE 'acc.%'").all<{ key: string; value: string }>();
  const get = (k: string) => rows.results.find((r) => r.key === `acc.${k}`)?.value;
  const program = get("program");
  return {
    vatRegistered: get("vat_registered") !== "0",
    program: program && program in PROGRAMS ? (program as keyof typeof PROGRAMS) : "fiken",
    accountantEmail: get("accountant_email") ?? "",
    accounts: Object.fromEntries(Object.entries(ACCOUNTS).map(([k, a]) => [k, get(`account.${k}`) || a.default])) as Record<AccountKey, string>,
  };
}

export async function saveAccounting(env: Env, s: AccountingSettings) {
  const entries: [string, string][] = [
    ["vat_registered", s.vatRegistered ? "1" : "0"],
    ["program", s.program],
    ["accountant_email", s.accountantEmail],
    ...Object.entries(s.accounts).map(([k, v]) => [`account.${k}`, v] as [string, string]),
  ];
  await env.DB.batch(
    entries.map(([k, v]) =>
      env.DB.prepare(
        `INSERT INTO settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
      ).bind(`acc.${k}`, v),
    ),
  );
}

export function monthRange(month: string): { from: string; to: string } {
  const [y, m] = month.split("-").map(Number);
  const next = m === 12 ? `${y + 1}-01-01` : `${y}-${String(m + 1).padStart(2, "0")}-01`;
  return { from: `${month}-01`, to: addDays(next, -1) };
}

export function isMonth(value: string | undefined): value is string {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value ?? "");
}

// ---------- Voucher lines ----------

export type VoucherLine = {
  date: string;
  source: string;
  description: string;
  gross: number;
  vatPct: number;
  vat: number;
  fee: number | null;
  net: number | null;
  debit: string;
  credit: string;
  payoutDate: string | null;
  reference: string;
  /** False for Zettle sales: they reach the accounting program through Zettle's own connector. */
  post: boolean;
};

export type PaymentForAccounting = {
  id: number;
  business_date: string;
  kind: string;
  method: string;
  amount_ore: number;
  provider: string | null;
  provider_ref: string | null;
  service_kind: string | null;
  vat_pct: number | null;
  staff_role: string | null;
  fee_ore: number | null;
  net_ore: number | null;
  payout_date: string | null;
};

export const vatOf = (gross: number, pct: number) => (pct ? Math.round((gross * pct) / (100 + pct)) : 0);

/** Pure: turns a month's payments (and Stripe payouts) into grouped voucher lines. Exported for tests. */
export function voucherLines(
  payments: PaymentForAccounting[],
  payouts: { id: string; amount_ore: number; arrival_date: string }[],
  s: AccountingSettings,
  /** The Fiken push posts Zettle's sales too (through a clearing account), replacing a paid connector. */
  options: { postZettle?: boolean } = {},
): VoucherLine[] {
  const a = s.accounts;
  const groups = new Map<string, VoucherLine & { refs: string[] }>();

  for (const p of payments) {
    const piercing = p.kind === "product" || p.service_kind === "piercing" || p.service_kind === "tooth_gem" || (!p.service_kind && p.staff_role === "piercer");
    const revenue = piercing ? a.sales_piercing : a.sales_tattoo;
    const byMethod = p.method === "cash" ? a.cash : a.bank;
    const salesVat = s.vatRegistered ? (p.vat_pct ?? 25) : 0;
    let source: string, debit: string, credit: string, vatPct: number, post = true;

    if (p.provider === "stripe") {
      debit = a.stripe_clearing;
      if (p.kind === "gift_card_sale") [source, credit, vatPct] = ["Gavekort solgt på nett (Stripe)", a.gift_card_liability, 0];
      else [source, credit, vatPct] = ["Depositum på nett (Stripe)", revenue, salesVat];
    } else if (p.method === "gift_card") {
      [source, debit, credit, vatPct] = ["Gavekort brukt som betaling", a.gift_card_liability, revenue, salesVat];
    } else if (p.kind === "gift_card_sale") {
      [source, debit, credit, vatPct] = ["Gavekort solgt i studio", p.provider === "sumup" ? a.sumup_clearing : byMethod, a.gift_card_liability, 0];
      if (p.provider === "zettle") [debit, post] = options.postZettle ? [a.zettle_clearing, true] : [debit, false];
    } else if (p.provider === "sumup") {
      // SumUp has no connector to the accounting programs, so its sales are always posted from here.
      [source, debit, credit, vatPct] = ["SumUp", a.sumup_clearing, revenue, salesVat];
    } else if (p.provider === "zettle") {
      [source, debit, credit, vatPct, post] = options.postZettle
        ? ["Zettle (kassen)", a.zettle_clearing, revenue, salesVat, true]
        : ["Zettle (kassen)", a.bank, revenue, salesVat, false];
    } else {
      [source, debit, credit, vatPct] = ["Registrert for hånd", byMethod, revenue, salesVat];
    }

    const key = [p.business_date, source, debit, credit, vatPct].join("|");
    const g =
      groups.get(key) ??
      ({ date: p.business_date, source, description: "", gross: 0, vatPct, vat: 0, fee: null, net: null, debit, credit, payoutDate: null, reference: "", post, refs: [] } as VoucherLine & { refs: string[] });
    g.gross += p.amount_ore;
    if (p.fee_ore != null) {
      g.fee = (g.fee ?? 0) + p.fee_ore;
      g.net = (g.net ?? 0) + (p.net_ore ?? p.amount_ore - p.fee_ore);
    }
    if (p.payout_date && (!g.payoutDate || p.payout_date > g.payoutDate)) g.payoutDate = p.payout_date;
    g.refs.push(p.provider_ref ?? `#${p.id}`);
    groups.set(key, g);
  }

  const lines: VoucherLine[] = [];
  for (const g of groups.values()) {
    const { refs, ...line } = g;
    line.vat = vatOf(line.gross, line.vatPct);
    line.description = `${line.source}, ${refs.length} ${refs.length === 1 ? "betaling" : "betalinger"}`;
    line.reference = refs.join(" ").slice(0, 240);
    lines.push(line);
    // Stripe, SumUp and Zettle keep their fee before paying out; book it as a cost against the clearing account.
    const clearing = { [a.stripe_clearing]: "Stripe", [a.sumup_clearing]: "SumUp", [a.zettle_clearing]: "Zettle" }[line.debit];
    if (clearing && line.fee) {
      lines.push({
        date: line.date,
        source: `${clearing}-gebyr`,
        description:
          clearing === "Stripe" ? (line.source.startsWith("Gavekort") ? "Stripe-gebyr på gavekort" : "Stripe-gebyr på depositum") : `${clearing}-gebyr`,
        gross: line.fee,
        vatPct: 0,
        vat: 0,
        fee: null,
        net: null,
        debit: a.fees,
        credit: line.debit,
        payoutDate: line.payoutDate,
        reference: line.reference,
        post: true,
      });
    }
  }
  for (const po of payouts) {
    lines.push({
      date: po.arrival_date,
      source: "Utbetaling fra Stripe",
      description: "Overført fra Stripe til banken",
      gross: po.amount_ore,
      vatPct: 0,
      vat: 0,
      fee: null,
      net: null,
      debit: a.bank,
      credit: a.stripe_clearing,
      payoutDate: po.arrival_date,
      reference: po.id,
      post: true,
    });
  }
  return lines.sort((x, y) => x.date.localeCompare(y.date) || x.source.localeCompare(y.source));
}

// ---------- Artist settlement ----------

export type ArtistLine = {
  id: number;
  name: string;
  sharePct: number;
  gross: number;
  studio: number;
  rent: number;
  /** What the artist gets; negative means the artist owes the studio. */
  artist: number;
  count: number;
};

/** Turnover per artist (gift card sales count when the card is used), studio share and chair rent. */
export async function artistSettlement(env: Env, from: string, to: string, rentMonths: number, withRent: boolean): Promise<ArtistLine[]> {
  const [staff, payments] = await Promise.all([
    env.DB.prepare("SELECT id, name, studio_share_pct, monthly_rent_ore FROM staff ORDER BY id").all<{
      id: number;
      name: string;
      studio_share_pct: number;
      monthly_rent_ore: number;
    }>(),
    env.DB.prepare(
      "SELECT staff_id, SUM(amount_ore) AS gross, COUNT(*) AS n FROM payments WHERE business_date BETWEEN ? AND ? AND kind != 'gift_card_sale' AND staff_id IS NOT NULL GROUP BY staff_id",
    )
      .bind(from, to)
      .all<{ staff_id: number; gross: number; n: number }>(),
  ]);
  return staff.results.map((s) => {
    const row = payments.results.find((p) => p.staff_id === s.id);
    const gross = row?.gross ?? 0;
    const studio = Math.round((gross * s.studio_share_pct) / 100) || 0;
    const rent = withRent ? (s.monthly_rent_ore ?? 0) * rentMonths : 0;
    return { id: s.id, name: s.name, sharePct: s.studio_share_pct, gross, studio, rent, artist: gross - studio - rent, count: row?.n ?? 0 };
  });
}

// ---------- The month ----------

export type MonthData = {
  month: string;
  from: string;
  to: string;
  settings: AccountingSettings;
  lines: VoucherLine[];
  artists: ArtistLine[];
  giftCardLiability: number;
  depositsHeld: number;
  days: { date: string; zettle: number; other: number; reportSeq: number | null }[];
  stripeMissingFees: number;
};

export const PAYMENT_ACCOUNTING_SELECT = `SELECT p.id, p.business_date, p.kind, p.method, p.amount_ore, p.provider, p.provider_ref,
            sv.kind AS service_kind, CASE WHEN p.kind = 'product' THEN COALESCE(pr.vat_pct, 25) ELSE sv.vat_pct END AS vat_pct, s.role AS staff_role,
            COALESCE(st.fee_ore, p.fee_ore) AS fee_ore,
            COALESCE(st.net_ore, p.amount_ore - p.fee_ore) AS net_ore, st.payout_date
     FROM payments p
     LEFT JOIN bookings b ON b.id = p.booking_id
     LEFT JOIN services sv ON sv.id = b.service_id
     LEFT JOIN staff s ON s.id = p.staff_id
     LEFT JOIN products pr ON pr.id = p.product_id
     LEFT JOIN stripe_transactions st ON p.provider = 'stripe' AND st.provider_ref = p.provider_ref`;

function paymentsForAccounting(env: Env, from: string, to: string) {
  return env.DB.prepare(
    `${PAYMENT_ACCOUNTING_SELECT} WHERE p.business_date BETWEEN ? AND ? ORDER BY p.business_date, p.id`,
  )
    .bind(from, to)
    .all<PaymentForAccounting>();
}

export type Revenue = { rent: number; service: number; product: number; total: number; fees: number; vat: number; net: number; giftCardsSold: number };

/** The numbers on Rapporter → Omsetning (Linework's Revenue report) for any period. */
export async function revenueSummary(env: Env, from: string, to: string, rentMonths: number): Promise<Revenue> {
  const [settings, payments, rent] = await Promise.all([
    loadAccounting(env),
    paymentsForAccounting(env, from, to),
    rentMonths ? env.DB.prepare("SELECT COALESCE(SUM(monthly_rent_ore), 0) AS n FROM staff WHERE active = 1").first<{ n: number }>() : null,
  ]);
  const r: Revenue = { rent: (rent?.n ?? 0) * rentMonths, service: 0, product: 0, total: 0, fees: 0, vat: 0, net: 0, giftCardsSold: 0 };
  for (const p of payments.results) {
    r.fees += p.fee_ore ?? 0;
    if (p.kind === "gift_card_sale") {
      r.giftCardsSold += p.amount_ore;
      continue;
    }
    if (p.kind === "product") r.product += p.amount_ore;
    else r.service += p.amount_ore;
    r.vat += vatOf(p.amount_ore, settings.vatRegistered ? (p.vat_pct ?? 25) : 0);
  }
  r.total = r.rent + r.service + r.product;
  r.net = r.total - r.fees - r.vat;
  return r;
}

export async function buildMonth(env: Env, month: string, withRent: boolean): Promise<MonthData> {
  const { from, to } = monthRange(month);
  const settings = await loadAccounting(env);
  const endIso = `${addDays(to, 1)}T00:00:00.000Z`;
  const [payments, payouts, artists, liability, held, reports] = await Promise.all([
    paymentsForAccounting(env, from, to),
    env.DB.prepare("SELECT id, amount_ore, arrival_date FROM stripe_payouts WHERE arrival_date BETWEEN ? AND ? AND status = 'paid' ORDER BY arrival_date")
      .bind(from, to)
      .all<{ id: string; amount_ore: number; arrival_date: string }>(),
    artistSettlement(env, from, to, 1, withRent),
    env.DB.prepare(
      "SELECT COALESCE(SUM(m.amount_ore), 0) AS n FROM gift_card_movements m JOIN gift_cards g ON g.id = m.gift_card_id WHERE g.status != 'pending' AND m.at < ?",
    )
      .bind(endIso)
      .first<{ n: number }>(),
    env.DB.prepare(
      `SELECT COALESCE(SUM(p.amount_ore), 0) AS n FROM payments p JOIN bookings b ON b.id = p.booking_id
       WHERE p.kind = 'deposit' AND p.business_date <= ? AND b.status IN ('requested', 'confirmed') AND (b.starts_at IS NULL OR b.starts_at >= ?)`,
    )
      .bind(to, endIso)
      .first<{ n: number }>(),
    env.DB.prepare("SELECT business_date, seq FROM day_reports WHERE business_date BETWEEN ? AND ?").bind(from, to).all<{ business_date: string; seq: number }>(),
  ]);

  const byDay = new Map<string, { zettle: number; other: number }>();
  for (const p of payments.results) {
    const d = byDay.get(p.business_date) ?? { zettle: 0, other: 0 };
    if (p.provider === "zettle") d.zettle += p.amount_ore;
    else d.other += p.amount_ore;
    byDay.set(p.business_date, d);
  }
  const days = [...byDay.entries()]
    .sort(([x], [y]) => x.localeCompare(y))
    .map(([date, v]) => ({ date, ...v, reportSeq: reports.results.find((r) => r.business_date === date)?.seq ?? null }));

  return {
    month,
    from,
    to,
    settings,
    lines: voucherLines(payments.results, payouts.results, settings),
    artists: artists.filter((a) => a.count > 0 || a.rent > 0),
    giftCardLiability: liability?.n ?? 0,
    depositsHeld: held?.n ?? 0,
    days,
    stripeMissingFees: payments.results.filter((p) => p.provider === "stripe" && p.fee_ore == null).length,
  };
}

// ---------- Files ----------

const kr = (ore: number | null) => (ore == null ? "" : (ore / 100).toFixed(2).replace(".", ","));
const cell = (v: unknown) => {
  const s = v == null ? "" : String(v);
  return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
/** Semicolons, comma decimals, UTF-8 with BOM and CRLF: opens in Norwegian Excel and imports into the accounting programs. */
const csv = (rows: unknown[][]) => `﻿${rows.map((r) => r.map(cell).join(";")).join("\r\n")}\r\n`;

export function voucherCsv(d: MonthData): string {
  return csv([
    ["Dato", "Kilde", "Beskrivelse", "Brutto", "Mva-sats", "Mva-beløp", "Gebyr", "Netto", "Debet", "Kredit", "Utbetalingsdato", "Referanse", "Bokføres her"],
    ...d.lines.map((l) => [
      l.date,
      l.source,
      l.description,
      kr(l.gross),
      `${l.vatPct} %`,
      kr(l.vat),
      kr(l.fee),
      kr(l.net),
      l.debit,
      l.credit,
      l.payoutDate ?? "",
      l.reference,
      l.post ? "Ja" : "Nei (kommer fra Zettle)",
    ]),
  ]);
}

export function artistCsv(d: MonthData): string {
  return csv([
    ["Måned", "Artist", "Omsetning", "Studioandel %", "Studioandel", "Stolleie", "Artistens andel", "Antall betalinger"],
    ...d.artists.map((a) => [d.month, a.name, kr(a.gross), a.sharePct, kr(a.studio), kr(a.rent), kr(a.artist), a.count]),
  ]);
}

export function sourceTotals(d: MonthData) {
  const map = new Map<string, { gross: number; vat: number; post: boolean }>();
  for (const l of d.lines) {
    const t = map.get(l.source) ?? { gross: 0, vat: 0, post: l.post };
    t.gross += l.gross;
    t.vat += l.vat;
    map.set(l.source, t);
  }
  return [...map.entries()].map(([source, t]) => ({ source, ...t }));
}
