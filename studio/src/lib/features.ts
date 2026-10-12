import type { Env } from "../env";

/** Optional modules. Anything not listed here (booking, calendar, consent, daily settlement, personalliste) is always on. */
export const FEATURES = {
  gift_cards: { label: "Gavekort", note: "Salg på nettsiden og i studio. Kort som allerede er solgt kan alltid løses inn." },
  inks: { label: "Blekkregister", note: "Blekk og batch per tatovering." },
  sessions: { label: "Flere økter", note: "«Book neste økt» på avtaler." },
  rent: { label: "Fast stolleie", note: "Stolleie per artist i artistoppgjøret." },
  settlements: { label: "Artistoppgjør", note: "Måneds- og årsoppgjør per artist." },
  photos: { label: "Referansebilder", note: "Kunden kan laste opp bilder med tatoveringsforespørselen." },
  flash: { label: "Flash", note: "Flash-design fra artistene, valgt ut til bookingsiden." },
  reviews: { label: "Anmeldelser", note: "Ber kunden om stjerner og en kommentar etter timen, og viser Google-lenken." },
  products: { label: "Produkter for salg", note: "Varer som smykker og krem, med kategorier og MVA, å velge i «Nytt salg»." },
  sms: { label: "SMS-påminnelser", note: "SMS dagen før (koster ca. 0,70 kr per SMS)." },
  invoices: {
    label: "Faktura på hvert salg",
    note: "Nummerert kontantfaktura med kundens navn og adresse for hvert salg. Kan erstatte kassesystemet hvis regnskapsføreren godkjenner det. Av som standard.",
    defaultOff: true,
  },
  fiken: { label: "Send til Fiken", note: "Bokfører hver dag i Fiken automatisk (krever Fikens API-modul). Av som standard.", defaultOff: true },
  cash: { label: "Kontanter", note: "Kontant som betalingsmåte, med opptelling i dagsoppgjøret. Av som standard: studioet tar ikke kontanter.", defaultOff: true },
} as const;

export type FeatureKey = keyof typeof FEATURES;
export type Features = Record<FeatureKey, boolean>;

/** Parts that stay on because the law or the daily routine needs them. */
export const ALWAYS_ON = [
  ["Booking og kalender", "Kjernen i systemet."],
  ["Egenerklæring", "Dokumenterer helse og samtykke før behandling."],
  ["Dagsoppgjør", "Speiler kassen hver dag."],
  ["Personalliste", "Påkrevd ved piercing (bokføringsforskriften kap. 8-3)."],
] as const;

export async function loadFeatures(env: Env): Promise<Features> {
  const rows = await env.DB.prepare("SELECT key, enabled FROM features").all<{ key: string; enabled: number }>();
  const saved = new Map(rows.results.map((r) => [r.key, Boolean(r.enabled)]));
  return Object.fromEntries(Object.entries(FEATURES).map(([k, f]) => [k, saved.get(k) ?? !("defaultOff" in f)])) as Features;
}

/** updated_at only moves when the switch actually changes; invoice mode and the Fiken push count from it. */
export async function setFeature(env: Env, key: FeatureKey, enabled: boolean) {
  await env.DB.prepare(
    `INSERT INTO features (key, enabled, updated_at) VALUES (?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
     ON CONFLICT(key) DO UPDATE SET enabled = excluded.enabled, updated_at = excluded.updated_at WHERE features.enabled != excluded.enabled`,
  )
    .bind(key, enabled ? 1 : 0)
    .run();
}

/** Admin paths that belong to a module, so a switched-off module can't be opened by URL either. */
export const FEATURE_PATHS: [string, FeatureKey][] = [
  ["/admin/gift-cards", "gift_cards"],
  ["/admin/inks", "inks"],
  ["/admin/settlements", "settlements"],
  ["/admin/reviews", "reviews"],
  ["/admin/settings/flash", "flash"],
  // Not /admin/invoices: issued invoices must stay readable after invoice mode is switched off.
];
