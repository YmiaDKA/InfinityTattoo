import type { Metadata } from "next";

import { AreaLandingPage } from "@/components/area-landing-page";

export const metadata: Metadata = {
  title: "Tatovering Oslo | Custom Realisme hos Infinity Tattoo",
  description:
    "Tatovering for kunder fra Oslo hos Infinity Tattoo i Lørenskog. Custom realisme, black and grey, portrett, sleeve og freehand Maori.",
  alternates: {
    canonical: "https://infinitytattoo.no/tatovering-oslo",
  },
};

export default function TatoveringOsloPage() {
  return (
    <AreaLandingPage
      area="Oslo"
      headline="Tatovering Oslo"
      introEn="Clients from Oslo are welcome at Infinity Tattoo for custom realistic tattoos, black & grey portraits, sleeve projects, cover-up planning, tooth gems, and freehand Maori tattoo work."
      introNo="Kunder fra Oslo er velkommen hos Infinity Tattoo for custom realistiske tatoveringer, black and grey portretter, sleeve-prosjekter, cover-up planlegging, tooth gems og freehand Maori."
      travelEn="The studio is in Lørenskog, outside the pressure of central Oslo, with a calmer setting for consultations and serious custom tattoo projects. Custom tattoo work near Oslo, without the stress of city-center parking."
      travelNo="Studioet ligger i Lørenskog, utenfor presset i Oslo sentrum, med roligere rammer for konsultasjoner og seriøse custom tatoveringsprosjekter. Custom tatovering nær Oslo, uten stresset med parkering i sentrum."
      focusEn="For larger tattoos, the right plan matters. The consultation covers body flow, references, placement, size, time estimate, and price direction before the tattoo appointment."
      focusNo="For større tatoveringer betyr riktig plan mye. Konsultasjonen går gjennom kroppsflyt, referanser, plassering, størrelse, tidsbruk og prisretning før tatoveringstimen."
    />
  );
}
