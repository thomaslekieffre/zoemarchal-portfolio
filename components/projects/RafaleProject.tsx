"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "../WavyUnderline";

const COLORS = [
  { hex: "#CFFFFE", label: "#CFFFFE", radius: "60% 40% 55% 45% / 50% 60% 40% 55%" },
  { hex: "#0092B8", label: "#0092B8", radius: "45% 55% 40% 60% / 55% 45% 60% 40%" },
  { hex: "#053345", label: "#053345", radius: "55% 45% 60% 40% / 40% 55% 45% 60%" },
  { hex: "#ECFEFF", label: "#ECFEFF", radius: "40% 60% 45% 55% / 60% 40% 55% 45%" },
  { hex: "#020618", label: "#020618", radius: "50% 45% 55% 50% / 45% 55% 50% 45%" },
];

function ProjectImg({
  src, alt, placeholder, style, rotation = 0,
}: {
  src: string; alt: string; placeholder: string;
  style?: React.CSSProperties; rotation?: number;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-xl"
      style={{ ...style, transform: `rotate(${rotation}deg)`, transformOrigin: "center" }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="400px"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs opacity-30 text-center px-3 font-sen" style={{ color: "#fce4d8" }}>
          {placeholder}
        </span>
      </div>
    </div>
  );
}

export default function RafaleProject() {
  return (
    <section className="w-full overflow-hidden relative" style={{ backgroundColor: "#a17cc1" }}>

      <div className="relative mx-auto" style={{ maxWidth: 1400 }}>

        {/* ─── Header "Mes projets" ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 pb-4 px-5 sm:px-8 lg:px-16"
        >
          <div className="w-fit">
            <h2 className="font-heading" style={{ fontSize: "clamp(24px, 2.5vw, 36px)", color: "#fce4d8" }}>
              Mes projets
            </h2>
            <WavyUnderline width="100%" height={8} />
          </div>
        </motion.div>

        {/* ─── Layout : info gauche / images droite ─── */}
        <div className="flex flex-col md:flex-row gap-8 px-5 sm:px-8 lg:px-16 pt-4 pb-6">

          {/* ── Colonne info ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 shrink-0"
            style={{ width: "min(380px, 100%)" }}
          >
            {/* Titre */}
            <div>
              <div className="w-fit">
                <h3 className="font-heading" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "#fce4d8" }}>
                  Rafale Ambulances
                </h3>
                <WavyUnderline width="100%" height={8} />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <p className="font-body text-sm font-bold" style={{ color: "#fce4d8" }}>
                Présentation du projet
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#fce4d8" }}>
                J&apos;ai réalisé la maquette du site web de Rafale Ambulances, société basée à Solesmes.
                Le gérant souhaitait moderniser l&apos;image de l&apos;entreprise et permettre à chacun
                de remplir une enquête de satisfaction en ligne.
              </p>
            </div>

            {/* Palette HORIZONTALE */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-sm font-bold" style={{ color: "#fce4d8" }}>Palette de couleurs</p>
              <div className="flex gap-3 flex-wrap">
                {COLORS.map((c) => (
                  <div key={c.hex} className="flex flex-col items-center gap-1">
                    <div
                      className="blob w-12 h-12 shrink-0"
                      style={{ backgroundColor: c.hex, borderRadius: c.radius }}
                    />
                    <span className="font-body text-[10px] opacity-60" style={{ color: "#fce4d8" }}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typographies — alphabet complet */}
            <div className="flex flex-col gap-4">
              <p className="font-body text-sm font-bold" style={{ color: "#fce4d8" }}>Typographies</p>

              <div className="flex flex-col gap-0.5">
                <span className="font-borel" style={{ fontSize: 22, color: "#fce4d8" }}>Borel</span>
                <p className="font-borel text-xs opacity-40 leading-snug" style={{ color: "#fce4d8" }}>
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                </p>
                <p className="font-borel text-xs opacity-40 leading-snug" style={{ color: "#fce4d8" }}>
                  a b c d e f g h i j k l m n o p q r s t u v w x y z
                </p>
                <p className="font-borel text-xs opacity-40" style={{ color: "#fce4d8" }}>
                  1 2 3 4 5 6 7 8 9 0
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-sen font-bold" style={{ fontSize: 22, color: "#fce4d8" }}>Sen</span>
                <p className="font-sen text-xs opacity-40 leading-snug" style={{ color: "#fce4d8" }}>
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                </p>
                <p className="font-sen text-xs opacity-40 leading-snug" style={{ color: "#fce4d8" }}>
                  a b c d e f g h i j k l m n o p q r s t u v w x y z
                </p>
                <p className="font-sen text-xs opacity-40" style={{ color: "#fce4d8" }}>
                  1 2 3 4 5 6 7 8 9 0
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Images droite — 2 superposées + inclinées ─ */}
          <div className="hidden md:block flex-1 relative" style={{ minHeight: 400 }}>
            {/* Image 1 : paysage, inclinée -4° */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="absolute"
              style={{ left: "5%", top: 20, width: "55%", aspectRatio: "4/3" }}
            >
              <ProjectImg
                src="/projects/rafale/rafale1.png" alt="Rafale site" placeholder="rafale1.png"
                style={{ width: "100%", height: "100%" }} rotation={-4}
              />
            </motion.div>

            {/* Image 2 : portrait, inclinée +5° */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute"
              style={{ right: "2%", top: 0, width: "45%", aspectRatio: "3/4" }}
            >
              <ProjectImg
                src="/projects/rafale/rafale3.png" alt="Rafale formulaire" placeholder="rafale3.png"
                style={{ width: "100%", height: "100%" }} rotation={5}
              />
            </motion.div>
          </div>
        </div>

        {/* ─── Bottom row : laptop + 2 pages ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 px-5 sm:px-8 lg:px-16 pb-10"
        >
          {/* Laptop mockup */}
          <div style={{ flex: "1.55", aspectRatio: "429/277" }}>
            <ProjectImg
              src="/projects/rafale/mockup_rafale.png" alt="Laptop mockup Rafale" placeholder="mockup_rafale.png"
              style={{ width: "100%", height: "100%" }} rotation={0}
            />
          </div>
          {/* Rafale 5 */}
          <div style={{ flex: 1, aspectRatio: "317/449" }}>
            <ProjectImg
              src="/projects/rafale/rafale5.png" alt="Rafale page 5" placeholder="rafale5.png"
              style={{ width: "100%", height: "100%" }} rotation={-2}
            />
          </div>
          {/* Rafale 6 */}
          <div style={{ flex: 1, aspectRatio: "317/449" }}>
            <ProjectImg
              src="/projects/rafale/rafale6.png" alt="Rafale page 6" placeholder="rafale6.png"
              style={{ width: "100%", height: "100%" }} rotation={2}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
