"use client";

import type { TimeRange } from "@/components/student/types";
import { cn } from "@/lib/utils";

interface TimeRangePickerProps {
  value: TimeRange;
  options: TimeRange[];
  onChange: (range: TimeRange) => void;
  className?: string;
}

export function TimeRangePicker({
  value,
  options,
  onChange,
  className,
}: TimeRangePickerProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-full border border-purple-100 bg-white p-1 text-sm font-semibold text-purple-700 shadow-sm",
        className
      )}
      role="radiogroup"
      aria-label="Intervalo"
    >
      {options.map((range) => {
        const isActive = range.from === value.from && range.to === value.to;
        const label = formatRange(range);
        return (
          <button
            key={`${range.from}-${range.to}`}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={cn(
              "rounded-full px-3 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
              isActive ? "bg-purple-600 text-white shadow" : "text-purple-700"
            )}
            onClick={() => onChange(range)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function formatRange(range: TimeRange) {
  const from = new Date(range.from);
  const to = new Date(range.to);
  const diff = Math.abs(to.getTime() - from.getTime());
  const weeks = Math.round(diff / (1000 * 60 * 60 * 24 * 7));
  if (weeks >= 24) return "6m";
  if (weeks >= 12) return "12s";
  if (weeks >= 8) return "8s";
  return "4s";
}
