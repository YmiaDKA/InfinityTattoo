"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const storageKey = "infinity-language";
const languages = ["NO", "EN"] as const;

type Language = (typeof languages)[number];

export function LanguageToggle() {
  const [activeLanguage, setActiveLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "EN";
    }

    try {
      const savedLanguage = window.localStorage.getItem(storageKey);
      return savedLanguage === "NO" || savedLanguage === "EN"
        ? savedLanguage
        : "EN";
    } catch {
      return "EN";
    }
  });

  function chooseLanguage(language: Language) {
    setActiveLanguage(language);
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Storage can be unavailable in restricted browser contexts.
    }
  }

  return (
    <div
      aria-label="Choose language"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-foreground/10 bg-background/35 p-0.5 text-muted-foreground backdrop-blur"
    >
      {languages.map((language) => {
        const isActive = activeLanguage === language;

        return (
          <button
            aria-pressed={isActive}
            className={cn(
              "relative h-6 min-w-8 rounded-full px-2 text-[0.68rem] font-semibold leading-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              isActive && "text-foreground"
            )}
            key={language}
            onClick={() => chooseLanguage(language)}
            type="button"
          >
            {isActive ? (
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-foreground/10"
              />
            ) : null}
            <span className="relative z-10">{language}</span>
          </button>
        );
      })}
    </div>
  );
}
