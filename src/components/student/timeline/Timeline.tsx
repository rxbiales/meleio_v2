"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";

import MeloInsights from "@/components/layout/MeloInsights";
import { DataList } from "@/components/student/primitives/DataList";
import { DeltaBars } from "@/components/student/primitives/DeltaBars";
import { KPI } from "@/components/student/primitives/KPI";
import {
  LineArea,
  type LineAreaDatum,
} from "@/components/student/primitives/LineArea";
import { useStudent, useStudentId } from "@/components/student/StudentProvider";
import {
  useStudentEvidences,
  useStudentTimeline,
} from "@/components/student/dataHooks";
import type { Evidence, Student, TimeRange } from "@/components/student/types";
import { BROWN_HEX, MELEIO_PALETTE } from "@/lib/constants";

type TabKey = "pulso" | "competencias";
type PeriodKey = "4w" | "8w" | "12w" | "6m";
type CompetencyKey = "ar" | "em" | "re" | "co";

type SeriesPoint = {
  date: string;
  pulso: number;
  engajamento: number;
} & Record<CompetencyKey, number>;

type CompetencyLineDatum = {
  label: string;
} & Record<CompetencyKey, number>;

type CorrelationPoint = {
  date: string;
  pulso: number;
  engajamento: number;
};

type MeloData = {
  bullets: string[];
  acoes: Array<{ label: string; href: string }>;
};

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

const PERIOD_TO_POINTS: Record<PeriodKey, number> = {
  "4w": 4,
  "8w": 8,
  "12w": 12,
  "6m": 24,
};

const PERIOD_LABEL: Record<PeriodKey, string> = {
  "4w": "Ultimas 4 semanas",
  "8w": "Ultimas 8 semanas",
  "12w": "Ultimas 12 semanas",
  "6m": "Ultimos 6 meses",
};

const PERIOD_OPTIONS: Array<{ key: PeriodKey; short: string; long: string }> = [
  { key: "4w", short: "4s", long: PERIOD_LABEL["4w"] },
  { key: "8w", short: "8s", long: PERIOD_LABEL["8w"] },
  { key: "12w", short: "12s", long: PERIOD_LABEL["12w"] },
  { key: "6m", short: "6m", long: PERIOD_LABEL["6m"] },
];

const COMPETENCY_LINES: Array<{
  key: CompetencyKey;
  label: string;
  color: string;
}> = [
  { key: "ar", label: "Autoregulacao", color: MELEIO_PALETTE.yellow },
  { key: "em", label: "Empatia", color: MELEIO_PALETTE.orange },
  { key: "re", label: "Responsabilidade", color: BROWN_HEX },
  { key: "co", label: "Colaboracao", color: MELEIO_PALETTE.purple },
];

const MELO_ANALYSIS =
  "Nas ultimas semanas, {nome} apresentou uma leve oscilacao no pulso, mantendo-se em faixa saudavel. As competencias de Empatia e Colaboracao mostram correlacao positiva, sugerindo um ambiente social equilibrado. Autoregulacao variou de forma mais acentuada, possivelmente associada a periodos de maior carga academica. Reforce praticas de respiracao guiada e feedback positivo em sala.";

