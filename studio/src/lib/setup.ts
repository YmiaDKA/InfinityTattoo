import type { Env } from "../env";
import type { Features } from "./features";
import { stripeEnabled } from "./bookings";

export type SetupItem = { key: string; label: string; done: boolean; href: string; hint: string; later?: boolean };

/**
 * The "Kom i gang" checklist shown next to the calendar, like Linework's "Complete your setup".
 * Each item is worked out from the data, so it ticks itself off when the thing is done.
 */
export async function setupItems(env: Env, features: Features): Promise<SetupItem[]> {
  const [staff, web, aftercare, services, inks] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS total, SUM(email IS NOT NULL) AS with_email FROM staff WHERE active = 1").first<{ total: number; with_email: number }>(),
    env.DB.prepare("SELECT 1 AS ok FROM bookings WHERE source = 'web' LIMIT 1").first<{ ok: number }>(),
    env.DB.prepare(
      "SELECT COUNT(*) AS missing FROM services WHERE active = 1 AND kind != 'consultation' AND (aftercare_no IS NULL OR trim(aftercare_no) = '')",
    ).first<{ missing: number }>(),
    env.DB.prepare(
      "SELECT COUNT(*) AS without FROM staff s WHERE s.active = 1 AND s.bookable = 1 AND NOT EXISTS (SELECT 1 FROM staff_services ss JOIN services sv ON sv.id = ss.service_id WHERE ss.staff_id = s.id AND sv.active = 1)",
    ).first<{ without: number }>(),
    env.DB.prepare("SELECT COUNT(*) AS n FROM inks WHERE active = 1").first<{ n: number }>(),
  ]);

  const items: SetupItem[] = [
    {
      key: "logins",
      label: "Gi artistene innlogging",
      done: (staff?.total ?? 0) > 0 && staff?.with_email === staff?.total,
      href: "/admin/artists",
      hint: "Legg inn e-posten hver ansatt logger inn med.",
    },
    {
      key: "payments",
      label: "Kom i gang med betaling",
      done: Boolean(env.ZETTLE_CLIENT_ID && env.ZETTLE_API_KEY),
      href: "/admin/settings#tilkoblinger",
      hint: "Koble til Zettle, så kommer betalingene fra kassen inn av seg selv.",
    },
    {
      key: "requests",
      label: "Ta imot forespørsler",
      done: Boolean(web),
      href: "/admin/requests",
      hint: "Bookingskjemaet på nettsiden sender forespørsler rett hit.",
    },
    {
      key: "forms",
      label: "Beskytt deg med skjema",
      done: true,
      href: "/admin/settings#behandlinger",
      hint: "Kunden fyller ut egenerklæring før timen. Alltid på.",
    },
    {
      key: "aftercare",
      label: "Informer med instruksjoner",
      done: (aftercare?.missing ?? 1) === 0,
      href: "/admin/settings#behandlinger",
      hint: "Etterbehandling sendes på e-post når timen er ferdig.",
    },
    {
      key: "services",
      label: "Legg til flere behandlinger",
      done: (services?.without ?? 1) === 0,
      href: "/admin/settings#behandlinger",
      hint: "Hver artist trenger minst én behandling kunden kan booke.",
    },
    {
      key: "email",
      label: "Gjør det til ditt eget",
      done: Boolean(env.RESEND_API_KEY && env.EMAIL_FROM),
      href: "/admin/settings#tilkoblinger",
      hint: "E-post til kundene sendes fra infinitytattoo.no.",
    },
  ];
  if (features.sms)
    items.push({
      key: "sms",
      label: "Slå på SMS-påminnelser",
      done: Boolean(env.ELKS_API_USER && env.ELKS_API_PASSWORD),
      href: "/admin/settings#tilkoblinger",
      hint: "SMS dagen før timen, ca. 0,70 kr per melding.",
    });
  if (features.inks)
    items.push({
      key: "products",
      label: "Legg til produkter",
      done: (inks?.n ?? 0) > 0,
      href: "/admin/inks",
      hint: "Blekk med batch og utløpsdato.",
    });
  items.push({
    key: "online",
    label: "Ta depositum på nett",
    done: stripeEnabled(env),
    href: "/admin/settings#tilkoblinger",
    hint: "Kunden betaler depositum med kort fra lenken i e-posten.",
    later: true,
  });
  if (features.gift_cards)
    items.push({
      key: "giftcards",
      label: "Begynn å selge gavekort",
      done: stripeEnabled(env),
      href: "/admin/gift-cards",
      hint: "Gavekort selges på nettsiden når nettbetaling er på.",
      later: true,
    });
  return items;
}
