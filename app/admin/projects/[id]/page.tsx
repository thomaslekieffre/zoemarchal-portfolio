import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";
import ProjectForm from "../ProjectForm";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!data) notFound();

  const project = data as Project;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-blue)" }}>
          ← Admin
        </Link>
        <h1 className="font-heading text-2xl" style={{ color: "var(--color-blue)" }}>
          Modifier — {project.title}
        </h1>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
