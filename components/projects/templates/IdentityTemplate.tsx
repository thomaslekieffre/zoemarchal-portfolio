"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WavyUnderline from "../../WavyUnderline";
import type { Project } from "@/lib/supabase/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function ProjectImg({
  src, alt, style, rotation = 0, objectFit = "cover",
}: {
  src: string; alt: string;
  style?: React.CSSProperties; rotation?: number; objectFit?: "cover" | "contain";
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ ...style, transform: `rotate(${rotation}deg)`, transformOrigin: "center" }}
    >
      <Image
        src={src} alt={alt} fill
        className={objectFit === "contain" ? "object-contain" : "object-cover"}
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
  const { t } = useLanguage();
  const overlayImages = project.images.filter((i) => i.role === "overlay").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const bottomImages = project.images.filter((i) => i.role === "bottom").sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  return (
    <section className="w-full overflow-hidden relative" style={{ backgroundColor: project.bg_color }}>
      <div className="relative mx-auto" style={{ maxWidth: 1400 }}>

        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

        {/* Layout : info gauche / images droite */}
        <div className="flex flex-col md:flex-row gap-8 px-5 sm:px-8 lg:px-16 pt-4 pb-6">

          {/* Colonne info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 shrink-0"
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
                  {project.description}
                </p>
              </div>
            )}

            {project.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="font-body text-sm font-bold" style={{ color: project.text_color }}>{t.projects.colors}</p>
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

          {/* Images droite — 2 superposées */}
          {overlayImages.length > 0 && (
            <div className="hidden md:block flex-1 relative" style={{ minHeight: 400 }}>
              {overlayImages[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="absolute"
                  style={{ left: "5%", top: 20, width: "55%", aspectRatio: "4/3" }}
                >
                  <ProjectImg src={overlayImages[0].url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={-4} objectFit="contain" />
                </motion.div>
              )}
              {overlayImages[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute"
                  style={{ right: "2%", top: 0, width: "45%", aspectRatio: "3/4" }}
                >
                  <ProjectImg src={overlayImages[1].url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={5} objectFit="contain" />
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Bottom row */}
        {bottomImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 px-5 sm:px-8 lg:px-16 pb-10"
          >
            {bottomImages[0] && (
              <div style={{ flex: "1.55", aspectRatio: "429/277" }}>
                <ProjectImg src={bottomImages[0].url} alt={project.title} style={{ width: "100%", height: "100%" }} objectFit="contain" />
              </div>
            )}
            {bottomImages[1] && (
              <div style={{ flex: 1, aspectRatio: "317/449" }}>
                <ProjectImg src={bottomImages[1].url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={-2} />
              </div>
            )}
            {bottomImages[2] && (
              <div style={{ flex: 1, aspectRatio: "317/449" }}>
                <ProjectImg src={bottomImages[2].url} alt={project.title} style={{ width: "100%", height: "100%" }} rotation={2} />
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
