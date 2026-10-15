import Link from "next/link";
import { getSiteContent } from "@/lib/site-content/get-site-content";
import PaletteForm from "./PaletteForm";

export default async function AdminPalettePage() {
  const content = await getSiteContent();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div>
        <Link href="/admin" className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-blue)" }}>
          ← Retour aux projets
        </Link>
        <h1 className="font-heading text-3xl mt-3" style={{ color: "var(--color-blue)" }}>
          Palette de base
        </h1>
        <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: "var(--color-blue)", opacity: 0.7 }}>
          Tes couleurs réutilisables. Crée-les une fois ici, puis dans un projet un simple clic les ajoute à sa palette.
          Pas besoin de retaper les codes hex à chaque projet.
        </p>
      </div>

      <PaletteForm content={content} />
    </div>
  );
}
