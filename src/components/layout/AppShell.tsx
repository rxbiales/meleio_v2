"use client";

import type { CSSProperties, ReactElement, ReactNode } from "react";
import Header from "@/components/layout/Header";
import MeloBot from "@/components/widgets/MeloBot";

interface AppShellProps {
  children: ReactNode;
  wide?: boolean;
}

export default function AppShell({
  children,
  wide = false,
}: AppShellProps): ReactElement {
  const containerWidthClass = wide ? "max-w-[1600px]" : "max-w-7xl";
  const contentStyle: CSSProperties = {
    marginLeft: "var(--sb-w, 4rem)",
  };

  return (
    <div
      data-component="app-shell"
      className="relative min-h-screen bg-gray-50 text-gray-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-6rem] h-[18rem] bg-gradient-to-b from-purple-200/60 via-purple-100/40 to-transparent blur-3xl" />
      <Header />

      <main
        data-element="content-wrapper"
        className="relative z-10 w-full px-4 py-8 md:px-6 md:py-10"
        style={contentStyle}
      >
        <div className={`w-full ${containerWidthClass}`}>{children}</div>
      </main>

      <MeloBot />
    </div>
  );
}
