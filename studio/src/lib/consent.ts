/** Health and consent questions shown before tattoo, piercing and tooth gem treatments. */
export const HEALTH_QUESTIONS = [
  { key: "allergies", no: "Har du allergier (f.eks. lateks, metaller, kremer eller fargestoffer)?", en: "Do you have allergies (e.g. latex, metals, ointments or pigments)?" },
  { key: "blood_thinners", no: "Bruker du blodfortynnende medisiner?", en: "Do you take blood-thinning medication?" },
  { key: "bleeding_disorder", no: "Har du blødersykdom eller blir du lett blå?", en: "Do you have a bleeding disorder or bruise easily?" },
  { key: "diabetes", no: "Har du diabetes?", en: "Do you have diabetes?" },
  { key: "epilepsy", no: "Har du epilepsi eller har du besvimt tidligere?", en: "Do you have epilepsy or a history of fainting?" },
  { key: "heart", no: "Har du hjertesykdom eller pacemaker?", en: "Do you have a heart condition or a pacemaker?" },
  { key: "immune", no: "Har du nedsatt immunforsvar eller bruker medisiner som påvirker det?", en: "Do you have a weakened immune system or take medication that affects it?" },
  { key: "skin", no: "Har du hudsykdom, arr eller keloider der behandlingen skal gjøres?", en: "Do you have a skin condition, scars or keloids where the treatment will be done?" },
  { key: "pregnant", no: "Er du gravid eller ammer du?", en: "Are you pregnant or breastfeeding?" },
  { key: "infection", no: "Har du en smittsom sykdom som kan overføres via blod?", en: "Do you have an infectious disease that can be transmitted through blood?" },
  { key: "alcohol", no: "Har du drukket alkohol eller tatt rusmidler siste 24 timer?", en: "Have you had alcohol or drugs in the last 24 hours?" },
] as const;

export const CONFIRMATIONS = [
  {
    key: "informed",
    no: "Jeg har fått informasjon om risiko og etterbehandling, og har hatt mulighet til å stille spørsmål.",
    en: "I have been informed about risks and aftercare, and have had the chance to ask questions.",
  },
  { key: "truthful", no: "Svarene mine er riktige, og jeg sier fra hvis noe endrer seg før timen.", en: "My answers are correct, and I will tell the studio if anything changes before the appointment." },
  { key: "consent", no: "Jeg samtykker til behandlingen.", en: "I consent to the treatment." },
] as const;

export type ConsentAnswers = {
  health: Record<string, boolean>;
  details: string;
  confirmations: Record<string, boolean>;
  /** The studio's own questions, stored with their wording since the form can change later. */
  extra?: { q: string; yes: boolean }[];
  extra_consents?: string[];
  id_type?: string;
  procedure?: string;
};

export function ageOn(birthDate: string, onDate: string): number {
  const [by, bm, bd] = birthDate.split("-").map(Number);
  const [y, m, d] = onDate.split("-").map(Number);
  return y - by - (m < bm || (m === bm && d < bd) ? 1 : 0);
}

/** Questions answered "yes", for a quick warning in the admin. */
export function flaggedQuestions(answers: ConsentAnswers): string[] {
  return [...HEALTH_QUESTIONS.filter((q) => answers.health[q.key]).map((q) => q.no), ...(answers.extra ?? []).filter((e) => e.yes).map((e) => e.q)];
}

// ---------- Settings → Skjema ----------
// Linework's form editor has ten sections per form (and up to ten forms). We have one consent form
// whose sections can be switched on, with extra questions and checkboxes. The medical questions and
// the three built-in confirmations always stay. PLACEHOLDER-RESCAN: multiple forms and the
// staff-completion options were not built, since the client-side form preview was never captured.

export const ID_TYPES = [
  ["drivers_licence", "Førerkort", "Driver's licence"],
  ["passport", "Pass", "Passport"],
  ["national_id", "Nasjonalt ID-kort", "National ID card"],
  ["bank_card", "Bankkort med bilde", "Payment card with photo"],
  ["bankid", "BankID", "BankID"],
] as const;

export type ExtraItem = { key: string; no: string; en: string };

export type FormConfig = {
  intro_no: string;
  intro_en: string;
  identification: boolean;
  id_types: string[];
  address: boolean;
  procedure_info: boolean;
  procedure_no: string;
  procedure_en: string;
  procedure_description: boolean;
  skip_questions: string[];
  custom_questions: ExtraItem[];
  extra_consents: ExtraItem[];
  photo_consent: boolean;
};

export const DEFAULT_PROCEDURE_NO =
  "En tatovering er permanent. Fjerning med laser er mulig, men tar tid, koster mye og gir ikke alltid et perfekt resultat.\nSom ved alle inngrep i huden er det en liten risiko for infeksjon, allergisk reaksjon og arrdannelse.\nResultatet avhenger av at du følger etterbehandlingen. Tilhelingen tar vanligvis 2–4 uker.\nFarger kan se litt annerledes ut på huden enn på tegningen, og blekner noe over tid.";
export const DEFAULT_PROCEDURE_EN =
  "A tattoo is permanent. Laser removal is possible but takes time, is expensive and doesn't always give a perfect result.\nAs with any procedure on the skin there is a small risk of infection, allergic reaction and scarring.\nThe result depends on you following the aftercare. Healing usually takes 2–4 weeks.\nColours can look slightly different on skin than on the drawing, and fade somewhat over time.";

export const DEFAULT_FORM: FormConfig = {
  intro_no: "",
  intro_en: "",
  identification: false,
  id_types: ID_TYPES.map(([k]) => k),
  address: false,
  procedure_info: false,
  procedure_no: DEFAULT_PROCEDURE_NO,
  procedure_en: DEFAULT_PROCEDURE_EN,
  procedure_description: false,
  skip_questions: [],
  custom_questions: [],
  extra_consents: [],
  photo_consent: true,
};

/** Pure: saved JSON merged over the defaults, ignoring anything malformed. */
export function parseFormConfig(json: string | null | undefined): FormConfig {
  if (!json) return { ...DEFAULT_FORM };
  try {
    const saved = JSON.parse(json) as Partial<FormConfig>;
    return { ...DEFAULT_FORM, ...saved };
  } catch {
    return { ...DEFAULT_FORM };
  }
}

/** The health questions this form asks, built-in first, then the studio's own. */
export function askedQuestions(config: FormConfig): ExtraItem[] {
  return [...HEALTH_QUESTIONS.filter((q) => !config.skip_questions.includes(q.key)), ...config.custom_questions];
}
