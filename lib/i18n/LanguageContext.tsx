"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Language, type Translations } from "./translations";

const t = (lang: Language): Translations => translations[lang] as Translations;

type LanguageContextType = {
  lang: Language;
  t: Translations;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  t: translations.fr,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");
  const toggle = () => setLang((l) => (l === "fr" ? "en" : "fr"));

  return (
    <LanguageContext.Provider value={{ lang, t: t(lang), toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
