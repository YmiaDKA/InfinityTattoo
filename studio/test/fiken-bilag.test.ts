import { describe, expect, it } from "vitest";

import { ACCOUNTS, voucherLines, type AccountingSettings } from "../src/lib/accounting";
import { bilagPdf, sumLines } from "../src/lib/fiken-bilag";
import { parseMoney, parseReport } from "../src/lib/report-import";

const settings = (): AccountingSettings => ({
  vatRegistered: true,
  program: "fiken",
  accountantEmail: "",
  accounts: Object.fromEntries(Object.entries(ACCOUNTS).map(([k, a]) => [k, a.default])) as AccountingSettings["accounts"],
});

describe("report files", () => {
  it("reads a SumUp-style export with fees, refunds and failed rows", () => {
    const csv = [
      "Transaksjons-ID;Dato;Type;Status;Betalingsmåte;Totalbeløp;Gebyr",
      "TX1;12.10.2026 14:05;Salg;Vellykket;Visa;1 500,00;22,35",
      "TX2;12.10.2026 15:00;Salg;Feilet;Visa;800,00;0,00",
      "TX3;13.10.2026 10:30;Refusjon;Vellykket;Mastercard;200,00;0,00",
      "TX4;14.10.2026;Utbetaling;Vellykket;;1 277,65;",
    ].join("\r\n");
    const r = parseReport(csv);
    expect(r.missing).toEqual([]);
    expect(r.skipped).toBe(2);
    expect(r.rows).toEqual([
      { ref: "TX1", date: "2026-10-12", time: "14:05", amount: 150000, fee: 2235, method: "card", staff: null },
      { ref: "TX3", date: "2026-10-13", time: "10:30", amount: -20000, fee: 0, method: "card", staff: null },
    ]);
  });

  it("reads an English comma-separated export and makes stable ids when there are none", () => {
    const csv = 'Date,Amount,Payment method,Staff\n2026-10-12 11:00,"1,250.00",Vipps,Filip\n2026-10-12 11:00,"1,250.00",Vipps,Filip\n';
    const r = parseReport(csv);
    expect(r.rows.map((x) => [x.ref, x.amount, x.method, x.staff])).toEqual([
      ["2026-10-12T11:00|125000#1", 125000, "vipps", "Filip"],
      ["2026-10-12T11:00|125000#2", 125000, "vipps", "Filip"],
    ]);
  });

  it("says which columns are missing", () => {
    expect(parseReport("Navn;Notat\nKari;hei").missing).toEqual(["date", "amount"]);
  });

  it("understands Norwegian and English money", () => {
    expect(parseMoney("1 234,50 kr")).toBe(123450);
    expect(parseMoney("1,234.50")).toBe(123450);
    expect(parseMoney("−500")).toBe(-50000);
    expect(parseMoney("abc")).toBeNull();
  });
});

describe("month lines for Fiken", () => {
  const pay = (over: Record<string, unknown>) => ({
    id: 1,
    business_date: "2026-10-12",
    kind: "payment",
    method: "card",
    amount_ore: 100000,
    provider: "sumup",
    provider_ref: "a",
    service_kind: "tattoo",
    vat_pct: 25,
    staff_role: "artist",
    fee_ore: 1490,
    net_ore: 98510,
    payout_date: null,
    ...over,
  });

  it("sums a month into one line per account pair, refunds netted, fees on their own line", () => {
    const s = settings();
    const vls = voucherLines(
      [pay({}), pay({ id: 2, business_date: "2026-10-20", provider_ref: "b", amount_ore: 50000, fee_ore: 745 }), pay({ id: 3, kind: "refund", provider_ref: "c", amount_ore: -20000, fee_ore: 0 })],
      [],
      s,
      { postZettle: true },
    );
    const lines = sumLines(vls, s, { "1942": "1942:10004" });
    expect(lines).toEqual([
      { description: "SumUp", amount: 130000, debitAccount: "1942:10004", creditAccount: "3000", creditVatCode: 3 },
      { description: "SumUp-gebyr", amount: 2235, debitAccount: "7770", creditAccount: "1942:10004" },
    ]);
  });

  it("renders the PDF with the lines", () => {
    const pdf = bilagPdf(
      {
        id: 4,
        month: "2026-10",
        status: "approved",
        approved_by: "eier@example.no",
        created_at: "2026-11-02T10:00:00Z",
        lines_json: JSON.stringify([{ description: "SumUp", amount: 130000, debitAccount: "1942", creditAccount: "3000", creditVatCode: 3 }]),
        overview_json: JSON.stringify({ date: "2026-10-31", sources: [{ name: "SumUp", gross: 130000, fee: 2235, count: 3 }], payouts: [], artists: 0, rent: 0 }),
      },
      { name: "Infinity Tattoo" },
    );
    const text = new TextDecoder("latin1").decode(pdf);
    for (const s of ["Bilag til Fiken", "fri postering", "1942", "3000"]) expect(text).toContain(s);
  });
});
