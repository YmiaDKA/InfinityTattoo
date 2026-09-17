"use client";

import { useEffect } from "react";
import Script from "next/script";

const googleAdsId = "AW-18110021666";
const bookingConversionSendTo = "AW-18110021666/29TSCIuY498cEKKAxLtD";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAdsTag() {
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

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAdsId}');
        `}
      </Script>
    </>
  );
}
