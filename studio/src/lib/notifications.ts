import type { Env } from "../env";

/**
 * The bell in the top bar. Linework's was empty in the trial, so which events it lists is a guess:
 * PLACEHOLDER-RESCAN. Built from rows that already exist (no separate notification table), so
 * nothing has to remember to "send" a notification.
 */

export type Notification = { kind: string; at: string; text: string; href: string };

const DAYS = 30;

// Each part returns (kind, at, text, href). Text is built in SQL so one UNION can sort and limit.
const EVENTS = `
  SELECT 'request' AS kind, b.created_at AS at, 'Ny forespørsel fra ' || c.name || ' (' || sv.name_no || ')' AS text, '/admin/bookings/' || b.id AS href
    FROM bookings b JOIN clients c ON c.id = b.client_id JOIN services sv ON sv.id = b.service_id
    WHERE b.source = 'web' AND b.created_at > ?1
  UNION ALL
  SELECT 'deposit', op.paid_at, 'Depositum betalt på nett: ' || c.name || ' (' || printf('%.0f', op.amount_ore / 100.0) || ' kr)', '/admin/bookings/' || op.booking_id
    FROM online_payments op JOIN bookings b ON b.id = op.booking_id JOIN clients c ON c.id = b.client_id
    WHERE op.purpose = 'deposit' AND op.status = 'paid' AND op.paid_at > ?1
  UNION ALL
  SELECT 'consent', co.signed_at, 'Egenerklæring signert: ' || co.signed_name, '/admin/bookings/' || co.booking_id
    FROM consents co WHERE co.signed_at > ?1
  UNION ALL
  SELECT 'gift_card', g.created_at, 'Gavekort kjøpt på nett: ' || printf('%.0f', g.initial_ore / 100.0) || ' kr', '/admin/gift-cards/' || g.id
    FROM gift_cards g WHERE g.source = 'online' AND g.status = 'active' AND g.created_at > ?1
  UNION ALL
  SELECT 'review', r.submitted_at, 'Ny anmeldelse: ' || r.rating || ' av 5 fra ' || c.name, '/admin/reviews'
    FROM reviews r JOIN bookings b ON b.id = r.booking_id JOIN clients c ON c.id = b.client_id
    WHERE r.submitted_at > ?1`;

export const sinceFor = (seenAt: string | null, now = new Date()) => {
  const floor = new Date(now.getTime() - DAYS * 86400 * 1000).toISOString();
  return seenAt && seenAt > floor ? seenAt : floor;
};

export async function seenAt(env: Env, email: string): Promise<string | null> {
  return (await env.DB.prepare("SELECT seen_at FROM notifications_seen WHERE email = ?").bind(email.toLowerCase()).first<{ seen_at: string }>())?.seen_at ?? null;
}

export async function unseenCount(env: Env, email: string): Promise<number> {
  const since = sinceFor(await seenAt(env, email));
  return (await env.DB.prepare(`SELECT COUNT(*) AS n FROM (${EVENTS})`).bind(since).first<{ n: number }>())?.n ?? 0;
}

/** The last 30 days, newest first. */
export async function recentNotifications(env: Env, limit = 50): Promise<Notification[]> {
  return (await env.DB.prepare(`SELECT * FROM (${EVENTS}) ORDER BY at DESC LIMIT ?2`).bind(sinceFor(null), limit).all<Notification>()).results;
}

export async function markSeen(env: Env, email: string, now = new Date()) {
  await env.DB.prepare("INSERT INTO notifications_seen (email, seen_at) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET seen_at = excluded.seen_at")
    .bind(email.toLowerCase(), now.toISOString())
    .run();
}
