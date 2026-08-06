import type { Metadata } from "next";

import { AreaLandingPage } from "@/components/area-landing-page";

export const metadata: Metadata = {
  title: "Tatovering Strømmen | Infinity Tattoo Lørenskog",
  description:
    "Tatovering nær Strømmen hos Infinity Tattoo i Lørenskog. Custom tattoo, realisme, black and grey, portretter og freehand Maori.",
  alternates: {
    canonical: "https://infinitytattoo.no/tatovering-strommen",
  },
};

export default function TatoveringStrommenPage() {
  return (
    <AreaLandingPage
      area="Strømmen"
      headline="Tatovering Strømmen"
      introEn="For clients looking for tattoo work near Strømmen, Infinity Tattoo offers custom realism, black & grey tattoos, portrait work, large-scale planning, and freehand Maori flow pieces."
      introNo="For kunder som ser etter tatovering nær Strømmen tilbyr Infinity Tattoo custom realisme, black and grey tatoveringer, portretter, større prosjekter og freehand Maori med kroppsflyt."
      travelEn="Infinity Tattoo is based at Skårersletta 48c in Lørenskog, minutes from Strømmen and easy to reach for consultations, tattoo sessions, and follow-up planning."
      travelNo="Infinity Tattoo ligger på Skårersletta 48c i Lørenskog, minutter fra Strømmen og lett å komme til for konsultasjon, tatoveringstime og videre planlegging."
      focusEn="The goal is not a template tattoo. Filip builds the design around your body, placement, contrast, detail level, and the long-term look of the piece."
      focusNo="Målet er ikke en template-tatovering. Filip bygger designet rundt kroppen din, plassering, kontrast, detaljnivå og hvordan motivet skal se ut over tid."
    />
  );
}
