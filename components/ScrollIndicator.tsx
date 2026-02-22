"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ScrollIndicator() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-[clamp(140px,20vw,260px)] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-default select-none"
    >
      <span
        className="font-body text-xs tracking-widest uppercase"
        style={{ color: "var(--color-peach)", opacity: 0.6 }}
      >
        {t.scroll}
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 7 L10 13 L16 7"
            stroke="var(--color-peach)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
