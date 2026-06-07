"use client";

import { motion, useMotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

export function PanoramaViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [overflow, setOverflow] = useState(0);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const panorama = panoramaRef.current;

    if (!container || !panorama) {
      return;
    }

    const measure = () => {
      const nextOverflow = Math.max(
        panorama.offsetWidth - container.offsetWidth,
        0
      );

      setOverflow(nextOverflow);
      x.set(-nextOverflow / 2);
      setReady(true);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    resizeObserver.observe(panorama);

    return () => resizeObserver.disconnect();
  }, [x]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const movement = event.key === "ArrowLeft" ? 80 : -80;
    x.set(Math.max(-overflow, Math.min(0, x.get() + movement)));
  }

  return (
    <div
      ref={containerRef}
      aria-label="Draggable panoramic view of Infinity Tattoo Studio"
      className="motion-lift motion-panorama relative h-72 touch-pan-y overflow-hidden rounded-3xl border bg-card sm:h-[26rem] lg:h-[25rem]"
      onKeyDown={handleKeyDown}
      role="group"
      tabIndex={0}
    >
      <motion.div
        ref={panoramaRef}
        className="absolute inset-y-0 left-0 w-[225%] cursor-grab select-none active:cursor-grabbing sm:w-[170%] lg:w-[130%]"
        drag="x"
        dragConstraints={{ left: -overflow, right: 0 }}
        dragElastic={0.06}
        dragMomentum
        style={{ opacity: ready ? 1 : 0, x }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Panoramic interior view of Infinity Tattoo Studio"
          className="motion-panorama-media pointer-events-none size-full object-cover"
          draggable={false}
          src="/media/studio-panorama.jpg"
        />
      </motion.div>
    </div>
  );
}
