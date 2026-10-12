import type { Email } from "./email";
import { formatOre } from "./report";
import { localTime } from "./time";

export const STUDIO = {
  name: "Infinity Tattoo",
  address: "Skårersletta 48c, 1473 Lørenskog",
  phone: "+47 40 34 47 75",
  parking: {
    no: "Gratis parkering i 2 timer ved Fresh Fitness (Skårersletta 60) eller Triaden (Skårersletta 70).",
    en: "Free 2-hour parking at Fresh Fitness (Skårersletta 60) or Triaden (Skårersletta 70).",
  },
};

export type Lang = "no" | "en";

export type MessageBooking = {
  public_id: string;
  client_name: string;
  client_email: string;
  service_name_no: string;
  service_name_en: string;
  staff_name: string | null;
  starts_at: string | null;
  deposit_ore: number;
  language: string;
  aftercare_no?: string | null;
  aftercare_en?: string | null;
};

const dateFormat = (lang: Lang) =>
  new Intl.DateTimeFormat(lang === "no" ? "nb-NO" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Oslo",
  });

export function langOf(b: { language: string }): Lang {
  return b.language === "en" ? "en" : "no";
}

function whenText(b: MessageBooking, lang: Lang) {
  if (!b.starts_at) return "";
  const day = dateFormat(lang).format(new Date(b.starts_at));
  return lang === "no" ? `${day} kl. ${localTime(b.starts_at)}` : `${day} at ${localTime(b.starts_at)}`;
}

function serviceName(b: MessageBooking, lang: Lang) {
  return lang === "no" ? b.service_name_no : b.service_name_en;
}

function firstName(name: string) {
  return name.split(" ")[0] || name;
}

const signature = (lang: Lang) =>
  lang === "no"
    ? `\n\nHilsen\n${STUDIO.name}\n${STUDIO.address}\n${STUDIO.phone}`
    : `\n\nBest regards,\n${STUDIO.name}\n${STUDIO.address}\n${STUDIO.phone}`;

/** Deposit rules from the FAQ on infinitytattoo.no. */
export const DEPOSIT_TERMS = {
  no: "Depositumet trekkes fra sluttprisen og refunderes ikke. Må du flytte timen, gi beskjed minst 48 timer før, så flyttes depositumet til den nye datoen.",
  en: "The deposit comes off the final price and is non-refundable. If you need to reschedule, tell us at least 48 hours before and the deposit moves to your new date.",
};

export function requestReceivedEmail(b: MessageBooking): Email {
  const lang = langOf(b);
  return {
    to: b.client_email,
    subject: lang === "no" ? "Vi har fått forespørselen din" : "We've received your request",
    text:
      (lang === "no"
        ? `Hei ${firstName(b.client_name)}!\n\nTakk for forespørselen om ${serviceName(b, lang).toLowerCase()}. Vi ser på ideen din og kommer tilbake til deg med forslag til tid og pris.\n\nHar du referansebilder, kan du svare på denne e-posten med dem.`
        : `Hi ${firstName(b.client_name)}!\n\nThanks for your request for ${serviceName(b, lang).toLowerCase()}. We'll look at your idea and get back to you with a suggested time and price.\n\nIf you have reference photos, just reply to this email with them.`) + signature(lang),
  };
}

export function confirmationEmail(b: MessageBooking, links: { consent?: string; deposit?: string }): Email {
  const lang = langOf(b);
  const lines =
    lang === "no"
      ? [
          `Hei ${firstName(b.client_name)}!`,
          "",
          `Timen din er bekreftet: ${serviceName(b, lang)} ${whenText(b, lang)}${b.staff_name ? ` hos ${b.staff_name}` : ""}.`,
          "",
          `Adresse: ${STUDIO.address}`,
          STUDIO.parking.no,
          links.deposit ? `\nBetal depositum på ${formatOre(b.deposit_ore)} her for å holde av timen:\n${links.deposit}\n${DEPOSIT_TERMS.no}` : "",
          links.consent ? `\nFyll ut egenerklæringen før du kommer (tar 2 minutter):\n${links.consent}` : "",
          "\nMå du endre eller avlyse? Svar på denne e-posten eller ring oss.",
        ]
      : [
          `Hi ${firstName(b.client_name)}!`,
          "",
          `Your appointment is confirmed: ${serviceName(b, lang)} on ${whenText(b, lang)}${b.staff_name ? ` with ${b.staff_name}` : ""}.`,
          "",
          `Address: ${STUDIO.address}`,
          STUDIO.parking.en,
          links.deposit ? `\nPay the ${formatOre(b.deposit_ore)} deposit here to hold your time:\n${links.deposit}\n${DEPOSIT_TERMS.en}` : "",
          links.consent ? `\nPlease fill in the health and consent form before you come (takes 2 minutes):\n${links.consent}` : "",
          "\nNeed to change or cancel? Reply to this email or call us.",
        ];
  return {
    to: b.client_email,
    subject: lang === "no" ? `Bekreftet: ${whenText(b, lang)}` : `Confirmed: ${whenText(b, lang)}`,
    text: lines.filter((l) => l !== undefined).join("\n") + signature(lang),
  };
}

