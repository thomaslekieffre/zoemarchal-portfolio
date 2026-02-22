"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "../../WavyUnderline";
import type { Project } from "@/lib/supabase/types";

export default function GalleryTemplate({ project }: { project: Project }) {
  const images = project.images.filter((i) => i.role === "image").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const heroImg = project.images.find((i) => i.role === "hero");

  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: project.bg_color }}>
      <div className="mx-auto px-5 sm:px-8 lg:px-16 py-14 sm:py-20" style={{ maxWidth: 1200 }}>

        {/* Header : titre + description + palette */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 md:w-1/2"
          >
            <div className="w-fit">
              <h3 className="font-heading" style={{ fontSize: 32, color: project.text_color, fontWeight: 400, lineHeight: 1 }}>
                {project.title}
              </h3>
              <WavyUnderline width="100%" height={8} />
            </div>

            {project.description && (
              <div className="flex flex-col gap-1.5">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>Présentation du projet</p>
                <p className="font-body text-sm leading-relaxed" style={{ color: project.text_color, opacity: 0.85 }}>
                  {project.description}
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6 md:w-1/2"
          >
            {project.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>Palette de couleurs</p>
                <div className="flex gap-3 flex-wrap">
                  {project.colors.map((c) => (
                    <div key={c.label} className="flex flex-col items-center gap-1">
                      <div
                        className="blob w-12 h-12 shrink-0"
                        style={{
                          borderRadius: c.radius ?? "50%",
                          background: c.gradient ? "linear-gradient(270deg, #5ACC29 0%, #13DFCE 100%)" : c.hex,
                        }}
                      />
                      <span className="font-body text-[10px] opacity-60" style={{ color: project.text_color }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.fonts.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>Typographies</p>
                {project.fonts.map((f) => (
                  <div key={f.name} className="flex flex-col gap-0.5">
                    <span className={f.cssClass || "font-body"} style={{ fontSize: 20, color: project.text_color }}>{f.name}</span>
                    <p className={`${f.cssClass || "font-body"} text-xs opacity-40 leading-snug`} style={{ color: project.text_color }}>
                      A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Hero image (pleine largeur) */}
        {heroImg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full mb-6 rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <Image src={heroImg.url} alt={project.title} fill className="object-cover" sizes="100vw" />
          </motion.div>
        )}

        {/* Grille d'images */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4"
            style={{
              gridTemplateColumns: images.length === 1 ? "1fr" : images.length === 2 ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {images.map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={img.url} alt={`${project.title} ${i + 1}`} fill className="object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
