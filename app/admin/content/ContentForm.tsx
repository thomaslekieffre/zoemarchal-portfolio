"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ContactType,
  LocaleContent,
  SiteContact,
  SiteContent,
  SiteEducation,
  SiteExperience,
} from "@/lib/site-content/types";

const CONTACT_TYPES: { value: ContactType; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "discord", label: "Discord" },
  { value: "x", label: "X / Twitter" },
  { value: "phone", label: "Téléphone" },
  { value: "email", label: "Email" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs font-semibold" style={{ color: "var(--color-blue)" }}>{label}</span>
      {children}
    </label>
  );
}

function LocaleForm({
  locale,
  data,
  onChange,
}: {
  locale: "fr" | "en";
  data: LocaleContent;
  onChange: (data: LocaleContent) => void;
}) {
  const set = <K extends keyof LocaleContent>(key: K, value: LocaleContent[K]) =>
    onChange({ ...data, [key]: value });

  const updateExperience = (i: number, patch: Partial<SiteExperience>) => {
    const experiences = data.experiences.map((e, idx) => (idx === i ? { ...e, ...patch } : e));
    set("experiences", experiences);
  };

  const updateEducation = (i: number, patch: Partial<SiteEducation>) => {
    const education = data.education.map((e, idx) => (idx === i ? { ...e, ...patch } : e));
    set("education", education);
  };

  const updateContact = (i: number, patch: Partial<SiteContact>) => {
    const contacts = data.contacts.map((c, idx) => (idx === i ? { ...c, ...patch } : c));
    set("contacts", contacts);
  };

  const updateInterest = (i: number, value: string) => {
    const interests = data.interests.map((item, idx) => (idx === i ? value : item));
    set("interests", interests);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4 p-5 rounded-2xl bg-white" style={{ border: "1.5px solid rgba(9,46,103,0.08)" }}>
        <h2 className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>
          Intro {locale === "fr" ? "(français)" : "(anglais)"}
        </h2>
        <Field label="Titre (Salut ! / Hey there!)">
          <input className="admin-input" value={data.greeting} onChange={(e) => set("greeting", e.target.value)} />
        </Field>
        <Field label="Paragraphe 1">
          <textarea className="admin-input" rows={4} value={data.bio1} onChange={(e) => set("bio1", e.target.value)} />
        </Field>
        <Field label="Paragraphe 2">
          <textarea className="admin-input" rows={3} value={data.bio2} onChange={(e) => set("bio2", e.target.value)} />
        </Field>
        <Field label="Paragraphe 3">
          <textarea className="admin-input" rows={3} value={data.bio3} onChange={(e) => set("bio3", e.target.value)} />
        </Field>
      </section>

      <section className="flex flex-col gap-4 p-5 rounded-2xl bg-white" style={{ border: "1.5px solid rgba(9,46,103,0.08)" }}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>Expériences pro</h2>
          <button
            type="button"
            className="admin-btn-secondary text-xs"
            onClick={() => set("experiences", [...data.experiences, { label: "", description: "" }])}
          >
            + Ajouter
          </button>
        </div>
        {data.experiences.map((exp, i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-xl" style={{ backgroundColor: "#f5f0eb" }}>
            <Field label="Intitulé (ex : Février 2026 – Affinity)">
              <input className="admin-input" value={exp.label} onChange={(e) => updateExperience(i, { label: e.target.value })} />
            </Field>
            <Field label="Description (• pour les puces, Entrée pour sauter une ligne)">
              <textarea className="admin-input" rows={4} value={exp.description} onChange={(e) => updateExperience(i, { description: e.target.value })} />
            </Field>
            {data.experiences.length > 1 && (
              <button type="button" className="admin-btn-secondary text-xs w-fit" onClick={() => set("experiences", data.experiences.filter((_, idx) => idx !== i))}>
                Supprimer
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 p-5 rounded-2xl bg-white" style={{ border: "1.5px solid rgba(9,46,103,0.08)" }}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>Scolarité</h2>
          <button
            type="button"
            className="admin-btn-secondary text-xs"
            onClick={() => set("education", [...data.education, { degree: "", subjects: "" }])}
          >
            + Ajouter
          </button>
        </div>
        {data.education.map((edu, i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-xl" style={{ backgroundColor: "#f5f0eb" }}>
            <Field label="Diplôme / formation">
              <input className="admin-input" value={edu.degree} onChange={(e) => updateEducation(i, { degree: e.target.value })} />
            </Field>
            <Field label="Détail (matières, spécialité…)">
              <input className="admin-input" value={edu.subjects} onChange={(e) => updateEducation(i, { subjects: e.target.value })} />
            </Field>
            {data.education.length > 1 && (
              <button type="button" className="admin-btn-secondary text-xs w-fit" onClick={() => set("education", data.education.filter((_, idx) => idx !== i))}>
                Supprimer
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 p-5 rounded-2xl bg-white" style={{ border: "1.5px solid rgba(9,46,103,0.08)" }}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>Centres d&apos;intérêt</h2>
          <button type="button" className="admin-btn-secondary text-xs" onClick={() => set("interests", [...data.interests, ""])}>
            + Ajouter
          </button>
        </div>
        {data.interests.map((interest, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input className="admin-input flex-1" value={interest} onChange={(e) => updateInterest(i, e.target.value)} placeholder="Dessin, Musique…" />
            {data.interests.length > 1 && (
              <button type="button" className="admin-btn-secondary text-xs shrink-0" onClick={() => set("interests", data.interests.filter((_, idx) => idx !== i))}>
                ✕
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 p-5 rounded-2xl bg-white" style={{ border: "1.5px solid rgba(9,46,103,0.08)" }}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg" style={{ color: "var(--color-blue)" }}>Contacts</h2>
          <button
            type="button"
            className="admin-btn-secondary text-xs"
            onClick={() => set("contacts", [...data.contacts, { type: "instagram", label: "", href: "" }])}
          >
            + Ajouter
          </button>
        </div>
        <p className="font-body text-xs opacity-60" style={{ color: "var(--color-blue)" }}>
          Affichés dans la section Contact (About) et le footer. Instagram, Discord et X apparaissent dans About.
        </p>
        {data.contacts.map((contact, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl" style={{ backgroundColor: "#f5f0eb" }}>
            <Field label="Type">
              <select className="admin-input" value={contact.type} onChange={(e) => updateContact(i, { type: e.target.value as ContactType })}>
                {CONTACT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Label affiché">
              <input className="admin-input" value={contact.label} onChange={(e) => updateContact(i, { label: e.target.value })} />
            </Field>
            <Field label="Lien (URL, tel:, mailto:)">
              <input className="admin-input" value={contact.href} onChange={(e) => updateContact(i, { href: e.target.value })} />
            </Field>
            {data.contacts.length > 1 && (
              <button type="button" className="admin-btn-secondary text-xs w-fit sm:col-span-3" onClick={() => set("contacts", data.contacts.filter((_, idx) => idx !== i))}>
                Supprimer
              </button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default function ContentForm({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [form, setForm] = useState<SiteContent>(initial);
  const [tab, setTab] = useState<"fr" | "en">("fr");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/admin/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Erreur lors de la sauvegarde");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(["fr", "en"] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setTab(lang)}
            className="font-body text-sm px-4 py-2 rounded-full transition-opacity"
            style={{
              backgroundColor: tab === lang ? "var(--color-blue)" : "white",
              color: tab === lang ? "var(--color-peach)" : "var(--color-blue)",
              border: tab === lang ? "none" : "1.5px solid rgba(9,46,103,0.15)",
            }}
          >
            {lang === "fr" ? "Français" : "English"}
          </button>
        ))}
      </div>

      <LocaleForm
        locale={tab}
        data={form[tab]}
        onChange={(data) => setForm((prev) => ({ ...prev, [tab]: data }))}
      />

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 flex-wrap">
        <button type="submit" disabled={saving} className="admin-btn-primary disabled:opacity-50">
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
        <a href="/admin" className="admin-btn-secondary">Annuler</a>
      </div>
    </form>
  );
}
