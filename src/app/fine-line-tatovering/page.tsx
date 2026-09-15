import type { Metadata } from "next";

import { StyleLandingPage } from "@/components/style-landing-page";

export const metadata: Metadata = {
  title: "Fine Line Tatovering | Infinity Tattoo Lørenskog",
  description:
    "Fine line tatovering i Lørenskog nær Oslo, Strømmen og Lillestrøm. Små custom motiver, ren plassering og konsultasjon.",
  alternates: {
    canonical: "https://infinitytattoo.no/fine-line-tatovering",
  },
};

export default function FineLineTatoveringPage() {
  return (
    <StyleLandingPage
      headline="Fine line tatovering"
      introEn="Fine line tattoos in Lørenskog for smaller custom pieces where placement, clean lines and simple design choices matter."
      introNo="Fine line tatovering i Lørenskog for mindre custom motiver der plassering, rene linjer og enkle designvalg betyr mye."
      planningEn="Fine line work should be simple enough to heal well. We look at size, placement, detail level and how thin lines will age on the skin."
      planningNo="Fine line bør være enkelt nok til å gro pent. Vi ser på størrelse, plassering, detaljnivå og hvordan tynne linjer vil eldes i huden."
      fitEn="Small tattoos still need planning. The best result often comes from removing details instead of adding too much into a tiny space."
      fitNo="Små tatoveringer trenger fortsatt planlegging. Best resultat kommer ofte av å fjerne detaljer, ikke presse for mye inn på liten plass."
      imageOffset={4}
      signals={[
        {
          titleEn: "Clean lines",
          titleNo: "Rene linjer",
          textEn: "Line weight and placement are chosen for a cleaner healed result.",
          textNo: "Linjetykkelse og plassering velges for et renere grodd resultat.",
        },
        {
          titleEn: "Simple detail",
          titleNo: "Enkle detaljer",
          textEn: "Fine line works best when the design has room to breathe.",
          textNo: "Fine line fungerer best når designet får rom til å puste.",
        },
        {
          titleEn: "First tattoo friendly",
          titleNo: "Fint for første tatovering",
          textEn: "A clear consultation makes smaller first tattoos easier to plan.",
          textNo: "En tydelig konsultasjon gjør mindre førstegangstatoveringer enklere å planlegge.",
        },
      ]}
    />
  );
}
