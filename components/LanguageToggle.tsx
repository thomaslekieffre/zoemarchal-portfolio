"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function FrenchFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 21 14" fill="none">
      <defs>
        <clipPath id="flag-fr">
          <rect width="21" height="14" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-fr)">
        <rect width="7" height="14" fill="#002654" />
        <rect x="7" width="7" height="14" fill="#FFF" />
        <rect x="14" width="7" height="14" fill="#CE1126" />
      </g>
    </svg>
  );
}

function UKFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 21 14" fill="none">
      <defs>
        <clipPath id="flag-uk">
          <rect width="21" height="14" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-uk)">
        <rect width="21" height="14" fill="#012169" />
        <path d="M0 0L21 14M21 0L0 14" stroke="#FFF" strokeWidth="2.8" />
        <path d="M0 0L21 14M21 0L0 14" stroke="#C8102E" strokeWidth="1.4" />
        <rect x="8.5" y="0" width="4" height="14" fill="#FFF" />
        <rect x="0" y="5" width="21" height="4" fill="#FFF" />
        <rect x="9.25" y="0" width="2.5" height="14" fill="#C8102E" />
        <rect x="0" y="5.5" width="21" height="3" fill="#C8102E" />
      </g>
    </svg>
  );
}

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-[4.75rem] z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
      style={{
        backgroundColor: "var(--color-blue)",
        border: "2px solid var(--color-peach)",
      }}
      aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
    >
      {lang === "fr" ? <UKFlag /> : <FrenchFlag />}
    </motion.button>
  );
}
