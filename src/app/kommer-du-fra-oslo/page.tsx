import type { Metadata } from "next";

import { AreaLandingPage } from "@/components/area-landing-page";

export const metadata: Metadata = {
  title: "Kommer du fra Oslo? | Custom tatovering nær Oslo",
  description:
    "Custom tatovering nær Oslo uten stresset med parkering i sentrum. Infinity Tattoo i Lørenskog tilbyr realisme, black and grey, blackout, fine line, Maori og konsultasjon.",
  alternates: {
    canonical: "https://infinitytattoo.no/kommer-du-fra-oslo",
  },
};

export default function KommerDuFraOsloPage() {
  return (
    <AreaLandingPage
      area="Oslo"
      headline="Kommer du fra Oslo?"
      introEn="Custom tattoo work near Oslo, without the stress of city-center parking. Infinity Tattoo in Lørenskog is a calmer alternative for clients who want serious custom work outside the busiest part of the city."
      introNo="Custom tatovering nær Oslo, uten stresset med parkering i sentrum. Infinity Tattoo i Lørenskog er et roligere alternativ for kunder som ønsker seriøst custom arbeid utenfor den travleste delen av byen."
      travelEn="Many clients come from Oslo because longer tattoo sessions are easier to plan in a calmer studio setting, with less city stress before and after the appointment."
      travelNo="Mange kunder kommer fra Oslo fordi lengre tatoveringstimer er enklere å planlegge i et roligere studio, med mindre bystress før og etter timen."
      focusEn="The studio focuses on custom realism, black & grey, portrait tattoos, sleeves, blackout work, fine line, freehand Maori, cover-up planning, tooth gems, and clear consultations before booking."
      focusNo="Studioet fokuserer på custom realisme, black and grey, portrett tatoveringer, sleeves, blackout arbeid, fine line, freehand Maori, cover-up planlegging, tooth gems og tydelige konsultasjoner før booking."
    />
  );
}
