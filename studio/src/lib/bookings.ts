import type { Env } from "../env";
import { sendBookingEmail, sendEmail } from "./email";
import {
  aftercareEmail,
  cancelledEmail,
  confirmationEmail,
  depositLinkEmail,
  giftCardEmail,
  reminderEmail,
  reminderSms,
  requestReceivedEmail,
  type MessageBooking,
} from "./messages";
import { loadFeatures } from "./features";
import { sendBookingSms } from "./sms";
import { createCheckout } from "./stripe";
import { businessDate } from "./time";
import { syncZettle, zettleEnabled } from "./zettle";

/** How long an online booking holds its slot while waiting for the deposit. */
export const DEPOSIT_HOLD_MIN = 30;

type FullBooking = MessageBooking & {
  id: number;
  status: string;
  needs_consent: number;
  hold_until: string | null;
  client_phone: string | null;
};

export async function loadBooking(env: Env, id: number): Promise<FullBooking | null> {
  return env.DB.prepare(
    `SELECT b.id, b.public_id, b.status, b.starts_at, b.deposit_ore, b.language, b.hold_until,
            c.name AS client_name, c.email AS client_email, c.phone AS client_phone,
            sv.name_no AS service_name_no, sv.name_en AS service_name_en, sv.needs_consent,
            sv.aftercare_no, sv.aftercare_en, s.name AS staff_name
     FROM bookings b JOIN clients c ON c.id = b.client_id JOIN services sv ON sv.id = b.service_id
     LEFT JOIN staff s ON s.id = b.staff_id WHERE b.id = ?`,
  )
    .bind(id)
    .first<FullBooking>();
}

export function consentUrl(env: Env, publicId: string) {
  return `${env.PUBLIC_BASE_URL.replace(/\/$/, "")}/skjema/${publicId}`;
}

export async function depositPaidOre(env: Env, bookingId: number): Promise<number> {
  const row = await env.DB.prepare("SELECT COALESCE(SUM(amount_ore), 0) AS paid FROM payments WHERE booking_id = ? AND kind = 'deposit'")
    .bind(bookingId)
    .first<{ paid: number }>();
  return row?.paid ?? 0;
}

async function hasConsent(env: Env, bookingId: number) {
  return Boolean(await env.DB.prepare("SELECT 1 FROM consents WHERE booking_id = ? LIMIT 1").bind(bookingId).first());
}

export function stripeEnabled(env: Env) {
  return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET);
}

/** Returns an open checkout link for the outstanding deposit, creating one if needed. */
export async function depositCheckoutUrl(env: Env, bookingId: number, holdMin?: number): Promise<string | null> {
  if (!stripeEnabled(env)) return null;
  const b = await loadBooking(env, bookingId);
  if (!b || !b.deposit_ore) return null;
  const outstanding = b.deposit_ore - (await depositPaidOre(env, bookingId));
  if (outstanding <= 0) return null;

  const open = await env.DB.prepare(
    "SELECT url FROM online_payments WHERE booking_id = ? AND purpose = 'deposit' AND status = 'open' AND amount_ore = ? AND created_at > ? ORDER BY id DESC LIMIT 1",
  )
    .bind(bookingId, outstanding, new Date(Date.now() - 20 * 3600 * 1000).toISOString())
    .first<{ url: string }>();
  if (open && holdMin == null) return open.url;

  const site = env.SITE_URL.replace(/\/$/, "");
  const checkout = await createCheckout(env, {
    amountOre: outstanding,
    name: `Depositum – ${b.service_name_no}`,
    email: b.client_email,
    successUrl: `${site}/?booking=paid#booking`,
    cancelUrl: `${site}/?booking=cancelled#booking`,
    metadata: { purpose: "deposit", booking_id: String(bookingId) },
    expiresInMin: holdMin,
  });
  await env.DB.prepare("INSERT INTO online_payments (purpose, booking_id, amount_ore, provider, session_id, url) VALUES ('deposit', ?, ?, 'stripe', ?, ?)")
    .bind(bookingId, outstanding, checkout.id, checkout.url)
    .run();
  return checkout.url;
}

