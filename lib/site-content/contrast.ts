/** Contraste WCAG 2.x entre deux couleurs hex (#RRGGBB) */

function channel(value: number) {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export type ContrastLevels = {
  ratio: number;
  /** Texte normal, niveau AA (≥ 4.5) */
  aa: boolean;
  /** Texte normal, niveau AAA (≥ 7) */
  aaa: boolean;
  /** Grand texte, niveau AA (≥ 3) */
  aaLarge: boolean;
};

export function contrastLevels(text: string, bg: string): ContrastLevels {
  const ratio = contrastRatio(text, bg);
  return {
    ratio,
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    aaLarge: ratio >= 3,
  };
}
