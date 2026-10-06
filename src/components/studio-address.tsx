"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/lib/language-store";

const address = "Skårersletta 48c, 1473 Lørenskog";

export function StudioAddress() {
  const language = useLanguage();
  const norwegian = language === "NO";
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setError(false);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1300);
    } catch {
      setCopied(false);
      setError(true);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={copyAddress}
          aria-label={
            norwegian
              ? `Kopier adresse: ${address}`
              : `Copy address: ${address}`
          }
          className="inline-flex min-h-9 touch-manipulation items-center gap-2 rounded-md text-left transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <span className="select-text">{address}</span>
          <span
            aria-hidden="true"
            className="relative flex size-4 shrink-0 items-center justify-center text-[color:var(--studio-gold)]"
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={copied ? "check" : "copy"}
                className="absolute inset-0 flex items-center justify-center"
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        filter: "blur(1.5px)",
                        rotate: copied ? -10 : 10,
                        transform: "scale(0.94)",
                      }
                }
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  rotate: 0,
                  transform: "scale(1)",
                }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        filter: "blur(1.5px)",
                        rotate: copied ? 10 : -10,
                        transform: "scale(1.06)",
                      }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", duration: 0.16, bounce: 0.22 }
                }
              >
                {copied ? (
                  <CheckIcon className="size-3.5" />
                ) : (
                  <CopyIcon className="size-3.5" />
                )}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
      </div>
      <span
        role="status"
        className={error ? "text-xs text-muted-foreground" : "sr-only"}
      >
        {error
          ? norwegian
            ? "Kunne ikke kopiere. Marker adressen og kopier manuelt."
            : "Could not copy. Select the address and copy it manually."
          : copied
            ? norwegian
              ? "Adresse kopiert"
              : "Address copied"
            : ""}
      </span>
    </div>
  );
}
