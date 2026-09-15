import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Black and Grey Tatovering | Infinity Tattoo Lørenskog",
  description:
    "Black and grey tatovering i Lørenskog nær Strømmen, Lillestrøm og Oslo. Kontrast, shading, portretter, sleeves og custom prosjekter.",
  alternates: {
    canonical: "https://infinitytattoo.no/black-and-grey-tatovering",
  },
};

export default function BlackAndGreyTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Black and grey tatovering"
      introEn="Black and grey tattoos in Lørenskog with clean shading, controlled contrast and custom composition for clients from Oslo, Strømmen and Lillestrøm."
      introNo="Black and grey tatovering i Lørenskog med ren shading, kontrollert kontrast og custom komposisjon for kunder fra Oslo, Strømmen og Lillestrøm."
      planningEn="Black and grey work depends on smooth transitions, strong darks, soft midtones and enough open skin so the tattoo stays readable."
      planningNo="Black and grey handler om myke overganger, sterke mørke partier, rolige mellomtoner og nok åpen hud til at tatoveringen holder seg lesbar."
      fitEn="The design is planned around the shape of the area, whether it is a portrait, sleeve, cover-up or larger realism piece."
      fitNo="Designet planlegges rundt formen på området, enten det er portrett, sleeve, cover-up eller større realisme."
      imageOffset={1}
      signals={[
        {
          titleEn: "Smooth shading",
          titleNo: "Myk shading",
          textEn: "Soft transitions keep black and grey work clean and professional.",
          textNo: "Myke overganger gjør black and grey arbeid rent og profesjonelt.",
        },
        {
          titleEn: "Strong blacks",
          titleNo: "Sterke sorte partier",
          textEn: "Deep contrast gives structure and helps the piece hold over time.",
          textNo: "Dyp kontrast gir struktur og hjelper motivet å holde over tid.",
        },
        {
          titleEn: "Custom flow",
          titleNo: "Custom flyt",
          textEn: "The composition follows your body, not a random template.",
          textNo: "Komposisjonen følger kroppen din, ikke en tilfeldig mal.",
        },
      ]}
    />
  );
}
