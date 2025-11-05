"use client";

import { memo, type ReactElement } from "react";
import Link from "next/link";
import { HelpCircle, Info } from "lucide-react";
import Tooltip from "./Tooltip";
import type { DashboardData } from "./types";

interface FamiliesSummaryCardProps {
  familias: DashboardData["familias"];
}

const badgeStyles = {
  novas:
    "inline-flex items-center rounded-full border border-purple-600/30 bg-purple-600/10 px-2.5 py-0.5 text-xs font-semibold text-purple-700",
  confirmadas:
    "inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600",
  pendentes:
    "inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-700",
  urgentes:
    "inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-600",
} as const;

function formatMetric(value: number | undefined): string {
  return value?.toLocaleString("pt-BR") ?? "0";
}

function FamiliesSummaryCardComponent({
  familias,
}: FamiliesSummaryCardProps): ReactElement {
  return (
    <article
      data-block="family-notifications"
      className="rounded-2xl border border-purple-100 bg-white p-6 shadow"
    >
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Familias</h2>
          <Tooltip text="Resumo das mensagens trocadas nas ultimas 24 horas.">
            <Info className="h-4 w-4 text-gray-400" />
          </Tooltip>
        </div>
        <span className="text-sm text-gray-600">Ultimas 24h</span>
      </header>

      <ul className="space-y-3">
        <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
          <span className="text-sm font-semibold text-gray-900">
            Mensagens novas
          </span>
          <span className={badgeStyles.novas}>
            {formatMetric(familias.novas)}
          </span>
        </li>

        <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
          <span className="text-sm font-semibold text-gray-900">
            Confirmadas
          </span>
          <span className={badgeStyles.confirmadas}>
            {formatMetric(familias.confirmadas)}
          </span>
        </li>

        <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
          <span className="text-sm font-semibold text-gray-900">Pendentes</span>
          <span className={badgeStyles.pendentes}>
            {formatMetric(familias.pendentes)}
          </span>
        </li>

        <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
          <span className="text-sm font-semibold text-gray-900">Urgentes</span>
          <span className={badgeStyles.urgentes}>
            {formatMetric(familias.urgentes)}
          </span>
        </li>
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href="/home/dashboard/familias"
          className="text-sm font-medium text-purple-700 transition hover:text-purple-800"
        >
          Ver todas as mensagens ->
        </Link>

        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 transition hover:text-gray-700"
        >
          <HelpCircle className="h-4 w-4" />
          Central de ajuda
        </Link>
      </div>
    </article>
  );
}

const FamiliesSummaryCard = memo(FamiliesSummaryCardComponent);

export default FamiliesSummaryCard;
