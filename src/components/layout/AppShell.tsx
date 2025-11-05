"use client";

import type { CSSProperties, ReactElement, ReactNode } from "react";
import Header from "@/components/layout/Header";
import MeloBot from "@/components/widgets/MeloBot";

interface AppShellProps {
  children: ReactNode;
  wide?: boolean;
}

type ContentVars = CSSProperties & { "--content-max-w": string };

export default function AppShell({
  children,
  wide = false,
}: AppShellProps): ReactElement {
  const maxWidthExpression = wide
    ? "min(2000px, calc(100vw - max(var(--sb-w, 4rem), 4rem) - clamp(3rem, 6vw, 8rem)))"
    : "min(1800px, calc(100vw - max(var(--sb-w, 4rem), 4rem) - clamp(2.5rem, 5vw, 7rem)))";

  const mainStyle = {
    marginLeft: "var(--sb-w, 4rem)",
    "--content-max-w": maxWidthExpression,
  } as ContentVars;

  const innerStyle: CSSProperties = {
    maxWidth: "var(--content-max-w)",
  };

  return (
    <div
      data-component="app-shell"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gray-50 text-gray-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-6rem] h-[18rem] bg-gradient-to-b from-purple-200/60 via-purple-100/40 to-transparent blur-3xl" />
      <Header />

      <main
        data-element="content-wrapper"
        className="relative z-10 flex-auto px-4 py-8 md:px-8 md:py-10 xl:px-12 xl:py-12"
        style={mainStyle}
      >
        <div className="mx-auto w-full" style={innerStyle}>
          {children}
        </div>
      </main>

      <MeloBot />
    </div>
  );
}