export function reminderEmail(b: MessageBooking, links: { consent?: string }): Email {
  const lang = langOf(b);
  return {
    to: b.client_email,
    subject: lang === "no" ? `Påminnelse: time ${whenText(b, lang)}` : `Reminder: appointment ${whenText(b, lang)}`,
    text:
      (lang === "no"
        ? `Hei ${firstName(b.client_name)}!\n\nPåminnelse om timen din ${whenText(b, lang)}${b.staff_name ? ` hos ${b.staff_name}` : ""} (${serviceName(b, lang)}).\n\nAdresse: ${STUDIO.address}\n${STUDIO.parking.no}\n\nSpis godt før du kommer, og unngå alkohol dagen før.${links.consent ? `\n\nHusk å fylle ut egenerklæringen:\n${links.consent}` : ""}`
        : `Hi ${firstName(b.client_name)}!\n\nA reminder about your appointment on ${whenText(b, lang)}${b.staff_name ? ` with ${b.staff_name}` : ""} (${serviceName(b, lang)}).\n\nAddress: ${STUDIO.address}\n${STUDIO.parking.en}\n\nEat well before you come and avoid alcohol the day before.${links.consent ? `\n\nPlease remember to fill in the health and consent form:\n${links.consent}` : ""}`) +
      signature(lang),
  };
}

export function depositLinkEmail(b: MessageBooking, url: string): Email {
  const lang = langOf(b);
  return {
    to: b.client_email,
    subject: lang === "no" ? "Depositum for timen din" : "Deposit for your appointment",
    text:
      (lang === "no"
        ? `Hei ${firstName(b.client_name)}!\n\nFor å holde av timen ${whenText(b, lang)} ber vi om et depositum på ${formatOre(b.deposit_ore)}. ${DEPOSIT_TERMS.no}\n\nBetal her:\n${url}`
        : `Hi ${firstName(b.client_name)}!\n\nTo hold your appointment on ${whenText(b, lang)} we ask for a ${formatOre(b.deposit_ore)} deposit. ${DEPOSIT_TERMS.en}\n\nPay here:\n${url}`) +
      signature(lang),
  };
}

export function aftercareEmail(b: MessageBooking): Email | null {
  const lang = langOf(b);
  const text = lang === "no" ? b.aftercare_no : b.aftercare_en || b.aftercare_no;
  if (!text) return null;
  return {
    to: b.client_email,
    subject: lang === "no" ? "Etterbehandling – slik tar du vare på den" : "Aftercare – how to look after it",
    text:
      `${lang === "no" ? "Hei" : "Hi"} ${firstName(b.client_name)}!\n\n${text}\n\n${
        lang === "no" ? "Vi blir veldig glade for en anmeldelse på Google hvis du var fornøyd." : "We'd really appreciate a Google review if you were happy."
      }` + signature(lang),
  };
}

export function cancelledEmail(b: MessageBooking): Email {
  const lang = langOf(b);
  return {
    to: b.client_email,
    subject: lang === "no" ? "Timen din er avlyst" : "Your appointment has been cancelled",
    text:
      (lang === "no"
        ? `Hei ${firstName(b.client_name)}!\n\nTimen din ${whenText(b, lang)} (${serviceName(b, lang)}) er avlyst. Ta kontakt hvis du vil finne en ny tid.`
        : `Hi ${firstName(b.client_name)}!\n\nYour appointment on ${whenText(b, lang)} (${serviceName(b, lang)}) has been cancelled. Get in touch if you'd like a new time.`) +
      signature(lang),
  };
}

export function giftCardEmail(card: {
  code: string;
  initial_ore: number;
  expires_on: string;
  buyer_name: string | null;
  buyer_email: string;
  recipient_name: string | null;
  message: string | null;
}): Email {
  return {
    to: card.buyer_email,
    subject: `Gavekort fra ${STUDIO.name}`,
    text:
      `Hei ${firstName(card.buyer_name ?? "")}!\n\nTakk for kjøpet. Her er gavekortet${card.recipient_name ? ` til ${card.recipient_name}` : ""}:\n\n` +
      `  Kode: ${card.code}\n  Verdi: ${formatOre(card.initial_ore)}\n  Gyldig til: ${card.expires_on}\n` +
      (card.message ? `\n  «${card.message}»\n` : "") +
      `\nGavekortet kan brukes på tatovering, piercing og tooth gems hos ${STUDIO.name}. Oppgi koden ved betaling.` +
      signature("no"),
  };
}

