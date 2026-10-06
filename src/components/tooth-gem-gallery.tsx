"use client";

import Image from "next/image";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { useLanguage } from "@/lib/language-store";
import { supremeGemzGallery } from "@/lib/tooth-gems";
import { cn } from "@/lib/utils";

export function ToothGemGallery() {
  const language = useLanguage();
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="mx-auto max-w-6xl px-5 pt-32 sm:px-8"
      aria-label={
        language === "NO"
          ? "Tooth Gems bildegalleri"
          : "Tooth Gems photo gallery"
      }
    >
      <Marquee
        pauseOnHover
        repeat={2}
        decorativeRepeats
        className={cn(
          "rounded-2xl p-0 [--duration:60s] motion-reduce:overflow-x-auto [&>div]:motion-reduce:animate-none [&>div:not(:first-child)]:motion-reduce:hidden",
          paused && "[&>div]:[animation-play-state:paused]",
        )}
      >
        {supremeGemzGallery.map((image, index) => (
          <div
            key={image.src}
            className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl bg-card sm:h-80 sm:w-64"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(min-width: 640px) 256px, 224px"
            />
          </div>
        ))}
      </Marquee>
      <div className="mt-3 flex justify-end motion-reduce:hidden">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          aria-label={
            paused
              ? language === "NO"
                ? "Start galleri"
                : "Play gallery"
              : language === "NO"
                ? "Pause galleri"
                : "Pause gallery"
          }
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </Button>
      </div>
    </section>
  );
}
