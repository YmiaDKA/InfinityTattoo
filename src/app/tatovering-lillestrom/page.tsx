import type { Metadata } from "next";

import { AreaLandingPage } from "@/components/area-landing-page";

export const metadata: Metadata = {
  title: "Tatovering Lillestrøm | Infinity Tattoo Lørenskog",
  description:
    "Tatovering nær Lillestrøm hos Infinity Tattoo i Lørenskog. Custom realisme, black and grey, portrett, sleeve og freehand Maori.",
  alternates: {
    canonical: "https://infinitytattoo.no/tatovering-lillestrom",
  },
};

export default function TatoveringLillestromPage() {
  return (
    <AreaLandingPage
      area="Lillestrøm"
      headline="Tatovering Lillestrøm"
      introEn="Looking for a tattoo studio near Lillestrøm? Infinity Tattoo in Lørenskog creates custom realistic tattoos, black & grey work, portraits, sleeves, cover-up planning, and freehand Maori pieces."
      introNo="Ser du etter tatovering nær Lillestrøm? Infinity Tattoo i Lørenskog lager custom realistiske tatoveringer, black and grey, portretter, sleeves, cover-up planlegging og freehand Maori."
      travelEn="The studio is only minutes from Lillestrøm, making it easy to plan a consultation, longer tattoo session, or multi-session sleeve project without travelling into central Oslo."
      travelNo="Studioet ligger bare minutter fra Lillestrøm, så det er enkelt å planlegge konsultasjon, lengre tatoveringstime eller et sleeve-prosjekt over flere sessions uten å dra inn til Oslo sentrum."
      focusEn="Every project starts with the idea, body placement, size, flow, reference direction, and how the tattoo should age. That makes the process clearer before the final booking."
      focusNo="Hvert prosjekt starter med ideen, plassering på kroppen, størrelse, flyt, referanser og hvordan tatoveringen skal eldes. Det gjør prosessen tydeligere før endelig booking."
    />
  );
}
