"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectColor, ProjectFont, ProjectImage, ProjectLayout } from "@/lib/supabase/types";

const LAYOUT_OPTIONS: { value: ProjectLayout; label: string }[] = [
  { value: "identity", label: "Identité visuelle — texte + palette + polices à gauche, images à droite" },
  { value: "ui", label: "UI / UX — grille de captures d'écran à gauche, info à droite" },
  { value: "print", label: "Affiche / Print — affiche + portraits à gauche, mockup à droite" },
  { value: "gallery", label: "Galerie — grille d'images libre (illustration, photo, packaging…)" },
  { value: "motion", label: "Motion / Vidéo — grille de captures ou thumbnails" },
  { value: "editorial", label: "Éditorial / Livre — grille de pages ou spreads" },
];

const IMAGE_ROLES: Record<ProjectLayout, string[]> = {
  identity: ["overlay", "bottom"],
  ui: ["grid"],
  print: ["hero", "portrait", "mockup"],
  gallery: ["hero", "image"],
  motion: ["hero", "image"],
  editorial: ["hero", "image"],
};

type FormState = {
  slug: string;
  title: string;
  description: string;
  description_en: string;
  bg_color: string;
  text_color: string;
  layout: ProjectLayout;
  colors: ProjectColor[];
  fonts: ProjectFont[];
  images: ProjectImage[];
  display_order: number;
  published: boolean;
};

const DEFAULT_STATE: FormState = {
  slug: "",
  title: "",
  description: "",
  description_en: "",
  bg_color: "#ffffff",
  text_color: "#000000",
  layout: "identity",
  colors: [],
  fonts: [],
  images: [],
  display_order: 0,
  published: true,
};

function normalizeHex(value: string): string | null {
  const v = value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(v)) return v.toUpperCase();
  if (/^#[0-9A-Fa-f]{3}$/.test(v)) {
    const [, r, g, b] = v;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return null;
}

function colorPreviewHex(color: ProjectColor): string {
  return normalizeHex(color.hex) ?? normalizeHex(color.label) ?? "#000000";
}

