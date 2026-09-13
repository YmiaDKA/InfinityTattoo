import type { Metadata } from "next";

import { AreaLandingPage } from "@/components/area-landing-page";

export const metadata: Metadata = {
  title: "Kommer du fra Oslo? | Custom tatovering nær Oslo",
  description:
    "Custom tatovering nær Oslo uten stresset med parkering i sentrum. Infinity Tattoo i Lørenskog har 135+ Google-anmeldelser, og Triaden tilbyr 2 timer gratis parkering 2-3 minutter unna.",
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
      travelEn="Many clients come from Oslo because longer tattoo sessions are easier to plan in a calmer studio setting, with less city stress before and after the appointment. Triaden offers 2 hours of free parking about 2-3 minutes from the studio, and Infinity Tattoo is backed by 135+ Google reviews."
      travelNo="Mange kunder kommer fra Oslo fordi lengre tatoveringstimer er enklere å planlegge i et roligere studio, med mindre bystress før og etter timen. På Triaden får du 2 timer gratis parkering ca. 2-3 minutter fra studioet, og Infinity Tattoo har 135+ Google-anmeldelser."
      focusEn="The studio focuses on custom realism, black & grey, portrait tattoos, sleeves, blackout work, fine line, freehand Maori, cover-up planning, tooth gems, and clear consultations before booking."
      focusNo="Studioet fokuserer på custom realisme, black and grey, portrett tatoveringer, sleeves, blackout arbeid, fine line, freehand Maori, cover-up planlegging, tooth gems og tydelige konsultasjoner før booking."
    />
  );
}
