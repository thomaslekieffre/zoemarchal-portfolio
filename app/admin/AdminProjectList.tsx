"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/supabase/types";

const LAYOUT_LABELS: Record<string, string> = {
  identity: "Identité visuelle",
  ui: "UI / UX",
  print: "Affiche / Print",
};

export default function AdminProjectList({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce projet ?")) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((x) => x.id !== id));
    setDeleting(null);
  }

  async function handleToggle(project: Project) {
    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !project.published }),
    });
    if (res.ok) {
      setProjects((p) => p.map((x) => x.id === project.id ? { ...x, published: !x.published } : x));
    }
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 font-body" style={{ color: "var(--color-blue)", opacity: 0.5 }}>
        Aucun projet. Créez-en un !
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center gap-4 p-4 rounded-2xl"
          style={{ backgroundColor: "white", border: "1.5px solid rgba(9,46,103,0.1)" }}
        >
          {/* Color swatch */}
          <div className="w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: project.bg_color }} />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-heading text-base truncate" style={{ color: "var(--color-blue)" }}>
              {project.title}
            </p>
            <p className="font-body text-xs mt-0.5" style={{ color: "var(--color-blue)", opacity: 0.5 }}>
              {LAYOUT_LABELS[project.layout]} · ordre {project.display_order}
            </p>
          </div>

          {/* Published toggle */}
          <button
            onClick={() => handleToggle(project)}
            className="font-body text-xs px-3 py-1 rounded-full transition-all"
            style={
              project.published
                ? { backgroundColor: "#e8f5e9", color: "#2e7d32" }
                : { backgroundColor: "#fce4d8", color: "var(--color-blue)", opacity: 0.7 }
            }
          >
            {project.published ? "Publié" : "Caché"}
          </button>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <Link
              href={`/admin/projects/${project.id}`}
              className="font-body text-xs px-3 py-1.5 rounded-full"
              style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}
            >
              Modifier
            </Link>
            <button
              onClick={() => handleDelete(project.id)}
              disabled={deleting === project.id}
              className="font-body text-xs px-3 py-1.5 rounded-full disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}
            >
              {deleting === project.id ? "…" : "Supprimer"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
