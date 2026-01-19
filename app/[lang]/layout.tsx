import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getDictionary } from "@/lib/get-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export const metadata: Metadata = {
  title: "ORANOS TRANS | Expertise Logistique & Transport",
  description: "Solutions de transport routier, maritime, aérien et local. Fiabilité, Performance, Expertise.",
  openGraph: {
    title: "ORANOS TRANS | Expertise Logistique & Transport",
    description: "Solutions de transport routier, maritime, aérien et local. Fiabilité, Performance, Expertise.",
    type: "website",
    locale: "fr_FR",
    siteName: "ORANOS TRANS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ORANOS TRANS Global Logistics",
      },
    ],
  }
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: 'en' | 'fr' };
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/20 selection:text-primary`}
      >
        <Header lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
