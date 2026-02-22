"use client";

import { useRouter } from "next/navigation";

export default function LogoutClient() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="font-body text-sm px-4 py-2 rounded-full opacity-50 hover:opacity-100 transition-opacity"
      style={{ border: "1.5px solid var(--color-blue)", color: "var(--color-blue)" }}
    >
      Déconnexion
    </button>
  );
}
