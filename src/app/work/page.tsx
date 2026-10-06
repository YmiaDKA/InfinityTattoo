import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, MoveUpRightIcon } from "lucide-react";
import type { Metadata } from "next";

import { LocalizedText } from "@/components/localized-text";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/site-data";

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

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-8 lg:pb-24">
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

        <div className="motion-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
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
