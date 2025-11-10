"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  key: string;
  label: string;
};

interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (key: string) => void;
  className?: string;
}

export function Tabs({ items, value, onValueChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Secoes"
      className={cn(
        "inline-flex flex-wrap gap-2 rounded-full border border-purple-100 bg-white/80 p-1 text-sm font-medium text-purple-700",
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.key === value;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full px-4 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
              isActive
                ? "bg-purple-600 text-white shadow"
                : "text-purple-700 hover:bg-purple-50"
            )}
            onClick={() => onValueChange(item.key)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
