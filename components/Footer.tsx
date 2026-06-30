"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "./WavyUnderline";
import { useLocaleContent } from "@/lib/i18n/SiteContentContext";
import { ContactIcon } from "@/lib/site-content/contact-icons";

export default function Footer() {
  const content = useLocaleContent();

  return (
    <footer
      className="w-full py-10 sm:py-14 px-5 sm:px-8 lg:px-16 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-peach)" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="w-fit">
            <h2 className="font-heading text-xl sm:text-2xl" style={{ color: "var(--color-purple)" }}>
              Marchal Zoé
            </h2>
            <WavyUnderline width="100%" height={6} />
          </div>

          <div className="flex flex-wrap gap-2.5" style={{ maxWidth: 420 }}>
            {content.contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm footer-chip"
                style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}
              >
                <ContactIcon type={c.type} />
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="shrink-0 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
            style={{ width: 260, height: 260 }}
          >
            <Image src="/images/avatar.png" alt="Zoé Marchal" fill className="object-contain" />
          </motion.div>
        </motion.div>
      </div>

      <p className="text-center font-body text-[10px] mt-8 opacity-25 select-none" style={{ color: "var(--color-blue)" }}>
        developed with ♥ by{" "}
        <a href="https://github.com/thomaslekieffre" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100 transition-opacity">
          thomaslekieffre
        </a>
        {" "}from a design by{" "}
        <a href="/" className="underline hover:opacity-100 transition-opacity">zoemarchal</a>
      </p>
    </footer>
  );
}
