"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { Instagram, Pencil, Dribbble, Music } from "lucide-react";

function DiscordIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const experiences = [
  {
    label: "Février 2026 – Affinity",
    description:
      "Stage en design produit et branding\n• Contribution à la mise en place d'un Design System\n• Approfondissement de supports marketing pour la marque",
  },
  {
    label: "Juillet 2025 – Jumio",
    description:
      "Stage en communication visuelle\n• Conception d'un support PDF présentant les capacités du produit\n• Structuration de l'information et hiérarchisation graphique",
  },
  {
    label: "Juin 2024 – Agence Keeo",
    description:
      "Stage en design digital\n• Conception d'une maquette de site web\n• Création d'un logo et déclinaisons visuelles\n• Approfondissement des outils UI sur Figma",
  },
];

const contacts = [
  { icon: <Instagram size={14} strokeWidth={2.5} />, label: "@zozoriginale", href: "https://instagram.com/zozoriginale" },
  { icon: <DiscordIcon size={14} />, label: "zoe.marchal", href: "#" },
  { icon: <XIcon size={14} />, label: "@zozoriginale", href: "https://x.com/zozoriginale" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function About() {
  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: "var(--color-peach)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-10 sm:py-14 flex flex-col gap-8 sm:gap-10">

        {/* ── HAUT : avatar arche (gauche) + Salut / bio (droite) ─── */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-10 lg:gap-12">

          {/* Arche avatar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="shrink-0 mx-auto md:mx-0"
          >
            <div
              className="relative"
              style={{
                width: "clamp(160px, 18vw, 320px)",
                aspectRatio: "320/380",
              }}
            >
              <Image
                src="/images/avatar-about.png"
                alt="Zoé Marchal"
                fill
                sizes="320px"
                className="object-contain object-bottom"
              />
            </div>
          </motion.div>

          {/* Salut + bio */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex-1">
            <SectionTitle size="lg">Salut !</SectionTitle>
            <p className="font-body text-sm md:text-base leading-relaxed mt-3 max-w-prose" style={{ color: "#092e67" }}>
              Je m&apos;appelle Zoé Marchal, j&apos;ai 17 ans.
              Actuellement en terminale au lycée Henri Wallon de
              Valenciennes, je me forme au design en autodidacte.
              Je travaille aussi bien l&apos;identité visuelle que l&apos;affiche, l&apos;édition, l&apos;UI
              ou l&apos;expérimentation typographique. J&apos;aime explorer des univers
              colorés, tout en sachant m&apos;adapter à des projets plus sobres et
              structurés.
            </p>
            <p className="font-body text-sm md:text-base leading-relaxed mt-2 max-w-prose" style={{ color: "#092e67" }}>
              Chaque projet est pour moi un équilibre entre concept et
              esthétique. Je recherche une direction forte, une cohérence
              visuelle et une intention claire derrière chaque choix visuel.
            </p>
            <p className="font-body text-sm md:text-base leading-relaxed mt-2 max-w-prose" style={{ color: "#092e67" }}>
              Après le lycée, je souhaite intégrer une formation en design
              graphique afin d&apos;approfondir ma pratique et de faire évoluer
              cette démarche créative vers un cadre professionnel.
            </p>
          </motion.div>
        </div>

        {/* ── BAS : Expériences (gauche) | Scolarité + Intérêts + Contact (droite) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-8">

          {/* Colonne gauche : Expériences */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col gap-3">
            <SectionTitle>Expériences professionnelles</SectionTitle>
            {experiences.map((exp, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-body text-sm w-fit px-3 py-1 rounded-full inline-flex items-center"
                  style={{ border: "1.5px solid #A17CC1", color: "#A17CC1" }}>
                  {exp.label}
                </span>
                <p className="font-body text-sm leading-relaxed opacity-75 mt-1 whitespace-pre-line"
                  style={{ color: "#092e67" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Colonne droite : Scolarité + Intérêts + Contact */}
          <div className="flex flex-col gap-8">

            {/* Scolarité */}
            <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="flex flex-col gap-2">
              <SectionTitle>Scolarité</SectionTitle>
              <span className="font-body text-sm opacity-60" style={{ color: "#092e67" }}>
                Baccalauréat Général
              </span>
              <p className="font-body text-sm mt-1" style={{ color: "#092e67" }}>
                Mathématiques &amp; Numériques et Sciences Informatiques (NSI)
              </p>
            </motion.div>

            {/* Centres d'intérêts + Contact côte à côte */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Centres d'intérêts */}
              <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col gap-2">
                <SectionTitle>Centres d&apos;intérêts</SectionTitle>
                <div className="flex flex-col gap-2">
                  {[{ icon: <Pencil size={14} strokeWidth={2.5} />, label: "Dessin" }, { icon: <Dribbble size={14} strokeWidth={2.5} />, label: "Basket-ball" }, { icon: <Music size={14} strokeWidth={2.5} />, label: "Musique" }]
                    .map((item, i) => (
                      <span key={i} className="font-body text-sm w-fit px-3 py-1 rounded-full inline-flex items-center gap-1.5"
                        style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}>
                        {item.icon} {item.label}
                      </span>
                    ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col gap-2">
                <SectionTitle size="lg">Contact</SectionTitle>
                <div className="flex flex-col gap-2">
                  {contacts.map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                      className="font-body text-sm w-fit px-3 py-1 rounded-full inline-flex items-center gap-1.5 footer-chip"
                      style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}>
                      {c.icon} {c.label}
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
