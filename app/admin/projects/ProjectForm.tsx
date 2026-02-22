"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectColor, ProjectFont, ProjectImage, ProjectLayout } from "@/lib/supabase/types";

const LAYOUT_OPTIONS: { value: ProjectLayout; label: string }[] = [
  { value: "identity", label: "Identité visuelle (style Rafale)" },
  { value: "ui", label: "UI / UX (style Jumio)" },
  { value: "print", label: "Affiche / Print (style Mainsquare)" },
];

const IMAGE_ROLES: Record<ProjectLayout, string[]> = {
  identity: ["overlay", "bottom"],
  ui: ["grid"],
  print: ["hero", "portrait", "mockup"],
};

type FormState = {
  slug: string;
  title: string;
  description: string;
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
  bg_color: "#ffffff",
  text_color: "#000000",
  layout: "identity",
  colors: [],
  fonts: [],
  images: [],
  display_order: 0,
  published: true,
};

function projectToForm(p: Project): FormState {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description ?? "",
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
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingRole, setPendingRole] = useState<string>("hero");
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
    set("fonts", [...form.fonts, { name: "", cssClass: "" }]);
  }
  function updateFont(i: number, patch: Partial<ProjectFont>) {
    set("fonts", form.fonts.map((f, idx) => idx === i ? { ...f, ...patch } : f));
  }
  function removeFont(i: number) {
    set("fonts", form.fonts.filter((_, idx) => idx !== i));
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* Infos de base */}
      <Section title="Informations">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Titre *">
            <input required value={form.title} onChange={(e) => set("title", e.target.value)}
              className="admin-input" placeholder="Mon projet" />
          </Field>
          <Field label="Slug *">
            <input required value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              className="admin-input" placeholder="mon-projet" />
          </Field>
        </div>
        <Field label="Description">
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
            className="admin-input" rows={3} placeholder="Présentation du projet..." />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Couleur de fond">
            <div className="flex gap-2 items-center">
              <input type="color" value={form.bg_color} onChange={(e) => set("bg_color", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.bg_color} onChange={(e) => set("bg_color", e.target.value)} className="admin-input flex-1" />
            </div>
          </Field>
          <Field label="Couleur texte">
            <div className="flex gap-2 items-center">
              <input type="color" value={form.text_color} onChange={(e) => set("text_color", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={form.text_color} onChange={(e) => set("text_color", e.target.value)} className="admin-input flex-1" />
            </div>
          </Field>
          <Field label="Ordre d'affichage">
            <input type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))}
              className="admin-input" min={0} />
          </Field>
        </div>
        <div className="flex gap-6">
          <Field label="Template">
            <select value={form.layout} onChange={(e) => set("layout", e.target.value as ProjectLayout)} className="admin-input">
              {LAYOUT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <div className="flex items-end pb-0.5">
            <label className="flex items-center gap-2 cursor-pointer font-body text-sm" style={{ color: "var(--color-blue)" }}>
              <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4" />
              Publié
            </label>
          </div>
        </div>
      </Section>

      {/* Palette */}
      <Section title="Palette de couleurs">
        <div className="flex flex-col gap-3">
          {form.colors.map((c, i) => (
            <div key={i} className="flex gap-3 items-center flex-wrap">
              <input type="color" value={c.gradient ? "#5acc29" : c.hex} onChange={(e) => updateColor(i, { hex: e.target.value, label: e.target.value })} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input value={c.label} onChange={(e) => updateColor(i, { label: e.target.value })} className="admin-input w-28" placeholder="Label" />
              <input value={c.radius ?? ""} onChange={(e) => updateColor(i, { radius: e.target.value })} className="admin-input flex-1" placeholder="border-radius (ex: 50%)" />
              <label className="flex items-center gap-1.5 font-body text-xs" style={{ color: "var(--color-blue)" }}>
                <input type="checkbox" checked={!!c.gradient} onChange={(e) => updateColor(i, { gradient: e.target.checked })} />
                Gradient
              </label>
              <button type="button" onClick={() => removeColor(i)} className="text-red-500 text-xs font-body">✕</button>
            </div>
          ))}
          <button type="button" onClick={addColor} className="admin-btn-secondary w-fit">
            + Ajouter une couleur
          </button>
        </div>
      </Section>

      {/* Typographies */}
      <Section title="Typographies">
        <div className="flex flex-col gap-3">
          {form.fonts.map((f, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input value={f.name} onChange={(e) => updateFont(i, { name: e.target.value })} className="admin-input flex-1" placeholder="Nom (ex: Borel)" />
              <input value={f.cssClass} onChange={(e) => updateFont(i, { cssClass: e.target.value })} className="admin-input flex-1" placeholder="Classe CSS (ex: font-borel)" />
              <button type="button" onClick={() => removeFont(i)} className="text-red-500 text-xs font-body">✕</button>
            </div>
          ))}
          <button type="button" onClick={addFont} className="admin-btn-secondary w-fit">
            + Ajouter une police
          </button>
        </div>
      </Section>

      {/* Images */}
      <Section title="Images">
        <div className="flex gap-3 flex-wrap items-end mb-4">
          <Field label="Rôle de l'image">
            <select value={pendingRole} onChange={(e) => setPendingRole(e.target.value)} className="admin-input">
              {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Index (si multiple)">
            <input type="number" value={pendingIndex} onChange={(e) => setPendingIndex(Number(e.target.value))} className="admin-input w-20" min={0} />
          </Field>
          <div className="flex flex-col gap-1">
            <label className="font-body text-xs font-medium" style={{ color: "var(--color-blue)", opacity: 0.6 }}>
              Fichier image
            </label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="font-body text-sm" disabled={uploading} />
          </div>
          {uploading && <p className="font-body text-xs" style={{ color: "var(--color-blue)", opacity: 0.6 }}>Upload en cours…</p>}
        </div>

        {form.images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {form.images.map((img, i) => (
              <div key={i} className="relative flex flex-col items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="w-20 h-20 object-cover rounded-xl" />
                <span className="font-body text-[10px] opacity-60" style={{ color: "var(--color-blue)" }}>
                  {img.role}{img.index !== undefined ? ` #${img.index}` : ""}
                </span>
                <button type="button" onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {error && <p className="font-body text-sm" style={{ color: "#b91c1c" }}>{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="admin-btn-primary disabled:opacity-50">
          {saving ? "Sauvegarde…" : isEdit ? "Mettre à jour" : "Créer le projet"}
        </button>
        <a href="/admin" className="admin-btn-secondary">Annuler</a>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl" style={{ backgroundColor: "white", border: "1.5px solid rgba(9,46,103,0.1)" }}>
      <h2 className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-xs font-medium" style={{ color: "var(--color-blue)", opacity: 0.6 }}>{label}</label>
      {children}
    </div>
  );
}
