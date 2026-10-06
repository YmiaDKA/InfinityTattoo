"use client";

import {
  Children,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { LocalizedText } from "@/components/localized-text";
import { cn } from "@/lib/utils";

const labels = [
  { en: "Show piercing artist", no: "Vis piercing artist" },
  { en: "Show Filip", no: "Vis Filip" },
  { en: "Show Tooth Gems artist", no: "Vis Tooth Gems artist" },
];

export function ArtistCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(1);

  function centerSlide(index: number, smooth = true) {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const left =
      track.scrollLeft +
      slideRect.left -
      trackRect.left -
      (track.clientWidth - slideRect.width) / 2;
    track.scrollTo({
      left,
      behavior:
        smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "smooth"
          : "instant",
    });
  }

  useLayoutEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const reset = () => {
      if (mobile.matches) {
        centerSlide(1, false);
        setActive(1);
      }
    };
    reset();
    mobile.addEventListener("change", reset);
    return () => mobile.removeEventListener("change", reset);
  }, []);

  return (
    <div id="services" className="scroll-mt-28">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)_minmax(0,1fr)] sm:gap-6 sm:overflow-visible lg:gap-12"
        onScroll={() => {
          const track = trackRef.current;
          if (!track) return;
          const rect = track.getBoundingClientRect();
          const center = rect.left + track.clientWidth / 2;
          let nearest = 0;
          let distance = Infinity;
          slideRefs.current.forEach((slide, index) => {
            if (!slide) return;
            const bounds = slide.getBoundingClientRect();
            const next = Math.abs(bounds.left + bounds.width / 2 - center);
            if (next < distance) {
              nearest = index;
              distance = next;
            }
          });
          setActive(nearest);
        }}
      >
        <div aria-hidden="true" className="shrink-0 basis-[10%] sm:hidden" />
        {Children.toArray(children).map((child, index) => (
          <div
            key={index}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className="mr-4 min-w-0 shrink-0 basis-[80%] snap-center last:mr-0 sm:mr-0 sm:basis-auto [&:nth-last-child(2)]:mr-0"
          >
            {child}
          </div>
        ))}
        <div aria-hidden="true" className="shrink-0 basis-[10%] sm:hidden" />
      </div>
      <div className="mt-4 flex justify-center sm:hidden">
        {labels.map((label, index) => (
          <button
            key={label.en}
            type="button"
            aria-current={active === index ? "true" : undefined}
            onClick={() => centerSlide(index)}
            className="flex size-11 touch-manipulation items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-2 rounded-full",
                active === index
                  ? "bg-[color:var(--studio-gold)]"
                  : "bg-muted-foreground/40",
              )}
            />
            <span className="sr-only">
              <LocalizedText en={label.en} no={label.no} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
