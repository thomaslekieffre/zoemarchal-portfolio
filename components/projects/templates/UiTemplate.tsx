"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "../../WavyUnderline";
import type { Project } from "@/lib/supabase/types";

function ProjectImg({
  src, alt, style, rotation = 0,
}: {
  src: string; alt: string;
  style?: React.CSSProperties; rotation?: number;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ ...style, transform: `rotate(${rotation}deg)`, transformOrigin: "center" }}
    >
      <Image
        src={src} alt={alt} fill className="object-cover" sizes="300px"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}

export default function UiTemplate({ project }: { project: Project }) {
  const gridImages = project.images.filter((i) => i.role === "grid").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  return (
    <section className="w-full py-14 sm:py-20 px-5 sm:px-8 lg:px-16" style={{ backgroundColor: project.bg_color }}>
      <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-8 md:gap-12 lg:gap-20 xl:gap-52" style={{ maxWidth: 1067 }}>

        {/* Images gauche : grille 2×2 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 w-full md:w-auto"
          style={{ maxWidth: 600, minWidth: "min(340px, 100%)" }}
        >
          {gridImages.map((img, i) => (
            <ProjectImg
              key={img.url}
              src={img.url} alt={`${project.title} ${i + 1}`}
              style={{ width: "100%", aspectRatio: "3/4" }}
              rotation={i % 2 === 0 ? -1 : 1}
            />
          ))}
        </motion.div>

        {/* Info droite */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-8 flex-1 pt-2"
        >
          <div className="w-fit">
            <h3 className="font-heading" style={{ fontSize: 32, color: project.text_color, fontWeight: 400, lineHeight: 1 }}>
              {project.title}
            </h3>
            <WavyUnderline width="100%" height={8} />
          </div>

          {project.description && (
            <div className="flex flex-col gap-1.5">
              <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>
                Présentation du projet
              </p>
              <p className="font-body text-sm leading-relaxed max-w-[320px]" style={{ color: project.text_color }}>
                {project.description}
              </p>
            </div>
          )}

          {project.colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>Palette de couleurs</p>
              <div className="flex gap-3 flex-wrap">
                {project.colors.map((c) => (
                  <div key={c.label} className="flex flex-col items-center gap-1">
                    <div
                      className="blob w-12 h-12 shrink-0"
                      style={{
                        borderRadius: c.radius,
                        background: c.gradient ? "linear-gradient(270deg, #5ACC29 0%, #13DFCE 100%)" : c.hex,
                      }}
                    />
                    <span className="font-body text-[10px] opacity-60" style={{ color: project.text_color }}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.fonts.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>Typographie</p>
              {project.fonts.map((f) => (
                <div key={f.name} className="flex flex-col gap-0.5">
                  <span className={`${f.cssClass} underline`} style={{ fontSize: 22, color: project.text_color }}>{f.name}</span>
                  <p className={`${f.cssClass} text-xs leading-snug`} style={{ color: project.text_color }}>
                    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                  </p>
                  <p className={`${f.cssClass} text-xs leading-snug`} style={{ color: project.text_color }}>
                    a b c d e f g h i j k l m n o p q r s t u v w x y z
                  </p>
                  <p className={`${f.cssClass} text-xs`} style={{ color: project.text_color }}>
                    1 2 3 4 5 6 7 8 9 0
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
