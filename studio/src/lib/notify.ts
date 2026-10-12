import type { Env } from "../env";

/**
 * Sends a plain-text email to the studio through Cloudflare Email Routing (free; the recipient
 * must be a verified address on the zone). Silently skipped when not configured.
 */
export async function notifyStudio(env: Env, subject: string, body: string): Promise<void> {
  if (!env.NOTIFY || !env.NOTIFY_FROM || !env.NOTIFY_TO) return;
  const { EmailMessage } = await import("cloudflare:email");
  const raw = [
    `From: Infinity Studio <${env.NOTIFY_FROM}>`,
    `To: ${env.NOTIFY_TO}`,
    `Subject: =?UTF-8?B?${base64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@${env.NOTIFY_FROM.split("@")[1]}>`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64(body).replace(/.{76}/g, "$&\r\n"),
  ].join("\r\n");
  try {
    await env.NOTIFY.send(new EmailMessage(env.NOTIFY_FROM, env.NOTIFY_TO, raw));
  } catch (error) {
    console.error("notifyStudio failed", error);
  }
}

function base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}
