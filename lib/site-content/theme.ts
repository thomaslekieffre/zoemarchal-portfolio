import type { CSSProperties } from "react";

/**
 * Tokens de couleur du site. Les valeurs par défaut doivent rester identiques
 * à celles du bloc @theme de app/globals.css (fallback si rien n'est enregistré).
 */
export type ThemeGroup = "charte" | "projets";

export type ThemeToken = {
  key: string;
  label: string;
  hex: string;
  group: ThemeGroup;
};

export const THEME_TOKENS: ThemeToken[] = [
  { key: "blue", label: "Bleu · fond principal", hex: "#092E67", group: "charte" },
  { key: "peach", label: "Pêche · texte principal", hex: "#FCE4D8", group: "charte" },
  { key: "purple", label: "Violet · accents", hex: "#A17CC1", group: "charte" },
  { key: "navy", label: "Marine · chips", hex: "#111453", group: "charte" },
  { key: "rafale-dark", label: "Rafale · sombre", hex: "#020618", group: "projets" },
  { key: "rafale-light", label: "Rafale · clair", hex: "#ECFEFF", group: "projets" },
  { key: "rafale-mid", label: "Rafale · médian", hex: "#053345", group: "projets" },
  { key: "rafale-accent", label: "Rafale · accent", hex: "#0092B8", group: "projets" },
  { key: "rafale-pale", label: "Rafale · pâle", hex: "#CEFAFE", group: "projets" },
  { key: "jumio-dark", label: "Jumio · sombre", hex: "#323132", group: "projets" },
  { key: "jumio-cyan", label: "Jumio · cyan", hex: "#13DFCE", group: "projets" },
  { key: "jumio-green", label: "Jumio · vert", hex: "#5ACC29", group: "projets" },
  { key: "ms-orange", label: "MS · orange", hex: "#EA9230", group: "projets" },
  { key: "ms-red", label: "MS · rouge", hex: "#EC5930", group: "projets" },
  { key: "ms-pink", label: "MS · rose", hex: "#ED739A", group: "projets" },
  { key: "ms-purple", label: "MS · prune", hex: "#890B51", group: "projets" },
  { key: "ms-dark", label: "MS · sombre", hex: "#1C1D3B", group: "projets" },
  { key: "ms-teal", label: "MS · sarcelle", hex: "#008F9F", group: "projets" },
];

/** Clé du token (ex : "blue") → valeur hex */
export type ThemeColors = Record<string, string>;

const HEX_RE = /^#[0-9a-f]{6}$/i;

export const DEFAULT_THEME: ThemeColors = Object.fromEntries(
  THEME_TOKENS.map((t) => [t.key, t.hex]),
);

/** Fusionne une valeur enregistrée avec les défauts, en ignorant les hex invalides */
export function mergeTheme(stored: Partial<ThemeColors> | null | undefined): ThemeColors {
  return Object.fromEntries(
    THEME_TOKENS.map((t) => {
      const value = stored?.[t.key];
      return [t.key, value && HEX_RE.test(value) ? value : t.hex];
    }),
  );
}

/** Variables CSS à poser sur <html> : --color-blue, --color-peach, etc. */
export function themeCssVars(theme: ThemeColors): CSSProperties {
  return Object.fromEntries(
    THEME_TOKENS.map((t) => [`--color-${t.key}`, theme[t.key] ?? t.hex]),
  ) as CSSProperties;
}
