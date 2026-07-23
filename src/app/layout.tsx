import type { Metadata } from "next";
import { Rajdhani, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyp-fpv.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VYP FPV — Accessoires FPV premium",
    template: "%s | VYP FPV",
  },
  description:
    "VYP FPV est la boutique specialisee dans les accessoires pour drones FPV : sangles LiPo, protections, antennes, outils et organisation. Livraison rapide en France.",
  keywords: [
    "FPV",
    "drone",
    "accessoires FPV",
    "sangle LiPo",
    "antenne FPV",
    "goggles FPV",
    "racing drone",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "VYP FPV",
    title: "VYP FPV — Accessoires FPV premium",
    description:
      "Sangles LiPo, protections, antennes, outils et organisation pour pilotes FPV.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "VYP FPV — Accessoires FPV premium",
    description:
      "Sangles LiPo, protections, antennes, outils et organisation pour pilotes FPV.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`dark ${rajdhani.variable} ${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
