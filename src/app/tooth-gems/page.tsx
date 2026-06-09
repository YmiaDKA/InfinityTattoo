import { CalendarDaysIcon, MoveUpRightIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toothGemDesigns, toothGemPrices } from "@/lib/tooth-gems";

export const metadata = {
  title: "Tooth gems | Infinity Tattoo",
  description:
    "Tooth gems at Infinity Tattoo Studio in Lørenskog. Crystal placement, standard designs, disco, 18k gold, and custom tooth gem design options.",
};

export default function ToothGemsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

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
              render={<Link href="/#booking" />}
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

      <section className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="font-display text-3xl font-bold">
          <LocalizedText en="Photos coming soon" no="Bilder kommer snart" />
        </h2>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          <LocalizedText
            en="New tooth gem photos will be added here when they are ready. The current page keeps the service separate from tattooing while still making the prices easy to find."
            no="Nye tooth gem-bilder legges inn her når de er klare. Denne siden holder servicen separat fra tatovering, samtidig som prisene er enkle å finne."
          />
        </p>
      </section>
    </main>
  );
}
