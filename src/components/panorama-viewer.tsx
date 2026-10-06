"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function PanoramaViewer({ className }: { className?: string } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ id: number; clientX: number } | null>(null);
  const x = useMotionValue(0);
  const [period, setPeriod] = useState(0);
  const transform = useTransform(x, (value) => {
    const wrapped = period ? ((value % period) + period) % period : 0;
    return `translateX(${wrapped - period}px)`;
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const width = Math.max(
        container.clientHeight * (750 / 274),
        container.clientWidth,
      );
      setPeriod(width);
      x.set(-width / 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [x]);

  function move(distance: number) {
    if (!period) return;
    // Keep the position bounded even after many complete rotations.
    x.set((((x.get() + distance) % period) + period) % period);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? 80 : -80);
  }

  function releasePointer(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerRef.current?.id !== event.pointerId) return;
    pointerRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      ref={containerRef}
      aria-label="Draggable panoramic view of Infinity Tattoo Studio. Use left and right arrow keys to look around."
      className={cn(
        "motion-lift motion-panorama relative h-72 touch-pan-y cursor-grab select-none overflow-hidden rounded-3xl border bg-card active:cursor-grabbing sm:h-[26rem] lg:h-[25rem]",
        className,
      )}
      onKeyDown={handleKeyDown}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        pointerRef.current = { id: event.pointerId, clientX: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const pointer = pointerRef.current;
        if (!pointer || pointer.id !== event.pointerId) return;
        move(event.clientX - pointer.clientX);
        pointer.clientX = event.clientX;
      }}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onLostPointerCapture={() => {
        pointerRef.current = null;
      }}
      role="group"
      tabIndex={0}
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 flex"
        style={{ width: period * 3, opacity: period ? 1 : 0, transform }}
      >
        {[0, 1, 2].map((copy) => (
          // Repeated copies let the view wrap without exposing an empty edge.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={copy}
            alt={
              copy === 1
                ? "Panoramic interior view of Infinity Tattoo Studio"
                : ""
            }
            aria-hidden={copy !== 1}
            className="h-full w-1/3 shrink-0 object-cover"
            draggable={false}
            loading="lazy"
            decoding="async"
            src="/media/studio-panorama.jpg"
          />
        ))}
      </motion.div>
    </div>
  );
}
