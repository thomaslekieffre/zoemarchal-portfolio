"use client";

import { useState } from "react";
import { DEFAULT_THEME, THEME_TOKENS, type ThemeColors, themeCssVars } from "@/lib/site-content/theme";
import { contrastLevels, type ContrastLevels } from "@/lib/site-content/contrast";

type Props = {
  theme: ThemeColors;
  onChange: (key: string, hex: string) => void;
  onReset: () => void;
};

const LABEL_STYLE = { color: "var(--color-blue)" };

function levelName({ aa, aaa, aaLarge }: ContrastLevels) {
  if (aaa) return "AAA";
  if (aa) return "AA";
  if (aaLarge) return "Grand texte seulement";
  return "Échec";
}

function levelColor({ aa, aaLarge }: ContrastLevels) {
  if (aa) return "#1f7a3a";
  if (aaLarge) return "#b7791f";
  return "#c53030";
}

function Badge({ levels }: { levels: ContrastLevels }) {
  return (
    <span
      className="font-body text-[11px] font-semibold px-2 py-0.5 rounded-full text-white whitespace-nowrap"
      style={{ backgroundColor: levelColor(levels) }}
    >
      {levels.ratio.toFixed(2)} : 1 · {levelName(levels)}
    </span>
  );
}

// Paires réellement utilisées sur le site, pour voir l'effet des changements en contexte
const PREVIEW_PAIRS = [
  { label: "Hero", bg: "blue", text: "peach" },
  { label: "À propos", bg: "peach", text: "blue" },
  { label: "Carte marine", bg: "navy", text: "peach" },
  { label: "Projet sombre", bg: "rafale-dark", text: "rafale-pale" },
];

