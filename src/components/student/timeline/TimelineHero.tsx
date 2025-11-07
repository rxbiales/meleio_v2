"use client";

import { Info } from "lucide-react";

import Tooltip from "@/components/dashboard/Tooltip";
import { MELEIO_GRADIENT } from "@/lib/constants";

type TimelineHeroProps = {
  student: { nome: string; turma: string; idade?: number };
  pulso: number;
  engajamento: number;
  periodLabel: string;
};

export function TimelineHero({
  student,
  pulso,
  engajamento,
  periodLabel,
}: TimelineHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: MELEIO_GRADIENT }}
      />

      <div className="relative flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-7">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 lg:text-3xl">
              Linha do tempo - {student.nome}
            </h1>
            <Tooltip text="Visao temporal do pulso SEL e das principais competencias.">
              <Info aria-hidden className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>

          <p className="max-w-2xl text-sm text-gray-600 lg:text-base">
            Acompanhe o progresso socioemocional de {student.nome}, observando a
            evolucao semanal do Pulso e das competencias Autorregulacao,
            Empatia, Responsabilidade e Colaboracao.
          </p>
          <p className="max-w-2xl text-sm text-gray-600 lg:text-base">
            Use as abas para alternar entre o Pulso geral e as competencias
            individuais, e o periodo para investigar tendencias especificas.
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 lg:text-sm">
            <span>Periodo ativo:</span>
            <span className="rounded-full bg-purple-50 px-2 py-1 font-medium text-purple-700">
              {periodLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <HeroChip label="Turma" value={student.turma} />
            {typeof student.idade === "number" && (
              <HeroChip label="Idade" value={`${student.idade}`} />
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 rounded-2xl border border-purple-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm lg:w-96">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-gray-500">Pulso</span>
            <span className="text-4xl font-semibold text-gray-900 lg:text-5xl">
              {pulso}
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-purple-100/70">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${Math.min(100, Math.max(0, pulso))}%`,
                background: MELEIO_GRADIENT,
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <HeroMetric label="Engajamento" value={`${engajamento}%`} />
          </div>
        </div>
      </div>
    </section>
  );
}

type HeroChipProps = {
  label: string;
  value: string;
};

function HeroChip({ label, value }: HeroChipProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-purple-100 bg-purple-50/70 px-3 py-1 text-xs font-semibold text-purple-700 lg:text-sm">
      <span className="text-purple-500/80">{label}</span>
      <span className="text-gray-900">{value}</span>
    </span>
  );
}

type HeroMetricProps = {
  label: string;
  value: string;
};

function HeroMetric({ label, value }: HeroMetricProps) {
  return (
    <div className="flex flex-col rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2">
      <span className="text-xs font-medium text-gray-500 lg:text-sm">
        {label}
      </span>
      <span className="text-lg font-semibold text-purple-800 lg:text-xl">
        {value}
      </span>
    </div>
  );
}
