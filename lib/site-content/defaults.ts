import { translations } from "@/lib/i18n/translations";
import type { SiteContent } from "./types";

function localeFromTranslations(lang: "fr" | "en"): SiteContent["fr"] {
  const a = translations[lang].about;
  return {
    greeting: a.greeting,
    bio1: a.bio1,
    bio2: a.bio2,
    bio3: a.bio3,
    experiences: [
      { label: a.exp1_label, description: a.exp1_desc },
      { label: a.exp2_label, description: a.exp2_desc },
      { label: a.exp3_label, description: a.exp3_desc },
    ],
    education: [
      { degree: a.edu_degree, subjects: a.edu_subjects },
      { degree: a.edu_degree2, subjects: a.edu_subjects2 },
    ],
    interests: [a.interest_drawing, a.interest_basketball, a.interest_music],
    contacts: lang === "fr"
      ? [
          { type: "instagram", label: "@zozoriginale", href: "https://instagram.com/zozoriginale" },
          { type: "discord", label: "zoe.marchal", href: "https://discord.gg/2J4bHJ8a" },
          { type: "x", label: "@zozoriginale", href: "https://x.com/zozoriginale" },
          { type: "phone", label: "07 86 49 92 59", href: "tel:+33786499259" },
          { type: "email", label: "z.marchal10@gmail.com", href: "mailto:z.marchal10@gmail.com" },
        ]
      : [
          { type: "instagram", label: "@zozoriginale", href: "https://instagram.com/zozoriginale" },
          { type: "discord", label: "zoe.marchal", href: "https://discord.gg/2J4bHJ8a" },
          { type: "x", label: "@zozoriginale", href: "https://x.com/zozoriginale" },
          { type: "phone", label: "+33 7 86 49 92 59", href: "tel:+33786499259" },
          { type: "email", label: "z.marchal10@gmail.com", href: "mailto:z.marchal10@gmail.com" },
        ],
  };
}

export const defaultSiteContent: SiteContent = {
  fr: localeFromTranslations("fr"),
  en: localeFromTranslations("en"),
};
