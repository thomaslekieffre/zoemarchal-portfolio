"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

/* Tag « projet scolaire » : petit sticker au-dessus du titre.
   Crème + bleu marque, bordure pleine et ombre décalée, légère rotation. */
export default function SchoolTag() {
  const { t } = useLanguage();

  return (
    <span
      className="font-body inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] select-none"
      style={{
        backgroundColor: "var(--color-peach)",
        color: "var(--color-blue)",
        border: "1.5px solid var(--color-blue)",
        boxShadow: "3px 3px 0 var(--color-blue)",
        transform: "rotate(-2deg)",
        transformOrigin: "left center",
      }}
    >
      <span
        aria-hidden
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "var(--color-blue)" }}
      />
      {t.projects.school_project}
    </span>
  );
}
