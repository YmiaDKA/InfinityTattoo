"use client";

import { HeaderPillSurface } from "@/components/header-pill-surface";
import { HeaderNavButton } from "@/components/header-nav-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLanguage, useLanguage, type Language } from "@/lib/language-store";

const languages: { value: Language; name: string; flag: string }[] = [
  { value: "NO", name: "Norsk", flag: "🇳🇴" },
  { value: "EN", name: "English", flag: "🇬🇧" },
];

export function LanguageToggle({
  isScrolled = false,
}: {
  isScrolled?: boolean;
}) {
  const activeLanguage = useLanguage();
  const currentLanguage = languages.find(
    (language) => language.value === activeLanguage,
  )!;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={
          activeLanguage === "NO"
            ? "Velg språk (Norsk)"
            : "Choose language (English)"
        }
        render={
          <HeaderNavButton
            size="icon-lg"
            className={`group relative size-10 border-0 p-0 hover:bg-transparent dark:hover:bg-transparent aria-expanded:bg-transparent ${isScrolled ? "xl:size-16" : "xl:size-12"}`}
          />
        }
      >
        <HeaderPillSurface
          data-desktop="true"
          data-scrolled={isScrolled ? "true" : "false"}
          className="inset-0 opacity-0 group-hover:opacity-100 group-aria-expanded:opacity-100 group-focus-visible:opacity-100"
        />
        <span
          aria-hidden="true"
          className="relative flex size-7 items-center justify-center text-2xl leading-none"
        >
          {currentLanguage.flag}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={activeLanguage}
            onValueChange={(value: Language) => setLanguage(value)}
          >
            {languages.map((language) => (
              <DropdownMenuRadioItem
                key={language.value}
                value={language.value}
                closeOnClick
                className="min-h-11"
              >
                <span aria-hidden="true">{language.flag}</span>
                {language.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
