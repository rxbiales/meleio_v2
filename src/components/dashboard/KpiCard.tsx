"use client";

import { memo, type ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Info } from "lucide-react";
import Tooltip from "./Tooltip";

interface KpiCardProps {
  title: string;
  titleHint?: string;
  value: string;
  description: string;
  href: string;
  icon: LucideIcon;
  visual: ReactNode;
}

function KpiCardComponent({
  title,
  titleHint,
  value,
  description,
  href,
  icon: Icon,
  visual,
}: KpiCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-purple-100 bg-white p-6 shadow transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {titleHint ? (
            <Tooltip text={titleHint}>
              <Info className="h-4 w-4 text-gray-400" />
            </Tooltip>
          ) : null}
        </div>
        <Icon className="h-6 w-6 text-purple-600" />
      </div>

      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <p className="mt-1 text-xs text-gray-600">{description}</p>

      <div className="mt-4">{visual}</div>
    </Link>
  );
}

const KpiCard = memo(KpiCardComponent);

export default KpiCard;
