"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BasePaletteColor, SiteContent } from "@/lib/site-content/types";

export default function PaletteForm({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [palette, setPalette] = useState<BasePaletteColor[]>(content.palette);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const dirty = JSON.stringify(palette) !== JSON.stringify(content.palette);

  function update(i: number, patch: Partial<BasePaletteColor>) {
    setPalette((p) => p.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  function add() {
    setPalette((p) => [...p, { hex: "#092E67", label: `Couleur ${p.length + 1}` }]);
  }

  function remove(i: number) {
    setPalette((p) => p.filter((_, idx) => idx !== i));
  }

  async function save() {
    setSaving(true);
    setError("");
    // On renvoie tout le contenu du site : la route fusionne et ne doit pas perdre fr / en
    const res = await fetch("/api/admin/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...content, palette }),
    });
    if (res.ok) {
      setSavedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Erreur lors de la sauvegarde");
    }
    setSaving(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Aperçu */}
      <div className="flex gap-2 flex-wrap p-4 rounded-2xl bg-white min-h-[64px] items-center" style={{ border: "1.5px solid rgba(9,46,103,0.1)" }}>
        {palette.length === 0 ? (
          <p className="font-body text-sm opacity-50" style={{ color: "var(--color-blue)" }}>Aucune couleur pour le moment.</p>
        ) : (
          palette.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-1 w-14">
              <span className="w-10 h-10 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
              <span className="font-body text-[10px] truncate w-full text-center" style={{ color: "var(--color-blue)", opacity: 0.6 }}>{c.label || c.hex}</span>
            </div>
          ))
        )}
      </div>

      {/* Liste éditable */}
      <div className="flex flex-col gap-3">
        {palette.map((c, i) => (
          <div key={i} className="flex gap-3 items-center flex-wrap p-3 rounded-2xl bg-white" style={{ border: "1.5px solid rgba(9,46,103,0.1)" }}>
            <input
              type="color"
              aria-label={`Couleur ${c.label || i + 1}`}
              value={c.hex}
              onChange={(e) => update(i, { hex: e.target.value.toUpperCase(), label: c.label || e.target.value.toUpperCase() })}
              className="w-11 h-11 rounded-xl cursor-pointer border-0 shrink-0"
            />
            <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
              <label className="font-body text-[10px] opacity-50" style={{ color: "var(--color-blue)" }}>Nom</label>
              <input className="admin-input" value={c.label} onChange={(e) => update(i, { label: e.target.value })} placeholder="ex : Bleu Rafale" />
            </div>
            <div className="flex flex-col gap-1 w-32">
              <label className="font-body text-[10px] opacity-50" style={{ color: "var(--color-blue)" }}>Code hex</label>
              <input className="admin-input" value={c.hex} onChange={(e) => update(i, { hex: e.target.value.toUpperCase() })} />
            </div>
            <button type="button" onClick={() => remove(i)} className="font-body text-xs text-red-600 px-3 py-2 rounded-full hover:bg-red-50">
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={add} className="admin-btn-secondary w-fit">+ Ajouter une couleur</button>

      {error && <p className="font-body text-sm text-red-600">⚠ {error}</p>}

      {/* Barre d'action collante */}
      <div className="sticky bottom-0 -mx-6 px-6 py-4 flex items-center gap-4 flex-wrap bg-[#f5f0eb]/95 backdrop-blur" style={{ borderTop: "1px solid rgba(9,46,103,0.1)" }}>
        <button type="button" onClick={save} disabled={saving || !dirty} className="admin-btn-primary disabled:opacity-40">
          {saving ? "Enregistrement…" : "Enregistrer la palette"}
        </button>
        <span className="font-body text-xs opacity-60" style={{ color: "var(--color-blue)" }}>
          {dirty ? "Modifications non enregistrées" : savedAt ? `Enregistré à ${savedAt}` : "Aucune modification"}
        </span>
      </div>
    </div>
  );
}
