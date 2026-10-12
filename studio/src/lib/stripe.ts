import type { Env } from "../env";

export type Checkout = { id: string; url: string };

/**
 * Creates a Stripe Checkout session (card, plus whatever methods are enabled in the Stripe
 * dashboard). Online prepayments are internet sales, not kontantsalg, so they don't go through
 * the till; Stripe's receipt email is the sales document.
 */
export async function createCheckout(
  env: Env,
  input: {
    amountOre: number;
    name: string;
    email?: string | null;
    successUrl: string;
    cancelUrl: string;
    metadata: Record<string, string>;
    expiresInMin?: number;
  },
): Promise<Checkout> {
  if (!env.STRIPE_SECRET_KEY) throw new Error("Stripe is not configured");
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("line_items[0][quantity]", "1");
  form.set("line_items[0][price_data][currency]", "nok");
  form.set("line_items[0][price_data][unit_amount]", String(input.amountOre));
  form.set("line_items[0][price_data][product_data][name]", input.name);
  form.set("success_url", input.successUrl);
  form.set("cancel_url", input.cancelUrl);
  form.set("locale", "nb");
  form.set("payment_intent_data[receipt_email]", input.email ?? "");
  if (input.email) form.set("customer_email", input.email);
  else form.delete("payment_intent_data[receipt_email]");
  // Stripe's minimum lifetime is 30 minutes.
  form.set("expires_at", String(Math.floor(Date.now() / 1000) + Math.max(30, input.expiresInMin ?? 60 * 24) * 60));
  for (const [key, value] of Object.entries(input.metadata)) {
    form.set(`metadata[${key}]`, value);
    form.set(`payment_intent_data[metadata][${key}]`, value);
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const data = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !data.id || !data.url) throw new Error(`Stripe: ${data.error?.message ?? res.status}`);
  return { id: data.id, url: data.url };
}

/** Verifies a Stripe webhook signature (v1, HMAC-SHA256) and returns the parsed event. */
export async function verifyStripeEvent(
  payload: string,
  header: string | null,
  secret: string,
  toleranceSec = 300,
  now = Date.now(),
): Promise<{ type: string; data: { object: Record<string, unknown> } } | null> {
  if (!header) return null;
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i), p.slice(i + 1)];
    }),
  );
  const signatures = header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  const timestamp = Number(parts.t);
  if (!timestamp || !signatures.length || Math.abs(now / 1000 - timestamp) > toleranceSec) return null;

  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${payload}`));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (!signatures.some((s) => timingSafeEqual(s, expected))) return null;
  return JSON.parse(payload);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
