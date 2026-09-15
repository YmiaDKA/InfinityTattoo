import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Sleeve Tatovering | Infinity Tattoo Lørenskog",
  description:
    "Sleeve tatovering i Lørenskog nær Oslo, Strømmen og Lillestrøm. Realisme, black and grey, Maori, blackout og større custom prosjekter.",
  alternates: {
    canonical: "https://infinitytattoo.no/sleeve-tatovering",
  },
};

export default function SleeveTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Sleeve tatovering"
      introEn="Sleeve tattoos in Lørenskog planned as full custom projects, with flow, spacing and long-term structure from the first consultation."
      introNo="Sleeve tatovering i Lørenskog planlagt som fullstendige custom prosjekter, med flyt, mellomrom og langsiktig struktur fra første konsultasjon."
      planningEn="Sleeves need a bigger plan. We look at theme, placement, transitions, session order and how each part connects around the arm or leg."
      planningNo="Sleeves trenger en større plan. Vi ser på tema, plassering, overganger, rekkefølge på sessions og hvordan delene henger sammen rundt arm eller bein."
      fitEn="A strong sleeve should move naturally with the body and still make sense when seen from different angles."
      fitNo="En sterk sleeve skal følge kroppen naturlig og fortsatt gi mening fra forskjellige vinkler."
      imageOffset={1}
      signals={[
        {
          titleEn: "Full project plan",
          titleNo: "Full prosjektplan",
          textEn: "Theme, references, sessions and budget direction are discussed early.",
          textNo: "Tema, referanser, sessions og prisretning avklares tidlig.",
        },
        {
          titleEn: "Body flow",
          titleNo: "Kroppsflyt",
          textEn: "The design follows movement, muscles and natural lines.",
          textNo: "Designet følger bevegelse, muskler og naturlige linjer.",
        },
        {
          titleEn: "Session order",
          titleNo: "Rekkefølge",
          textEn: "Large work is split into realistic sessions with a clear direction.",
          textNo: "Større arbeid deles inn i realistiske sessions med tydelig retning.",
        },
      ]}
    />
  );
}
