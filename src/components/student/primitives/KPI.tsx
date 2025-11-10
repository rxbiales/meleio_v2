"use client";

import { cn } from "@/lib/utils";

interface KPIProps {
  label: string;
  value: string | number;
  delta?: string;
  hint?: string;
  className?: string;
}

export function KPI({ label, value, delta, hint, className }: KPIProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-purple-100 bg-white/80 p-4 shadow-sm",
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
        {label}
      </p>
      <div className="mt-1 text-3xl font-bold text-gray-900">{value}</div>
      {hint ? <p className="text-sm text-gray-600">{hint}</p> : null}
      {delta ? (
        <p className="text-xs font-semibold text-purple-700">{delta}</p>
      ) : null}
    </div>
  );
}
