"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

export function HeaderPillSurface({
  className,
  ...props
}: HTMLMotionProps<"span">) {
  return (
    <motion.span
      aria-hidden="true"
      {...props}
      className={cn(
        "header-pill-surface pointer-events-none absolute rounded-full border shadow-2xl shadow-black/20 backdrop-blur-2xl",
        className,
      )}
    />
  );
}
