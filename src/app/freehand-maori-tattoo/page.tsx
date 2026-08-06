import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDaysIcon,
  MoveUpRightIcon,
  PenLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Freehand Maori Tatovering Norge | Infinity Tattoo",
  description:
    "Freehand Maori tatovering og Polynesian-inspirert tattoo i stor skala i Lørenskog, minutter fra Strømmen og Lillestrøm.",
  alternates: {
    canonical: "https://infinitytattoo.no/freehand-maori-tattoo",
  },
};

const processItems = [
  {
    titleEn: "Drawn for your body",
    titleNo: "Tegnet for kroppen din",
    textEn:
      "The design is shaped around your shoulder, arm, chest, back, leg, or sleeve placement so the flow feels built into the body.",
    textNo:
      "Designet formes rundt skulder, arm, bryst, rygg, bein eller sleeve-plassering slik at flyten sitter naturlig på kroppen.",
  },
  {
    titleEn: "Large-scale planning",
    titleNo: "Planlagt i stor skala",
    textEn:
      "Freehand Maori work needs balance, rhythm, spacing, and strong negative space before the first line is tattooed.",
    textNo:
      "Freehand Maori krever balanse, rytme, mellomrom og sterk negativ space før første linje tatoveres.",
  },
  {
    titleEn: "Custom, not copied",
    titleNo: "Custom, ikke kopiert",
    textEn:
      "The goal is a bold Maori and Polynesian-inspired tattoo that respects the style while being made for your body and project.",
    textNo:
      "Målet er en sterk Maori og Polynesian-inspirert tatovering som respekterer stilen, men er laget for kroppen din og prosjektet ditt.",
  },
];

const fitItems = [
  "Full sleeves",
  "Half sleeves",
  "Shoulder and chest flow",
  "Back and leg pieces",
  "Cover-up planning",
  "First large tattoo projects",
];

export default function FreehandMaoriTattooPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:pb-24">
        <div className="motion-rise flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <PenLineIcon className="size-5" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
              Freehand Maori tatovering
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              <LocalizedText
                en="Large-scale freehand Maori and Polynesian-inspired tattoo work in Norway, drawn around the body for flow, balance, and long-term impact."
                no="Freehand Maori og Polynesian-inspirerte tatoveringer i stor skala i Norge, tegnet rundt kroppen for flyt, balanse og langvarig uttrykk."
              />
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
              render={<Link href="/#artist" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="Meet Filip" no="Møt Filip" />
              <MoveUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="motion-stagger grid gap-3">
          {processItems.map((item, index) => (
            <Card className="motion-lift motion-reveal bg-card/70" key={item.titleEn}>
              <CardContent className="grid gap-4 p-5 sm:grid-cols-[auto_1fr]">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-foreground">
                    <LocalizedText en={item.titleEn} no={item.titleNo} />
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    <LocalizedText en={item.textEn} no={item.textNo} />
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-24">
          <div className="motion-reveal flex flex-col gap-4">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <SparklesIcon className="size-5" />
            </div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              <LocalizedText en="Built for flow" no="Bygget for flyt" />
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              <LocalizedText
                en="Freehand Maori tattooing is not just about patterns. The strength comes from how the design follows the muscles, joints, proportions, and movement of the body."
                no="Freehand Maori handler ikke bare om mønstre. Styrken ligger i hvordan designet følger muskler, ledd, proporsjoner og kroppens bevegelse."
              />
            </p>
          </div>

          <div className="motion-stagger grid gap-3 sm:grid-cols-2">
            {fitItems.map((item) => (
              <div
                className="motion-lift-subtle flex items-center gap-3 rounded-lg border border-border/70 bg-background/55 p-4"
                key={item}
              >
                <ShieldCheckIcon className="size-5 text-[color:var(--studio-red)]" />
                <p className="font-medium text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div className="motion-reveal flex flex-col gap-4">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            <LocalizedText en="How the consultation works" no="Slik fungerer konsultasjonen" />
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            <LocalizedText
              en="Bring a rough direction, body placement, size idea, and any reference images. Filip uses the consultation to understand the body flow, project size, session plan, and whether the piece should be built as a sleeve, chest panel, shoulder flow, leg piece, or larger composition."
              no="Ta med en grov retning, plassering på kroppen, størrelse og eventuelle referansebilder. Filip bruker konsultasjonen til å forstå kroppsflyt, prosjektstørrelse, plan for sessions og om motivet bør bygges som sleeve, brystpanel, skulderflyt, leg piece eller større komposisjon."
            />
          </p>
        </div>

        <Card className="motion-lift-subtle bg-card/70">
          <CardContent className="flex flex-col gap-5 p-5">
            <p className="font-display text-2xl font-bold text-foreground">
              <LocalizedText en="Ready to plan it?" no="Klar for å planlegge?" />
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              <LocalizedText
                en="Send the idea first if you are unsure, or book a consultation if you already know you want to start."
                no="Send ideen først hvis du er usikker, eller book konsultasjon hvis du allerede vet at du vil starte."
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
