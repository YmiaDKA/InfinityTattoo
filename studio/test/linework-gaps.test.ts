import { describe, expect, it } from "vitest";

import { artistInvoicePdf, artistLines, invoiceStatus, payoutDue, type ArtistInvoice } from "../src/lib/artist-money";
import { askedQuestions, DEFAULT_FORM, flaggedQuestions, parseFormConfig } from "../src/lib/consent";
import { giftCardExpiry } from "../src/lib/giftcards";
import { instructionText, pickInstructions, type Instruction } from "../src/lib/instructions";
import { invoiceLines, type PaymentForInvoice } from "../src/lib/invoices";
import { aftercareEmail, confirmationEmail, reminderSms, type MessageBooking } from "../src/lib/messages";
import { sinceFor } from "../src/lib/notifications";
import { reviewStats } from "../src/lib/reviews";
import { DEFAULT_GIFT_TERMS, giftCardTerms } from "../src/lib/site-settings";

const booking = (over: Partial<MessageBooking> = {}): MessageBooking => ({
  public_id: "p1",
  client_name: "Kari Nordmann",
  client_email: "kari@example.no",
  service_name_no: "Tatovering",
  service_name_en: "Tattoo",
  staff_name: "Filip",
  starts_at: "2026-10-20T10:00:00.000Z",
  deposit_ore: 0,
  language: "no",
  ...over,
});

const instruction = (over: Partial<Instruction>): Instruction => ({
  id: 1,
  name: "Før",
  timing: "before",
  kinds: null,
  email_subject: null,
  body_no: "Spis godt.",
  body_en: null,
  sms_text: null,
  enabled: 1,
  sort: 0,
  ...over,
});

describe("instructions", () => {
  it("picks the enabled ones for the service kind and timing", () => {
    const rows = [
      instruction({ id: 1, kinds: "tattoo" }),
      instruction({ id: 2, kinds: "piercing" }),
      instruction({ id: 3, kinds: null, sort: -1 }),
      instruction({ id: 4, enabled: 0 }),
      instruction({ id: 5, timing: "after" }),
    ];
    expect(pickInstructions(rows, "tattoo", "before").map((r) => r.id)).toEqual([3, 1]);
  });

  it("uses English when the client wrote in English and the text exists", () => {
    const rows = [instruction({ email_subject: "Før timen", body_en: "Eat well." }), instruction({ id: 2, name: "Uten engelsk" })];
    expect(instructionText(rows, "en")).toBe("Før timen\nEat well.\n\nUten engelsk\nSpis godt.");
  });

  it("puts them in the confirmation, and the review link in the aftercare email", () => {
    expect(confirmationEmail(booking({ before_text: "Før timen\nSpis godt." }), {}).text).toContain("Spis godt.");
    const after = aftercareEmail(booking({ review_url: "https://x/anmeldelse/t" }))!;
    expect(after.subject).toBe("Takk for besøket");
    expect(after.text).toContain("https://x/anmeldelse/t");
    expect(aftercareEmail(booking())).toBeNull();
  });

  it("signs with the client support contact", () => {
    const email = confirmationEmail(booking({ support: { phone: "+47 900 00 000", email: "post@infinitytattoo.no" } }), {});
    expect(email.text).toContain("+47 900 00 000\npost@infinitytattoo.no");
    expect(reminderSms(booking({ support: { phone: "+47 900 00 000", email: "" } }))).toContain("Ring +47 900 00 000");
  });
});

describe("consent form settings", () => {
  it("falls back to the defaults for missing or broken JSON", () => {
    expect(parseFormConfig(null)).toEqual(DEFAULT_FORM);
    expect(parseFormConfig("{oops")).toEqual(DEFAULT_FORM);
    expect(parseFormConfig('{"address":true}').address).toBe(true);
  });

  it("asks the chosen questions plus the studio's own, and flags custom yes answers", () => {
    const config = { ...DEFAULT_FORM, skip_questions: ["pregnant"], custom_questions: [{ key: "q1", no: "Roaccutan?", en: "" }] };
    const asked = askedQuestions(config).map((q) => q.key);
    expect(asked).not.toContain("pregnant");
    expect(asked.at(-1)).toBe("q1");
    expect(flaggedQuestions({ health: { allergies: true }, details: "", confirmations: {}, extra: [{ q: "Roaccutan?", yes: true }, { q: "Annet?", yes: false }] })).toEqual([
      "Har du allergier (f.eks. lateks, metaller, kremer eller fargestoffer)?",
      "Roaccutan?",
    ]);
  });
});

