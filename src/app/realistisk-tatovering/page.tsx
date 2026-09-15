import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Realistisk Tatovering Lørenskog | Infinity Tattoo",
  description:
    "Realistisk tatovering i Lørenskog nær Strømmen, Lillestrøm og Oslo. Custom realism, detaljer, kontrast og konsultasjon hos Infinity Tattoo.",
  alternates: {
    canonical: "https://infinitytattoo.no/realistisk-tatovering",
  },
};

export default function RealistiskTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Realistisk tatovering"
      introEn="Custom realistic tattoos in Lørenskog for clients from Strømmen, Lillestrøm and Oslo who want detail, contrast and a design that fits the body."
      introNo="Custom realistisk tatovering i Lørenskog for kunder fra Strømmen, Lillestrøm og Oslo som ønsker detaljer, kontrast og et design som passer kroppen."
      planningEn="Realism needs strong references, clean contrast, correct placement and a realistic plan for how the tattoo will hold over time."
      planningNo="Realisme trenger gode referanser, tydelig kontrast, riktig plassering og en realistisk plan for hvordan tatoveringen skal holde over tid."
      fitEn="Each realism project is planned around skin tone, body shape, size and how the details will read from both close up and distance."
      fitNo="Hvert realism-prosjekt planlegges rundt hudtone, kroppsform, størrelse og hvordan detaljene leses både nært og på avstand."
      imageOffset={0}
      signals={[
        {
          titleEn: "Reference quality",
          titleNo: "Referansekvalitet",
          textEn: "The final result starts with strong references and a clear direction.",
          textNo: "Resultatet starter med gode referanser og en tydelig retning.",
        },
        {
          titleEn: "Contrast",
          titleNo: "Kontrast",
          textEn: "Depth and readable values are planned before the session starts.",
          textNo: "Dybde og lesbare valører planlegges før timen starter.",
        },
        {
          titleEn: "Long-term look",
          titleNo: "Langvarig uttrykk",
          textEn: "The design is built to age cleaner, not only to look good on day one.",
          textNo: "Designet bygges for å eldes penere, ikke bare se bra ut første dag.",
        },
      ]}
    />
  );
}
