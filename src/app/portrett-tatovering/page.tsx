import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Portrett Tatovering | Infinity Tattoo Lørenskog",
  description:
    "Portrett tatovering i Lørenskog nær Oslo, Strømmen og Lillestrøm. Black and grey portretter, realisme, kontrast og konsultasjon.",
  alternates: {
    canonical: "https://infinitytattoo.no/portrett-tatovering",
  },
};

export default function PortrettTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Portrett tatovering"
      introEn="Portrait tattoos in Lørenskog with focus on likeness, contrast, structure and references that are strong enough for a realistic result."
      introNo="Portrett tatovering i Lørenskog med fokus på likhet, kontrast, struktur og referanser som er sterke nok for et realistisk resultat."
      planningEn="A portrait tattoo starts with the photo. Lighting, angle, sharpness and expression all affect how well the tattoo can be translated to skin."
      planningNo="En portrett tatovering starter med bildet. Lys, vinkel, skarphet og uttrykk påvirker hvor godt motivet kan overføres til hud."
      fitEn="Placement and size are chosen so the face keeps its structure and detail instead of becoming too small or crowded."
      fitNo="Plassering og størrelse velges slik at ansiktet beholder struktur og detaljer uten å bli for lite eller tett."
      imageOffset={3}
      signals={[
        {
          titleEn: "Strong likeness",
          titleNo: "God likhet",
          textEn: "Face structure, expression and contrast are planned carefully.",
          textNo: "Ansiktsstruktur, uttrykk og kontrast planlegges nøye.",
        },
        {
          titleEn: "Photo check",
          titleNo: "Bildevurdering",
          textEn: "Not every reference photo is strong enough for a portrait tattoo.",
          textNo: "Ikke alle referansebilder er sterke nok for et portrett.",
        },
        {
          titleEn: "Right size",
          titleNo: "Riktig størrelse",
          textEn: "Portraits need enough space for eyes, shadows and skin texture.",
          textNo: "Portretter trenger nok plass til øyne, skygger og hudstruktur.",
        },
      ]}
    />
  );
}
