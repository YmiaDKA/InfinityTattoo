"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GemIcon } from "lucide-react";

import { LocalizedText } from "@/components/localized-text";
import { cn } from "@/lib/utils";

type PiercingSpot = {
  id: string;
  titleEn: string;
  titleNo: string;
  priceEn: string;
  priceNo: string;
  textEn: string;
  textNo: string;
  x: number;
  y: number;
};

const spots: PiercingSpot[] = [
  {
    id: "rook",
    titleEn: "Rook",
    titleNo: "Rook",
    priceEn: "800,-",
    priceNo: "800,-",
    textEn: "Inner upper cartilage placement.",
    textNo: "Indre øvre bruskplassering.",
    x: 43,
    y: 29,
  },
  {
    id: "flat",
    titleEn: "Flat",
    titleNo: "Flat",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Upper flat cartilage placement.",
    textNo: "Øvre flat bruskplassering.",
    x: 61,
    y: 15,
  },
  {
    id: "helix",
    titleEn: "Helix",
    titleNo: "Helix",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Classic upper ear cartilage.",
    textNo: "Klassisk piercing øverst i øret.",
    x: 73,
    y: 21,
  },
  {
    id: "industrial",
    titleEn: "Industrial",
    titleNo: "Industrial",
    priceEn: "800,-",
    priceNo: "800,-",
    textEn: "Structured bar placement.",
    textNo: "Strukturert stavplassering.",
    x: 67,
    y: 34,
  },
  {
    id: "forward-helix",
    titleEn: "Forward helix",
    titleNo: "Forward helix",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Forward upper cartilage placement.",
    textNo: "Fremre øvre bruskplassering.",
    x: 32,
    y: 29,
  },
  {
    id: "daith",
    titleEn: "Daith",
    titleNo: "Daith",
    priceEn: "800,-",
    priceNo: "800,-",
    textEn: "Inner fold placement.",
    textNo: "Plassering i indre fold.",
    x: 41,
    y: 44,
  },
  {
    id: "snug",
    titleEn: "Snug",
    titleNo: "Snug",
    priceEn: "Ask first",
    priceNo: "Spør først",
    textEn: "Anatomy-dependent placement. Ask in studio first.",
    textNo: "Anatomi-avhengig plassering. Spør i studio først.",
    x: 68,
    y: 47,
  },
  {
    id: "mid-helix",
    titleEn: "Mid helix",
    titleNo: "Mid helix",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Middle ear cartilage placement.",
    textNo: "Midtre bruskplassering i øret.",
    x: 67,
    y: 43,
  },
  {
    id: "conch",
    titleEn: "Conch",
    titleNo: "Conch",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Central cartilage placement.",
    textNo: "Sentral bruskplassering.",
    x: 70,
    y: 52,
  },
  {
    id: "tragus",
    titleEn: "Tragus",
    titleNo: "Tragus",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Small front cartilage placement.",
    textNo: "Liten frontplassering i brusk.",
    x: 31,
    y: 55,
  },
  {
    id: "antitragus",
    titleEn: "Antitragus",
    titleNo: "Antitragus",
    priceEn: "Ask first",
    priceNo: "Spør først",
    textEn: "Small lower cartilage placement. Anatomy is checked first.",
    textNo: "Liten nedre bruskplassering. Anatomi sjekkes først.",
    x: 53,
    y: 63,
  },
  {
    id: "upper-lobe",
    titleEn: "Upper lobe",
    titleNo: "Upper lobe",
    priceEn: "500,-",
    priceNo: "500,-",
    textEn: "Upper lobe placement.",
    textNo: "Øvre lobe-plassering.",
    x: 61,
    y: 71,
  },
  {
    id: "stacked-lobe",
    titleEn: "Stacked lobe",
    titleNo: "Stacked lobe",
    priceEn: "500,-",
    priceNo: "500,-",
    textEn: "Layered lobe placement.",
    textNo: "Flere lobe-plasseringer i lag.",
    x: 48,
    y: 73,
  },
  {
    id: "lobe",
    titleEn: "Lobe",
    titleNo: "Øreflipp / Lobe",
    priceEn: "500,-",
    priceNo: "500,-",
    textEn: "Clean lower ear placement.",
    textNo: "Ren plassering i øreflipp.",
    x: 44,
    y: 88,
  },
];

export function PiercingEarMap() {
  const [activeId, setActiveId] = useState(spots[0].id);
  const activeSpot = useMemo(
    () => spots.find((spot) => spot.id === activeId) ?? spots[0],
    [activeId],
  );

  return (
    <div className="motion-reveal rounded-lg border bg-card/70 p-5 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.82fr] lg:items-center">
        <div className="relative mx-auto aspect-square w-full max-w-[35rem] overflow-hidden rounded-lg border border-border/70 bg-black shadow-2xl shadow-black/30">
          <Image
            alt="Ear piercing placement map showing helix, rook, daith, tragus, conch, lobe and other placements"
            className="h-full w-full object-cover"
            height={1254}
            priority
            src="/media/piercing/ear-piercing-map.png"
            width={1254}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_62%,rgba(0,0,0,0.28))]" />

          {spots.map((spot) => {
            const isActive = spot.id === activeSpot.id;

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "absolute z-10 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background/85 text-foreground shadow-lg shadow-black/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-8",
                  isActive
                    ? "scale-110 border-[color:var(--studio-red)] bg-background text-[color:var(--studio-red)]"
                    : "border-white/35 opacity-0 hover:scale-110 hover:border-white/70 hover:opacity-100 focus-visible:opacity-100",
                )}
                key={spot.id}
                onClick={() => setActiveId(spot.id)}
                onFocus={() => setActiveId(spot.id)}
                onMouseEnter={() => setActiveId(spot.id)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                type="button"
              >
                <GemIcon className="size-3" />
                <span className="sr-only">
                  {spot.titleEn} {spot.priceEn}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              <LocalizedText en="Hover the map" no="Hold over kartet" />
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              <LocalizedText en="Placement guide" no="Plasseringsguide" />
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              <LocalizedText
                en="Explore common ear placements before you book. Final placement is always checked in studio around your anatomy and healing."
                no="Utforsk vanlige øreplasseringer før du booker. Endelig plassering sjekkes alltid i studio etter anatomi og healing."
              />
            </p>
          </div>

          <div className="rounded-lg border border-border/70 bg-background/60 p-5">
            <p className="font-display text-3xl font-bold text-foreground">
              <LocalizedText en={activeSpot.titleEn} no={activeSpot.titleNo} />
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-[color:var(--studio-red)]">
              <LocalizedText en={activeSpot.priceEn} no={activeSpot.priceNo} />
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              <LocalizedText en={activeSpot.textEn} no={activeSpot.textNo} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {spots.map((spot) => (
              <button
                className={cn(
                  "rounded-lg border px-3 py-2 text-left text-xs transition",
                  spot.id === activeSpot.id
                    ? "border-[color:var(--studio-red)] bg-background text-foreground"
                    : "border-border/70 bg-background/35 text-muted-foreground hover:text-foreground",
                )}
                key={spot.id}
                onClick={() => setActiveId(spot.id)}
                onFocus={() => setActiveId(spot.id)}
                onMouseEnter={() => setActiveId(spot.id)}
                type="button"
              >
                <LocalizedText en={spot.titleEn} no={spot.titleNo} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
