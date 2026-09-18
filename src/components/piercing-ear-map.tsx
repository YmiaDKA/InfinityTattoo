"use client";

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
  labelX: number;
  labelY: number;
  align: "left" | "right";
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
    x: 42,
    y: 26,
    labelX: 7,
    labelY: 18,
    align: "left",
  },
  {
    id: "flat",
    titleEn: "Flat",
    titleNo: "Flat",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Upper flat cartilage placement.",
    textNo: "Øvre flat bruskplassering.",
    x: 56,
    y: 20,
    labelX: 92,
    labelY: 14,
    align: "right",
  },
  {
    id: "helix",
    titleEn: "Helix",
    titleNo: "Helix",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Classic upper ear cartilage.",
    textNo: "Klassisk piercing øverst i øret.",
    x: 72,
    y: 30,
    labelX: 93,
    labelY: 27,
    align: "right",
  },
  {
    id: "industrial",
    titleEn: "Industrial",
    titleNo: "Industrial",
    priceEn: "800,-",
    priceNo: "800,-",
    textEn: "Structured bar placement.",
    textNo: "Strukturert stavplassering.",
    x: 61,
    y: 34,
    labelX: 94,
    labelY: 39,
    align: "right",
  },
  {
    id: "forward-helix",
    titleEn: "Forward helix",
    titleNo: "Forward helix",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Forward upper cartilage placement.",
    textNo: "Fremre øvre bruskplassering.",
    x: 37,
    y: 35,
    labelX: 6,
    labelY: 34,
    align: "left",
  },
  {
    id: "daith",
    titleEn: "Daith",
    titleNo: "Daith",
    priceEn: "800,-",
    priceNo: "800,-",
    textEn: "Inner fold placement.",
    textNo: "Plassering i indre fold.",
    x: 38,
    y: 50,
    labelX: 7,
    labelY: 49,
    align: "left",
  },
  {
    id: "snug",
    titleEn: "Snug",
    titleNo: "Snug",
    priceEn: "Ask first",
    priceNo: "Spør først",
    textEn: "Anatomy-dependent placement. Ask in studio first.",
    textNo: "Anatomi-avhengig plassering. Spør i studio først.",
    x: 62,
    y: 49,
    labelX: 92,
    labelY: 50,
    align: "right",
  },
  {
    id: "conch",
    titleEn: "Conch",
    titleNo: "Conch",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Central cartilage placement.",
    textNo: "Sentral bruskplassering.",
    x: 62,
    y: 59,
    labelX: 92,
    labelY: 61,
    align: "right",
  },
  {
    id: "tragus",
    titleEn: "Tragus",
    titleNo: "Tragus",
    priceEn: "700,-",
    priceNo: "700,-",
    textEn: "Small front cartilage placement.",
    textNo: "Liten frontplassering i brusk.",
    x: 32,
    y: 63,
    labelX: 7,
    labelY: 65,
    align: "left",
  },
  {
    id: "antitragus",
    titleEn: "Antitragus",
    titleNo: "Antitragus",
    priceEn: "Ask first",
    priceNo: "Spør først",
    textEn: "Small lower cartilage placement. Anatomy is checked first.",
    textNo: "Liten nedre bruskplassering. Anatomi sjekkes først.",
    x: 62,
    y: 72,
    labelX: 94,
    labelY: 74,
    align: "right",
  },
  {
    id: "stacked-lobe",
    titleEn: "Stacked lobe",
    titleNo: "Stacked lobe",
    priceEn: "500,-",
    priceNo: "500,-",
    textEn: "Layered lobe placement.",
    textNo: "Flere lobe-plasseringer i lag.",
    x: 49,
    y: 80,
    labelX: 7,
    labelY: 83,
    align: "left",
  },
  {
    id: "lobe",
    titleEn: "Lobe",
    titleNo: "Øreflipp / Lobe",
    priceEn: "500,-",
    priceNo: "500,-",
    textEn: "Clean lower ear placement.",
    textNo: "Ren plassering i øreflipp.",
    x: 54,
    y: 90,
    labelX: 18,
    labelY: 95,
    align: "left",
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
        <div className="relative mx-auto aspect-[0.78] w-full max-w-[31rem] rounded-lg border border-border/70 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))] p-3 shadow-2xl shadow-black/20">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full text-foreground/55"
            viewBox="0 0 100 135"
          >
            <defs>
              <linearGradient id="earSkin" x1="30" x2="78" y1="6" y2="120">
                <stop offset="0%" stopColor="#d69a76" />
                <stop offset="45%" stopColor="#a76548" />
                <stop offset="100%" stopColor="#6b382b" />
              </linearGradient>
              <linearGradient id="earInner" x1="38" x2="72" y1="26" y2="92">
                <stop offset="0%" stopColor="#f0b38c" />
                <stop offset="100%" stopColor="#7a3d30" />
              </linearGradient>
              <linearGradient id="metal" x1="0" x2="1">
                <stop offset="0%" stopColor="#7d7d7d" />
                <stop offset="45%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#5b5b5b" />
              </linearGradient>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" floodOpacity="0.35" stdDeviation="3" />
              </filter>
            </defs>

            <path
              d="M46 7C27 10 17 31 17 58c0 17-6 23-6 39 0 18 12 31 29 32 20 1 35-10 43-31 8-22 8-53 1-70C78 13 64 4 46 7Z"
              fill="url(#earSkin)"
              filter="url(#softShadow)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.1"
            />
            <path
              d="M51 18c-14 3-23 18-23 38 0 16-5 20-5 34 0 14 8 23 20 24 15 1 27-8 33-25 6-18 6-43 1-56-5-12-14-18-26-15Z"
              fill="none"
              stroke="rgba(20,20,20,0.42)"
              strokeLinecap="round"
              strokeWidth="5.5"
            />
            <path
              d="M44 30c-10 8-7 20 4 22 8 2 14-7 9-16-2-4-7-8-13-6Z"
              fill="url(#earInner)"
              opacity="0.92"
            />
            <path
              d="M42 48c-9 5-13 15-9 24 4 8 15 8 22 1 7-8 11-18 24-14"
              fill="none"
              stroke="rgba(34,19,16,0.48)"
              strokeLinecap="round"
              strokeWidth="5"
            />
            <path
              d="M31 62c8 5 17 3 22-4 5-6 5-14-1-20"
              fill="none"
              stroke="rgba(255,218,190,0.32)"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <path
              d="M34 76c9 2 18 0 24-5"
              fill="none"
              stroke="rgba(255,226,205,0.26)"
              strokeLinecap="round"
              strokeWidth="3"
            />

            <path
              d="M30 25 L77 38"
              stroke="url(#metal)"
              strokeLinecap="round"
              strokeWidth="2.3"
            />
            <circle cx="28.5" cy="24.5" fill="url(#metal)" r="3.3" />
            <circle cx="79" cy="38.5" fill="url(#metal)" r="3.3" />
            <path
              d="M68 27c8 2 10 4 11 10"
              fill="none"
              stroke="url(#metal)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <path
              d="M34 48c-8 7-8 15-1 21"
              fill="none"
              stroke="url(#metal)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <path
              d="M58 55c9 1 14 1 19-2"
              fill="none"
              stroke="url(#metal)"
              strokeLinecap="round"
              strokeWidth="2.3"
            />
            <path
              d="M51 88c1 8 1 15-1 22"
              fill="none"
              stroke="url(#metal)"
              strokeLinecap="round"
              strokeWidth="2.7"
            />

            {spots.map((spot) => (
              <path
                className="hidden sm:block"
                d={`M ${spot.labelX} ${spot.labelY} Q ${(spot.labelX + spot.x) / 2} ${
                  spot.y + (spot.align === "left" ? -5 : 5)
                } ${spot.x} ${spot.y}`}
                fill="none"
                key={`${spot.id}-line`}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={spot.id === activeId ? 0.8 : 0.45}
                opacity={spot.id === activeId ? 0.9 : 0.32}
              />
            ))}
          </svg>

          {spots.map((spot) => {
            const isActive = spot.id === activeSpot.id;

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "absolute z-20 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 text-foreground shadow-lg shadow-black/25 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-8",
                  isActive
                    ? "scale-110 border-[color:var(--studio-red)] text-[color:var(--studio-red)]"
                    : "border-foreground/25 hover:scale-110 hover:border-foreground/60",
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

          {spots.map((spot) => {
            const isActive = spot.id === activeSpot.id;

            return (
              <button
                className={cn(
                  "absolute z-10 hidden max-w-[7.8rem] -translate-y-1/2 text-balance rounded-full border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.1em] transition sm:block sm:text-[0.68rem]",
                  spot.align === "right" && "-translate-x-full text-right",
                  isActive
                    ? "border-[color:var(--studio-red)] bg-background text-foreground shadow-lg shadow-black/20"
                    : "border-transparent bg-background/55 text-muted-foreground hover:bg-background/80 hover:text-foreground",
                )}
                key={`${spot.id}-label`}
                onClick={() => setActiveId(spot.id)}
                onFocus={() => setActiveId(spot.id)}
                onMouseEnter={() => setActiveId(spot.id)}
                style={{ left: `${spot.labelX}%`, top: `${spot.labelY}%` }}
                type="button"
              >
                <LocalizedText en={spot.titleEn} no={spot.titleNo} />
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
