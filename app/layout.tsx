import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Coredoc - Transform Documents into Knowledge Graphs",
  description: "An open-source protocol that revolutionizes how humans and AI navigate information through context-first document architecture",
  keywords: ["document processing", "AI", "LLM", "knowledge graph", "open source", "RAG", "context-first"],
  authors: [{ name: "Coredoc Community" }],
  openGraph: {
    title: "Coredoc - Transform Documents into Knowledge Graphs",
    description: "An open-source protocol that revolutionizes how humans and AI navigate information",
    type: "website",
    url: "https://coredoc.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Coredoc - Context-First Document Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coredoc - Transform Documents into Knowledge Graphs",
    description: "An open-source protocol that revolutionizes how humans and AI navigate information",
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
        {children}
      </body>
    </html>
  );
}
