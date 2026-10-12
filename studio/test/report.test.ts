import { describe, expect, it } from "vitest";

import { buildDayReport, parseKroner, type ReportPayment } from "../src/lib/report";

const staff = [
  { id: 1, name: "Filip", studio_share_pct: 0 },
  { id: 2, name: "Nora", studio_share_pct: 40 },
];

describe("buildDayReport", () => {
  const payments: ReportPayment[] = [
    { id: 10, staff_id: 1, kind: "payment", method: "card", amount_ore: 300000 },
    { id: 11, staff_id: 2, kind: "payment", method: "vipps", amount_ore: 70000 },
    { id: 12, staff_id: 2, kind: "product", method: "cash", amount_ore: 30000 },
    { id: 13, staff_id: null, kind: "gift_card_sale", method: "card", amount_ore: 100000 },
    { id: 14, staff_id: 1, kind: "payment", method: "gift_card", amount_ore: 50000 },
    { id: 15, staff_id: 2, kind: "refund", method: "vipps", amount_ore: -10000 },
  ];
  const report = buildDayReport("2026-10-13", payments, staff, 25000);

  it("totals by method and kind", () => {
    expect(report.by_method.card).toBe(400000);
    expect(report.by_method.vipps).toBe(60000);
    expect(report.by_kind.refund).toBe(-10000);
    expect(report.sales_ore).toBe(550000);
    expect(report.net_ore).toBe(540000);
    expect(report.new_money_ore).toBe(490000);
    expect(report.gift_cards_sold_ore).toBe(100000);
  });

  it("splits per artist and leaves gift card sales out", () => {
    const nora = report.by_staff.find((s) => s.staff_id === 2)!;
    expect(nora.gross_ore).toBe(90000);
    expect(nora.studio_ore).toBe(36000);
    expect(nora.artist_ore).toBe(54000);
    expect(report.by_staff.some((s) => s.staff_id === null)).toBe(false);
  });

  it("reconciles cash", () => {
    expect(report.cash_expected_ore).toBe(30000);
    expect(report.cash_difference_ore).toBe(-5000);
    expect(report.first_payment_id).toBe(10);
    expect(report.last_payment_id).toBe(15);
  });
});

describe("parseKroner", () => {
  it("accepts Norwegian formats", () => {
    expect(parseKroner("1 250,50")).toBe(125050);
    expect(parseKroner("1500 kr")).toBe(150000);
    expect(parseKroner("abc")).toBeNull();
  });
});
