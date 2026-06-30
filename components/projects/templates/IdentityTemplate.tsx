"use client";

import ProjectImage from "@/components/ProjectImage";
import { motion } from "framer-motion";
import WavyUnderline from "../../WavyUnderline";
import type { Project } from "@/lib/supabase/types";
import { inView, slideUp } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function ProjectImg({
  src, alt, style, rotation = 0, objectFit = "cover", objectPosition = "center",
  transformOrigin = "center",
}: {
  src: string; alt: string;
  style?: React.CSSProperties; rotation?: number; objectFit?: "cover" | "contain";
  objectPosition?: "center" | "top" | "bottom";
  transformOrigin?: string;
}) {
  const posClass = objectPosition === "top" ? "object-top" : objectPosition === "bottom" ? "object-bottom" : "object-center";
  return (
    <div
      className="relative overflow-hidden"
      style={{ ...style, transform: `rotate(${rotation}deg)`, transformOrigin }}
    >
      <ProjectImage
        src={src} alt={alt} fill
        className={objectFit === "contain" ? `object-contain ${posClass}` : `object-cover ${posClass}`}
        sizes="400px"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}

export default function IdentityTemplate({
  project,
  showHeader = false,
}: {
  project: Project;
  showHeader?: boolean;
}) {
  const { t, lang } = useLanguage();
  const overlayImages = project.images.filter((i) => i.role === "overlay").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const bottomImages = project.images.filter((i) => i.role === "bottom").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  return (
    <section className="w-full overflow-x-hidden relative" style={{ backgroundColor: project.bg_color }}>
      <div className="relative mx-auto" style={{ maxWidth: 1400 }}>

        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            className="pt-8 pb-4 px-5 sm:px-8 lg:px-16"
          >
            <div className="w-fit">
              <h2 className="font-heading" style={{ fontSize: "clamp(24px, 2.5vw, 36px)", color: project.text_color }}>
                {t.projects.my_projects}
              </h2>
              <WavyUnderline width="100%" height={8} />
            </div>
          </motion.div>
        )}

        {/* Layout : info gauche / visuels droite (Figma) */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 px-5 sm:px-8 lg:px-16 pt-4 pb-10">

          {/* Colonne info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 shrink-0 md:sticky md:top-8"
            style={{ width: "min(380px, 100%)" }}
          >
            <div>
              <div className="w-fit">
                <h3 className="font-heading" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: project.text_color }}>
                  {project.title}
                </h3>
                <WavyUnderline width="100%" height={8} />
              </div>
            </div>

            {project.description && (
              <div className="flex flex-col gap-1.5">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>
                  {t.projects.presentation}
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: project.text_color }}>
                  {(lang === "en" && project.description_en) ? project.description_en : project.description}
                </p>
              </div>
            )}

            {project.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>{t.projects.colors}</p>
                <div className="flex gap-3 flex-wrap">
                  {project.colors.map((c, i) => (
                    <div key={`${c.hex}-${i}`} className="flex flex-col items-center gap-1">
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
              <div className="flex flex-col gap-4">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>{t.projects.typographies}</p>
                {project.fonts.map((f) => {
                  const fontStyle = f.fontUrl ? { fontFamily: `"${f.name}"` } : {};
                  const cls = f.fontUrl ? "" : f.cssClass;
                  return (
                    <div key={f.name} className="flex flex-col gap-0.5">
                      <span className={`${cls} font-bold`} style={{ fontSize: 22, color: project.text_color, ...fontStyle }}>{f.name}</span>
                      <p className={`${cls} text-xs opacity-40 leading-snug`} style={{ color: project.text_color, ...fontStyle }}>
                        A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                      </p>
                      <p className={`${cls} text-xs opacity-40 leading-snug`} style={{ color: project.text_color, ...fontStyle }}>
                        a b c d e f g h i j k l m n o p q r s t u v w x y z
                      </p>
                      <p className={`${cls} text-xs opacity-40`} style={{ color: project.text_color, ...fontStyle }}>
                        1 2 3 4 5 6 7 8 9 0
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {(overlayImages.length > 0 || bottomImages.length > 0) && (
            <div className="flex-1 min-w-0 w-full">
              {/* Mobile */}
              <div className="flex flex-col gap-5 md:hidden">
                {overlayImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {overlayImages.map((img, i) => (
                      <div key={img.url} className="relative w-full aspect-[3/4]">
                        <ProjectImg
                          src={img.url} alt={project.title}
                          style={{ width: "100%", height: "100%" }}
                          rotation={i === 0 ? 5 : -5}
                          objectFit="contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {bottomImages.length > 0 && (
                  <motion.div
                    variants={slideUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={inView}
                    className="flex flex-col sm:flex-row gap-3 w-full sm:items-end"
                  >
                    {bottomImages[0] && (
                      <div
                        className="min-w-0 mx-auto sm:mx-0 w-full"
                        style={{
                          flex: bottomImages.length >= 3 ? "0 1 42%" : 1,
                          maxWidth: bottomImages.length >= 3 ? 429 : 320,
                          aspectRatio: bottomImages.length >= 3 ? "429/277" : "317/449",
                        }}
                      >
                        <ProjectImg src={bottomImages[0].url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={0} objectFit="contain" />
                      </div>
                    )}
                    {bottomImages.length >= 3 ? (
                      <div className="flex flex-row gap-2 flex-1 min-w-0 items-end justify-center">
                        {bottomImages.slice(1).map((img, i) => (
                          <div key={img.url} className="flex-1 min-w-0 max-w-[180px]" style={{ aspectRatio: "317/449" }}>
                            <ProjectImg src={img.url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={i === 0 ? -2 : 2} objectFit="contain" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      bottomImages.slice(1).map((img, i) => (
                        <div key={img.url} className="flex-1 min-w-0 max-w-[320px] mx-auto" style={{ aspectRatio: "317/449" }}>
                          <ProjectImg src={img.url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={i === 0 ? -2 : 2} objectFit="contain" />
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </div>

              {/* Desktop — 2 lignes séparées */}
              <div className="hidden md:flex flex-col w-full" style={{ gap: "clamp(40px, 5vw, 64px)" }}>
                {overlayImages.length > 0 && (
                  <div className="relative w-full shrink-0" style={{ height: "clamp(340px, 38vw, 420px)" }}>
                    {overlayImages[0] && (
                      <motion.div
                        variants={slideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={inView}
                        className="absolute z-[2]"
                        style={{ left: "2%", bottom: 0, height: "88%", aspectRatio: "1280/2128" }}
                      >
                        <ProjectImg
                          src={overlayImages[0].url} alt={project.title}
                          style={{ width: "100%", height: "100%" }}
                          rotation={6} objectFit="contain" transformOrigin="50% 80%"
                        />
                      </motion.div>
                    )}
                    {overlayImages[1] && (
                      <motion.div
                        variants={slideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={inView}
                        className="absolute z-[10]"
                        style={{ right: "0%", top: 0, height: "100%", aspectRatio: "1280/2729" }}
                      >
                        <ProjectImg
                          src={overlayImages[1].url} alt={project.title}
                          style={{ width: "100%", height: "100%" }}
                          rotation={8} objectFit="contain" objectPosition="top" transformOrigin="50% 0%"
                        />
                      </motion.div>
                    )}
                  </div>
                )}

                {bottomImages.length > 0 && (
                  <motion.div
                    variants={slideUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={inView}
                    className="relative z-0 flex flex-row gap-3 items-end"
                  >
                    {bottomImages[0] && (
                      <div
                        className="shrink-0"
                        style={{
                          width: bottomImages.length >= 3 ? 429 : 320,
                          maxWidth: "46%",
                          aspectRatio: bottomImages.length >= 3 ? "429/277" : "317/449",
                        }}
                      >
                        <ProjectImg src={bottomImages[0].url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={0} objectFit="contain" />
                      </div>
                    )}
                    {bottomImages.length >= 3 ? (
                      <div className="flex flex-row gap-2 flex-1 min-w-0 items-end">
                        {bottomImages.slice(1).map((img) => (
                          <div key={img.url} className="flex-1 min-w-0" style={{ aspectRatio: "317/449", maxWidth: 200 }}>
                            <ProjectImg src={img.url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={0} objectFit="contain" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      bottomImages.slice(1).map((img, i) => (
                        <div key={img.url} className="flex-1 min-w-0 max-w-[320px]" style={{ aspectRatio: "317/449" }}>
                          <ProjectImg src={img.url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={i === 0 ? -2 : 2} objectFit="contain" />
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
