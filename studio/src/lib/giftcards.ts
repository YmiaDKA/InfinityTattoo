import type { Env } from "../env";
import { addDays, businessDate } from "./time";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

export function newGiftCardCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = [...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join("");
  return `INF-${chars.slice(0, 4)}-${chars.slice(4)}`;
}

/** Gift cards are valid for 3 years (the general limitation period for claims in Norway). */
export function giftCardExpiry(from = new Date()): string {
  return addDays(businessDate(from), 3 * 365);
}

export function normalizeCode(input: string): string {
  const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const body = raw.startsWith("INF") ? raw.slice(3) : raw;
  return body.length === 8 ? `INF-${body.slice(0, 4)}-${body.slice(4)}` : input.trim().toUpperCase();
}

export async function giftCardBalance(env: Env, id: number): Promise<number> {
  const row = await env.DB.prepare("SELECT COALESCE(SUM(amount_ore), 0) AS balance FROM gift_card_movements WHERE gift_card_id = ?")
    .bind(id)
    .first<{ balance: number }>();
  return row?.balance ?? 0;
}
