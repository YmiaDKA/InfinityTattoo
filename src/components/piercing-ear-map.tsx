"use client";

import { useMemo, useState } from "react";
import { GemIcon } from "lucide-react";

import { LocalizedText } from "@/components/localized-text";
import { cn } from "@/lib/utils";

type PiercingSpot = {
  id: string;
  titleEn: string;
  titleNo: string;
  price: string;
  textEn: string;
  textNo: string;
  x: number;
  y: number;
};

const spots: PiercingSpot[] = [
  {
    id: "flat",
    titleEn: "Flat",
    titleNo: "Flat",
    price: "700,-",
    textEn: "Upper flat cartilage placement.",
    textNo: "Øvre flat bruskplassering.",
    x: 53,
    y: 18,
  },
  {
    id: "helix",
    titleEn: "Helix",
    titleNo: "Helix",
    price: "700,-",
    textEn: "Classic upper ear cartilage.",
    textNo: "Klassisk piercing øverst i øret.",
    x: 68,
    y: 26,
  },
  {
    id: "industrial",
    titleEn: "Industrial",
    titleNo: "Industrial",
    price: "800,-",
    textEn: "Structured bar placement.",
    textNo: "Strukturert stavplassering.",
    x: 38,
    y: 27,
  },
  {
    id: "rook",
    titleEn: "Rook",
    titleNo: "Rook",
    price: "800,-",
    textEn: "Inner upper cartilage.",
    textNo: "Indre øvre brusk.",
    x: 44,
    y: 42,
  },
  {
    id: "daith",
    titleEn: "Daith",
    titleNo: "Daith",
    price: "800,-",
    textEn: "Inner fold placement.",
    textNo: "Plassering i indre fold.",
    x: 51,
    y: 52,
  },
  {
    id: "conch",
    titleEn: "Conch",
    titleNo: "Conch",
    price: "700,-",
    textEn: "Central cartilage placement.",
    textNo: "Sentral bruskplassering.",
    x: 61,
    y: 51,
  },
  {
    id: "tragus",
    titleEn: "Tragus",
    titleNo: "Tragus",
    price: "700,-",
    textEn: "Small front cartilage placement.",
    textNo: "Liten frontplassering i brusk.",
    x: 35,
    y: 60,
  },
  {
    id: "lobe",
    titleEn: "Lobe",
    titleNo: "Øreflipp / Lobe",
    price: "500,-",
    textEn: "Clean lower ear placement.",
    textNo: "Ren plassering i øreflipp.",
    x: 55,
    y: 82,
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
      <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div className="relative mx-auto aspect-[0.78] w-full max-w-[25rem]">
          <div className="absolute inset-0 rounded-[45%_55%_58%_42%/38%_48%_52%_62%] border border-foreground/25 bg-background/70 shadow-2xl shadow-black/20" />
          <div className="absolute left-[16%] top-[8%] h-[78%] w-[66%] rounded-[48%_52%_58%_42%/35%_48%_52%_65%] border-[10px] border-foreground/10" />
          <div className="absolute left-[33%] top-[30%] h-[42%] w-[42%] rounded-[48%_52%_54%_46%/42%_55%_45%_58%] border-[8px] border-foreground/15" />
          <div className="absolute left-[37%] top-[47%] h-[22%] w-[24%] rounded-full border-[7px] border-foreground/10" />
          <div className="absolute left-[36%] top-[9%] h-[58%] w-[23%] rotate-[-24deg] rounded-full border-l border-foreground/20" />
          <div className="absolute left-[41%] top-[20%] h-[54%] w-[9%] rotate-[52deg] rounded-full border-t border-foreground/20" />

          {spots.map((spot) => {
            const isActive = spot.id === activeSpot.id;

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "absolute z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background/85 text-foreground shadow-lg shadow-black/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "scale-110 border-[color:var(--studio-red)] text-[color:var(--studio-red)]"
                    : "border-foreground/20 hover:scale-110 hover:border-foreground/50",
                )}
                key={spot.id}
                onFocus={() => setActiveId(spot.id)}
                onMouseEnter={() => setActiveId(spot.id)}
                onClick={() => setActiveId(spot.id)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                type="button"
              >
                <GemIcon className="size-3.5" />
                <span className="sr-only">
                  {spot.titleEn} {spot.price}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              <LocalizedText en="Hover the ear" no="Hold over øret" />
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
              {activeSpot.price}
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
                onFocus={() => setActiveId(spot.id)}
                onMouseEnter={() => setActiveId(spot.id)}
                onClick={() => setActiveId(spot.id)}
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
