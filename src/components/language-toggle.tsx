"use client";

import { cn } from "@/lib/utils";
import { setLanguage, useLanguage, type Language } from "@/lib/language-store";

const languages: Language[] = ["NO", "EN"];

export function LanguageToggle() {
  const activeLanguage = useLanguage();

  function chooseLanguage(language: Language) {
    setLanguage(language);
  }

  return (
    <div
      aria-label="Choose language"
      className="inline-flex h-9 shrink-0 items-center gap-0.5 rounded-full border border-foreground/10 bg-background/35 p-1 text-muted-foreground backdrop-blur sm:h-10 md:h-11"
    >
      {languages.map((language) => {
        const isActive = activeLanguage === language;

        return (
          <button
            aria-pressed={isActive}
            className={cn(
              "relative h-full min-w-9 rounded-full px-2 text-xs font-semibold leading-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:min-w-11",
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
