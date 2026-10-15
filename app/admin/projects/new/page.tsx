import Link from "next/link";
import { getSiteContent } from "@/lib/site-content/get-site-content";
import ProjectForm from "../ProjectForm";

export default async function NewProject() {
  const { palette } = await getSiteContent();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-blue)" }}>
          ← Admin
        </Link>
        <h1 className="font-heading text-2xl" style={{ color: "var(--color-blue)" }}>
          Nouveau projet
        </h1>
      </div>
      <ProjectForm basePalette={palette} />
    </div>
  );
}
