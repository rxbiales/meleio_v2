"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

export default function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <header
      data-component="site-header"
      className="sticky top-0 z-40 w-full border-b border-purple-100 bg-white/80 backdrop-blur-md"
    >
      <div
        data-element="header-inner"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6"
      >
        <Link
          href="/"
          data-role="brand"
          className="text-2xl font-bold tracking-tight text-purple-600"
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
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            data-role="nav-link"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            About
          </Link>
          <Link
            href="/help"
            aria-current={pathname === "/help" ? "page" : undefined}
            data-role="nav-link"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/help"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            Help
          </Link>
        </nav>
        <div
          className="hidden md:flex items-center gap-3"
          data-element="header-meta"
        >
          <span
            data-role="tagline"
            className="text-xs font-semibold uppercase tracking-wider text-purple-500"
          >
            plataforma sel
          </span>
        </div>
      </div>
    </header>
  );
}