export function StudentTimeline() {
  const student = useStudent();
  const studentId = useStudentId();
  const [tab, setTab] = useState<TabKey>("pulso");
  const [period, setPeriod] = useState<PeriodKey>("8w");

  const range = useMemo(() => buildRange(PERIOD_TO_POINTS[period]), [period]);

  const timeline = useStudentTimeline(studentId, range);
  const evidences = useStudentEvidences(studentId);
  const timelineData = timeline.data;

  const series = useMemo<SeriesPoint[]>(() => {
    if (!timelineData) return [];
    return timelineData.pulse.map((point, index) => ({
      date: point.date,
      pulso: point.value,
      engajamento: timelineData.engagement[index]?.value ?? 0,
      ar: timelineData.competencies.ar?.[index]?.value ?? 0,
      em: timelineData.competencies.em?.[index]?.value ?? 0,
      re: timelineData.competencies.re?.[index]?.value ?? 0,
      co: timelineData.competencies.co?.[index]?.value ?? 0,
    }));
  }, [timelineData]);

  const filteredSeries = useMemo(
    () => takeLast(series, PERIOD_TO_POINTS[period]),
    [series, period]
  );

  const lastPoint = filteredSeries.at(-1);
  const competencyAverage = lastPoint
    ? Math.round(
        (lastPoint.ar + lastPoint.em + lastPoint.re + lastPoint.co) / 4
      )
    : null;

  const pulseSeries = useMemo<LineAreaDatum[]>(
    () =>
      filteredSeries.map((point) => ({
        x: formatDateLabel(point.date),
        y: point.pulso,
      })),
    [filteredSeries]
  );

  const competencySeries = useMemo<CompetencyLineDatum[]>(
    () =>
      filteredSeries.map((point) => ({
        label: formatDateLabel(point.date),
        ar: point.ar,
        em: point.em,
        re: point.re,
        co: point.co,
      })),
    [filteredSeries]
  );

  const deltaBarsData = useMemo(
    () =>
      buildBars(filteredSeries, tab).map((item) => ({
        label: item.label,
        delta: item.value,
      })),
    [filteredSeries, tab]
  );

  const correlationData = useMemo(
    () => buildCorrelation(filteredSeries),
    [filteredSeries]
  );

  const meloData = useMemo<MeloData>(
    () => buildMeloData(student, PERIOD_LABEL[period]),
    [student, period]
  );

  const events = evidences.data ?? [];

  return (
    <article className="space-y-10 lg:space-y-12">
      <section className="space-y-6 lg:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TimelineTabs value={tab} onChange={setTab} />
          <PeriodSelector value={period} onChange={setPeriod} />
        </div>

        <div className="rounded-3xl border border-purple-100 bg-white p-4 shadow-sm lg:p-6">
          <TimelineMainChart
            tab={tab}
            pulseData={pulseSeries}
            competencyData={competencySeries}
          />
        </div>
      </section>

      <section className="space-y-5">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Analises complementares
          </h2>
          <p className="text-sm text-gray-600 lg:text-base">
            Observe as variacoes semanais e como o engajamento acompanha o
            percurso do pulso ao longo do periodo selecionado.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="space-y-3 rounded-3xl border border-purple-100 bg-white p-5 shadow-sm lg:p-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Tendencia semanal
              </h3>
              <p className="text-sm text-gray-600">
                Cada barra mostra a variacao em relacao a semana anterior para o
                pulso ou a media das competencias.
              </p>
            </div>
            <DeltaBars
              data={deltaBarsData}
              variant={tab === "pulso" ? "posneg" : "abs"}
              className="mt-2"
            />
          </article>

          <article className="space-y-3 rounded-3xl border border-purple-100 bg-white p-5 shadow-sm lg:p-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Correlacao Pulso x Engajamento
              </h3>
              <p className="text-sm text-gray-600">
                Compare como o pulso e o engajamento caminham nas ultimas
                semanas.
              </p>
            </div>
            <CorrelationMiniChart data={correlationData} />
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Historico recente de interacoes
          </h2>
          <p className="text-sm text-gray-600 lg:text-base">
            Registros que ajudam a contextualizar as mudancas observadas no
            periodo.
          </p>
        </header>

        <EventsList events={events} isLoading={evidences.isLoading} />
      </section>

      <MeloInsights melo={meloData} />
    </article>
  );
}

function buildRange(weeks: number): TimeRange {
  const today = new Date();
  const from = new Date(today);
  from.setDate(from.getDate() - weeks * 7);
  return {
    from: from.toISOString().slice(0, 10),
    to: today.toISOString().slice(0, 10),
  };
}

function takeLast<T>(list: T[], count: number): T[] {
  const start = Math.max(list.length - count, 0);
  return list.slice(start);
}

function formatDateLabel(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return DATE_FORMATTER.format(parsed);
}

function buildBars(series: SeriesPoint[], mode: TabKey) {
  if (!series.length) return [];
  if (mode === "pulso") {
    const items: Array<{ label: string; value: number }> = [];
    for (let index = 1; index < series.length; index += 1) {
      const previous = series[index - 1];
      const current = series[index];
      items.push({
        label: formatDateLabel(current.date),
        value: Number((current.pulso - previous.pulso).toFixed(1)),
      });
    }
    return items;
  }

  return series.map((point) => ({
    label: formatDateLabel(point.date),
    value: Math.round((point.ar + point.em + point.re + point.co) / 4),
  }));
}

function buildCorrelation(series: SeriesPoint[]): CorrelationPoint[] {
  const sample = takeLast(series, 8);
  return sample.map((point) => ({
    date: point.date,
    pulso: point.pulso,
    engajamento: point.engajamento,
  }));
}

function buildMeloData(student: Student, periodLabel: string): MeloData {
  const baseText = MELO_ANALYSIS.replace("{nome}", student.name);
  const keywords = [
    "Pulso",
    "Empatia",
    "Colaboracao",
    "Autoregulacao",
    "respiracao guiada",
    "feedback positivo",
  ];

  const sentences = baseText
    .replace(/\s+/g, " ")
    .split(". ")
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 4);

  const bullets = sentences.map((sentence) =>
    keywords.reduce(
      (acc, keyword) =>
        acc.replace(new RegExp(keyword, "gi"), (match) => `**${match}**`),
      sentence
    )
  );
  bullets.push(`Periodo analisado: **${periodLabel}**.`);

  return {
    bullets,
    acoes: [
      { label: "Aplicar check-in agora", href: "/home/checkin/hoje" },
      {
        label: "Rever plano individual",
        href: `/home/planos/${encodeURIComponent(student.classGroup)}`,
      },
    ],
  };
}

