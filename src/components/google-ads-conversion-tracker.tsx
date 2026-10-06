"use client";

import { useEffect } from "react";

const bookingConversionSendTo = "AW-18110021666/29TSCIuY498cEKKAxLtD";
const infinityBookingUrl = "https://booking.linework.com/infinity";
const bookingIntentStorageKey = "infinity_tattoo_booking_intent_tracked";
const bookingCompleteStorageKey = "infinity_tattoo_booking_complete_tracked";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAdsConversionTracker() {
  useEffect(() => {
    const trackEvent = (
      eventName: string,
      parameters: Record<string, unknown> = {},
    ): boolean => {
      if (!window.gtag) {
        return false;
      }

      window.gtag("event", eventName, parameters);
      return true;
    };

    const trackBookingIntent = (source: string) => {
      if (sessionStorage.getItem(bookingIntentStorageKey)) {
        return;
      }

      sessionStorage.setItem(bookingIntentStorageKey, "true");
      trackEvent("booking_intent", {
        booking_source: source,
        booking_provider: "linework",
        booking_url: infinityBookingUrl,
      });
    };

    const trackBookingComplete = (source: string) => {
      if (sessionStorage.getItem(bookingCompleteStorageKey)) {
        return;
      }

      sessionStorage.setItem(bookingCompleteStorageKey, "true");
      trackEvent("booking_complete", {
        booking_source: source,
        booking_provider: "linework",
        booking_url: infinityBookingUrl,
      });
      trackEvent("conversion", {
        send_to: bookingConversionSendTo,
      });
    };

    const isLineworkCompletionMessage = (data: unknown) => {
      const normalizedData =
        typeof data === "string"
          ? data.toLowerCase()
          : JSON.stringify(data)?.toLowerCase() ?? "";

      return (
        normalizedData.includes("complete") ||
        normalizedData.includes("confirmation") ||
        normalizedData.includes("confirmed") ||
        normalizedData.includes("success") ||
        normalizedData.includes("booked")
      );
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const bookingLink = target.closest<HTMLAnchorElement>(
        'a[href*="booking.linework.com/infinity"], a[href="#booking"], a[href="/#booking"]',
      );

      if (!bookingLink) {
        return;
      }

      trackBookingIntent(bookingLink.getAttribute("href") ?? "booking-link");
    };

    const handleLineworkMessage = (event: MessageEvent) => {
      if (event.origin !== "https://booking.linework.com") {
        return;
      }

      trackEvent("linework_booking_message", {
        booking_provider: "linework",
        message_type:
          typeof event.data === "object" && event.data !== null
            ? "object"
            : typeof event.data,
      });

      if (isLineworkCompletionMessage(event.data)) {
        trackBookingComplete("linework-message");
      }
    };

    const bookingFrame = document.querySelector<HTMLIFrameElement>(
      `iframe[src="${infinityBookingUrl}"]`,
    );

    const handleBookingFrameLoad = () => {
      trackEvent("linework_booking_loaded", {
        booking_provider: "linework",
        booking_url: infinityBookingUrl,
      });
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("message", handleLineworkMessage);
    bookingFrame?.addEventListener("load", handleBookingFrameLoad);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("message", handleLineworkMessage);
      bookingFrame?.removeEventListener("load", handleBookingFrameLoad);
    };
  }, []);

  return null;
}
