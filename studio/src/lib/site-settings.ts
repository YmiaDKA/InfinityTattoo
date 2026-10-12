import type { Env } from "../env";
import { STUDIO } from "./messages";
import { int, loadSettings } from "./settings";

/**
 * Settings that shape what clients see: the online request form and booking page (Linework:
 * Settings → Online booking), the gift card store (Gift cards → Store settings) and the contact
 * details on emails (Settings → Client support). The website reads them from /api/config.
 */

// ---------- Online booking ----------

/** Linework's eleven size options, in its order. Descriptions for the last five weren't captured: PLACEHOLDER-RESCAN. */
export const SIZE_OPTIONS = [
  ["tiny", "Bitteliten", "På størrelse med en bille"],
  ["small", "Liten", "På størrelse med et bankkort"],
  ["medium", "Medium", "På størrelse med en knyttneve"],
  ["medium_plus", "Medium +", "På størrelse med en hånd"],
  ["large", "Stor", "På størrelse med et A4-ark"],
  ["half_sleeve", "Halv arm", "Hele overarmen fra skulder til albue"],
  ["three_quarter_sleeve", "Trekvart arm", "Fra skulderen til midt på underarmen"],
  ["full_sleeve", "Hel arm", "Hele armen fra skulder til håndledd"],
  ["back_piece", "Hel rygg", "Hele ryggen"],
  ["chest_piece", "Hele brystet", "Hele brystet"],
  ["body_suit", "Bodysuit", "Store deler av kroppen"],
] as const;

export type BookingSettings = {
  openRequests: boolean;
  sizes: string[];
  colors: "color" | "black_grey" | "both";
  skinTone: boolean;
  budget: boolean;
  references: "required" | "optional" | "off";
  terms: { mode: "none" | "link" | "text"; url: string; text: string };
  pixel: { id: string; privacyUrl: string };
};

export async function loadBookingSettings(env: Env): Promise<BookingSettings> {
  const s = await loadSettings(env, "booking.");
  const pick = <T extends string>(v: string | undefined, options: readonly T[], fallback: T): T => (options.includes(v as T) ? (v as T) : fallback);
  return {
    openRequests: s.open_requests !== "0",
    sizes: s.sizes ? s.sizes.split(",").filter((k) => SIZE_OPTIONS.some(([key]) => key === k)) : SIZE_OPTIONS.map(([k]) => k),
    colors: pick(s.colors, ["color", "black_grey", "both"] as const, "both"),
    skinTone: s.skin_tone === "1",
    budget: s.budget === "1",
    references: pick(s.references, ["required", "optional", "off"] as const, "optional"),
    terms: { mode: pick(s.terms_mode, ["none", "link", "text"] as const, "none"), url: s.terms_url ?? "", text: s.terms_text ?? "" },
    pixel: { id: s.pixel_id ?? "", privacyUrl: s.pixel_privacy ?? "" },
  };
}

// ---------- Gift card store ----------

/** At least a year: shorter is hard to defend under Norwegian consumer rules, so 6 months isn't offered. */
export const VALIDITY_OPTIONS = [12, 24, 36] as const;

export const DEFAULT_GIFT_TERMS = [
  "Gavekortet kan ikke byttes i penger og brukes bare som betaling for behandlinger i studioet.",
  "Dekker ikke gavekortet hele beløpet, kan resten betales på vanlig måte.",
  "Når gavekortet er betalt og sendt til e-postadressen som ble oppgitt, er det kjøperens ansvar å ta vare på koden.",
];

export type GiftCardSettings = { store: boolean; minKr: number; maxKr: number; validityMonths: number; info: string; terms: string[]; customTerms: boolean };

export async function loadGiftCardSettings(env: Env): Promise<GiftCardSettings> {
  const s = await loadSettings(env, "giftcards.");
  const minKr = int(s.min_kr, 200, 100, 100000);
  const terms = s.terms ? (JSON.parse(s.terms) as string[]).filter(Boolean) : null;
  return {
    store: s.store !== "0",
    minKr,
    maxKr: Math.max(minKr, int(s.max_kr, 20000, 100, 100000)),
    validityMonths: VALIDITY_OPTIONS.includes(Number(s.validity_months) as never) ? Number(s.validity_months) : 36,
    info: s.info ?? "",
    terms: terms ?? DEFAULT_GIFT_TERMS,
    customTerms: Boolean(terms),
  };
}

/** The terms as shown to the buyer, with the validity line added automatically (like Linework). */
export function giftCardTerms(s: GiftCardSettings): string[] {
  const years = s.validityMonths / 12;
  return [...s.terms, `Gavekortet gjelder i ${years} år fra kjøpsdatoen.`];
}

// ---------- Client support ----------

export type SupportContact = { phone: string; email: string };

export async function loadSupport(env: Env): Promise<SupportContact> {
  const s = await loadSettings(env, "support.");
  return { phone: s.phone || STUDIO.phone, email: s.email ?? "" };
}
