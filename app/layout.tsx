import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Clarity from "@/components/Clarity";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COREDOC - LLM-Optimized Document API Protocol",
  description: "A protocol for converting buckets of documents of linear text into an infinitely scalable LLM optimized API",
  keywords: ["document processing", "AI", "LLM", "knowledge graph", "open source", "RAG", "API", "protocol"],
  authors: [{ name: "Coredoc Community" }],
  openGraph: {
    title: "COREDOC - LLM-Optimized Document API Protocol",
    description: "A protocol for converting buckets of documents of linear text into an infinitely scalable LLM optimized API",
    type: "website",
    url: "https://coredoc.live",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "COREDOC - LLM-Optimized Document API Protocol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "COREDOC - LLM-Optimized Document API Protocol",
    description: "A protocol for converting buckets of documents of linear text into an infinitely scalable LLM optimized API",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Clarity />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
