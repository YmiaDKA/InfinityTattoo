import type { Env } from "../env";
import type { EmailResult } from "./email";

export function smsEnabled(env: Env) {
  return Boolean(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN);
}

/** Turns "403 44 775", "0047 40344775" or "+47 403 44 775" into E.164. Returns null if it doesn't look like a phone number. */
export function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null;
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (/^\d{8}$/.test(digits)) digits = `+47${digits}`; // Norwegian numbers without country code
  return /^\+\d{8,15}$/.test(digits) ? digits : null;
}

/** Sends one SMS through Twilio. Skipped (not failed) when not configured. */
export async function sendSms(env: Env, to: string, body: string): Promise<EmailResult> {
  if (!smsEnabled(env)) return { status: "skipped", error: "sms not configured" };
  const phone = normalizePhone(to);
  if (!phone) return { status: "skipped", error: "invalid phone number" };
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: phone, From: env.SMS_FROM || "Infinity", Body: body }),
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
