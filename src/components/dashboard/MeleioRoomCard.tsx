"use client";

import { memo, type ReactElement } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import Tooltip from "./Tooltip";
import { MELEIO_GRADIENT } from "@/lib/constants";
import type { DashboardData } from "./types";

interface MeleioRoomCardProps {
  agenda: DashboardData["agenda"];
  occupancyPercent: number;
}

function MeleioRoomCardComponent({
  agenda,
  occupancyPercent,
}: MeleioRoomCardProps): ReactElement {
  return (
    <article
      data-block="meleio-room"
      className="rounded-2xl border border-purple-100 bg-white p-6 shadow lg:p-7 xl:p-8"
    >
      <header className="mb-4 flex items-center justify-between lg:mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Lugar MELEIO
          </h2>
          <Tooltip text="Sala imersiva dedicada a sessoes SEL com agendamento controlado.">
            <Info className="h-4 w-4 text-gray-400" />
          </Tooltip>
        </div>
        <span className="text-sm font-medium text-purple-700 lg:text-base">
          Ocupação:{" "}
          <span className="font-bold text-purple-800">{occupancyPercent}%</span>
        </span>
      </header>

      <div className="mb-5 lg:mb-6">
        <div className="h-2.5 w-full rounded-full bg-purple-100 lg:h-3">
          <div
            className="h-2.5 rounded-full lg:h-3"
            style={{
              width: `${occupancyPercent}%`,
              background: MELEIO_GRADIENT,
            }}
            aria-label={`Taxa de ocupacao ${occupancyPercent}%`}
          />
        </div>
        <p className="mt-2 text-xs text-gray-600 lg:text-sm">
          Capacidade semanal utilizada, comparando sessoes reservadas e vagas
          disponiveis.
        </p>
      </div>

      <ul className="space-y-3 lg:space-y-4">
        {agenda.map((item) => (
          <li
            key={`${item.turma}-${item.whenLabel}`}
            className="flex items-center justify-between rounded-xl border border-purple-100 p-3 transition hover:bg-purple-50 lg:p-4"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900 lg:text-base">
                {item.whenLabel}
              </p>
              <p className="text-xs text-gray-600 lg:text-sm">
                {item.turma} - {item.title}
              </p>
            </div>
            <Link
              href={item.href}
              className="rounded text-xs font-medium text-purple-700 transition hover:text-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 lg:text-sm"
              aria-label={`Ver detalhes da sessao ${item.turma} ${item.title}, ${item.whenLabel}`}
            >
              Detalhes
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-right lg:mt-6">
        <Link
          href="/home/dashboard/atividades"
          className="text-sm font-medium text-purple-700 transition hover:text-purple-800 lg:text-base"
        >
          Ver agenda completa -&gt;
        </Link>
      </div>
    </article>
  );
}

const MeleioRoomCard = memo(MeleioRoomCardComponent);

export default MeleioRoomCard;
