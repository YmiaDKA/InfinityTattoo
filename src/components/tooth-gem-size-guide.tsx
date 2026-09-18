"use client";

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
  const gemRadius = activeSize.diameter * 10;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="motion-reveal rounded-lg border bg-card/70 p-5 sm:p-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative mx-auto flex aspect-[0.78] w-full max-w-[25rem] items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.16),rgba(255,255,255,0.04)_38%,transparent_68%)] p-5 shadow-2xl shadow-black/30">
            <svg
              aria-label={`${activeSize.code} ${activeSize.size} tooth gem size on a tooth`}
              className="relative z-10 h-full max-h-[32rem] w-full max-w-[24rem] drop-shadow-[0_2rem_3rem_rgba(0,0,0,0.55)]"
              role="img"
              viewBox="0 0 420 560"
            >
              <defs>
                <linearGradient id="toothBody" x1="120" x2="320" y1="44" y2="496">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="48%" stopColor="#e5e5e5" />
                  <stop offset="100%" stopColor="#f8f8f8" />
                </linearGradient>
                <radialGradient id="toothGlow" cx="34%" cy="30%" r="58%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="72%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="gemShine" cx="34%" cy="28%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="34%" stopColor="#e8e8e8" />
                  <stop offset="66%" stopColor="#6f6f6f" />
                  <stop offset="100%" stopColor="#111111" />
                </radialGradient>
              </defs>
              <path
                d="M210 22C127 22 83 98 58 224 35 337 31 457 91 504c49 39 190 42 239 1 61-51 56-170 31-282C333 97 292 22 210 22Z"
                fill="url(#toothBody)"
                stroke="rgba(255,255,255,0.72)"
                strokeWidth="3"
              />
              <path
                d="M210 22C127 22 83 98 58 224 35 337 31 457 91 504c49 39 190 42 239 1 61-51 56-170 31-282C333 97 292 22 210 22Z"
                fill="url(#toothGlow)"
              />
              <path
                d="M139 172C180 144 257 143 296 173 325 251 337 375 298 438 252 459 164 458 122 436 100 369 109 241 139 172Z"
                fill="none"
                opacity="0.45"
                stroke="rgba(255,255,255,0.95)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <path
                d="M102 124c25-46 58-69 105-70"
                fill="none"
                opacity="0.58"
                stroke="rgba(255,255,255,0.88)"
                strokeLinecap="round"
                strokeWidth="10"
              />
              <g transform="translate(126 375)">
                <circle
                  fill="rgba(0,0,0,0.18)"
                  r={gemRadius + 5}
                  transform="translate(2 4)"
                />
                <circle fill="url(#gemShine)" r={gemRadius} />
                <path
                  d={`M 0 ${-gemRadius} L ${gemRadius * 0.38} ${-gemRadius * 0.38} L ${gemRadius} 0 L ${gemRadius * 0.36} ${gemRadius * 0.36} L 0 ${gemRadius} L ${-gemRadius * 0.36} ${gemRadius * 0.36} L ${-gemRadius} 0 L ${-gemRadius * 0.38} ${-gemRadius * 0.38} Z`}
                  fill="none"
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth="1.4"
                />
                <path
                  d={`M ${-gemRadius * 0.72} ${-gemRadius * 0.2} L ${gemRadius * 0.62} ${gemRadius * 0.42} M ${-gemRadius * 0.16} ${-gemRadius * 0.78} L ${gemRadius * 0.25} ${gemRadius * 0.8} M ${gemRadius * 0.7} ${-gemRadius * 0.2} L ${-gemRadius * 0.55} ${gemRadius * 0.5}`}
                  opacity="0.86"
                  stroke="rgba(0,0,0,0.82)"
                  strokeLinecap="round"
                  strokeWidth="1.7"
                />
                <circle
                  cx={-gemRadius * 0.33}
                  cy={-gemRadius * 0.36}
                  fill="white"
                  r={Math.max(2.2, gemRadius * 0.2)}
                />
              </g>
            </svg>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-background/85 to-transparent p-5">
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
