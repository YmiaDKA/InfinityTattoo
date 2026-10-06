"use client";

import {
  Children,
  type CSSProperties,
  type ReactNode,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { LocalizedText } from "@/components/localized-text";
import { cn } from "@/lib/utils";

const mobileQuery = "(max-width: 639px)";
function subscribeMobile(callback: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const labels = [
  { en: "Show piercing artist", no: "Vis piercing artist" },
  { en: "Show Filip", no: "Vis Filip" },
  { en: "Show Tooth Gems artist", no: "Vis Tooth Gems artist" },
];

export function ArtistCarousel({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(1);
  const mobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(mobileQuery).matches,
    () => false,
  );
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);

  const swiped = useRef(false);

  function rotate(direction: number) {
    setActive((index) => (index + direction + slides.length) % slides.length);
  }

  return (
    <div id="services" className="scroll-mt-28">
      <div
        className="grid touch-pan-y items-start overflow-hidden pb-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)_minmax(0,1fr)] sm:gap-6 sm:overflow-visible lg:gap-12"
        onPointerDown={(event) => {
          if (mobile && event.isPrimary && event.button === 0) {
            swiped.current = false;
            pointer.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
            };
          }
        }}
        onPointerMove={(event) => {
          const start = pointer.current;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy))
            event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onClickCapture={(event) => {
          if (swiped.current) {
            event.preventDefault();
            event.stopPropagation();
            swiped.current = false;
          }
        }}
        onPointerUp={(event) => {
          const start = pointer.current;
          pointer.current = null;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            swiped.current = true;
            rotate(dx < 0 ? 1 : -1);
          }
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onLostPointerCapture={(event) => {
          if (event.target === event.currentTarget) pointer.current = null;
        }}
      >
        {slides.map((child, index) => {
          const position = (index - active + slides.length) % slides.length;
          return (
            <div
              key={index}
              data-active={position === 0}
              inert={mobile && position !== 0 ? true : undefined}
              className="artist-slide min-w-0 max-sm:col-start-1 max-sm:row-start-1 max-sm:w-[72%] max-sm:justify-self-center"
              style={
                {
                  "--artist-offset":
                    position === 0 ? "0%" : position === 1 ? "38%" : "-38%",
                  "--artist-scale": position === 0 ? 1 : 0.86,
                  "--artist-layer": position === 0 ? 3 : 1,
                } as CSSProperties
              }
            >
              {child}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center sm:hidden">
        {labels.map((label, index) => (
          <button
            key={label.en}
            type="button"
            aria-current={active === index ? "true" : undefined}
            onClick={() => setActive(index)}
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
