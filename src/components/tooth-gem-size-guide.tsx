"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { SparklesIcon } from "lucide-react";

import { LocalizedText } from "@/components/localized-text";
import { cn } from "@/lib/utils";
import { toothGemSizes } from "@/lib/tooth-gems";

export function ToothGemSizeGuide() {
  const [activeCode, setActiveCode] = useState(toothGemSizes[3].code);
  const activeSize = useMemo(
    () => toothGemSizes.find((item) => item.code === activeCode) ?? toothGemSizes[3],
    [activeCode],
  );

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="motion-reveal rounded-lg border bg-card/70 p-5 sm:p-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative mx-auto aspect-[0.755] w-full max-w-[27rem] overflow-hidden rounded-lg border border-border/70 bg-black shadow-2xl shadow-black/30">
            <Image
              alt={`${activeSize.code} ${activeSize.size} tooth gem size on a tooth`}
              className="h-full w-full object-cover"
              height={980}
              priority
              src={activeSize.image}
              width={740}
            />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/65 to-transparent p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-white/70">
                <LocalizedText en="Gem size" no="Gem størrelse" />
              </p>
              <p className="mt-1 font-display text-5xl font-bold text-white">
                {activeSize.code}
              </p>
              <p className="text-2xl font-semibold text-white/85">{activeSize.size}</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                <LocalizedText en="Compare the shine" no="Sammenlign shine" />
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                <LocalizedText en="Choose your gem size" no="Velg gem størrelse" />
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                <LocalizedText
                  en="Tap a size to see how the crystal changes on a tooth. Final size and placement are chosen together so it fits your smile and the look you want."
                  no="Trykk på en størrelse for å se hvordan krystallen endrer seg på en tann. Endelig størrelse og plassering velges sammen, slik at det passer smilet ditt og uttrykket du ønsker."
                />
              </p>
            </div>

            <div className="rounded-lg border border-border/70 bg-background/60 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {activeSize.code}
                  </p>
                  <p className="mt-1 font-display text-4xl font-bold text-[color:var(--studio-red)]">
                    {activeSize.size}
                  </p>
                </div>
                <SparklesIcon className="mt-1 size-6 shrink-0 text-[color:var(--studio-red)]" />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                <LocalizedText en={activeSize.textEn} no={activeSize.textNo} />
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {toothGemSizes.map((item) => (
                <button
                  className={cn(
                    "rounded-lg border px-3 py-2 text-left transition",
                    item.code === activeSize.code
                      ? "border-[color:var(--studio-red)] bg-background text-foreground"
                      : "border-border/70 bg-background/35 text-muted-foreground hover:text-foreground",
                  )}
                  key={item.code}
                  onClick={() => setActiveCode(item.code)}
                  onFocus={() => setActiveCode(item.code)}
                  onMouseEnter={() => setActiveCode(item.code)}
                  type="button"
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em]">
                    {item.code}
                  </span>
                  <span className="mt-1 block font-display text-xl font-bold">
                    {item.size}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
