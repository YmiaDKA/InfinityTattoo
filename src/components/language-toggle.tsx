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
