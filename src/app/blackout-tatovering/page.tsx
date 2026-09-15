import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Blackout Tatovering | Infinity Tattoo Lørenskog",
  description:
    "Blackout tatovering og heavy blackwork i Lørenskog nær Oslo, Strømmen og Lillestrøm. Ren dekning, kanter, flyt og konsultasjon.",
  alternates: {
    canonical: "https://infinitytattoo.no/blackout-tatovering",
  },
};

export default function BlackoutTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Blackout tatovering"
      introEn="Blackout tattoo and heavy blackwork in Lørenskog for clients who want bold coverage, clean edges and a serious plan before starting."
      introNo="Blackout tatovering og heavy blackwork i Lørenskog for deg som ønsker sterk dekning, rene kanter og en seriøs plan før vi starter."
      planningEn="Blackout work needs planning around coverage, skin response, old tattoos, edges, healing and how the black areas flow with the body."
      planningNo="Blackout må planlegges rundt dekning, hudrespons, gamle tatoveringer, kanter, healing og hvordan de sorte flatene følger kroppen."
      fitEn="A good blackout project is not just filling skin. It needs shape, balance, negative space and a clear reason for where the black starts and stops."
      fitNo="Et bra blackout-prosjekt handler ikke bare om å fylle hud. Det trenger form, balanse, negativ space og en tydelig grunn til hvor det sorte starter og stopper."
      imageOffset={2}
      signals={[
        {
          titleEn: "Coverage plan",
          titleNo: "Plan for dekning",
          textEn: "Old tattoos, scars and skin condition are reviewed before the session.",
          textNo: "Gamle tatoveringer, arr og hudtilstand vurderes før timen.",
        },
        {
          titleEn: "Clean edges",
          titleNo: "Rene kanter",
          textEn: "Edges and shape matter as much as saturation.",
          textNo: "Kanter og form betyr like mye som metning.",
        },
        {
          titleEn: "Healing focus",
          titleNo: "Fokus på healing",
          textEn: "Aftercare and realistic session planning are important for heavy blackwork.",
          textNo: "Etterbehandling og realistisk timeplan er viktig for heavy blackwork.",
        },
      ]}
    />
  );
}
