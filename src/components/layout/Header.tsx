"use client";

import type { CSSProperties, ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const innerStyle = {
  marginLeft: "var(--sb-w, 4rem)",
  maxWidth: "var(--content-max-w)",
  width: "calc(100vw - var(--sb-w, 4rem))",
} as CSSProperties;

export default function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <header
      data-component="site-header"
      className="sticky top-0 z-40 w-full border-b border-purple-100 bg-white/85 backdrop-blur-md"
      style={{ "--header-height": "4rem" } as CSSProperties}
    >
      <div
        data-element="header-inner"
        className="flex h-[var(--header-height,4rem)] w-full items-center justify-between px-4 md:px-6 lg:px-8"
        style={innerStyle}
      >
        <Link
          href="/"
          data-role="brand"
          className="text-2xl font-bold tracking-tight text-purple-600 lg:text-3xl"
        >
          MELEIO
        </Link>
        <nav
          data-element="nav-links"
          className="flex items-center gap-1 md:gap-2"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            data-role="nav-link"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/sobre"
            aria-current={pathname === "/sobre" ? "page" : undefined}
            data-role="nav-link"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/sobre"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            Sobre
          </Link>
          <Link
            href="/ajuda"
            aria-current={pathname === "/ajuda" ? "page" : undefined}
            data-role="nav-link"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/ajuda"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            Ajuda
          </Link>
        </nav>
        <div
          className="hidden items-center gap-3 md:flex"
          data-element="header-meta"
        >
          <span
            data-role="tagline"
            className="text-xs font-semibold uppercase tracking-wider text-purple-500 lg:text-sm"
          >
            plataforma sel
          </span>
        </div>
      </div>
    </header>
  );
}
