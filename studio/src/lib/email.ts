import type { Env } from "../env";

export type Email = { to: string; subject: string; text: string; attachments?: { filename: string; content: string }[] };

/** Base64 for email attachments. */
export function toBase64(data: string | Uint8Array): string {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export type EmailResult = { status: "sent" | "failed" | "skipped"; error?: string };

/** Sends a plain-text email to a client through Resend. Skipped (not failed) when not configured. */
export async function sendEmail(env: Env, email: Email): Promise<EmailResult> {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) return { status: "skipped", error: "email not configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [email.to],
        reply_to: env.EMAIL_REPLY_TO || undefined,
        subject: email.subject,
        text: email.text,
        // Base64 file contents (used for the accountant's monthly files).
        attachments: email.attachments,
      }),
    });
    if (!res.ok) return { status: "failed", error: `${res.status} ${(await res.text()).slice(0, 300)}` };
    return { status: "sent" };
  } catch (error) {
    return { status: "failed", error: String(error).slice(0, 300) };
  }
}

/** Sends once per (booking, kind) and records the attempt. Returns false if it was already sent. */
export async function sendBookingEmail(
  env: Env,
  bookingId: number,
  kind: string,
  email: Email,
  options: { force?: boolean } = {},
): Promise<EmailResult | null> {
  if (!options.force) {
    const already = await env.DB.prepare("SELECT 1 FROM emails WHERE booking_id = ? AND kind = ? AND status = 'sent' LIMIT 1")
      .bind(bookingId, kind)
      .first();
    if (already) return null;
  }
  const result = await sendEmail(env, email);
  await env.DB.prepare("INSERT INTO emails (booking_id, kind, to_address, status, error) VALUES (?, ?, ?, ?, ?)")
    .bind(bookingId, kind, email.to, result.status, result.error ?? null)
    .run();
  return result;
}
