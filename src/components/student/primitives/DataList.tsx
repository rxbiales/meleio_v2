"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  renderEmpty?: () => ReactNode;
  isLoading?: boolean;
  className?: string;
}

export function DataList<T>({
  items,
  renderItem,
  renderEmpty,
  isLoading = false,
  className,
}: DataListProps<T>) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-purple-50 bg-white/80 p-6 shadow-sm",
          className
        )}
      >
        <div className="space-y-3">
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-purple-100" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-purple-100" />
          <div className="h-4 w-1/3 animate-pulse rounded-full bg-purple-100" />
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-purple-100 bg-white/80 p-6 text-center text-sm text-gray-600",
          className
        )}
      >
        {renderEmpty ? renderEmpty() : "Nenhum item no período."}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "divide-y divide-purple-50 rounded-2xl border border-purple-100 bg-white/90 shadow-sm",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="p-4 lg:p-5">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
