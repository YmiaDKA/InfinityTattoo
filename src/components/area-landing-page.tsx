import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  MoveUpRightIcon,
  RouteIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuredGalleryImages } from "@/lib/site-data";

type AreaLandingPageProps = {
  area: string;
  headline: string;
  introEn: string;
  introNo: string;
  travelEn: string;
  travelNo: string;
  focusEn: string;
  focusNo: string;
};

const serviceSignals = [
  {
    titleEn: "Realistic tattoos",
    titleNo: "Realistisk tatovering",
    textEn: "Portraits, black & grey realism, sleeves, and larger custom pieces.",
    textNo: "Portretter, black & grey realisme, sleeves og større custom prosjekter.",
  },
  {
    titleEn: "Freehand Maori",
    titleNo: "Freehand Maori",
    textEn: "Large-scale Maori and Polynesian-inspired flow work drawn for the body.",
    textNo: "Maori og Polynesian-inspirert arbeid i stor skala, tegnet for kroppen.",
  },
  {
    titleEn: "Clear consultation",
    titleNo: "Tydelig konsultasjon",
    textEn: "Idea, placement, size, time, price direction, and deposit are discussed first.",
    textNo: "Idé, plassering, størrelse, tid, prisretning og depositum avklares først.",
  },
];

export function AreaLandingPage({
  area,
  headline,
  introEn,
  introNo,
  travelEn,
  travelNo,
  focusEn,
  focusNo,
}: AreaLandingPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:pb-24">
        <div className="motion-rise flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPinIcon className="size-5" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
              {headline}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              <LocalizedText en={introEn} no={introNo} />
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<Link href="/#consultation" />}
              size="lg"
            >
              <LocalizedText en="Start your idea" no="Start ideen din" />
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<Link href="/work" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="View work" no="Se arbeid" />
              <MoveUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="motion-stagger grid gap-3 sm:grid-cols-3">
          {featuredGalleryImages.slice(0, 3).map((image) => (
            <div
              className="motion-lift motion-reveal relative aspect-[4/5] overflow-hidden rounded-lg border bg-card"
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="motion-media object-cover"
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 92vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:py-24">
          <div className="motion-reveal flex flex-col gap-4">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <RouteIcon className="size-5" />
            </div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              <LocalizedText
                en={`Tattoo studio near ${area}`}
                no={`Tatoveringsstudio nær ${area}`}
              />
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              <LocalizedText en={travelEn} no={travelNo} />
            </p>
          </div>

          <div className="motion-stagger grid gap-3 sm:grid-cols-3">
            {serviceSignals.map((item) => (
              <Card className="motion-lift motion-reveal bg-background/70" key={item.titleEn}>
                <CardContent className="flex min-h-48 flex-col gap-4 p-5">
                  <ShieldCheckIcon className="size-5 text-[color:var(--studio-red)]" />
                  <p className="font-display text-xl font-bold text-foreground">
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
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

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div className="motion-reveal flex flex-col gap-4">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <SparklesIcon className="size-5" />
          </div>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            <LocalizedText en="Made around the client" no="Laget rundt kunden" />
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            <LocalizedText en={focusEn} no={focusNo} />
          </p>
        </div>

        <Card className="motion-lift-subtle bg-card/70">
          <CardContent className="flex flex-col gap-5 p-5">
            <p className="font-display text-2xl font-bold text-foreground">
              <LocalizedText en="Ready to plan?" no="Klar for å planlegge?" />
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              <LocalizedText
                en="Send your idea first if you are unsure, or book a consultation through Linework if you are ready to choose a time."
                no="Send ideen først hvis du er usikker, eller book konsultasjon via Linework hvis du er klar for å velge tid."
              />
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button
                className="motion-lift-subtle rounded-full"
                nativeButton={false}
                render={<Link href="/#consultation" />}
                size="lg"
              >
                <LocalizedText en="Send your idea" no="Send ideen din" />
                <MoveUpRightIcon data-icon="inline-end" />
              </Button>
              <Button
                className="motion-lift-subtle rounded-full"
                nativeButton={false}
                render={<Link href="/#booking" />}
                size="lg"
                variant="outline"
              >
                <LocalizedText en="Book consultation" no="Book konsultasjon" />
                <CalendarDaysIcon data-icon="inline-end" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
