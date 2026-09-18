import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownIcon,
  ContrastIcon,
  Maximize2Icon,
  MoveUpRightIcon,
  PenLineIcon,
  SquareIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/site-data";

const portfolioHighlights = [
  {
    icon: Maximize2Icon,
    titleEn: "Large-scale realism",
    titleNo: "Realisme i stor skala",
    textEn: "Portraits, sleeves and statement work with depth, contrast and long-term structure.",
    textNo: "Portretter, sleeves og større prosjekter med dybde, kontrast og struktur som holder.",
  },
  {
    icon: ContrastIcon,
    titleEn: "Black & grey",
    titleNo: "Black & grey",
    textEn: "Smooth shading, strong darks and controlled detail for pieces that stay readable.",
    textNo: "Myk shading, sterke mørke partier og kontrollerte detaljer som holder seg lesbare.",
  },
  {
    icon: PenLineIcon,
    titleEn: "Freehand Maori",
    titleNo: "Freehand Maori",
    textEn: "Custom flow drawn around the body, not copied from a template.",
    textNo: "Custom flyt tegnet rundt kroppen, ikke kopiert fra en mal.",
  },
  {
    icon: SquareIcon,
    titleEn: "Blackout work",
    titleNo: "Blackout arbeid",
    textEn: "Heavy coverage, sharp edges and body-aware planning for bold blackwork.",
    textNo: "Tung dekning, rene kanter og planlegging rundt kroppen for kraftig blackwork.",
  },
];

export const metadata: Metadata = {
  title: "Portfolio | Realistisk tatovering Lørenskog",
  description:
    "Se portfolio med custom realisme, black and grey tatoveringer, portretter, sleeves, blackout og freehand Maori fra Infinity Tattoo i Lørenskog.",
  alternates: {
    canonical: "https://infinitytattoo.no/work",
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-24">
        <div className="motion-rise flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
              Portfolio
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              <LocalizedText
                en="A closer look at custom tattoo work from Infinity Tattoo in Lørenskog: realism, black & grey, portraits, blackout, sleeves and freehand Maori pieces made around the body."
                no="Et nærmere blikk på custom tatoveringer fra Infinity Tattoo i Lørenskog: realisme, black & grey, portretter, blackout, sleeves og freehand Maori laget rundt kroppen."
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
              <LocalizedText en="Start your idea" no="Start ideen din" />
              <MoveUpRightIcon data-icon="inline-end" />
            </Button>
            <Button
              className="motion-lift-subtle rounded-full"
              nativeButton={false}
              render={<a href="#portfolio-grid" />}
              size="lg"
              variant="outline"
            >
              <LocalizedText en="View gallery" no="Se galleri" />
              <ArrowDownIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="motion-stagger grid gap-3 sm:grid-cols-2">
          {portfolioHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="motion-lift-subtle rounded-lg border border-border/70 bg-card/45 p-5"
                key={item.titleEn}
              >
                <Icon className="size-5 text-[color:var(--studio-red)]" />
                <p className="mt-4 font-display text-xl font-bold text-foreground">
                  <LocalizedText en={item.titleEn} no={item.titleNo} />
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  <LocalizedText en={item.textEn} no={item.textNo} />
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="portfolio-grid"
        className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-20 sm:px-8 lg:pb-28"
      >
        <div className="motion-reveal flex flex-col justify-between gap-4 border-y border-border/70 py-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              <LocalizedText en="Selected work" no="Utvalgt arbeid" />
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              <LocalizedText
                en="Tap into each piece visually: strong first impressions, close detail, body flow and healed readability."
                no="Se arbeidene visuelt: sterk førsteimpresjon, detaljer, flyt på kroppen og lesbarhet over tid."
              />
            </p>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {galleryImages.length} <LocalizedText en="pieces" no="arbeider" />
          </p>
        </div>

        <div className="motion-stagger grid gap-5 md:grid-cols-2">
          {galleryImages.map((image) => (
            <div
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border bg-card shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-foreground/30"
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                loading="eager"
                sizes="(min-width: 1280px) 600px, (min-width: 768px) 48vw, 92vw"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-background/85 to-transparent p-4 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/85">
                  {image.tag}
                </span>
                <span className="text-xs text-foreground/75">
                  Infinity Tattoo
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="motion-reveal flex flex-col gap-3 sm:flex-row">
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/#booking" />}
            size="lg"
          >
            <LocalizedText en="Book consultation" no="Book konsultasjon" />
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/#work" />}
            size="lg"
            variant="outline"
          >
            <LocalizedText en="Back home" no="Til forsiden" />
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </main>
  );
}
