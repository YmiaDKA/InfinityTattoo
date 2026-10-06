import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Lettering Tatovering | Infinity Tattoo Lørenskog",
  description:
    "Lettering tatovering i Lørenskog nær Oslo, Strømmen og Lillestrøm. Navn, sitater, script og tekst tatoveringer med ren plassering.",
  alternates: {
    canonical: "https://infinitytattoo.no/lettering-tatovering",
  },
};

export default function LetteringTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Lettering tatovering"
      introEn="Lettering tattoos in Lørenskog for names, quotes, script and text based ideas where spacing, font choice and placement need to feel intentional."
      introNo="Lettering tatovering i Lørenskog for navn, sitater, script og tekstbaserte ideer der avstand, fontvalg og plassering må føles riktig."
      planningEn="Good lettering starts with the words, but the final result depends on size, letter spacing, line weight, placement and how the text will heal over time."
      planningNo="God lettering starter med ordene, men sluttresultatet avhenger av størrelse, bokstavavstand, linjetykkelse, plassering og hvordan teksten gror over tid."
      fitEn="Names, dates and short quotes often work best when the design is clean and readable. Longer text needs enough space so it does not blur together as the tattoo ages."
      fitNo="Navn, datoer og korte sitater fungerer ofte best når designet er rent og lett å lese. Lengre tekst trenger nok plass så den ikke flyter sammen når tatoveringen eldes."
      imageOffset={3}
      signals={[
        {
          titleEn: "Readable text",
          titleNo: "Lesbar tekst",
          textEn: "Font, spacing and size are chosen so the lettering stays clear.",
          textNo: "Font, avstand og størrelse velges så teksten holder seg tydelig.",
        },
        {
          titleEn: "Clean placement",
          titleNo: "Ren plassering",
          textEn: "The text is placed to follow the body area without feeling forced.",
          textNo: "Teksten plasseres så den følger området på kroppen uten å virke presset inn.",
        },
        {
          titleEn: "Personal meaning",
          titleNo: "Personlig betydning",
          textEn: "Names, dates and quotes are planned with care before the stencil goes on.",
          textNo: "Navn, datoer og sitater planlegges nøye før stencilen settes på.",
        },
      ]}
    />
  );
}
