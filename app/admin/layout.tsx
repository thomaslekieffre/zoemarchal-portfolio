import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Portfolio Zoé Marchal",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#f5f0eb", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
