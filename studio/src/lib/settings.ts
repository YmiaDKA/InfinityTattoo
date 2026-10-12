import type { Env } from "../env";

/** Key/value settings under a prefix, e.g. "giftcards." → { min_kr: "200", … } (prefix removed). */
export async function loadSettings(env: Env, prefix: string): Promise<Record<string, string>> {
  const rows = await env.DB.prepare("SELECT key, value FROM settings WHERE key LIKE ?").bind(`${prefix}%`).all<{ key: string; value: string }>();
  return Object.fromEntries(rows.results.map((r) => [r.key.slice(prefix.length), r.value]));
}

/** Saves values under a prefix; an empty string removes the key so the default applies again. */
export async function saveSettings(env: Env, prefix: string, values: Record<string, string>) {
  await env.DB.batch(
    Object.entries(values).map(([k, v]) =>
      v === ""
        ? env.DB.prepare("DELETE FROM settings WHERE key = ?").bind(`${prefix}${k}`)
        : env.DB.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").bind(`${prefix}${k}`, v),
    ),
  );
}

export const int = (value: string | undefined, fallback: number, min = -Infinity, max = Infinity) => {
  const n = Number(value);
  return value != null && value !== "" && Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;
};