describe("gift card settings", () => {
  it("adds the validity line to the terms", () => {
    const terms = giftCardTerms({ store: true, minKr: 200, maxKr: 20000, validityMonths: 24, info: "", terms: DEFAULT_GIFT_TERMS, customTerms: false });
    expect(terms).toHaveLength(4);
    expect(terms[3]).toBe("Gavekortet gjelder i 2 år fra kjøpsdatoen.");
  });

  it("expires after whole months, also at the end of a month", () => {
    expect(giftCardExpiry(new Date("2026-10-12T12:00:00Z"), 12)).toBe("2027-10-12");
    expect(giftCardExpiry(new Date("2028-02-29T12:00:00Z"), 12)).toBe("2029-02-28");
    expect(giftCardExpiry(new Date("2026-10-12T12:00:00Z"))).toBe("2029-10-12");
  });
});

describe("products on invoices", () => {
  it("uses the product's name, count and VAT rate", () => {
    const p = { id: 1, kind: "product", method: "card", amount_ore: 30000, note: null, business_date: "2026-10-12", booking_id: null, starts_at: null, service_name: null, vat_pct: 15, staff_name: null, client_id: 1, name: "Kari", address: "a", postcode: "1", city: "c", email: null, product_name: "Krem", quantity: 2 } as PaymentForInvoice;
    expect(invoiceLines(p, true)).toEqual([{ text: "Krem × 2", amount_ore: 30000, vat_pct: 15, vat_ore: 3913 }]);
  });
});

describe("artist invoices and payouts", () => {
  it("builds lines with VAT and drops empty ones", () => {
    expect(
      artistLines(
        [
          { text: "Stolleie", kind: "rent", amount_ore: 300000 },
          { text: "Tom", kind: "other", amount_ore: 0 },
        ],
        25,
      ),
    ).toEqual([{ text: "Stolleie", kind: "rent", amount_ore: 300000, vat_pct: 25, vat_ore: 60000 }]);
  });

  it("doesn't deduct rent that was invoiced separately, and subtracts what's paid out", () => {
    const p = { gross: 1000000, commission: 300000, invoicedRent: 0, invoicedCommission: 0, paidOut: 0 };
    expect(payoutDue(p, 1, 200000)).toBe(500000);
    expect(payoutDue({ ...p, invoicedRent: 200000 }, 1, 200000)).toBe(700000);
    expect(payoutDue({ ...p, paidOut: 600000 }, 1, 200000)).toBe(0);
  });

  it("marks open invoices past due as overdue", () => {
    expect(invoiceStatus({ status: "open", due_date: "2026-10-01" }, "2026-10-12")).toBe("overdue");
    expect(invoiceStatus({ status: "paid", due_date: "2026-10-01" }, "2026-10-12")).toBe("paid");
  });

  it("renders the PDF", () => {
    const inv: ArtistInvoice = {
      id: 1,
      number: 4,
      staff_id: 1,
      buyer_name: "Filip",
      buyer_address: "Filip Tattoo ENK",
      seller_json: JSON.stringify({ name: "Infinity Tattoo", orgNumber: "123 456 789", address: "Skårersletta 48c", postcode: "1473", city: "Lørenskog", email: "", phone: "", bankAccount: "1234.56.78901", vatRegistered: true }),
      period_from: "2026-10-01",
      period_to: "2026-10-31",
      issue_date: "2026-11-01",
      due_date: "2026-11-15",
      lines_json: JSON.stringify(artistLines([{ text: "Stolleie oktober 2026", kind: "rent", amount_ore: 300000 }], 25)),
      total_ore: 300000,
      vat_ore: 60000,
      status: "open",
      emailed_at: null,
      paid_at: null,
      created_at: "2026-11-01T10:00:00Z",
    };
    const text = new TextDecoder("latin1").decode(artistInvoicePdf(inv));
    for (const s of ["FAKTURA", "Stolleie oktober 2026", "1234.56.78901", "Filip Tattoo ENK"]) expect(text).toContain(s);
  });
});

describe("reviews and notifications", () => {
  it("averages per artist and in total", () => {
    const stats = reviewStats([
      { staff_id: 1, rating: 5 },
      { staff_id: 1, rating: 4 },
      { staff_id: 2, rating: 3 },
      { staff_id: 2, rating: null },
    ]);
    expect(stats.get(0)).toEqual({ count: 3, average: 4 });
    expect(stats.get(1)).toEqual({ count: 2, average: 4.5 });
  });

  it("only looks back 30 days", () => {
    const now = new Date("2026-10-31T12:00:00Z");
    expect(sinceFor(null, now)).toBe("2026-10-01T12:00:00.000Z");
    expect(sinceFor("2026-10-20T00:00:00.000Z", now)).toBe("2026-10-20T00:00:00.000Z");
    expect(sinceFor("2026-01-01T00:00:00.000Z", now)).toBe("2026-10-01T12:00:00.000Z");
  });
});
