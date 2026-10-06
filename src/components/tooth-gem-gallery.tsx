"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { useLanguage } from "@/lib/language-store";
import { supremeGemzGallery } from "@/lib/tooth-gems";

export function ToothGemGallery() {
  const language = useLanguage();

  return (
    <section
      className="w-full pt-32"
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
        className="p-0 [--duration:60s] motion-reduce:overflow-x-auto [&>div]:motion-reduce:animate-none [&>div:not(:first-child)]:motion-reduce:hidden"
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
    </section>
  );
}
