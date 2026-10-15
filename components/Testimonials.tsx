"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useLocaleContent } from "@/lib/i18n/SiteContentContext";

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const { lang } = useLanguage();
  const { testimonials } = useLocaleContent();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const count = testimonials.length;

  function go(next: number) {
    setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
    setIndex((next + count) % count);
  }

  // Défilement automatique, en pause au survol / au focus
  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;

  const current = testimonials[Math.min(index, count - 1)];

  return (
    <section
      className="w-full overflow-hidden py-16 sm:py-24 px-5 sm:px-8 lg:px-16"
      style={{ backgroundColor: "var(--color-peach)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto flex flex-col items-center gap-10" style={{ maxWidth: 900 }}>
        <SectionTitle size="lg">{lang === "en" ? "Kind words" : "Ce qu'ils disent"}</SectionTitle>

        <div className="relative w-full flex items-center gap-3 sm:gap-6">
          <NavButton label="Avis précédent" onClick={() => go(index - 1)} disabled={count < 2}>←</NavButton>

          <div className="relative flex-1 min-h-[260px] sm:min-h-[220px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.figure
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, rotate: d > 0 ? 1.5 : -1.5 }),
                  center: { x: 0, opacity: 1, rotate: 0 },
                  exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, rotate: d > 0 ? -1.5 : 1.5 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(index + 1);
                  else if (info.offset.x > 60) go(index - 1);
                }}
                className="relative w-full rounded-3xl bg-white p-6 sm:p-10 cursor-grab active:cursor-grabbing select-none"
                style={{ border: "2px solid var(--color-blue)", boxShadow: "8px 8px 0 var(--color-purple)" }}
              >
                <span
                  aria-hidden
                  className="font-heading absolute -top-6 left-6 text-7xl leading-none"
                  style={{ color: "var(--color-purple)" }}
                >
                  &ldquo;
                </span>
                <blockquote className="font-body text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-blue)" }}>
                  {current.quote}
                </blockquote>
                <figcaption className="mt-6 flex flex-col">
                  <span className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>{current.name}</span>
                  {current.role && (
                    <span className="font-body text-xs opacity-60" style={{ color: "var(--color-blue)" }}>{current.role}</span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <NavButton label="Avis suivant" onClick={() => go(index + 1)} disabled={count < 2}>→</NavButton>
        </div>

        {count > 1 && (
          <div className="flex gap-2" role="tablist" aria-label={lang === "en" ? "Choose a review" : "Choisir un avis"}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${lang === "en" ? "Review" : "Avis"} ${i + 1}`}
                onClick={() => go(i)}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 10,
                  backgroundColor: i === index ? "var(--color-blue)" : "rgba(9,46,103,0.25)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function NavButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full font-body text-lg flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
      style={{ backgroundColor: "var(--color-blue)", color: "var(--color-peach)" }}
    >
      {children}
    </button>
  );
}
