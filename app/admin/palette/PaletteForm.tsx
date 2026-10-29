"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/site-content/types";
import { DEFAULT_THEME, type ThemeColors } from "@/lib/site-content/theme";
import ThemeEditor from "./ThemeEditor";

export default function PaletteForm({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [theme, setTheme] = useState<ThemeColors>(content.theme);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const dirty = JSON.stringify(theme) !== JSON.stringify(content.theme);

  async function save() {
    setSaving(true);
    setError("");
    // On renvoie tout le contenu du site : la route fusionne et ne doit pas perdre fr / en
    const res = await fetch("/api/admin/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...content, theme }),
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
    <div className="flex flex-col gap-10">
      <ThemeEditor
        theme={theme}
        onChange={(key, hex) => setTheme((t) => ({ ...t, [key]: hex }))}
        onReset={() => setTheme(DEFAULT_THEME)}
      />

      {error && <p className="font-body text-sm text-red-600">⚠ {error}</p>}

      {/* Barre d'action collante */}
      <div className="sticky bottom-0 -mx-6 px-6 py-4 flex items-center gap-4 flex-wrap bg-[#f5f0eb]/95 backdrop-blur" style={{ borderTop: "1px solid rgba(9,46,103,0.1)" }}>
        <button type="button" onClick={save} disabled={saving || !dirty} className="admin-btn-primary disabled:opacity-40">
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
        <span className="font-body text-xs opacity-60" style={{ color: "var(--color-blue)" }}>
          {dirty ? "Modifications non enregistrées" : savedAt ? `Enregistré à ${savedAt}` : "Aucune modification"}
        </span>
      </div>
    </div>
  );
}