// ---------- Lifecycle emails ----------

export async function afterRequestCreated(env: Env, bookingId: number) {
  const b = await loadBooking(env, bookingId);
  if (b?.client_email) await sendBookingEmail(env, b.id, "request_received", requestReceivedEmail(b));
}

/** Confirmation with consent link and (if still unpaid) deposit link. Sent once per booking unless forced. */
export async function afterConfirmed(env: Env, bookingId: number, options: { force?: boolean } = {}) {
  const b = await loadBooking(env, bookingId);
  if (!b?.client_email || !b.starts_at) return;
  const consent = b.needs_consent && !(await hasConsent(env, b.id)) ? consentUrl(env, b.public_id) : undefined;
  // A payment provider hiccup must not stop the confirmation itself.
  const deposit = (await depositCheckoutUrl(env, b.id).catch((error) => {
    console.error("deposit link failed", error);
    return null;
  })) ?? undefined;
  await sendBookingEmail(env, b.id, "confirmation", confirmationEmail(b, { consent, deposit }), options);
}

export async function afterCancelled(env: Env, bookingId: number) {
  const b = await loadBooking(env, bookingId);
  if (b?.client_email && b.starts_at) await sendBookingEmail(env, b.id, "cancelled", cancelledEmail(b));
}

export async function afterCompleted(env: Env, bookingId: number) {
  const b = await loadBooking(env, bookingId);
  if (!b?.client_email) return;
  const email = aftercareEmail(b);
  if (email) await sendBookingEmail(env, b.id, "aftercare", email);
}

export async function sendDepositLink(env: Env, bookingId: number): Promise<string | null> {
  const url = await depositCheckoutUrl(env, bookingId);
  const b = await loadBooking(env, bookingId);
  if (url && b?.client_email) await sendBookingEmail(env, b.id, "deposit_link", depositLinkEmail(b, url), { force: true });
  return url;
}

// ---------- Online payments (Stripe webhook) ----------

/** Marks a checkout as paid and mirrors it into `payments`. Idempotent per session. */
export async function recordCheckoutPaid(env: Env, sessionId: string, providerRef: string | null) {
  const op = await env.DB.prepare("SELECT * FROM online_payments WHERE session_id = ?").bind(sessionId).first<{
    id: number;
    purpose: "deposit" | "gift_card";
    booking_id: number | null;
    gift_card_id: number | null;
    amount_ore: number;
    status: string;
  }>();
  if (!op || op.status === "paid") return;

  const now = new Date().toISOString();
  const staff = op.booking_id
    ? await env.DB.prepare("SELECT staff_id FROM bookings WHERE id = ?").bind(op.booking_id).first<{ staff_id: number | null }>()
    : null;
  await env.DB.batch([
    env.DB.prepare("UPDATE online_payments SET status = 'paid', paid_at = ?, provider_ref = ? WHERE id = ? AND status != 'paid'").bind(now, providerRef, op.id),
    env.DB.prepare(
      `INSERT OR IGNORE INTO payments (booking_id, staff_id, kind, method, amount_ore, provider, provider_ref, note, paid_at, business_date, recorded_by)
       VALUES (?, ?, ?, 'card', ?, 'stripe', ?, 'Betalt på nett', ?, ?, 'stripe')`,
    ).bind(op.booking_id, staff?.staff_id ?? null, op.purpose === "deposit" ? "deposit" : "gift_card_sale", op.amount_ore, providerRef ?? sessionId, now, businessDate(now)),
    env.DB.prepare("UPDATE bookings SET hold_until = NULL, updated_at = ? WHERE id = ?").bind(now, op.booking_id),
  ]);

  if (op.purpose === "deposit" && op.booking_id) {
    await afterConfirmed(env, op.booking_id);
  }
  if (op.purpose === "gift_card" && op.gift_card_id) {
    await activateGiftCard(env, op.gift_card_id, "stripe");
  }
}

