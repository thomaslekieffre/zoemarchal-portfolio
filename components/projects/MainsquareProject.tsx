"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "../WavyUnderline";

const COLORS = [
  { hex: "#008F9F", label: "#008F9F", radius: "55% 45% 60% 40% / 40% 55% 45% 60%" },
  { hex: "#1C1D3B", label: "#1C1D3B", radius: "45% 55% 40% 60% / 55% 45% 60% 40%" },
  { hex: "#890B51", label: "#890B51", radius: "60% 40% 55% 45% / 50% 60% 40% 55%" },
  { hex: "#ED739A", label: "#ED739A", radius: "40% 60% 45% 55% / 60% 40% 55% 45%" },
  { hex: "#EC5930", label: "#EC5930", radius: "50% 45% 55% 50% / 45% 55% 50% 45%" },
  { hex: "#EA9230", label: "#EA9230", radius: "55% 50% 45% 55% / 50% 40% 60% 50%" },
];

function Img({
  src, alt, fallback, style, className,
}: {
  src: string; alt: string; fallback: string;
  style?: React.CSSProperties; className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className ?? ""}`} style={style}>
      <Image src={src} alt={alt} fill className="object-cover"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs opacity-20 text-center px-2 font-sen" style={{ color: "#EA9230" }}>
          {fallback}
        </span>
      </div>
    </div>
  );
}

export default function MainsquareProject() {
  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: "#092E67" }}>
      <div className="mx-auto px-5 sm:px-8 lg:px-16 py-14 sm:py-20" style={{ maxWidth: 1067 }}>

        {/* ── Grille 2 colonnes : gauche [affiche / portraits] · droite [texte / mockup] ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">

          {/* ── Colonne gauche ── */}
          <div className="flex flex-col gap-24">
            {/* Affiche */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Img
                src="/projects/mainsquare/affiche.png" alt="Affiche Mainsquare" fallback="affiche.png"
                style={{ width: "100%", aspectRatio: "367/542" }}
              />
            </motion.div>

            {/* 3 portraits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-3 gap-2 sm:gap-3"
            >
              {["p1.png", "p2.png", "p3.png"].map((name) => (
                <Img
                  key={name}
                  src={`/projects/mainsquare/${name}`} alt={`Mainsquare ${name}`} fallback={name}
                  style={{ width: "100%", aspectRatio: "3/4" }}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Colonne droite ── */}
          <div className="flex flex-col gap-24">
            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-8 pt-2"
            >
              <div className="w-fit">
                <h3 className="font-heading" style={{ fontSize: 32, color: "#fce4d8", fontWeight: 400, lineHeight: 1 }}>
                  Affiche Mainsquare
                </h3>
                <WavyUnderline width="100%" height={8} />
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="font-body text-sm font-bold" style={{ color: "#fce4d8" }}>
                  Présentation du projet
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#fce4d8", opacity: 0.8 }}>
                  Dans le cadre du concours d&apos;affiches du festival
                  MainSquare d&apos;Arras 2026, j&apos;ai choisi de concevoir une
                  affiche à la fois colorée et festive. En effet, à mes yeux, les
                  festivals font partie des seuls endroits où tout le monde est
                  différent, mais ne fait qu&apos;un, le temps d&apos;un week-end.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-body text-sm font-bold" style={{ color: "#fce4d8" }}>Palette de couleurs</p>
                <div className="flex gap-3 flex-wrap">
                  {COLORS.map((c) => (
                    <div key={c.hex} className="flex flex-col items-center gap-1">
                      <div className="blob w-12 h-12 shrink-0" style={{ backgroundColor: c.hex, borderRadius: c.radius }} />
                      <span className="font-body text-[10px] opacity-50" style={{ color: "#fce4d8" }}>
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-body text-sm font-bold" style={{ color: "#fce4d8" }}>Typographie</p>
                <div className="flex flex-col gap-1">
                  <span className="font-barlow font-bold uppercase" style={{ fontSize: 16, color: "#fce4d8", letterSpacing: "0.05em" }}>
                    Barlow Condensed – Bold &amp; Capitalized
                  </span>
                  <p className="font-barlow font-bold uppercase text-xs opacity-50 leading-snug" style={{ color: "#fce4d8", letterSpacing: "0.05em" }}>
                    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                  </p>
                  <p className="font-barlow font-bold uppercase text-xs opacity-50 leading-snug" style={{ color: "#fce4d8", letterSpacing: "0.05em" }}>
                    a b c d e f g h i j k l m n o p q r s t u v w x y z
                  </p>
                  <p className="font-barlow font-bold uppercase text-xs opacity-50" style={{ color: "#fce4d8", letterSpacing: "0.05em" }}>
                    1 2 3 4 5 6 7 8 9 0
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Img
                src="/projects/mainsquare/mockup.png" alt="Mainsquare mockup" fallback="mockup.png"
                style={{ width: "100%", aspectRatio: "549/411" }}
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
