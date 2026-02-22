"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed top-4 right-4 z-50 font-body text-xs font-medium px-3 py-1.5 rounded-full select-none"
      style={{
        backgroundColor: "rgba(252,228,216,0.15)",
        border: "1.5px solid rgba(252,228,216,0.4)",
        color: "var(--color-peach)",
        backdropFilter: "blur(8px)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Switch language"
    >
      {lang === "fr" ? "EN" : "FR"}
    </motion.button>
  );
}
