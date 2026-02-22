"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "../WavyUnderline";

const COLORS = [
  { hex: "#9ACC29", label: "#9ACC29", radius: "55% 45% 60% 40% / 40% 55% 45% 60%" },
  { hex: "#13DFCE", label: "#13DFCE", radius: "45% 55% 40% 60% / 55% 45% 60% 40%" },
  { hex: "#323132", label: "#323132", radius: "60% 40% 55% 45% / 50% 60% 40% 55%" },
  { hex: "gradient", label: "Gradient", radius: "40% 60% 45% 55% / 60% 40% 55% 45%", gradient: true },
];

function ProjectImg({
  src, alt, placeholder, style, rotation = 0,
}: {
  src: string; alt: string; placeholder: string;
  style?: React.CSSProperties; rotation?: number;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ ...style, transform: `rotate(${rotation}deg)`, transformOrigin: "center" }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="300px"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs opacity-30 text-center px-2 font-sen" style={{ color: "#323132" }}>
          {placeholder}
        </span>
      </div>
    </div>
  );
}

export default function JumioProject() {
  return (
    <section className="w-full py-14 sm:py-20 px-5 sm:px-8 lg:px-16" style={{ backgroundColor: "#fce4d8" }}>
      <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-8 md:gap-12 lg:gap-20 xl:gap-52" style={{ maxWidth: 1067 }}>

        {/* ── Images GAUCHE : grille 2×2 ──────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 w-full md:w-auto"
          style={{ maxWidth: 600, minWidth: "min(340px, 100%)" }}
        >
          <ProjectImg
            src="/projects/jumio/jumiop1.png" alt="Jumio couverture" placeholder="jumiop1.png"
            style={{ width: "100%", aspectRatio: "3/4" }} rotation={-1}
          />
          <ProjectImg
            src="/projects/jumio/jumiop2.png" alt="Jumio documents" placeholder="jumiop2.png"
            style={{ width: "100%", aspectRatio: "3/4" }} rotation={1}
          />
          <ProjectImg
            src="/projects/jumio/jumiop3.png" alt="Jumio National ID" placeholder="jumiop3.png"
            style={{ width: "100%", aspectRatio: "3/4" }} rotation={1}
          />
          <ProjectImg
            src="/projects/jumio/jumiop4.png" alt="Jumio page" placeholder="jumiop4.png"
            style={{ width: "100%", aspectRatio: "3/4" }} rotation={-1}
          />
        </motion.div>

        {/* ── Info droite ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-8 flex-1 pt-2"
        >
          {/* Titre */}
          <div className="w-fit">
            <h3 className="font-heading" style={{ fontSize: 32, color: "#092e67", fontWeight: 400, lineHeight: 1 }}>
              Jumio
            </h3>
            <WavyUnderline width="100%" height={8} />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <p className="font-body text-sm font-bold" style={{ color: "#092e67" }}>
              Présentation du projet
            </p>
            <p className="font-body text-sm leading-relaxed max-w-[320px]" style={{ color: "#092e67" }}>
              J&apos;ai réalisé un PDF pour Jumio, une société américaine de vérification
              d&apos;identité. L&apos;objectif était de réaliser un document illustrant les capacités
              d&apos;extraction du logiciel tout en respectant leur charte graphique.
            </p>
          </div>

          {/* Palette */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-sm font-bold" style={{ color: "#092e67" }}>Palette de couleurs</p>
            <div className="flex gap-3 flex-wrap">
              {COLORS.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-1">
                  <div
                    className="blob w-12 h-12 shrink-0"
                    style={{
                      borderRadius: c.radius,
                      background: c.gradient
                        ? "linear-gradient(270deg, #5ACC29 0%, #13DFCE 100%)"
                        : c.hex,
                    }}
                  />
                  <span className="font-body text-[10px] opacity-60" style={{ color: "#092e67" }}>
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typographie */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-sm font-bold" style={{ color: "#092e67" }}>Typographie</p>
            <div className="flex flex-col gap-0.5">
              <span className="font-jost underline" style={{ fontSize: 22, color: "#092e67" }}>Jost</span>
              <p className="font-jost text-xs leading-snug" style={{ color: "#092e67" }}>
                A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
              </p>
              <p className="font-jost text-xs leading-snug" style={{ color: "#092e67" }}>
                a b c d e f g h i j k l m n o p q r s t u v w x y z
              </p>
              <p className="font-jost text-xs" style={{ color: "#092e67" }}>
                1 2 3 4 5 6 7 8 9 0
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