export async function activateGiftCard(env: Env, giftCardId: number, by: string) {
  const card = await env.DB.prepare("SELECT * FROM gift_cards WHERE id = ?").bind(giftCardId).first<{
    id: number;
    code: string;
    initial_ore: number;
    status: string;
    expires_on: string;
    buyer_name: string | null;
    buyer_email: string | null;
    recipient_name: string | null;
    message: string | null;
  }>();
  if (!card || card.status !== "pending") return;
  await env.DB.batch([
    env.DB.prepare("UPDATE gift_cards SET status = 'active' WHERE id = ? AND status = 'pending'").bind(card.id),
    env.DB.prepare("INSERT INTO gift_card_movements (gift_card_id, amount_ore, note, by) VALUES (?, ?, 'Utstedt', ?)").bind(card.id, card.initial_ore, by),
  ]);
  if (card.buyer_email) {
    const result = await sendEmail(env, giftCardEmail({ ...card, buyer_email: card.buyer_email }));
    await env.DB.prepare("INSERT INTO emails (gift_card_id, kind, to_address, status, error) VALUES (?, 'gift_card', ?, ?, ?)")
      .bind(card.id, card.buyer_email, result.status, result.error ?? null)
      .run();
  }
}

// ---------- Scheduled work (cron) ----------

export async function runScheduled(env: Env, now = new Date()) {
  const nowIso = now.toISOString();

  // 1. Release online bookings whose deposit never arrived.
  const expired = await env.DB.prepare(
    "SELECT id FROM bookings WHERE hold_until IS NOT NULL AND hold_until < ? AND status IN ('requested', 'confirmed')",
  )
    .bind(nowIso)
    .all<{ id: number }>();
  for (const { id } of expired.results) {
    if ((await depositPaidOre(env, id)) > 0) {
      await env.DB.prepare("UPDATE bookings SET hold_until = NULL WHERE id = ?").bind(id).run();
      continue;
    }
    await env.DB.prepare(
      "UPDATE bookings SET status = 'cancelled', cancel_reason = 'Depositum ikke betalt', hold_until = NULL, updated_at = ? WHERE id = ?",
    )
      .bind(nowIso, id)
      .run();
  }

  // 2. Reminders 20–28 hours before (runs hourly, so every booking falls in the window once).
  const from = new Date(now.getTime() + 20 * 3600 * 1000).toISOString();
  const to = new Date(now.getTime() + 28 * 3600 * 1000).toISOString();
  const features = await loadFeatures(env);
  const upcoming = await env.DB.prepare(
    "SELECT id FROM bookings WHERE status = 'confirmed' AND hold_until IS NULL AND starts_at >= ? AND starts_at < ?",
  )
    .bind(from, to)
    .all<{ id: number }>();
  for (const { id } of upcoming.results) {
    const b = await loadBooking(env, id);
    if (!b) continue;
    if (b.client_email) {
      const consent = b.needs_consent && !(await hasConsent(env, id)) ? consentUrl(env, b.public_id) : undefined;
      await sendBookingEmail(env, id, "reminder", reminderEmail(b, { consent }));
    }
    if (b.client_phone && features.sms) await sendBookingSms(env, id, "reminder_sms", b.client_phone, reminderSms(b));
  }

  // 3. Pull new till payments from Zettle.
  if (zettleEnabled(env)) {
    try {
      await syncZettle(env, now);
    } catch (error) {
      console.error("zettle sync failed", error);
    }
  }

  // 4. Mark expired online checkouts.
  await env.DB.prepare("UPDATE online_payments SET status = 'expired' WHERE status = 'open' AND created_at < ?")
    .bind(new Date(now.getTime() - 25 * 3600 * 1000).toISOString())
    .run();
}
