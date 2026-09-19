import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheckIcon,
  CalendarDaysIcon,
  CircleDotIcon,
  GemIcon,
  MoveUpRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

import { LocalizedText } from "@/components/localized-text";
import { PiercingEarMap } from "@/components/piercing-ear-map";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  noraPiercingHighlights,
  piercingGallery,
  piercingPrices,
} from "@/lib/piercing";

const supremeGemzBookingUrl = "https://booking.linework.com/supreme-gemz";

export const metadata: Metadata = {
  title: "Piercing Lørenskog | Infinity Tattoo Studio",
  description:
    "Piercing hos Infinity Tattoo Studio i Lørenskog. Se priser for lobe, helix, tragus, conch, rook, septum, nese, navle og mer.",
  alternates: {
    canonical: "https://infinitytattoo.no/piercing",
  },
};

export default function PiercingPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader bookingExternal bookingHref={supremeGemzBookingUrl} />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:pb-24">
        <div className="motion-rise flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <GemIcon className="size-5" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
              Piercing
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              <LocalizedText
                en="A separate piercing service at Infinity Tattoo Studio in Lørenskog. Clean placement, calm guidance, clear prices, and personal guidance from Nora at your appointment."
                no="En egen piercing-service hos Infinity Tattoo Studio i Lørenskog. Ren plassering, rolig veiledning, tydelige priser og personlig veiledning fra Nora på timen."
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
              <LocalizedText en="Book piercing" no="Book piercing" />
              <CalendarDaysIcon data-icon="inline-end" />
            </Button>
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<Link href="/tooth-gems" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="Tooth gems" no="Tooth gems" />
              <SparklesIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="motion-reveal relative overflow-hidden rounded-lg border bg-card/70 p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/50 to-transparent" />
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                <LocalizedText en="Piercing prices" no="Piercing priser" />
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
                <LocalizedText en="Prices & placements" no="Priser og plasseringer" />
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {piercingPrices.slice(0, 6).map((item) => (
                <div
                  className="flex items-center justify-between gap-4 border-b border-border/70 py-3"
                  key={item.titleEn}
                >
                  <span className="text-sm text-muted-foreground">
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
                  </span>
                  <span className="font-display text-xl font-bold text-foreground">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
        <PiercingEarMap />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:pb-24">
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
              en="Nora works with piercing placement, jewelry styling and tooth gems at Infinity Tattoo Studio. She helps you choose jewelry that fits your anatomy, personal style, budget and any allergies."
              no="Nora jobber med piercing, smykkestyling og tooth gems hos Infinity Tattoo Studio. Hun hjelper deg å velge smykker som passer anatomien din, stilen din, budsjettet ditt og eventuelle allergier."
            />
          </p>
          <p className="text-base leading-7 text-muted-foreground">
            <LocalizedText
              en="All piercing jewelry sold in studio is allergy friendly, with options in titanium, stainless steel and 18-24k gold plating. The focus is safe work, clear communication and comfort from placement to the finished service."
              no="Alle piercing-smykker som selges i studio er allergivennlige, med valg i titanium, kirurgisk stål og 18-24k gullbelagt. Fokuset er trygt arbeid, tydelig kommunikasjon og komfort fra plassering til ferdig behandling."
            />
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            {noraPiercingHighlights.map((item, index) => (
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

        <div className="grid grid-cols-2 gap-3">
          {piercingGallery.map((image, index) => (
            <div
              className={[
                "motion-lift relative overflow-hidden rounded-lg border border-border/70 bg-card/40",
                index === 0 ? "col-span-2 aspect-[1.25]" : "aspect-[0.95]",
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

      <section className="border-y bg-card/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 lg:py-24">
          <div className="motion-reveal flex flex-col gap-3">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              <LocalizedText en="Prices" no="Priser" />
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              <LocalizedText
                en="Prices are shown in NOK. If you are unsure which piercing fits your anatomy, ask before booking and we will guide you."
                no="Prisene er i NOK. Hvis du er usikker på hvilken piercing som passer anatomien din, spør før booking så veileder vi deg."
              />
            </p>
          </div>

          <div className="motion-stagger grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {piercingPrices.map((item) => (
              <Card className="motion-lift motion-reveal bg-background/70" key={item.titleEn}>
                <CardContent className="flex min-h-44 flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-display text-2xl font-bold text-foreground">
                      <LocalizedText en={item.titleEn} no={item.titleNo} />
                    </p>
                    <CircleDotIcon className="mt-1 size-5 shrink-0 text-[color:var(--studio-red)]" />
                  </div>
                  <p className="font-display text-3xl font-bold text-[color:var(--studio-red)]">
                    {item.price}
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

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 pb-20 text-center sm:px-8 lg:pb-28">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">
          <LocalizedText en="Ready to plan it?" no="Klar for å planlegge?" />
        </h2>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          <LocalizedText
            en="Book directly with SUPREME.GEMZ through Linework for piercing or jewelry styling."
            no="Book direkte hos SUPREME.GEMZ via Linework for piercing eller smykkestyling."
          />
        </p>
        <Button
          className="motion-lift-subtle rounded-full"
          nativeButton={false}
          render={<a href={supremeGemzBookingUrl} rel="noreferrer" target="_blank" />}
          size="lg"
        >
          <LocalizedText en="Book appointment" no="Book time" />
          <MoveUpRightIcon data-icon="inline-end" />
        </Button>
      </section>
    </main>
  );
}
