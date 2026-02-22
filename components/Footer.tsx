"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "./WavyUnderline";
import { Instagram, Phone, Mail } from "lucide-react";

function DiscordIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const leftContacts = [
  { icon: <DiscordIcon size={14} />, label: "zoe.marchal", href: "#" },
  { icon: <Instagram size={14} strokeWidth={2.5} />, label: "@zozoriginale", href: "https://instagram.com/zozoriginale" },
  { icon: <XIcon size={14} />, label: "@zozoriginale", href: "https://x.com/zozoriginale" },
];

const rightContacts = [
  { icon: <Phone size={14} strokeWidth={2.5} />, label: "07 86 49 92 59", href: "tel:+33786499259" },
  { icon: <Mail size={14} strokeWidth={2.5} />, label: "z.marchal10@gmail.com", href: "mailto:z.marchal10@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      className="w-full py-10 sm:py-14 px-5 sm:px-8 lg:px-16 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-peach)" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Left – titre + contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="w-fit">
            <h2
              className="font-heading text-xl sm:text-2xl"
              style={{ color: "var(--color-purple)" }}
            >
              Marchal Zoé
            </h2>
            <WavyUnderline width="100%" height={6} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex flex-col gap-2.5">
              {leftContacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm footer-chip"
                  style={{
                    border: "1.5px solid var(--color-blue)",
                    color: "var(--color-blue)",
                  }}
                >
                  {c.icon}
                  <span>{c.label}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              {rightContacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm footer-chip"
                  style={{
                    border: "1.5px solid var(--color-blue)",
                    color: "var(--color-blue)",
                  }}
                >
                  {c.icon}
                  <span>{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right – avatar */}
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
            <Image
              src="/images/avatar.png"
              alt="Zoé Marchal"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      <p className="text-center font-body text-[10px] mt-8 opacity-25 select-none" style={{ color: "var(--color-blue)" }}>
        made with ♥ by{" "}
        <a
          href="https://github.com/thomaslekieffre"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-60 transition-opacity"
        >
          thomaslekieffre
        </a>
      </p>
    </footer>
  );
}
