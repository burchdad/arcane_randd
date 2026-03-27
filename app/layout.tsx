import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://arcane-rd.com"),
  title: "Arcane R&D — Engineering the Future",
  description: "Advanced AI systems, precision automation, and next-generation platforms engineered for the future. Discover cutting-edge research and development at Arcane.",
  keywords: ["AI research", "advanced systems", "R&D", "automation", "future technology"],
  authors: [{ name: "Arcane R&D" }],
  creator: "Arcane R&D",
  publisher: "Arcane R&D",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arcane-rd.com",
    title: "Arcane R&D — Engineering the Future",
    description: "Advanced AI systems, precision automation, and next-generation platforms engineered for the future. Discover cutting-edge research and development at Arcane.",
    siteName: "Arcane R&D",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arcane R&D — Engineering the Future",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcane R&D — Engineering the Future",
    description: "Advanced AI systems, precision automation, and next-generation platforms engineered for the future.",
    creator: "@arcane_rd",
    images: ["/og-image.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-base font-sans text-white antialiased`}>
        <div className="relative min-h-screen overflow-x-clip bg-mesh-dark">
          <div className="pointer-events-none absolute inset-0 bg-gold-radial opacity-80" />
          <div className="pointer-events-none absolute inset-x-0 top-[-12rem] h-[28rem] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.14),transparent_56%)] blur-3xl" />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}