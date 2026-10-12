export const PAYMENT_METHODS = ["card", "vipps", "cash", "gift_card", "bank", "other"] as const;
export const PAYMENT_KINDS = ["deposit", "payment", "refund", "gift_card_sale", "product"] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type PaymentKind = (typeof PAYMENT_KINDS)[number];

export type ReportPayment = {
  id: number;
  staff_id: number | null;
  kind: PaymentKind;
  method: PaymentMethod;
  amount_ore: number;
};

export type ReportStaff = { id: number; name: string; studio_share_pct: number };

export type StaffLine = {
  staff_id: number | null;
  name: string;
  count: number;
  gross_ore: number;
  studio_ore: number;
  artist_ore: number;
};

export type DayReport = {
  business_date: string;
  payment_count: number;
  first_payment_id: number | null;
  last_payment_id: number | null;
  sales_ore: number; // everything except refunds
  refunds_ore: number; // negative or zero
  net_ore: number;
  /** Money that actually came in today: net minus gift card redemptions (already paid earlier). */
  new_money_ore: number;
  by_method: Record<PaymentMethod, number>;
  by_kind: Record<PaymentKind, number>;
  by_staff: StaffLine[];
  gift_cards_sold_ore: number;
  deposits_ore: number;
  cash_expected_ore: number;
  cash_counted_ore: number | null;
  cash_difference_ore: number | null;
};

export function buildDayReport(
  businessDate: string,
  payments: ReportPayment[],
  staff: ReportStaff[],
  countedCashOre: number | null = null,
): DayReport {
  const byMethod = Object.fromEntries(PAYMENT_METHODS.map((m) => [m, 0])) as Record<PaymentMethod, number>;
  const byKind = Object.fromEntries(PAYMENT_KINDS.map((k) => [k, 0])) as Record<PaymentKind, number>;
  const staffLines = new Map<number | null, StaffLine>();
  const staffById = new Map(staff.map((s) => [s.id, s]));

  let sales = 0;
  let refunds = 0;

  for (const p of payments) {
    byMethod[p.method] += p.amount_ore;
    byKind[p.kind] += p.amount_ore;
    if (p.kind === "refund") refunds += p.amount_ore;
    else sales += p.amount_ore;

    // Gift card sales are a liability, not anyone's work yet.
    if (p.kind === "gift_card_sale") continue;

    const member = p.staff_id == null ? undefined : staffById.get(p.staff_id);
    const key = member ? member.id : null;
    const line =
      staffLines.get(key) ??
      ({ staff_id: key, name: member?.name ?? "Studio", count: 0, gross_ore: 0, studio_ore: 0, artist_ore: 0 } as StaffLine);
    line.count += 1;
    line.gross_ore += p.amount_ore;
    staffLines.set(key, line);
  }

  for (const line of staffLines.values()) {
    const pct = line.staff_id == null ? 100 : (staffById.get(line.staff_id)?.studio_share_pct ?? 0);
    line.studio_ore = Math.round((line.gross_ore * pct) / 100) || 0;
    line.artist_ore = line.gross_ore - line.studio_ore;
  }

  const ids = payments.map((p) => p.id);
  const net = sales + refunds;
  const cashExpected = byMethod.cash;

  return {
    business_date: businessDate,
    payment_count: payments.length,
    first_payment_id: ids.length ? Math.min(...ids) : null,
    last_payment_id: ids.length ? Math.max(...ids) : null,
    sales_ore: sales,
    refunds_ore: refunds,
    net_ore: net,
    new_money_ore: net - byMethod.gift_card,
    by_method: byMethod,
    by_kind: byKind,
    by_staff: [...staffLines.values()].sort((a, b) => b.gross_ore - a.gross_ore),
    gift_cards_sold_ore: byKind.gift_card_sale,
    deposits_ore: byKind.deposit,
    cash_expected_ore: cashExpected,
    cash_counted_ore: countedCashOre,
    cash_difference_ore: countedCashOre == null ? null : countedCashOre - cashExpected,
  };
}

const nok = new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" });

export function formatOre(ore: number | null | undefined): string {
  if (ore == null) return "–";
  return nok.format(ore / 100);
}

/** Parses "1 250,50", "1250.5" or "1250" kroner into øre. */
export function parseKroner(input: string): number | null {
  const cleaned = input.replace(/\s|kr|NOK/gi, "").replace(",", ".");
  if (!/^-?\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  return Math.round(Number(cleaned) * 100);
}
