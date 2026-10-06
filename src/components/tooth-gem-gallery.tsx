"use client";

import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-store";
import { supremeGemzGallery } from "@/lib/tooth-gems";

export function ToothGemGallery() {
  const language = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateControls() {
    const track = trackRef.current;
    if (!track) return;
    setCanPrevious(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  function scroll(direction: number) {
    const track = trackRef.current;
    const slide = track?.firstElementChild;
    if (!track || !slide) return;
    track.scrollBy({
      left: direction * (slide.clientWidth + 12),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      className="mx-auto max-w-6xl px-5 pt-32 sm:px-8"
      aria-label={
        language === "NO"
          ? "Tooth Gems bildegalleri"
          : "Tooth Gems photo gallery"
      }
      aria-roledescription={language === "NO" ? "karusell" : "carousel"}
    >
      <div
        ref={trackRef}
        onScroll={updateControls}
        tabIndex={0}
        aria-label={language === "NO" ? "Bla gjennom bildene" : "Browse photos"}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          scroll(event.key === "ArrowLeft" ? -1 : 1);
        }}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-2xl pb-3 focus-visible:outline-2 focus-visible:outline-ring"
      >
        {supremeGemzGallery.map((image, index) => (
          <div
            key={image.src}
            className="relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl bg-card sm:w-[42%] lg:w-[calc((100%-2.25rem)/4)]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(min-width: 1152px) 260px, (min-width: 1024px) 24vw, (min-width: 640px) 42vw, 78vw"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          aria-label={language === "NO" ? "Forrige bilde" : "Previous photo"}
          disabled={!canPrevious}
          onClick={() => scroll(-1)}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          aria-label={language === "NO" ? "Neste bilde" : "Next photo"}
          disabled={!canNext}
          onClick={() => scroll(1)}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </section>
  );
}
