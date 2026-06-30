import Link from "next/link";
import { getSiteContent } from "@/lib/site-content/get-site-content";
import ContentForm from "./ContentForm";

export default async function AdminContentPage() {
  const content = await getSiteContent();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div>
        <Link href="/admin" className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-blue)" }}>
          ← Retour
        </Link>
        <h1 className="font-heading text-3xl mt-3" style={{ color: "var(--color-blue)" }}>
          Contenu du site
        </h1>
        <p className="font-body text-sm mt-1" style={{ color: "var(--color-blue)", opacity: 0.6 }}>
          Intro, expériences, scolarité, intérêts et contacts — FR & EN
        </p>
      </div>

      <ContentForm initial={content} />
    </div>
  );
}
