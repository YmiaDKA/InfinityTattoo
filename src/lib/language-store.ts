"use client";

import { useSyncExternalStore } from "react";

export type Language = "NO" | "EN";

const storageKey = "infinity-language";
const defaultLanguage: Language = "NO";
const listeners = new Set<() => void>();
let currentLanguage: Language = defaultLanguage;

function readLanguage(): Language {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  try {
    const savedLanguage = window.localStorage.getItem(storageKey);
    if (savedLanguage === "NO" || savedLanguage === "EN") {
      currentLanguage = savedLanguage;
    }
  } catch {
    // Keep the in-memory value when browser storage is unavailable.
  }

  return currentLanguage;
}

export function getLanguage() {
  return readLanguage();
}

export function setLanguage(language: Language) {
  currentLanguage = language;

  try {
    window.localStorage.setItem(storageKey, language);
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }

  listeners.forEach((listener) => listener());
}

export function subscribeToLanguage(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLanguage() {
  return useSyncExternalStore(
    subscribeToLanguage,
    getLanguage,
    () => defaultLanguage
  );
}
