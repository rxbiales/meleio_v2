"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  actionsSlot?: ReactNode;
  footerSlot?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Section({
  title,
  description,
  actionsSlot,
  footerSlot,
  className,
  children,
}: SectionProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm lg:p-8",
        className
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-gray-600 lg:text-base">{description}</p>
          ) : null}
        </div>
        {actionsSlot ? (
          <div className="flex flex-shrink-0 gap-2">{actionsSlot}</div>
        ) : null}
      </header>
      <div className="mt-6">{children}</div>
      {footerSlot ? (
        <div className="mt-6 border-t border-purple-100 pt-4">{footerSlot}</div>
      ) : null}
    </section>
  );
}
