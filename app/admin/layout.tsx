import type { Metadata } from "next";
import { DEFAULT_THEME, themeCssVars } from "@/lib/site-content/theme";

export const metadata: Metadata = {
  title: "Admin — Portfolio Zoé Marchal",
  robots: { index: false, follow: false },
};

// Les couleurs du site ne s'appliquent pas à l'admin : on remet les défauts
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#f5f0eb", minHeight: "100vh", ...themeCssVars(DEFAULT_THEME) }}>
      {children}
    </div>
  );
}
