"use client";

import Link from "next/link";
import { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import type { Project } from "@/lib/supabase/types";

const LAYOUT_LABELS: Record<string, string> = {
  identity: "Identité visuelle",
  ui: "UI / UX",
  print: "Affiche / Print",
  gallery: "Galerie",
  grid: "Grille photo",
  mosaic: "Mosaïque photo",
  motion: "Motion / Vidéo",
  editorial: "Éditorial / Livre",
};

export default function AdminProjectList({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);
  // Ordre tel qu'enregistré en base, pour savoir si la liste a bougé
  const [savedIds, setSavedIds] = useState(() => initial.map((p) => p.id));
  const [deleting, setDeleting] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  const orderChanged = projects.map((p) => p.id).join() !== savedIds.join();

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce projet ?")) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((x) => x.id !== id));
    setSavedIds((ids) => ids.filter((x) => x !== id));
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

  async function handleSaveOrder() {
    setSavingOrder(true);
    setOrderError("");

    // Seuls les projets dont la position a changé sont envoyés
    const changed = projects
      .map((p, index) => ({ project: p, index }))
      .filter(({ project, index }) => project.display_order !== index);

    const results = await Promise.all(
      changed.map(({ project, index }) =>
        fetch(`/api/admin/projects/${project.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ display_order: index }),
        }).then((res) => res.ok)
      )
    );

    if (results.every(Boolean)) {
      setProjects((p) => p.map((x, index) => ({ ...x, display_order: index })));
      setSavedIds(projects.map((p) => p.id));
    } else {
      setOrderError("Certains projets n'ont pas pu être réordonnés. Réessaie.");
    }
    setSavingOrder(false);
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
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="font-body text-xs" style={{ color: "var(--color-blue)", opacity: 0.5 }}>
          Glisse les projets par la poignée ⋮⋮ pour changer l&apos;ordre sur le portfolio.
        </p>
        {orderChanged && (
          <button
            type="button"
            onClick={handleSaveOrder}
            disabled={savingOrder}
            className="admin-btn-primary text-xs disabled:opacity-50"
          >
            {savingOrder ? "Enregistrement…" : "Enregistrer l'ordre"}
          </button>
        )}
      </div>
      {orderError && <p className="font-body text-xs text-red-600">{orderError}</p>}

      <Reorder.Group axis="y" values={projects} onReorder={setProjects} className="flex flex-col gap-3">
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            deleting={deleting === project.id}
            onDelete={() => handleDelete(project.id)}
            onToggle={() => handleToggle(project)}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}

function ProjectRow({
  project,
  deleting,
  onDelete,
  onToggle,
}: {
  project: Project;
  deleting: boolean;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white"
      style={{ border: "1.5px solid rgba(9,46,103,0.1)" }}
    >
      {/* Poignée de glisser */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="font-body text-lg leading-none select-none cursor-grab active:cursor-grabbing px-1 touch-none"
        style={{ color: "var(--color-blue)", opacity: 0.4 }}
        aria-label="Glisser pour réordonner"
        role="button"
        tabIndex={-1}
      >
        ⋮⋮
      </div>

      {/* Color swatch */}
      <div className="w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: project.bg_color }} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-heading text-base truncate" style={{ color: "var(--color-blue)" }}>
          {project.title}
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: "var(--color-blue)", opacity: 0.5 }}>
          {LAYOUT_LABELS[project.layout]} · position {project.display_order + 1}
        </p>
      </div>

      {/* Published toggle */}
      <button
        type="button"
        onClick={onToggle}
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
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="font-body text-xs px-3 py-1.5 rounded-full disabled:opacity-40 transition-opacity"
          style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}
        >
          {deleting ? "…" : "Supprimer"}
        </button>
      </div>
    </Reorder.Item>
  );
}
