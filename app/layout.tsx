import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import LanguageToggle from "@/components/LanguageToggle";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import {
  Borel,
  Sen,
  Jost,
  Barlow_Condensed,
  DM_Sans,
  Righteous,
  Nunito,
} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const sen = Sen({
  subsets: ["latin"],
  variable: "--font-sen",
  display: "swap",
});

const borel = Borel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-borel",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marchal Zoé — Portfolio",
  description:
    "Portfolio de Zoé Marchal, graphic designer. Identité visuelle, UI, affiche, édition.",
  openGraph: {
    title: "Marchal Zoé — Portfolio",
    description: "Portfolio de Zoé Marchal, graphic designer.",
    images: [
      {
        url: "/images/avatar.png",
        width: 400,
        height: 400,
        alt: "Zoé Marchal",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Marchal Zoé — Portfolio",
    description: "Portfolio de Zoé Marchal, graphic designer.",
    images: ["/images/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${righteous.variable} ${nunito.variable} ${sen.variable} ${borel.variable} ${jost.variable} ${barlowCondensed.variable}`}
      >
        <LanguageProvider>
          {children}
          <BackToTop />
          <LanguageToggle />
        </LanguageProvider>
      </body>
    </html>
  );
}
