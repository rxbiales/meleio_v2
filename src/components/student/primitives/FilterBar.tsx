"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  children?: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
}

export function FilterBar({ children, leftSlot, rightSlot, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-50 bg-purple-50/60 px-4 py-3 text-sm text-purple-900",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {leftSlot}
        {children}
      </div>
      {rightSlot ? <div className="flex flex-wrap items-center gap-2">{rightSlot}</div> : null}
    </div>
  );
}
