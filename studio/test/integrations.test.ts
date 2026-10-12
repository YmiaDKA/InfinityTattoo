import { describe, expect, it } from "vitest";

import { ageOn, flaggedQuestions } from "../src/lib/consent";
import { giftCardExpiry, newGiftCardCode, normalizeCode } from "../src/lib/giftcards";
import { normalizePhone } from "../src/lib/sms";
import { verifyStripeEvent } from "../src/lib/stripe";
import { mapZettleMethod } from "../src/lib/zettle";

async function sign(payload: string, secret: string, t: number) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${payload}`));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

describe("Stripe webhook verification", () => {
  const payload = JSON.stringify({ type: "checkout.session.completed", data: { object: { id: "cs_1" } } });
  const now = 1_800_000_000_000;
  const t = now / 1000;

  it("accepts a valid signature", async () => {
    const header = `t=${t},v1=${await sign(payload, "whsec_test", t)}`;
    expect((await verifyStripeEvent(payload, header, "whsec_test", 300, now))?.type).toBe("checkout.session.completed");
  });

  it("rejects a wrong secret, tampered body or old timestamp", async () => {
    const header = `t=${t},v1=${await sign(payload, "whsec_test", t)}`;
    expect(await verifyStripeEvent(payload, header, "whsec_other", 300, now)).toBeNull();
    expect(await verifyStripeEvent(payload.replace("cs_1", "cs_2"), header, "whsec_test", 300, now)).toBeNull();
    expect(await verifyStripeEvent(payload, header, "whsec_test", 300, now + 600_000)).toBeNull();
    expect(await verifyStripeEvent(payload, null, "whsec_test", 300, now)).toBeNull();
  });
});

describe("gift cards", () => {
  it("makes readable codes and normalises typing", () => {
    const code = newGiftCardCode();
    expect(code).toMatch(/^INF-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
    expect(normalizeCode(code.toLowerCase().replace(/-/g, " "))).toBe(code);
    expect(normalizeCode(code.slice(4).replace("-", ""))).toBe(code);
  });

  it("expires three years out", () => {
    expect(giftCardExpiry(new Date("2026-10-12T10:00:00Z"))).toBe("2029-10-12");
  });
});

describe("consent", () => {
  it("computes age on the appointment date", () => {
    expect(ageOn("2008-10-13", "2026-10-12")).toBe(17);
    expect(ageOn("2008-10-12", "2026-10-12")).toBe(18);
  });

  it("lists yes-answers", () => {
    expect(flaggedQuestions({ health: { diabetes: true, heart: false }, details: "", confirmations: {} })).toHaveLength(1);
  });
});

describe("Zettle payment types", () => {
  it("maps to our methods", () => {
    expect(mapZettleMethod("IZETTLE_CARD")).toBe("card");
    expect(mapZettleMethod("IZETTLE_CASH")).toBe("cash");
    expect(mapZettleMethod("VIPPS")).toBe("vipps");
    expect(mapZettleMethod("SOMETHING_NEW")).toBe("other");
  });
});

describe("normalizePhone", () => {
  it("adds +47 to Norwegian numbers and keeps international ones", () => {
    expect(normalizePhone("403 44 775")).toBe("+4740344775");
    expect(normalizePhone("0047 40344775")).toBe("+4740344775");
    expect(normalizePhone("+46 70 123 45 67")).toBe("+46701234567");
    expect(normalizePhone("123")).toBeNull();
    expect(normalizePhone(null)).toBeNull();
  });
});
