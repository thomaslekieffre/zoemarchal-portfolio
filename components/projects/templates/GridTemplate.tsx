"use client";

import ProjectImage from "@/components/ProjectImage";
import { motion } from "framer-motion";
import WavyUnderline from "../../WavyUnderline";
import SchoolTag from "../SchoolTag";
import SiteLink from "../SiteLink";
import type { Project } from "@/lib/supabase/types";
import { inView, slideUp } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * grid   : grille régulière 3 colonnes (2 sur mobile), photos recadrées en carré
 * mosaic : mosaïque en colonnes (masonry), photos gardées à leur format d'origine
 */
export default function GridTemplate({ project, variant }: { project: Project; variant: "grid" | "mosaic" }) {
  const { t, lang } = useLanguage();
  const images = project.images.filter((i) => i.role === "image").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: project.bg_color }}>
      <div className="mx-auto px-5 sm:px-8 lg:px-16 py-14 sm:py-20" style={{ maxWidth: 1200 }}>

        {/* Header : titre + description + palette */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 md:w-1/2"
          >
            <SiteLink href={project.website_url ?? undefined} className="w-fit">
              {project.school_project && <SchoolTag />}
              <h3 className="font-heading" style={{ fontSize: 32, color: project.text_color, fontWeight: 400, lineHeight: 1 }}>
                {project.title}
              </h3>
              <WavyUnderline width="100%" height={8} />
            </SiteLink>

            {project.description && (
              <div className="flex flex-col gap-1.5">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>{t.projects.presentation}</p>
                <p className="font-body text-sm leading-relaxed" style={{ color: project.text_color, opacity: 0.85 }}>
                  {(lang === "en" && project.description_en) ? project.description_en : project.description}
                </p>
              </div>
            )}
          </motion.div>

          {project.colors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-2 md:w-1/2"
            >
              <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>{t.projects.colors}</p>
              <div className="flex gap-3 flex-wrap">
                {project.colors.map((c, i) => (
                  <div key={`${c.hex}-${i}`} className="flex flex-col items-center gap-1">
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
            </motion.div>
          )}
        </div>

        {/* Grille / mosaïque */}
        {images.length > 0 && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className={variant === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4" : "columns-2 md:columns-3 gap-3 sm:gap-4"}
          >
            {images.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className={`relative overflow-hidden rounded-2xl ${variant === "mosaic" ? "mb-3 sm:mb-4 break-inside-avoid" : ""}`}
                style={variant === "grid" ? { aspectRatio: "1/1" } : undefined}
              >
                {variant === "grid" ? (
                  <ProjectImage
                    src={img.url} alt={`${project.title} ${i + 1}`} fill className="object-cover"
                    sizes="(min-width: 768px) 33vw, 50vw"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img.url} alt={`${project.title} ${i + 1}`} className="block w-full h-auto"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
