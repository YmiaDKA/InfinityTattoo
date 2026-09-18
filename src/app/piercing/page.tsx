import type { Metadata } from "next";
import Link from "next/link";
import {
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
import { piercingAftercare, piercingPrices } from "@/lib/piercing";

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
      <SiteHeader />

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
                en="A separate piercing service at Infinity Tattoo Studio in Lørenskog. Clean placement, calm guidance, clear prices, and aftercare explained before you leave."
                no="En egen piercing-service hos Infinity Tattoo Studio i Lørenskog. Ren plassering, rolig veiledning, tydelige priser og etterbehandling forklart før du går."
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

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:py-24">
        <div className="motion-reveal flex flex-col gap-4">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShieldCheckIcon className="size-5" />
          </div>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            <LocalizedText en="Aftercare" no="Etterbehandling" />
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
            <LocalizedText
              en="Piercing healing depends on placement, hygiene and consistency. You get aftercare guidance at the appointment, and you can always contact the studio if something feels unclear."
              no="Healing av piercing avhenger av plassering, hygiene og konsekvent pleie. Du får etterbehandlingsråd på timen, og du kan alltid kontakte studioet hvis noe er uklart."
            />
          </p>
        </div>

        <div className="motion-stagger grid gap-3 sm:grid-cols-2">
          {piercingAftercare.map((item) => (
            <div
              className="motion-lift-subtle rounded-lg border border-border/70 bg-card/45 p-5"
              key={item.titleEn}
            >
              <p className="font-display text-xl font-bold text-foreground">
                <LocalizedText en={item.titleEn} no={item.titleNo} />
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                <LocalizedText en={item.textEn} no={item.textNo} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 pb-20 text-center sm:px-8 lg:pb-28">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">
          <LocalizedText en="Ready to plan it?" no="Klar for å planlegge?" />
        </h2>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          <LocalizedText
            en="Use the same booking system as the tattoo studio. Write piercing in the message so the appointment is routed correctly."
            no="Bruk samme bookingsystem som tatoveringsstudioet. Skriv piercing i meldingen, så blir timen riktig satt opp."
          />
        </p>
        <Button
          className="motion-lift-subtle rounded-full"
          nativeButton={false}
          render={<Link href="/#booking" />}
          size="lg"
        >
          <LocalizedText en="Book appointment" no="Book time" />
          <MoveUpRightIcon data-icon="inline-end" />
        </Button>
      </section>
    </main>
  );
}
