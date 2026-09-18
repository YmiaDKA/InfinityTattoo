"use client";

import { useEffect } from "react";

const bookingConversionSendTo = "AW-18110021666/29TSCIuY498cEKKAxLtD";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAdsConversionTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const bookingLink = target.closest<HTMLAnchorElement>(
        'a[href*="booking.linework.com/infinity"]',
      );

      if (!bookingLink || !window.gtag) {
        return;
      }

      window.gtag("event", "conversion", {
        send_to: bookingConversionSendTo,
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
