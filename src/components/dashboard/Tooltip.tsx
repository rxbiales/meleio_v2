"use client";

import type { ReactNode } from "react";

interface TooltipProps {
  text: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: ReactNode;
}

export default function Tooltip({
  text,
  side = "top",
  className = "",
  children,
}: TooltipProps) {
  const positionClass =
    side === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : side === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-2"
      : side === "left"
      ? "right-full top-1/2 -translate-y-1/2 mr-2"
      : "left-full top-1/2 -translate-y-1/2 ml-2";

  return (
    <div
      className={`group relative ${className}`}
      tabIndex={0}
    >
      {children}
      <div
        role="tooltip"
        className={`pointer-events-none absolute ${positionClass} z-[60] max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md opacity-0 invisible transition-opacity duration-150 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible`}
      >
        {text}
      </div>
    </div>
  );
}
