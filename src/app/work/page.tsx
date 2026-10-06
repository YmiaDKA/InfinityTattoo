import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, MoveUpRightIcon } from "lucide-react";
import type { Metadata } from "next";

import { InstagramPill } from "@/components/instagram-pill";
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

      <section
        id="portfolio-grid"
        className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-20 pt-32 sm:px-8 lg:pb-28"
      >
        <Button
          className="motion-lift-subtle w-fit rounded-full"
          nativeButton={false}
          render={<Link href="/#work" />}
          size="lg"
          variant="outline"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          <LocalizedText en="Back" no="Tilbake" />
        </Button>
        <div className="motion-rise flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
              Portfolio
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {galleryImages.length} <LocalizedText en="pieces" no="arbeider" />
            </p>
          </div>
          <InstagramPill className="w-fit" />
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
            className="motion-lift-subtle w-fit rounded-full"
            nativeButton={false}
            render={<Link href="/#work" />}
            size="lg"
            variant="outline"
          >
            <ArrowLeftIcon data-icon="inline-start" />
            <LocalizedText en="Back" no="Tilbake" />
          </Button>
          <Button
            className="motion-lift-subtle rounded-full"
            nativeButton={false}
            render={<Link href="/#booking" />}
            size="lg"
          >
            <LocalizedText en="Book consultation" no="Book konsultasjon" />
            <MoveUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </main>
  );
}
