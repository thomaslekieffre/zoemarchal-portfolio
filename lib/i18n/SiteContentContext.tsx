"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LocaleContent, SiteContent } from "@/lib/site-content/types";
import { defaultSiteContent } from "@/lib/site-content/defaults";
import { useLanguage } from "./LanguageContext";

const SiteContentContext = createContext<SiteContent>(defaultSiteContent);

export function SiteContentProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext);
}

export function useLocaleContent(): LocaleContent {
  const { lang } = useLanguage();
  const content = useSiteContent();
  return content[lang];
}
