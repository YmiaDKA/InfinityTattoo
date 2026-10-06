"use client";

import { Button } from "@/components/ui/button";
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

export function LanguageToggle() {
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
          <Button variant="ghost" size="icon-lg" className="rounded-full" />
        }
      >
        <span aria-hidden="true" className="text-xl">
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