function TimelineTabs({
  value,
  onChange,
}: {
  value: TabKey;
  onChange: (next: TabKey) => void;
}) {
  const items: Array<{
    key: TabKey;
    label: string;
    description: string;
  }> = [
    { key: "pulso", label: "Pulso", description: "Oscilacoes semanais" },
    {
      key: "competencias",
      label: "Competencias",
      description: "Linhas das quatro competencias",
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="Alternar visualizacao da timeline"
      className="inline-flex overflow-hidden rounded-full border border-purple-100 bg-purple-50/60 p-1"
    >
      {items.map((item) => {
        const active = value === item.key;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={item.description}
            onClick={() => onChange(item.key)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 lg:px-6 lg:py-2 lg:text-base",
              active
                ? "bg-white text-purple-700 shadow-sm"
                : "text-purple-500 hover:bg-white/60",
            ].join(" ")}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function PeriodSelector({
  value,
  onChange,
}: {
  value: PeriodKey;
  onChange: (next: PeriodKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Selecionar periodo"
      className="inline-flex rounded-full border border-purple-100 bg-white/80 p-1 text-sm font-semibold text-purple-700"
    >
      {PERIOD_OPTIONS.map((option) => {
        const active = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={active}
            title={option.long}
            onClick={() => onChange(option.key)}
            className={[
              "rounded-full px-3 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 lg:px-4 lg:py-1.5",
              active
                ? "bg-purple-600 text-white shadow"
                : "text-purple-700 hover:bg-purple-50",
            ].join(" ")}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}

function TimelineMainChart({
  tab,
  pulseData,
  competencyData,
}: {
  tab: TabKey;
  pulseData: LineAreaDatum[];
  competencyData: CompetencyLineDatum[];
}) {
  if (tab === "pulso") {
    return <LineArea data={pulseData} area yDomain={[0, 100]} />;
  }

  return (
    <div className="h-[360px] w-full lg:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={competencyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ede9fe" />
          <XAxis dataKey="label" stroke="#c4b5fd" />
          <YAxis stroke="#c4b5fd" domain={[0, 100]} />
          <ReTooltip
            cursor={{ stroke: "#ddd6fe" }}
            contentStyle={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #ede9fe",
            }}
          />
          <Legend />
          {COMPETENCY_LINES.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label}
              stroke={line.color}
              strokeWidth={2.5}
              dot={{ r: 2 }}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "#fff",
                style: { filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))" },
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CorrelationMiniChart({ data }: { data: CorrelationPoint[] }) {
  if (!data.length) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-2xl bg-purple-50/40 text-sm text-gray-500 lg:h-[220px]">
        Sem dados suficientes para correlacionar.
      </div>
    );
  }

  return (
    <figure className="h-[200px] w-full lg:h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 12, right: 20, left: 0, bottom: 8 }}
        >
          <CartesianGrid
            stroke="#ede9fe"
            vertical={false}
            strokeDasharray="4 6"
          />
          <XAxis
            dataKey="date"
            tickMargin={8}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickFormatter={(value: string) => formatDateLabel(value)}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            width={32}
          />
          <ReTooltip
            cursor={{ stroke: "rgba(124,58,237,0.4)", strokeDasharray: "3 3" }}
            contentStyle={{
              borderRadius: 12,
              borderColor: "rgba(124, 58, 237, 0.16)",
            }}
            labelFormatter={(value) => formatDateLabel(value as string)}
            formatter={(value: number, name: string) => [
              `${Math.round(value)}%`,
              name === "pulso" ? "Pulso" : "Engajamento",
            ]}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ paddingTop: 8, fontSize: 12 }}
            formatter={(text: string) =>
              text === "pulso" ? "Pulso" : "Engajamento"
            }
          />
          <Line
            type="monotone"
            dataKey="pulso"
            stroke={MELEIO_PALETTE.purple}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#fff",
              style: { filter: "drop-shadow(0 0 6px rgba(124,58,237,0.45))" },
            }}
          />
          <Line
            type="monotone"
            dataKey="engajamento"
            stroke={MELEIO_PALETTE.orange}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#fff",
              style: { filter: "drop-shadow(0 0 6px rgba(249,115,22,0.45))" },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      <figcaption className="sr-only">
        Comparativo entre pulso e engajamento nas ultimas semanas.
      </figcaption>
    </figure>
  );
}

function EventsList({
  events,
  isLoading,
}: {
  events: Evidence[];
  isLoading: boolean;
}) {
  return (
    <DataList
      items={events}
      isLoading={isLoading}
      renderItem={(event) => (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
              {event.tags?.[0] ?? "evento"}
            </p>
            <p className="text-base font-semibold text-gray-900">
              {event.label}
            </p>
          </div>
          <span className="text-sm text-gray-500">{event.date}</span>
        </div>
      )}
    />
  );
}
