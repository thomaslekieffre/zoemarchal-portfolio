"use client";

import type { ProjectFont } from "@/lib/supabase/types";

/** Injecte les @font-face pour les polices uploadées dans Supabase Storage */
export default function FontInjector({ fonts }: { fonts: ProjectFont[] }) {
  const customFonts = fonts.filter((f) => f.fontUrl);
  if (customFonts.length === 0) return null;

  const css = customFonts
    .map((f) => {
      const ext = f.fontUrl!.split(".").pop()?.toLowerCase() ?? "ttf";
      const format = ext === "ttf" ? "truetype" : ext === "otf" ? "opentype" : ext;
      return `@font-face {
  font-family: "${f.name}";
  src: url("${f.fontUrl}") format("${format}");
  font-display: swap;
}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