export default function ThemeEditor({ theme, onChange, onReset }: Props) {
  const [textKey, setTextKey] = useState("peach");
  const [bgKey, setBgKey] = useState("blue");

  const isDefault = JSON.stringify(theme) === JSON.stringify(DEFAULT_THEME);
  const pair = contrastLevels(theme[textKey], theme[bgKey]);

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Couleurs ─────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-heading text-xl" style={LABEL_STYLE}>Couleurs du site</h2>
            <p className="font-body text-xs mt-1 leading-relaxed opacity-60" style={LABEL_STYLE}>
              Toutes les couleurs du site, pas seulement la charte. Les projets qui utilisent une couleur précise
              (Rafale, Jumio, MS) la voient changer aussi.
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            disabled={isDefault}
            className="font-body text-xs underline opacity-60 disabled:opacity-30 disabled:no-underline"
            style={LABEL_STYLE}
          >
            Revenir aux couleurs d&apos;origine
          </button>
        </div>

        {(["charte", "projets"] as const).map((group) => (
          <div key={group} className="flex flex-col gap-2">
            <h3 className="font-body text-xs font-semibold uppercase tracking-wide opacity-50" style={LABEL_STYLE}>
              {group === "charte" ? "Charte" : "Couleurs des projets"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {THEME_TOKENS.filter((t) => t.group === group).map((t) => {
                const value = theme[t.key];
                const changed = value.toUpperCase() !== t.hex.toUpperCase();
                return (
                  <div
                    key={t.key}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-white"
                    style={{ border: "1.5px solid rgba(9,46,103,0.1)" }}
                  >
                    <input
                      type="color"
                      aria-label={t.label}
                      value={value}
                      onChange={(e) => onChange(t.key, e.target.value.toUpperCase())}
                      className="w-9 h-9 rounded-lg cursor-pointer border-0 shrink-0"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-body text-xs truncate" style={LABEL_STYLE}>{t.label}</span>
                      <span className="font-body text-[10px] opacity-50" style={LABEL_STYLE}>
                        {value.toUpperCase()}{changed && ` · origine ${t.hex}`}
                      </span>
                    </div>
                    {changed && (
                      <button
                        type="button"
                        onClick={() => onChange(t.key, t.hex)}
                        className="font-body text-[11px] opacity-60 hover:opacity-100 px-2"
                        style={LABEL_STYLE}
                      >
                        Réinitialiser
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Aperçu ───────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl" style={LABEL_STYLE}>Aperçu</h2>
        <p className="font-body text-xs leading-relaxed opacity-60" style={LABEL_STYLE}>
          Quatre paires de couleurs telles qu&apos;elles apparaissent sur le site, avec leur contraste.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={themeCssVars(theme)}>
          {PREVIEW_PAIRS.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl p-5 flex flex-col gap-3 min-h-[180px]"
              style={{ backgroundColor: `var(--color-${p.bg})`, color: `var(--color-${p.text})` }}
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="font-body text-xs opacity-70">{p.label}</span>
                <Badge levels={contrastLevels(theme[p.text], theme[p.bg])} />
              </div>
              <p className="font-heading text-3xl leading-none">Zoé Marchal</p>
              <p className="font-body text-sm leading-relaxed">
                Graphic designer · identité visuelle, UI, affiche et édition.
              </p>
              <span
                className="font-body text-xs w-fit px-3 py-1 rounded-full mt-auto"
                style={{ border: "1.5px solid currentColor" }}
              >
                Voir les projets
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contraste : paire à la demande ───────────────────── */}
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl" style={LABEL_STYLE}>Vérifier un contraste</h2>
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white" style={{ border: "1.5px solid rgba(9,46,103,0.1)" }}>
          <div className="flex gap-3 flex-wrap">
            <label className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <span className="font-body text-[10px] opacity-50" style={LABEL_STYLE}>Couleur du texte</span>
              <select className="admin-input" value={textKey} onChange={(e) => setTextKey(e.target.value)}>
                {THEME_TOKENS.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <span className="font-body text-[10px] opacity-50" style={LABEL_STYLE}>Couleur du fond</span>
              <select className="admin-input" value={bgKey} onChange={(e) => setBgKey(e.target.value)}>
                {THEME_TOKENS.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </label>
          </div>
          <div
            className="rounded-xl p-5 flex flex-col gap-2"
            style={{ backgroundColor: theme[bgKey], color: theme[textKey] }}
          >
            <span className="font-heading text-3xl leading-none">Aa</span>
            <span className="font-body text-sm">Texte courant : le portfolio se lit aussi sur téléphone.</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge levels={pair} />
            <span className="font-body text-xs opacity-60" style={LABEL_STYLE}>
              Texte normal : AA ≥ 4.5 · AAA ≥ 7 · Grand texte : AA ≥ 3
            </span>
          </div>
        </div>
      </section>

      {/* ─── Matrice de contraste ─────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl" style={LABEL_STYLE}>Matrice de contraste</h2>
        <p className="font-body text-xs leading-relaxed opacity-60" style={LABEL_STYLE}>
          Lignes : couleur du texte. Colonnes : couleur du fond. Vert : AA texte normal · orange : grand texte seulement · rouge : échec.
        </p>
        <div className="overflow-x-auto rounded-2xl bg-white p-3" style={{ border: "1.5px solid rgba(9,46,103,0.1)" }}>
          <table className="border-separate border-spacing-1">
            <thead>
              <tr>
                <th />
                {THEME_TOKENS.map((bg) => (
                  <th key={bg.key} className="font-body text-[9px] font-normal opacity-60 w-14 align-bottom pb-1" style={LABEL_STYLE}>
                    <span className="block w-14 truncate">{bg.key}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {THEME_TOKENS.map((text) => (
                <tr key={text.key}>
                  <th className="font-body text-[9px] font-normal opacity-60 text-right pr-2 whitespace-nowrap" style={LABEL_STYLE}>
                    {text.key}
                  </th>
                  {THEME_TOKENS.map((bg) => {
                    if (bg.key === text.key) {
                      return <td key={bg.key} className="w-14 h-10 rounded-md bg-black/5" />;
                    }
                    const levels = contrastLevels(theme[text.key], theme[bg.key]);
                    return (
                      <td
                        key={bg.key}
                        title={`${text.label} sur ${bg.label} : ${levels.ratio.toFixed(2)} : 1 (${levelName(levels)})`}
                        className="w-14 h-10 rounded-md text-center font-body text-[10px] font-semibold"
                        style={{
                          backgroundColor: theme[bg.key],
                          color: theme[text.key],
                          boxShadow: `inset 0 0 0 2px ${levelColor(levels)}`,
                        }}
                      >
                        {levels.ratio.toFixed(1)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
