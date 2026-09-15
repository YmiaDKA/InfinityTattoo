import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Cover Up Tatovering | Infinity Tattoo Lørenskog",
  description:
    "Cover up tatovering i Lørenskog nær Oslo, Strømmen og Lillestrøm. Realistisk planlegging, mørke verdier, størrelse og konsultasjon.",
  alternates: {
    canonical: "https://infinitytattoo.no/cover-up-tatovering",
  },
};

export default function CoverUpTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Cover up tatovering"
      introEn="Cover-up tattoo planning in Lørenskog for clients who want a realistic solution for old, faded or unwanted tattoos."
      introNo="Cover-up tatovering i Lørenskog for deg som ønsker en realistisk løsning på gamle, falmede eller uønskede tatoveringer."
      planningEn="A good cover-up starts with honesty. We look at the old tattoo, darkness, scar tissue, size and whether laser lightening may be needed first."
      planningNo="En god cover-up starter ærlig. Vi vurderer gammel tatovering, mørkhet, arrvev, størrelse og om laser kan være lurt først."
      fitEn="The new design usually needs to be larger, darker or more structured than the old tattoo, so the result looks intentional."
      fitNo="Det nye designet må ofte være større, mørkere eller mer strukturert enn den gamle tatoveringen, så resultatet ser bevisst ut."
      imageOffset={0}
      signals={[
        {
          titleEn: "Honest assessment",
          titleNo: "Ærlig vurdering",
          textEn: "You get a realistic answer about what can and cannot be covered.",
          textNo: "Du får et realistisk svar på hva som kan og ikke kan dekkes.",
        },
        {
          titleEn: "Right design",
          titleNo: "Riktig motiv",
          textEn: "The new tattoo must be chosen for coverage, not only taste.",
          textNo: "Det nye motivet må velges for dekning, ikke bare smak.",
        },
        {
          titleEn: "Better direction",
          titleNo: "Bedre retning",
          textEn: "The goal is a tattoo you are proud to wear, not a quick patch.",
          textNo: "Målet er en tatovering du er stolt av, ikke en rask lapp.",
        },
      ]}
    />
  );
}
