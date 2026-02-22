import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";
import AdminProjectList from "./AdminProjectList";
import LogoutClient from "./LogoutClient";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  const projects = (data ?? []) as Project[];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl" style={{ color: "var(--color-blue)" }}>
            Mes projets
          </h1>
          <p className="font-body text-sm mt-1" style={{ color: "var(--color-blue)", opacity: 0.6 }}>
            {projects.length} projet{projects.length > 1 ? "s" : ""} · visibles sur le portfolio
          </p>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <Link
            href="/"
            className="font-body text-sm px-4 py-2 rounded-full"
            style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}
          >
            ← Voir le portfolio
          </Link>
          <Link
            href="/admin/projects/new"
            className="font-body text-sm px-4 py-2 rounded-full font-medium"
            style={{ backgroundColor: "var(--color-blue)", color: "var(--color-peach)" }}
          >
            + Ajouter un projet
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Explications */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            icon: "👁",
            title: "Publié / Caché",
            text: "Un projet caché n'apparaît pas sur le portfolio mais reste sauvegardé. Tu peux le basculer en un clic.",
          },
          {
            icon: "✏️",
            title: "Modifier",
            text: "Change le titre, la description, les couleurs, les polices ou les images d'un projet existant.",
          },
          {
            icon: "🗑",
            title: "Supprimer",
            text: "Supprime définitivement un projet. Cette action est irréversible.",
          },
        ].map((tip) => (
          <div
            key={tip.title}
            className="flex flex-col gap-1.5 p-4 rounded-2xl"
            style={{ backgroundColor: "white", border: "1.5px solid rgba(9,46,103,0.08)" }}
          >
            <span className="text-xl">{tip.icon}</span>
            <p className="font-body text-sm font-semibold" style={{ color: "var(--color-blue)" }}>{tip.title}</p>
            <p className="font-body text-xs leading-relaxed" style={{ color: "var(--color-blue)", opacity: 0.6 }}>{tip.text}</p>
          </div>
        ))}
      </div>

      {/* Liste */}
      <AdminProjectList projects={projects} />
    </div>
  );
}

function LogoutButton() {
  return <LogoutClient />;
}