function projectToForm(p: Project): FormState {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description ?? "",
    description_en: p.description_en ?? "",
    bg_color: p.bg_color,
    text_color: p.text_color,
    layout: p.layout,
    colors: p.colors,
    fonts: p.fonts,
    images: p.images,
    display_order: p.display_order,
    published: p.published,
  };
}

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const isEdit = !!project;
  const [form, setForm] = useState<FormState>(project ? projectToForm(project) : DEFAULT_STATE);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingFont, setUploadingFont] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const fontFileRef = useRef<HTMLInputElement>(null);
  const [pendingRole, setPendingRole] = useState<string>(() => IMAGE_ROLES[project?.layout ?? "identity"][0]);
  const [pendingIndex, setPendingIndex] = useState<number>(0);

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  // Colors
  function addColor() {
    set("colors", [...form.colors, { hex: "#000000", label: "#000000", radius: "50%", gradient: false }]);
  }
  function updateColor(i: number, patch: Partial<ProjectColor>) {
    set("colors", form.colors.map((c, idx) => idx === i ? { ...c, ...patch } : c));
  }
  function removeColor(i: number) {
    set("colors", form.colors.filter((_, idx) => idx !== i));
  }

  // Fonts
  function addFont() {
    set("fonts", [...form.fonts, { name: "", cssClass: "font-custom", fontUrl: "" }]);
  }
  function updateFont(i: number, patch: Partial<ProjectFont>) {
    set("fonts", form.fonts.map((f, idx) => idx === i ? { ...f, ...patch } : f));
  }
  function removeFont(i: number) {
    set("fonts", form.fonts.filter((_, idx) => idx !== i));
  }

  async function handleFontUpload(e: React.ChangeEvent<HTMLInputElement>, fontIndex: number) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFont(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload-font", { method: "POST", body: fd });
    if (res.ok) {
      const { url, name } = await res.json();
      updateFont(fontIndex, { fontUrl: url, name: form.fonts[fontIndex].name || name, cssClass: "font-custom" });
    }
    setUploadingFont(false);
    if (fontFileRef.current) fontFileRef.current.value = "";
  }

  // Images upload
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", form.slug || "project");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        set("images", [...form.images, { url, role: pendingRole, index: pendingIndex }]);
      }
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(i: number) {
    set("images", form.images.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/projects/${project!.id}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Erreur lors de la sauvegarde");
    }
    setSaving(false);
  }

  const roleOptions = IMAGE_ROLES[form.layout];

  const IMAGE_ROLE_HELP: Record<ProjectLayout, React.ReactNode> = {
    identity: (
      <ul className="list-disc pl-4 space-y-0.5">
        <li><strong>overlay</strong> (index 0) — 1ère image superposée à droite, format paysage</li>
        <li><strong>overlay</strong> (index 1) — 2ème image superposée à droite, format portrait</li>
        <li><strong>bottom</strong> (index 0) — mockup laptop en bas à gauche</li>
        <li><strong>bottom</strong> (index 1) — petite image en bas au centre</li>
        <li><strong>bottom</strong> (index 2) — petite image en bas à droite</li>
      </ul>
    ),
    ui: (
      <ul className="list-disc pl-4 space-y-0.5">
        <li><strong>grid</strong> (index 0 à 3) — 4 images en grille 2×2 à gauche du projet</li>
        <li>Ajouter les 4 images avec index 0, 1, 2, 3</li>
      </ul>
    ),
    print: (
      <ul className="list-disc pl-4 space-y-0.5">
        <li><strong>hero</strong> — l'affiche principale (colonne gauche, en haut)</li>
        <li><strong>portrait</strong> (index 0, 1, 2) — les 3 photos/portraits (colonne gauche, en bas)</li>
        <li><strong>mockup</strong> — le mockup final (colonne droite, en bas)</li>
      </ul>
    ),
    gallery: (
      <ul className="list-disc pl-4 space-y-0.5">
        <li><strong>hero</strong> — image principale pleine largeur (optionnelle)</li>
        <li><strong>image</strong> (index 0, 1, 2…) — images de la grille, dans l'ordre</li>
      </ul>
    ),
    motion: (
      <ul className="list-disc pl-4 space-y-0.5">
        <li><strong>hero</strong> — thumbnail/capture principale (optionnelle)</li>
        <li><strong>image</strong> (index 0, 1, 2…) — captures ou thumbnails dans l'ordre</li>
      </ul>
    ),
    editorial: (
      <ul className="list-disc pl-4 space-y-0.5">
        <li><strong>hero</strong> — couverture ou spread principal (optionnel)</li>
        <li><strong>image</strong> (index 0, 1, 2…) — pages ou spreads dans l'ordre</li>
      </ul>
    ),
  };

  const FONT_OPTIONS = [
    { label: "Borel (titres manuscrits)", value: "font-borel" },
    { label: "Sen (corps de texte)", value: "font-sen" },
    { label: "Jost (sans-serif moderne)", value: "font-jost" },
    { label: "Barlow Condensed (capitales)", value: "font-barlow" },
    { label: "DM Sans (body par défaut)", value: "font-body" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* Infos de base */}
      <Section
        title="Informations générales"
        hint="Les infos principales du projet qui s'affichent dans la section de présentation."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Titre *" hint="Nom du projet affiché en grand sur le portfolio.">
            <input required value={form.title} onChange={(e) => set("title", e.target.value)}
              className="admin-input" placeholder="ex : Rafale Ambulances" />
          </Field>
          <Field label="Slug *" hint='Identifiant unique sans espaces, généré automatiquement depuis le titre. Ne pas modifier après création.'>
            <input required value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              className="admin-input" placeholder="ex : rafale-ambulances" />
          </Field>
        </div>
        <Field label="Description (français)" hint="Texte affiché quand le site est en français.">
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
            className="admin-input" rows={3} placeholder="J'ai réalisé... L'objectif était de..." />
        </Field>
        <Field label="Description (english)" hint="Text shown when the site is in English. Leave empty to use the French version.">
          <textarea value={form.description_en} onChange={(e) => set("description_en", e.target.value)}
            className="admin-input" rows={3} placeholder="I designed... The goal was to..." />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Couleur de fond" hint="Couleur de la section du projet sur le portfolio (ex : violet pour Rafale, rose pâle pour Jumio).">
            <div className="flex gap-2 items-center">
              <input type="color" value={form.bg_color} onChange={(e) => set("bg_color", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.bg_color} onChange={(e) => set("bg_color", e.target.value)} className="admin-input flex-1" />
            </div>
          </Field>
          <Field label="Couleur du texte" hint="Couleur des textes sur fond coloré. Utilise du clair sur fond foncé et inversement.">
            <div className="flex gap-2 items-center">
              <input type="color" value={form.text_color} onChange={(e) => set("text_color", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.text_color} onChange={(e) => set("text_color", e.target.value)} className="admin-input flex-1" />
            </div>
          </Field>
          <Field label="Ordre d'affichage" hint="0 = premier affiché sur le portfolio, 1 = deuxième, etc.">
            <input type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))}
              className="admin-input" min={0} />
          </Field>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-start">
          <Field label="Template (mise en page)" hint="Choisis le type de présentation qui correspond à ton projet.">
            <select value={form.layout} onChange={(e) => { set("layout", e.target.value as ProjectLayout); setPendingRole(IMAGE_ROLES[e.target.value as ProjectLayout][0]); }} className="admin-input">
              {LAYOUT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <div className="flex items-end pb-0.5 pt-4">
            <label className="flex items-center gap-2 cursor-pointer font-body text-sm" style={{ color: "var(--color-blue)" }}>
              <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4" />
              Visible sur le portfolio
            </label>
          </div>
        </div>
        {/* Template preview */}
        <div className="p-3 rounded-xl text-xs font-body leading-relaxed" style={{ backgroundColor: "rgba(9,46,103,0.05)", color: "var(--color-blue)" }}>
          {form.layout === "identity" && "📐 Texte + palette + polices à gauche · Images superposées à droite · Mockup + pages en bas. Parfait pour un projet de branding/charte graphique."}
          {form.layout === "ui" && "🖥 Grille de 4 captures d'écran à gauche · Présentation + palette + police à droite. Parfait pour un projet digital (appli, site, PDF)."}
          {form.layout === "print" && "🎨 Affiche + portraits à gauche · Texte + palette + police + mockup à droite. Parfait pour une affiche, de l'édition, du print."}
          {form.layout === "gallery" && "🖼 Header avec titre + description + palette · Puis image hero pleine largeur + grille d'images libre. Parfait pour de l'illustration, packaging, photo…"}
          {form.layout === "motion" && "🎬 Même mise en page que Galerie. Upload des thumbnails ou captures de tes vidéos/animations."}
          {form.layout === "editorial" && "📖 Même mise en page que Galerie. Upload des scans ou photos de pages, spreads, livres…"}
        </div>
      </Section>

      {/* Palette */}
      <Section
        title="Palette de couleurs"
        hint="Les couleurs du projet s'affichent sous forme de petits ronds animés. Tu peux en mettre autant que tu veux."
      >
        <div className="flex flex-col gap-3">
          {form.colors.map((c, i) => (
            <div key={i} className="flex gap-3 items-center flex-wrap p-3 rounded-xl" style={{ backgroundColor: "rgba(9,46,103,0.03)" }}>
              <input
                type="color"
                value={c.gradient ? "#5acc29" : colorPreviewHex(c)}
                onChange={(e) => updateColor(i, { hex: e.target.value.toUpperCase(), label: e.target.value.toUpperCase() })}
                className="w-10 h-10 rounded cursor-pointer border-0 shrink-0"
              />
              <div className="flex flex-col flex-1 gap-1 min-w-[120px]">
                <label className="font-body text-[10px] opacity-50" style={{ color: "var(--color-blue)" }}>Label affiché sous le rond</label>
                <input
                  value={c.label}
                  onChange={(e) => {
                    const label = e.target.value;
                    const hex = normalizeHex(label);
                    updateColor(i, hex ? { label, hex } : { label });
                  }}
                  className="admin-input"
                  placeholder="#FFFFFF ou Gradient"
                />
              </div>
              <div className="flex flex-col flex-1 gap-1 min-w-[120px]">
                <label className="font-body text-[10px] opacity-50" style={{ color: "var(--color-blue)" }}>Forme du rond (laisse 50% par défaut)</label>
                <input value={c.radius ?? ""} onChange={(e) => updateColor(i, { radius: e.target.value })} className="admin-input" placeholder="50%" />
              </div>
              <label className="flex items-center gap-1.5 font-body text-xs" style={{ color: "var(--color-blue)" }}>
                <input type="checkbox" checked={!!c.gradient} onChange={(e) => updateColor(i, { gradient: e.target.checked })} />
                C&apos;est un gradient
              </label>
              <button type="button" onClick={() => removeColor(i)} className="text-red-500 text-xs font-body px-2 py-1 rounded hover:bg-red-50">✕ Supprimer</button>
            </div>
          ))}
          <button type="button" onClick={addColor} className="admin-btn-secondary w-fit">
            + Ajouter une couleur
          </button>
        </div>
      </Section>

      {/* Typographies */}
      <Section
        title="Typographies"
        hint="Les polices affichées dans la section du projet. Tu peux utiliser les polices déjà intégrées au site, ou uploader une police personnalisée (TTF, OTF, WOFF, WOFF2)."
      >
        <div className="p-3 rounded-xl text-xs font-body leading-relaxed mb-1" style={{ backgroundColor: "rgba(9,46,103,0.05)", color: "var(--color-blue)" }}>
          <strong>Polices intégrées :</strong> font-borel · font-sen · font-jost · font-barlow · font-body<br />
          <strong>Police perso :</strong> uploade ton fichier de police — elle sera chargée automatiquement sur le portfolio.
        </div>
        <div className="flex flex-col gap-3">
          {form.fonts.map((f, i) => (
            <div key={i} className="flex flex-col gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(9,46,103,0.03)" }}>
              <div className="flex gap-3 items-start flex-wrap">
                <div className="flex flex-col flex-1 gap-1 min-w-[140px]">
                  <label className="font-body text-[10px] opacity-50" style={{ color: "var(--color-blue)" }}>Nom affiché (ex : Borel, Ma police…)</label>
                  <input value={f.name} onChange={(e) => updateFont(i, { name: e.target.value })} className="admin-input" placeholder="Nom de la police" />
                </div>
                <div className="flex flex-col flex-1 gap-1 min-w-[140px]">
                  <label className="font-body text-[10px] opacity-50" style={{ color: "var(--color-blue)" }}>Police intégrée (laisser vide si perso)</label>
                  <select value={f.fontUrl ? "" : f.cssClass} onChange={(e) => updateFont(i, { cssClass: e.target.value, fontUrl: "" })} className="admin-input" disabled={!!f.fontUrl}>
                    <option value="">— Choisir une police intégrée —</option>
                    {FONT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <button type="button" onClick={() => removeFont(i)} className="text-red-500 text-xs font-body mt-5 px-2 py-1 rounded hover:bg-red-50">✕</button>
              </div>

              {/* Upload police perso */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[10px] opacity-50" style={{ color: "var(--color-blue)" }}>
                  OU uploader ta propre police (TTF / OTF / WOFF / WOFF2)
                </label>
                {f.fontUrl ? (
                  <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: "rgba(9,46,103,0.08)" }}>
                    <span className="font-body text-xs flex-1 truncate" style={{ color: "var(--color-blue)" }}>
                      ✓ Police uploadée
                    </span>
                    <button
                      type="button"
                      onClick={() => updateFont(i, { fontUrl: "", cssClass: "font-body" })}
                      className="text-red-500 text-xs font-body px-2 py-0.5 rounded hover:bg-red-50"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <input
                    ref={fontFileRef}
                    type="file"
                    accept=".ttf,.otf,.woff,.woff2"
                    onChange={(e) => handleFontUpload(e, i)}
                    className="font-body text-xs"
                    disabled={uploadingFont}
                  />
                )}
                {uploadingFont && <p className="font-body text-xs opacity-60" style={{ color: "var(--color-blue)" }}>Upload en cours…</p>}
              </div>
            </div>
          ))}
          <button type="button" onClick={addFont} className="admin-btn-secondary w-fit">
            + Ajouter une police
          </button>
        </div>
      </Section>

      {/* Images */}
      <Section
        title="Images"
        hint="Upload les images du projet. Choisis d'abord le rôle de l'image, puis sélectionne le fichier."
      >
        {/* Guide des rôles */}
        <div className="p-3 rounded-xl text-xs font-body leading-relaxed" style={{ backgroundColor: "rgba(9,46,103,0.05)", color: "var(--color-blue)" }}>
          <p className="font-semibold mb-1.5">Guide pour ce template ({form.layout}) :</p>
          {IMAGE_ROLE_HELP[form.layout]}
        </div>

        <div className="flex gap-3 flex-wrap items-end mt-2">
          <Field label="Rôle de l'image à uploader">
            <select value={pendingRole} onChange={(e) => setPendingRole(e.target.value)} className="admin-input">
              {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Index (si plusieurs images du même rôle, ex: portrait 0, 1, 2)">
            <input type="number" value={pendingIndex} onChange={(e) => setPendingIndex(Number(e.target.value))} className="admin-input w-20" min={0} />
          </Field>
          <div className="flex flex-col gap-1">
            <label className="font-body text-xs font-medium" style={{ color: "var(--color-blue)", opacity: 0.6 }}>
              Sélectionner le(s) fichier(s)
            </label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="font-body text-sm" disabled={uploading} />
          </div>
          {uploading && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-700 rounded-full animate-spin" />
              <p className="font-body text-xs" style={{ color: "var(--color-blue)", opacity: 0.6 }}>Upload en cours…</p>
            </div>
          )}
        </div>

        {form.images.length > 0 && (
          <div>
            <p className="font-body text-xs mb-2 mt-1" style={{ color: "var(--color-blue)", opacity: 0.5 }}>Images ajoutées ({form.images.length}) :</p>
            <div className="flex flex-wrap gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative flex flex-col items-center gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="w-24 h-24 object-cover rounded-xl" />
                  <span className="font-body text-[10px] font-medium text-center" style={{ color: "var(--color-blue)", opacity: 0.7 }}>
                    {img.role}{img.index !== undefined ? ` #${img.index}` : ""}
                  </span>
                  <button type="button" onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {error && (
        <div className="p-3 rounded-xl font-body text-sm" style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>
          ⚠ {error}
        </div>
      )}

      <div className="flex gap-3 pb-4">
        <button type="submit" disabled={saving} className="admin-btn-primary disabled:opacity-50">
          {saving ? "Sauvegarde en cours…" : isEdit ? "✓ Mettre à jour le projet" : "✓ Créer le projet"}
        </button>
        <a href="/admin" className="admin-btn-secondary">Annuler</a>
      </div>
    </form>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl" style={{ backgroundColor: "white", border: "1.5px solid rgba(9,46,103,0.1)" }}>
      <div>
        <h2 className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>{title}</h2>
        {hint && <p className="font-body text-xs mt-0.5 leading-relaxed" style={{ color: "var(--color-blue)", opacity: 0.5 }}>{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-xs font-medium" style={{ color: "var(--color-blue)", opacity: 0.6 }}>{label}</label>
      {hint && <p className="font-body text-[10px] leading-snug" style={{ color: "var(--color-blue)", opacity: 0.4 }}>{hint}</p>}
      {children}
    </div>
  );
}
