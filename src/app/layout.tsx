import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import AppShell from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "MELEIO",
  description: "Sistema de gestion socioemocional para estudiantes",
  icons: {
    icon: [
      { url: "/melo_favicon.ico", type: "image/x-icon" },
      { url: "/melo_favicon.ico", sizes: "32x32" },
      { url: "/melo_favicon.ico", sizes: "48x48" },
      { url: "/melo_favicon.ico", sizes: "64x64" },
    ],
    shortcut: ["/melo_favicon.ico"],
    apple: [{ url: "/melo_favicon.ico", sizes: "180x180" }],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): ReactElement {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
