import type { Env } from "../env";
import { loadSettings } from "./settings";

/**
 * Reviews (Linework: Marketing → Reviews, which the trial didn't offer). Our guess at how it works,
 * PLACEHOLDER-RESCAN: the aftercare email links to a short page where the client gives 1–5 stars
 * and a comment, the studio sees them under Anmeldelser, and everyone who answers is offered the
 * Google review link afterwards (Google doesn't allow sending only happy clients there).
 */

export type ReviewSettings = { googleUrl: string };

export async function loadReviewSettings(env: Env): Promise<ReviewSettings> {
  const s = await loadSettings(env, "reviews.");
  return { googleUrl: s.google_url ?? "" };
}

export function reviewUrl(env: Env, token: string) {
  return `${env.PUBLIC_BASE_URL.replace(/\/$/, "")}/anmeldelse/${token}`;
}

/** The review link for a finished booking, creating the request the first time. */
export async function reviewLink(env: Env, bookingId: number): Promise<string> {
  const token = crypto.randomUUID().replace(/-/g, "");
  await env.DB.prepare("INSERT OR IGNORE INTO reviews (booking_id, staff_id, token) SELECT id, staff_id, ? FROM bookings WHERE id = ?").bind(token, bookingId).run();
  const row = await env.DB.prepare("SELECT token FROM reviews WHERE booking_id = ?").bind(bookingId).first<{ token: string }>();
  return reviewUrl(env, row?.token ?? token);
}

/** Pure: average and count per artist (and in total under key 0), for the overview. */
export function reviewStats(rows: { staff_id: number | null; rating: number | null }[]) {
  const stats = new Map<number, { sum: number; count: number }>();
  for (const r of rows) {
    if (r.rating == null) continue;
    for (const key of [0, r.staff_id ?? -1]) {
      const s = stats.get(key) ?? { sum: 0, count: 0 };
      s.sum += r.rating;
      s.count++;
      stats.set(key, s);
    }
  }
  return new Map([...stats].map(([k, s]) => [k, { count: s.count, average: Math.round((s.sum / s.count) * 10) / 10 }]));
}
