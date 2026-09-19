import Image from "next/image";
import {
  BadgeCheckIcon,
  CalendarDaysIcon,
  GemIcon,
  MoveUpRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { ToothGemSizeGuide } from "@/components/tooth-gem-size-guide";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  noraHighlights,
  supremeGemzGallery,
  toothGemDesigns,
  toothGemPrices,
} from "@/lib/tooth-gems";

const supremeGemzBookingUrl = "https://booking.linework.com/supreme-gemz";

export const metadata = {
  title: "Tooth gems og tannsmykker | Infinity Tattoo Lørenskog",
  description:
    "Tooth gems og tannsmykker hos Infinity Tattoo i Lørenskog. Krystallplassering, standard designs, disco, 18k gold og custom design.",
  alternates: {
    canonical: "https://infinitytattoo.no/tooth-gems",
  },
};

export default function ToothGemsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader bookingExternal bookingHref={supremeGemzBookingUrl} />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-24">
        <div className="motion-rise flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <SparklesIcon className="size-5" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
              Tooth gems
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              <LocalizedText
                en="A separate cosmetic jewelry service inside Infinity Tattoo Studio. Clean crystal placement, small high-shine details, and custom design options made to look polished on their own."
                no="En egen kosmetisk smykkeservice hos Infinity Tattoo Studio. Ren krystallplassering, små detaljer med shine og custom design som får et eget premium uttrykk."
              />
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<a href={supremeGemzBookingUrl} rel="noreferrer" target="_blank" />}
              size="lg"
            >
              <LocalizedText en="Book tooth gems" no="Book tooth gems" />
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<Link href="/#tooth-gems" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="Back home" no="Til forsiden" />
              <MoveUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="motion-stagger grid gap-3 sm:grid-cols-3">
          {toothGemPrices.map((item) => (
            <Card className="motion-lift motion-reveal bg-card/70" key={item.titleEn}>
              <CardContent className="flex min-h-40 flex-col gap-3 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  <LocalizedText en={item.titleEn} no={item.titleNo} />
                </p>
                <p className="font-display text-4xl font-bold text-foreground">
                  {item.price}
                </p>
                <p className="mt-auto text-sm leading-6 text-muted-foreground">
                  <LocalizedText en={item.textEn} no={item.textNo} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ToothGemSizeGuide />

      <section className="border-y bg-card/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 lg:py-24">
          <div className="motion-reveal flex flex-col gap-3">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              <LocalizedText en="Design options" no="Designvalg" />
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              <LocalizedText
                en="Choose a clean single placement, a small arrangement, or ask about a custom tooth gem design."
                no="Velg enkel plassering, et lite oppsett, eller spør om custom tooth gem design."
              />
            </p>
          </div>

          <div className="motion-stagger grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {toothGemDesigns.map((item) => (
              <Card className="motion-lift motion-reveal bg-background/70" key={item.titleEn}>
                <CardContent className="flex min-h-56 flex-col gap-4 p-5">
                  <p className="font-display text-xl font-bold text-foreground">
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
                  </p>
                  <p className="font-display text-3xl font-bold text-[color:var(--studio-red)]">
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

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-24">
        <div className="flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <GemIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              SUPREME.GEMZ
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Nora, 25
            </h2>
            <p className="mt-2 text-lg font-semibold text-[color:var(--studio-red)]">
              Piercing / Tooth gems
            </p>
          </div>
          <p className="text-base leading-7 text-muted-foreground">
            <LocalizedText
              en="Nora specializes in piercing jewelry styling and Swarovski crystal tooth gems, using quality materials chosen for skin and teeth safety. Tooth gems are placed with dental-approved equipment and real Swarovski crystals or 18k gold/white gold options."
              no="Nora jobber med styling av piercing smykker og Swarovski tooth gems, med kvalitetsmaterialer valgt for trygghet for hud og tenner. Tooth gems settes med dental-godkjent utstyr og ekte Swarovski krystaller eller 18k gull/hvitt gull."
            />
          </p>
          <p className="text-base leading-7 text-muted-foreground">
            <LocalizedText
              en="From consultation and treatment to aftercare, the focus is that you feel informed, comfortable, and confident about placement, materials, healing, and long-term results."
              no="Fra konsultasjon og behandling til etterbehandling er fokuset at du føler deg godt informert og trygg på plassering, materialer, healing og resultat over tid."
            />
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            {noraHighlights.map((item, index) => (
              <div
                className="flex items-start gap-2 rounded-lg border border-border/70 bg-card/45 p-3 text-sm text-foreground"
                key={item.titleEn}
              >
                {index < 2 ? (
                  <BadgeCheckIcon className="mt-0.5 size-4 shrink-0 text-[color:var(--studio-red)]" />
                ) : (
                  <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-[color:var(--studio-red)]" />
                )}
                <LocalizedText en={item.titleEn} no={item.titleNo} />
              </div>
            ))}
          </div>
        </div>

        <div className="motion-stagger grid grid-cols-2 gap-3">
          {supremeGemzGallery.map((image, index) => (
            <div
              className={[
                "motion-lift relative overflow-hidden rounded-lg border border-border/70 bg-card/40",
                index === 0 ? "col-span-2 aspect-[1.35]" : "aspect-[0.86]",
                index === 2 || index === 5 ? "sm:aspect-[1.2]" : "",
              ].join(" ")}
              key={image.src}
            >
              <Image
                alt={image.alt}
                className="object-cover"
                fill
                loading="eager"
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 620px, 90vw"
                    : "(min-width: 1024px) 300px, 45vw"
                }
                src={image.src}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
