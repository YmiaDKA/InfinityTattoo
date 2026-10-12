import { describe, expect, it } from "vitest";

import { ACCOUNTS, type AccountingSettings, type VoucherLine } from "../src/lib/accounting";
import { dayEntries, toFikenLine } from "../src/lib/fiken";
import { buyerComplete, invoiceLines, invoicePdf, sellerMissing, type Invoice, type PaymentForInvoice } from "../src/lib/invoices";

const settings = (vat = true): AccountingSettings => ({
  vatRegistered: vat,
  program: "fiken",
  accountantEmail: "",
  accounts: Object.fromEntries(Object.entries(ACCOUNTS).map(([k, a]) => [k, a.default])) as AccountingSettings["accounts"],
});

const sale = (over: Partial<PaymentForInvoice> = {}): PaymentForInvoice => ({
  id: 7,
  kind: "payment",
  method: "card",
  amount_ore: 250000,
  note: null,
  business_date: "2026-10-12",
  booking_id: 3,
  starts_at: "2026-10-12T10:00:00.000Z",
  service_name: "Tatovering",
  vat_pct: 25,
  staff_name: "Filip",
  client_id: 1,
  name: "Kari Nordmann",
  address: "Storgata 1",
  postcode: "1470",
  city: "Lørenskog",
  email: "kari@example.no",
  ...over,
});

describe("invoiceLines", () => {
  it("includes VAT in the price", () => {
    const [l] = invoiceLines(sale(), true);
    expect(l).toMatchObject({ text: "Tatovering, Filip", amount_ore: 250000, vat_pct: 25, vat_ore: 50000 });
  });

  it("charges no VAT when the studio isn't registered", () => {
    expect(invoiceLines(sale(), false)[0]).toMatchObject({ vat_pct: 0, vat_ore: 0 });
  });

  it("charges no VAT on a gift card when it's sold", () => {
    const [l] = invoiceLines(sale({ kind: "gift_card_sale", note: "Gavekort INF-AAAA-BBBB", booking_id: null }), true);
    expect(l.vat_ore).toBe(0);
    expect(l.text).toContain("INF-AAAA-BBBB");
  });

  it("keeps refunds negative", () => {
    expect(invoiceLines(sale({ kind: "refund", amount_ore: -50000 }), true)[0]).toMatchObject({ amount_ore: -50000, vat_ore: -10000 });
  });
});

describe("invoice requirements", () => {
  it("needs the buyer's name and full address", () => {
    expect(buyerComplete({ name: "Kari", address: "Storgata 1", postcode: "1470", city: "Lørenskog" })).toBe(true);
    expect(buyerComplete({ name: "Kari", address: "", postcode: "1470", city: "Lørenskog" })).toBe(false);
  });

  it("needs the seller's org number and address", () => {
    const c = { name: "Infinity Tattoo", orgNumber: "", address: "", postcode: "", city: "", email: "", phone: "", bankAccount: "" };
    expect(sellerMissing(c)).toEqual(["org.nr.", "adresse"]);
    expect(sellerMissing({ ...c, orgNumber: "123456789", address: "Skårersletta 48c", postcode: "1473", city: "Lørenskog" })).toEqual([]);
  });

  it("renders a PDF with the number, buyer and VAT", () => {
    const inv: Invoice = {
      id: 1,
      number: 12,
      kind: "invoice",
      payment_id: 7,
      credits_invoice_id: null,
      issue_date: "2026-10-12",
      delivery_date: "2026-10-12",
      client_id: 1,
      buyer_name: "Kari Nordmann",
      buyer_address: "Storgata 1",
      buyer_postcode: "1470",
      buyer_city: "Lørenskog",
      buyer_email: null,
      seller_json: JSON.stringify({ name: "Infinity Tattoo", orgNumber: "123 456 789", address: "Skårersletta 48c", postcode: "1473", city: "Lørenskog", email: "", phone: "", bankAccount: "", vatRegistered: true }),
      lines_json: JSON.stringify(invoiceLines(sale(), true)),
      total_ore: 250000,
      vat_ore: 50000,
      method: "card",
      issued_by: "test",
      email_status: null,
      emailed_at: null,
      created_at: "2026-10-12T12:00:00Z",
    };
    const text = new TextDecoder("latin1").decode(invoicePdf(inv));
    expect(text.startsWith("%PDF-1.4")).toBe(true);
    for (const s of ["FAKTURA", "Kari Nordmann", "Org.nr. 123 456 789 MVA", "Mva 25 %"]) expect(text).toContain(s);
  });
});

const line = (over: Partial<VoucherLine>): VoucherLine => ({
  date: "2026-10-12",
  source: "Zettle (kassen)",
  description: "Zettle (kassen), 1 betaling",
  gross: 100000,
  vatPct: 25,
  vat: 20000,
  fee: null,
  net: null,
  debit: "1941",
  credit: "3000",
  payoutDate: null,
  reference: "x",
  post: true,
  ...over,
});

describe("Fiken lines", () => {
  const bank = { "1920": "1920:10001", "1941": "1941:10002", "1940": "1940:10003" };

  it("maps bank accounts and puts sales VAT on the revenue side", () => {
    expect(toFikenLine(line({}), settings(), bank)).toEqual({ amount: 100000, debitAccount: "1941:10002", creditAccount: "3000", creditVatCode: 3 });
  });

  it("reverses a refund with the VAT on the debit side, net amount", () => {
    expect(toFikenLine(line({ gross: -50000, vat: -10000 }), settings(), bank)).toEqual({ amount: 40000, debitAccount: "3000", debitVatCode: 3, creditAccount: "1941:10002" });
  });

  it("sends no VAT code for gift cards or when not VAT-registered", () => {
    expect(toFikenLine(line({ credit: "2900", vatPct: 0 }), settings(), bank)).not.toHaveProperty("creditVatCode");
    expect(toFikenLine(line({}), settings(false), bank)).not.toHaveProperty("creditVatCode");
  });

  it("posts Zettle sales and each artist's share for the day", () => {
    const p = {
      id: 1,
      business_date: "2026-10-12",
      kind: "payment",
      method: "card",
      amount_ore: 200000,
      provider: "zettle",
      provider_ref: "z1",
      service_kind: "tattoo",
      vat_pct: 25,
      staff_role: "artist",
      fee_ore: null,
      net_ore: null,
      payout_date: null,
      staff_id: 2,
      studio_share_pct: 40,
      staff_name: "Filip",
    };
    const entries = dayEntries("2026-10-12", [p], [], settings(), bank);
    expect(entries).toHaveLength(2);
    expect(entries[0].lines[0]).toEqual({ amount: 200000, debitAccount: "1941:10002", creditAccount: "3000", creditVatCode: 3 });
    expect(entries[1]).toMatchObject({ description: "Artistens andel, Filip", lines: [{ amount: 120000, debitAccount: "4500", creditAccount: "2990" }] });
  });
});
