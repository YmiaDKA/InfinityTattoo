import {
  BadgeCheckIcon,
  CalendarDaysIcon,
  MoveUpRightIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { ToothGemGallery } from "@/components/tooth-gem-gallery";
import { ToothGemSizeGuide } from "@/components/tooth-gem-size-guide";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  noraHighlights,
  toothGemDesigns,
  toothGemPrices,
} from "@/lib/tooth-gems";

const toothGemOptions = [
  ...toothGemPrices.map((item) => ({
    ...item,
    priceEn: item.price,
    priceNo: item.price,
  })),
  ...toothGemDesigns,
];

const supremeGemzBookingUrl = "https://booking.linework.com/supreme-gemz";

export const metadata = {
  title: "Tooth Gems og tannsmykker | Infinity Tattoo Lørenskog",
  description:
    "Tooth Gems og tannsmykker hos Infinity Tattoo i Lørenskog. Krystallplassering, standard designs, disco, 18k gold og custom design.",
  alternates: {
    canonical: "https://infinitytattoo.no/tooth-gems",
  },
};

export default function ToothGemsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader bookingExternal bookingHref={supremeGemzBookingUrl} />

      <ToothGemGallery />

      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-16 pt-10 sm:px-8 lg:pb-24">
        <div className="motion-rise flex flex-col gap-6">
          <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
            Tooth Gems
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            <LocalizedText
              en="A separate cosmetic jewelry service inside Infinity Tattoo Studio. Clean crystal placement, small high shine details, and custom design options made to look polished on their own. Nora, 25, of SUPREME.GEMZ specializes in piercing jewelry styling and Swarovski crystal Tooth Gems, using quality materials chosen for skin and teeth safety. Tooth Gems are placed with dental approved equipment and real Swarovski crystals or 18k gold/white gold options. From consultation and treatment to aftercare, the focus is that you feel informed, comfortable, and confident about placement, materials, healing, and long term results."
              no="En egen kosmetisk smykkeservice hos Infinity Tattoo Studio. Ren krystallplassering, små detaljer med shine og custom design som får et eget premium uttrykk. Nora, 25, fra SUPREME.GEMZ jobber med styling av piercing smykker og Swarovski Tooth Gems, med kvalitetsmaterialer valgt for trygghet for hud og tenner. Tooth Gems settes med dental godkjent utstyr og ekte Swarovski krystaller eller 18k gull/hvitt gull. Fra konsultasjon og behandling til etterbehandling er fokuset at du føler deg godt informert og trygg på plassering, materialer, healing og resultat over tid."
            />
          </p>
          <ul className="flex max-w-3xl flex-wrap gap-x-6 gap-y-3">
            {noraHighlights.map((item, index) => (
              <li
                className="flex items-start gap-2 text-sm text-foreground"
                key={item.titleEn}
              >
                {index < 2 ? (
                  <BadgeCheckIcon className="mt-0.5 size-4 shrink-0 text-[color:var(--studio-gold)]" />
                ) : (
                  <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-[color:var(--studio-gold)]" />
                )}
                <LocalizedText en={item.titleEn} no={item.titleNo} />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={
                <a
                  href={supremeGemzBookingUrl}
                  rel="noreferrer"
                  target="_blank"
                />
              }
              size="lg"
            >
              <LocalizedText en="Book Tooth Gems" no="Book Tooth Gems" />
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<Link href="/#services" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="Back home" no="Til forsiden" />
              <MoveUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="motion-reveal flex flex-col gap-3">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              <LocalizedText
                en="Designs and prices"
                no="Designvalg og priser"
              />
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              <LocalizedText
                en="Choose a clean single placement, a small arrangement, or ask about a custom tooth gem design."
                no="Velg enkel plassering, et lite oppsett, eller spør om custom tooth gem design."
              />
            </p>
          </div>
          <div className="motion-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {toothGemOptions.map((item) => (
              <Card className="motion-reveal min-h-48" key={item.titleEn}>
                <CardHeader>
                  <CardTitle>
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <p className="font-display text-3xl font-bold text-[color:var(--studio-gold)]">
                    <LocalizedText
                      en={item.priceEn ?? item.price}
                      no={item.priceNo ?? item.price}
                    />
                  </p>
                  <p className="mt-auto text-sm leading-6 text-muted-foreground">
                    <LocalizedText en={item.textEn} no={item.textNo} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ToothGemSizeGuide />
    </main>
  );
}
