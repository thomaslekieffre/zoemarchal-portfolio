"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "../../WavyUnderline";
import type { Project } from "@/lib/supabase/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Img({
  src, alt, style, className,
}: {
  src: string; alt: string;
  style?: React.CSSProperties; className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className ?? ""}`} style={style}>
      <Image
        src={src} alt={alt} fill className="object-cover"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}

export default function PrintTemplate({ project }: { project: Project }) {
  const { t, lang } = useLanguage();
  const heroImg = project.images.find((i) => i.role === "hero");
  const portraits = project.images.filter((i) => i.role === "portrait").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const mockupImg = project.images.find((i) => i.role === "mockup");

  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: project.bg_color }}>
      <div className="mx-auto px-5 sm:px-8 lg:px-16 py-14 sm:py-20" style={{ maxWidth: 1067 }}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">

          {/* Colonne gauche : affiche + portraits */}
          <div className="flex flex-col gap-24">
            {heroImg && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Img src={heroImg.url} alt={project.title} style={{ width: "100%", aspectRatio: "367/542" }} />
              </motion.div>
            )}

            {portraits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-3 gap-2 sm:gap-3"
              >
                {portraits.map((img) => (
                  <Img key={img.url} src={img.url} alt={project.title} style={{ width: "100%", aspectRatio: "3/4" }} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Colonne droite : texte + mockup */}
          <div className="flex flex-col gap-24">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-8 pt-2"
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
                  {t.projects.presentation}
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: project.text_color, opacity: 0.8 }}>
                  {(lang === "en" && project.description_en) ? project.description_en : project.description}
                </p>
                </div>
              )}

              {project.colors.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>{t.projects.colors}</p>
                  <div className="flex gap-3 flex-wrap">
                    {project.colors.map((c) => (
                      <div key={c.hex} className="flex flex-col items-center gap-1">
                        <div className="blob w-12 h-12 shrink-0" style={{ backgroundColor: c.hex, borderRadius: c.radius }} />
                        <span className="font-body text-[10px] opacity-50" style={{ color: project.text_color }}>
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.fonts.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>{t.projects.typography}</p>
                  {project.fonts.map((f) => {
                    const fontStyle = f.fontUrl ? { fontFamily: `"${f.name}"` } : {};
                    const cls = f.fontUrl ? "" : f.cssClass;
                    return (
                      <div key={f.name} className="flex flex-col gap-1">
                        <span className={`${cls} font-bold uppercase`} style={{ fontSize: 16, color: project.text_color, letterSpacing: "0.05em", ...fontStyle }}>
                          {f.name}
                        </span>
                        <p className={`${cls} font-bold uppercase text-xs opacity-50 leading-snug`} style={{ color: project.text_color, letterSpacing: "0.05em", ...fontStyle }}>
                          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                        </p>
                        <p className={`${cls} font-bold uppercase text-xs opacity-50`} style={{ color: project.text_color, letterSpacing: "0.05em", ...fontStyle }}>
                          1 2 3 4 5 6 7 8 9 0
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {mockupImg && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Img src={mockupImg.url} alt={`${project.title} mockup`} style={{ width: "100%", aspectRatio: "549/411" }} />
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
