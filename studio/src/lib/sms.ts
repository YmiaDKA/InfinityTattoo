import type { Env } from "../env";
import type { EmailResult } from "./email";

export function smsEnabled(env: Env) {
  return Boolean(env.ELKS_API_USER && env.ELKS_API_PASSWORD);
}

/** Turns "403 44 775", "0047 40344775" or "+47 403 44 775" into E.164. Returns null if it doesn't look like a phone number. */
export function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null;
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (/^\d{8}$/.test(digits)) digits = `+47${digits}`; // Norwegian numbers without country code
  return /^\+\d{8,15}$/.test(digits) ? digits : null;
}

/** Sends one SMS through 46elks. Skipped (not failed) when not configured. */
export async function sendSms(env: Env, to: string, body: string): Promise<EmailResult> {
  if (!smsEnabled(env)) return { status: "skipped", error: "sms not configured" };
  const phone = normalizePhone(to);
  if (!phone) return { status: "skipped", error: "invalid phone number" };
  try {
    const res = await fetch("https://api.46elks.com/a1/sms", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${env.ELKS_API_USER}:${env.ELKS_API_PASSWORD}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // dontlog keeps the message text out of 46elks' history.
      body: new URLSearchParams({ from: env.SMS_FROM || "Infinity", to: phone, message: body, dontlog: "message" }),
    });
    if (!res.ok) return { status: "failed", error: `${res.status} ${(await res.text()).slice(0, 300)}` };
    return { status: "sent" };
  } catch (error) {
    return { status: "failed", error: String(error).slice(0, 300) };
  }
}

/** Sends once per (booking, kind) and records it next to the emails. */
export async function sendBookingSms(env: Env, bookingId: number, kind: string, to: string, body: string) {
  const already = await env.DB.prepare("SELECT 1 FROM emails WHERE booking_id = ? AND kind = ? AND status = 'sent' LIMIT 1")
    .bind(bookingId, kind)
    .first();
  if (already) return null;
  const result = await sendSms(env, to, body);
  await env.DB.prepare("INSERT INTO emails (booking_id, kind, to_address, status, error) VALUES (?, ?, ?, ?, ?)")
    .bind(bookingId, kind, normalizePhone(to) ?? to, result.status, result.error ?? null)
    .run();
  return result;
}
