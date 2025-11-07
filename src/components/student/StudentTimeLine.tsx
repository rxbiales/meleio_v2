"use client";

import { useMemo, useState } from "react";

import type {
  EventItem,
  SeriesPoint,
} from "@/components/student/students.mock";
import { BROWN_HEX, MELEIO_PALETTE } from "@/lib/constants";

import { TimelineHero } from "./timeline/TimelineHero";
import { TimelineTabs } from "./timeline/TimelineTabs";
import { PeriodSelector } from "./timeline/PeriodSelector";
import { TimelineMainChart } from "./timeline/TimelineMainChart";
import { DeltaBars } from "./timeline/DeltaBars";
import { CorrelationMiniChart } from "./timeline/CorrelationMiniChart";
import { EventsList } from "./timeline/EventsList";
import MeloInsights from "../layout/MeloInsights";
export type StudentTimelineProProps = {
  aluno: { nome: string; turma: string; idade?: number };
  series: SeriesPoint[];
  events: EventItem[];
};

type TabKey = "pulso" | "competencias";
type PeriodKey = "4w" | "8w" | "12w" | "6m";

const PERIOD_TO_POINTS: Record<PeriodKey, number> = {
  "4w": 4,
  "8w": 8,
  "12w": 12,
  "6m": 24,
};

const PERIOD_LABEL: Record<PeriodKey, string> = {
  "4w": "Últimas 4 semanas",
  "8w": "Últimas 8 semanas",
  "12w": "Últimas 12 semanas",
  "6m": "Últimos 6 meses",
};

const COMPETENCY_CONFIG: Array<{
  key: "ar" | "em" | "re" | "co";
  label: string;
  color: string;
}> = [
  { key: "ar", label: "Autorregulação", color: MELEIO_PALETTE.yellow },
  { key: "em", label: "Empatia", color: MELEIO_PALETTE.orange },
  { key: "re", label: "Responsabilidade", color: BROWN_HEX },
  { key: "co", label: "Colaboração", color: MELEIO_PALETTE.purple },
];

const MELO_ANALYSIS = {
  analise:
    "Nas últimas semanas, Ana apresentou uma leve oscilação no Pulso, mantendo-se dentro de uma faixa saudável. As competências de Empatia e Colaboração mostram correlação positiva, sugerindo um ambiente social equilibrado. Já a Autorregulação apresentou variações acentuadas, possivelmente associadas a períodos de maior carga acadêmica. Recomenda-se reforçar práticas de respiração guiada e feedback positivo em sala.",
};

export default function StudentTimelinePro({
  aluno,
  series,
  events,
}: StudentTimelineProProps) {
  const [tab, setTab] = useState<TabKey>("pulso");
  const [period, setPeriod] = useState<PeriodKey>("8w");

  const filtered = useMemo(() => {
    const points = PERIOD_TO_POINTS[period];
    return series.slice(Math.max(0, series.length - points));
  }, [series, period]);

  const lastPoint = filtered.at(-1);

  const barsData = useMemo(() => buildBars(filtered, tab), [filtered, tab]);
  const correlationData = useMemo(() => buildCorrelation(filtered), [filtered]);

  // gera os dados formatados para o MeloInsights
  const meloData = useMemo(() => {
    const txt = MELO_ANALYSIS.analise;
    const keywords = [
      "Pulso",
      "Empatia",
      "Colaboração",
      "Autorregulação",
      "respiração guiada",
      "feedback positivo",
    ];

    const sentences = txt
      .replace(/\s+/g, " ")
      .split(". ")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4);

    const bullets = sentences.map((s) =>
      keywords.reduce(
        (acc, k) => acc.replace(new RegExp(k, "gi"), (m) => `**${m}**`),
        s
      )
    );

    return {
      bullets,
      acoes: [
        { label: "Aplicar check-in agora", href: "/home/checkin/hoje" },
        {
          label: "Rever plano individual",
          href: `/home/planos/${encodeURIComponent(aluno.turma)}`,
        },
      ],
    };
  }, [aluno.turma]);

  return (
    <article className="space-y-10 lg:space-y-12">
      {/* HERO + GRÁFICO PRINCIPAL */}
      <section className="space-y-6 lg:space-y-8">
        <TimelineHero
          student={aluno}
          pulso={lastPoint?.pulso ?? 0}
          engajamento={lastPoint?.engajamento ?? 0}
          periodLabel={PERIOD_LABEL[period]}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <TimelineTabs value={tab} onChange={setTab} />
          <PeriodSelector value={period} onChange={setPeriod} />
        </div>

        <div
          key={`chart-${tab}`}
          className="rounded-3xl border border-purple-100 bg-white p-4 shadow-sm animate-in fade-in duration-150 lg:p-6"
        >
          <TimelineMainChart
            data={filtered}
            tab={tab}
            lines={COMPETENCY_CONFIG}
            student={aluno.nome}
          />
        </div>
      </section>

      {/* ANÁLISES COMPLEMENTARES */}
      <section className="space-y-5">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Análises complementares
          </h2>
          <p className="text-sm text-gray-600 lg:text-base">
            Observe como as variações semanais ajudam a explicar os movimentos
            do Pulso geral e como o engajamento acompanha esse percurso.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 rounded-3xl border border-purple-100 bg-white p-5 shadow-sm lg:p-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Tendência semanal
              </h3>
              <p className="text-sm text-gray-600">
                Cada barra mostra a variação em relação à semana anterior.
                Utilize para identificar períodos de ganho ou queda acentuada.
              </p>
            </div>
            <DeltaBars data={barsData} mode={tab} />
          </div>

          <div className="space-y-3 rounded-3xl border border-purple-100 bg-white p-5 shadow-sm lg:p-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Correlação Pulso × Engajamento
              </h3>
              <p className="text-sm text-gray-600">
                Compare o comportamento do Pulso com o engajamento nas últimas
                semanas e avalie se os movimentos caminham juntos.
              </p>
            </div>
            <CorrelationMiniChart data={correlationData} />
          </div>
        </div>
      </section>

      {/* EVENTOS */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Histórico recente de interações
          </h2>
          <p className="text-sm text-gray-600 lg:text-base">
            Registros que ajudam a contextualizar as mudanças observadas na
            linha do tempo. Use-os para relacionar dados com fatos vividos.
          </p>
        </header>
        <EventsList events={events} />
      </section>

      {/* ANÁLISE DO MELO */}
      <MeloInsights melo={meloData} />
    </article>
  );
}

// ==== FUNÇÕES AUXILIARES ====

function buildBars(input: SeriesPoint[], mode: TabKey) {
  if (input.length === 0) return [];
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  if (mode === "pulso") {
    const items: Array<{ label: string; value: number }> = [];
    for (let i = 1; i < input.length; i += 1) {
      const prev = input[i - 1];
      const curr = input[i];
      items.push({
        label: formatter.format(new Date(curr.date)),
        value: Number((curr.pulso - prev.pulso).toFixed(1)),
      });
    }
    return items;
  }

  return input.map((point) => ({
    label: formatter.format(new Date(point.date)),
    value: Math.round((point.ar + point.em + point.re + point.co) / 4),
  }));
}

function buildCorrelation(input: SeriesPoint[]) {
  if (input.length === 0) return [];
  const slice = input.slice(-8);
  return slice.map((point) => ({
    date: point.date,
    pulso: point.pulso,
    engajamento: point.engajamento,
  }));
}
