"use client";

import { useLanguage } from "@/lib/language-store";

export function LocalizedText({ en, no }: { en: string; no: string }) {
  const language = useLanguage();

  return <>{language === "NO" ? no : en}</>;
}
