"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { inView } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useLocaleContent } from "@/lib/i18n/SiteContentContext";
import { ABOUT_CONTACT_TYPES, ContactIcon, InterestIcon } from "@/lib/site-content/contact-icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function About() {
  const { t } = useLanguage();
  const ta = t.about;
  const content = useLocaleContent();

  const aboutContacts = content.contacts.filter((c) => ABOUT_CONTACT_TYPES.includes(c.type));

  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: "var(--color-peach)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-10 sm:py-14 flex flex-col gap-8 sm:gap-10">

        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-10 lg:gap-12">
          <motion.div
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7 }}
            className="shrink-0 mx-auto md:mx-0"
          >
            <div className="relative" style={{ width: "clamp(160px, 18vw, 320px)", aspectRatio: "320/380" }}>
              <Image
                src="/images/avatar-about.png"
                alt="Zoé Marchal"
                fill
                sizes="320px"
                className="object-contain object-bottom"
              />
            </div>
          </motion.div>

          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={inView} variants={fadeUp} className="flex-1">
            <SectionTitle size="lg">{content.greeting}</SectionTitle>
            <p className="font-body text-sm md:text-base leading-relaxed mt-3 max-w-prose" style={{ color: "var(--color-blue)" }}>
              {content.bio1}
            </p>
            <p className="font-body text-sm md:text-base leading-relaxed mt-2 max-w-prose" style={{ color: "var(--color-blue)" }}>
              {content.bio2}
            </p>
            <p className="font-body text-sm md:text-base leading-relaxed mt-2 max-w-prose" style={{ color: "var(--color-blue)" }}>
              {content.bio3}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-8">
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={inView} variants={fadeUp} className="flex flex-col gap-3">
            <SectionTitle>{ta.experiences}</SectionTitle>
            {content.experiences.map((exp, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-body text-sm w-fit px-3 py-1 rounded-full inline-flex items-center"
                  style={{ border: "1.5px solid #A17CC1", color: "#A17CC1" }}>
                  {exp.label}
                </span>
                <p className="font-body text-sm leading-relaxed opacity-75 mt-1 whitespace-pre-line" style={{ color: "var(--color-blue)" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div custom={2} initial="hidden" whileInView="visible" viewport={inView} variants={fadeUp} className="flex flex-col gap-2">
              <SectionTitle>{ta.education}</SectionTitle>
              {content.education.map((edu, i) => (
                <div key={i} className={i > 0 ? "mt-3" : ""}>
                  <span className="font-body text-sm opacity-60" style={{ color: "var(--color-blue)" }}>
                    {edu.degree}
                  </span>
                  <p className="font-body text-sm mt-1" style={{ color: "var(--color-blue)" }}>
                    {edu.subjects}
                  </p>
                </div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div custom={3} initial="hidden" whileInView="visible" viewport={inView} variants={fadeUp} className="flex flex-col gap-2">
                <SectionTitle>{ta.interests}</SectionTitle>
                <div className="flex flex-col gap-2">
                  {content.interests.map((label, i) => (
                    <span key={i} className="font-body text-sm w-fit px-3 py-1 rounded-full inline-flex items-center gap-1.5"
                      style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}>
                      <InterestIcon index={i} /> {label}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div custom={4} initial="hidden" whileInView="visible" viewport={inView} variants={fadeUp} className="flex flex-col gap-2">
                <SectionTitle>{ta.contact}</SectionTitle>
                <div className="flex flex-col gap-2">
                  {aboutContacts.map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                      className="font-body text-sm w-fit px-3 py-1 rounded-full inline-flex items-center gap-1.5 footer-chip"
                      style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}>
                      <ContactIcon type={c.type} /> {c.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
