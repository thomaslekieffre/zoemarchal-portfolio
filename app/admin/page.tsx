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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl" style={{ color: "var(--color-blue)" }}>
            Admin
          </h1>
          <p className="font-body text-sm mt-1" style={{ color: "var(--color-blue)", opacity: 0.6 }}>
            {projects.length} projet{projects.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/"
            className="font-body text-sm px-4 py-2 rounded-full"
            style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}
          >
            ← Portfolio
          </Link>
          <Link
            href="/admin/projects/new"
            className="font-body text-sm px-4 py-2 rounded-full font-medium"
            style={{ backgroundColor: "var(--color-blue)", color: "var(--color-peach)" }}
          >
            + Nouveau projet
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Liste */}
      <AdminProjectList projects={projects} />
    </div>
  );
}

function LogoutButton() {
  return <LogoutClient />;
}
