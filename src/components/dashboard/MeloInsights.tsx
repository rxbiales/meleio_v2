"use client";

import { memo, Fragment, type ReactElement } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import Tooltip from "./Tooltip";
import type { DashboardData } from "./types";

interface MeloInsightsProps {
  melo: DashboardData["melo"];
}

function renderHighlights(text: string, bulletIndex: number): ReactElement[] {
  const parts = text.split("**");
  if (parts.length === 1) {
    return [<Fragment key={`bullet-${bulletIndex}`}>{text}</Fragment>];
  }

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={`highlight-${bulletIndex}-${index}`}>{part}</strong>
    ) : (
      <Fragment key={`highlight-${bulletIndex}-${index}`}>{part}</Fragment>
    )
  );
}

function MeloInsightsComponent({ melo }: MeloInsightsProps): ReactElement {
  return (
    <article className="w-full rounded-2xl border border-purple-100 bg-white p-5 shadow lg:p-6 xl:p-7">
      <header className="mb-3 flex items-center gap-3 lg:mb-4 lg:gap-4">
        <img
          src="/meloIcon.png"
          alt="Melo"
          className="h-15 w-10 rounded-full ring-2 ring-purple-100 lg:w-12"
        />
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Melo (IA)
          </h2>
          <Tooltip text="Assistente que recomenda acoes alinhadas aos sinais do Pulso.">
            <Info className="h-4 w-4 text-gray-400" />
          </Tooltip>
        </div>
      </header>

      <div className="space-y-3 text-sm leading-relaxed text-gray-800 lg:space-y-4 lg:text-base">
        <ul className="list-disc pl-5 lg:pl-6">
          {melo.bullets.map((bullet, index) => (
            <li key={`melo-bullet-${index}`}>
              {renderHighlights(bullet, index)}
            </li>
          ))}
        </ul>

        <div className="rounded-xl bg-purple-50/60 p-3 text-[13px] lg:p-4 lg:text-sm">
          <p className="font-semibold text-purple-900">
            Acoes recomendadas
          </p>
          <div className="mt-3 flex flex-wrap gap-2 lg:gap-3">
            {melo.acoes.map((acao, index) => {
              const isPrimary = index === 0;
              const className = isPrimary
                ? "rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 lg:px-4 lg:py-2 lg:text-sm"
                : "rounded-lg border border-purple-200 px-3 py-1.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 lg:px-4 lg:py-2 lg:text-sm";

              return (
                <Link key={`melo-action-${index}`} href={acao.href} className={className}>
                  {acao.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}

const MeloInsights = memo(MeloInsightsComponent);

export default MeloInsights;
