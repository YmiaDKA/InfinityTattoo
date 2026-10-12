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
};

export function ageOn(birthDate: string, onDate: string): number {
  const [by, bm, bd] = birthDate.split("-").map(Number);
  const [y, m, d] = onDate.split("-").map(Number);
  return y - by - (m < bm || (m === bm && d < bd) ? 1 : 0);
}

/** Questions answered "yes", for a quick warning in the admin. */
export function flaggedQuestions(answers: ConsentAnswers): string[] {
  return HEALTH_QUESTIONS.filter((q) => answers.health[q.key]).map((q) => q.no);
}
