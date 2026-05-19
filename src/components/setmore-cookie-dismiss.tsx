"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

const storageKey = "infinity-setmore-cookie-hint-dismissed";

export function SetmoreCookieDismiss({ children }: { children: ReactNode }) {
  const isPointerInside = useRef(false);
  const [hasLoadedPreference, setHasLoadedPreference] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const dismissHint = useCallback(() => {
    try {
      window.localStorage?.setItem(storageKey, "true");
    } catch {
      // Preference storage can be unavailable in restricted browser contexts.
    }

    setIsHidden(true);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        setIsHidden(window.localStorage?.getItem(storageKey) === "true");
      } catch {
        setIsHidden(false);
      }

      setHasLoadedPreference(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleWindowBlur = () => {
      if (isPointerInside.current) {
        dismissHint();
      }
    };

    window.addEventListener("blur", handleWindowBlur);

    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [dismissHint]);

  return (
    <div
      className="relative"
      onFocusCapture={dismissHint}
      onPointerDownCapture={dismissHint}
      onPointerEnter={() => {
        isPointerInside.current = true;
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
      }}
    >
      {children}
      <AnimatePresence>
        {hasLoadedPreference && !isHidden ? (
          <motion.div
            aria-hidden="true"
            data-cookie-hint=""
            className="pointer-events-none absolute left-[calc(100%+1rem)] top-[68%] z-50 hidden w-[10.5rem] -translate-y-1/2 text-left drop-shadow-2xl min-[1400px]:block"
            exit={{ opacity: 0, scale: 0.92 }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          >
            <Image
              alt="Accept cookies to use calendar"
              className="h-auto w-full"
              height={536}
              loading="eager"
              src="/media/cookies.svg"
              unoptimized
              width={496}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
