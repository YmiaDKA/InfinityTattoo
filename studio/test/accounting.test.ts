import { describe, expect, it } from "vitest";

import { ACCOUNTS, voucherLines, type AccountingSettings } from "../src/lib/accounting";
import { renderPdf } from "../src/lib/pdf";

const settings = (vat = true): AccountingSettings => ({
  vatRegistered: vat,
  program: "fiken",
  accountantEmail: "",
  accounts: Object.fromEntries(Object.entries(ACCOUNTS).map(([k, a]) => [k, a.default])) as AccountingSettings["accounts"],
});

const pay = (over: Partial<Parameters<typeof voucherLines>[0][number]>) => ({
  id: 1,
  business_date: "2026-09-02",
  kind: "payment",
  method: "card",
  amount_ore: 100000,
  provider: "manual",
  provider_ref: null,
  service_kind: "tattoo",
  vat_pct: 25,
  staff_role: "artist",
  fee_ore: null,
  net_ore: null,
  payout_date: null,
  ...over,
});

describe("voucherLines", () => {
  it("books a Stripe deposit to the clearing account with VAT and a separate fee line", () => {
    const lines = voucherLines([pay({ kind: "deposit", provider: "stripe", provider_ref: "pi_1", amount_ore: 50000, fee_ore: 930, net_ore: 49070, payout_date: "2026-09-04" })], [], settings());
    expect(lines).toHaveLength(2);
    const [sale, fee] = lines;
    expect(sale).toMatchObject({ debit: "1940", credit: "3000", gross: 50000, vat: 10000, fee: 930, net: 49070, payoutDate: "2026-09-04", post: true });
    expect(fee).toMatchObject({ source: "Stripe-gebyr", debit: "7770", credit: "1940", gross: 930 });
  });

  it("puts gift card sales on the liability account without VAT, and VAT when the card is used", () => {
    const lines = voucherLines(
      [
        pay({ id: 1, kind: "gift_card_sale", provider: "stripe", provider_ref: "pi_2", service_kind: null, staff_role: null }),
        pay({ id: 2, method: "gift_card", amount_ore: 40000, service_kind: "piercing", staff_role: "piercer" }),
      ],
      [],
      settings(),
    );
    expect(lines.find((l) => l.credit === "2900")).toMatchObject({ vat: 0, vatPct: 0 });
    expect(lines.find((l) => l.debit === "2900")).toMatchObject({ credit: "3010", vat: 8000 });
  });

  it("marks Zettle sales as not posted here, groups per day, and drops VAT when not registered", () => {
    const lines = voucherLines(
      [pay({ id: 1, provider: "zettle", provider_ref: "a" }), pay({ id: 2, provider: "zettle", provider_ref: "b" }), pay({ id: 3, method: "cash" })],
      [{ id: "po_1", amount_ore: 12345, arrival_date: "2026-09-03" }],
      settings(false),
    );
    const zettle = lines.find((l) => l.source.startsWith("Zettle"))!;
    expect(zettle).toMatchObject({ post: false, gross: 200000, vat: 0, reference: "a b" });
    expect(lines.find((l) => l.debit === "1900")).toMatchObject({ credit: "3000", vat: 0 });
    expect(lines.find((l) => l.source === "Utbetaling fra Stripe")).toMatchObject({ debit: "1920", credit: "1940", gross: 12345 });
  });
});

describe("renderPdf", () => {
  it("writes a PDF with a valid cross-reference table and Norwegian letters", () => {
    const bytes = renderPdf([{ texts: [{ x: 50, y: 800, text: "Månedsoppsummering – æøå (test)" }], lines: [] }], "Test");
    const text = new TextDecoder("latin1").decode(bytes);
    expect(text.startsWith("%PDF-1.4")).toBe(true);
    const xref = Number(text.match(/startxref\n(\d+)/)![1]);
    expect(text.slice(xref, xref + 4)).toBe("xref");
    const offsets = [...text.matchAll(/(\d{10}) 00000 n /g)].map((m) => Number(m[1]));
    offsets.forEach((o, i) => expect(text.slice(o).startsWith(`${i + 1} 0 obj`)).toBe(true));
    expect(text).toContain("M\xe5nedsoppsummering \x96 \xe6\xf8\xe5 \\(test\\)");
  });
});
