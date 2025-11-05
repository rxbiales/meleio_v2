"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { CalendarDays, Clock } from "lucide-react";
import React from "react";

type PulsePoint = {
  date: string;
  pulso: number;
  ivs: number;
  engajamento: number;
};
type EventItem = {
  date: string; // "2025-11-01"
  hour?: string; // "09:20"
  title: string; // "Mediação com a orientadora"
  type: "mediacao" | "familia" | "atividade" | "saude" | "registro";
  note?: string;
  actor?: string; // "Prof. Karina", "Responsável", etc.
};

export type StudentTimelineProps = {
  aluno: { nome: string; turma: string; idade?: number };
  series: PulsePoint[]; // dados do gráfico (pulso, ivs, engajamento)
  events: EventItem[]; // eventos da linha do tempo
};

function cn(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

const typeColor: Record<EventItem["type"], string> = {
  mediacao: "bg-purple-600",
  familia: "bg-orange-500",
  atividade: "bg-yellow-400",
  saude: "bg-rose-500",
  registro: "bg-slate-400",
};

export default function StudentTimeline({
  aluno,
  series,
  events,
}: StudentTimelineProps) {
  // últimos valores para “cards rápidos”
  const last = series.at(-1);

  return (
    <section
      data-component="student-timeline"
      className="w-full space-y-6 lg:space-y-8"
    >
      {/* Header compacto */}
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {aluno.nome}
            <span className="ml-2 align-middle text-sm font-medium text-gray-500">
              • {aluno.turma}
            </span>
          </h2>
          <p className="text-xs text-purple-700">
            Linha do tempo • visão rápida
          </p>
        </div>
        {/* KPIs compactos */}
        <div className="flex items-center gap-2">
          <Kpi label="Pulso" value={last?.pulso ?? 0} />
          <Kpi label="IVS" value={(last?.ivs ?? 0).toFixed(2)} tone="orange" />
          <Kpi
            label="Engaj."
            value={`${last?.engajamento ?? 0}%`}
            tone="yellow"
          />
        </div>
      </header>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-5">
        {/* Pulso (linha) */}
        <Card title="Pulso (últimas semanas)">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid stroke="#f3e8ff" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickMargin={6}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  width={28}
                />
                <ReTooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    borderColor: "#ddd",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pulso"
                  stroke="#7c3aed" // purple-600
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* IVS (área) */}
        <Card title="IVS">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <CartesianGrid stroke="#f3e8ff" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickMargin={6}
                />
                <YAxis
                  domain={[0, 1]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  width={28}
                />
                <ReTooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    borderColor: "#ddd",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ivs"
                  stroke="#f97316" // orange-500
                  fill="url(#ivsGrad)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="ivsGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.5} />
                    <stop
                      offset="100%"
                      stopColor="#f97316"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Engajamento (barra) */}
        <Card className="md:col-span-3" title="Engajamento (%)">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}>
                <CartesianGrid stroke="#f3e8ff" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickMargin={6}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  width={28}
                />
                <ReTooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    borderColor: "#ddd",
                  }}
                />
                <Bar
                  dataKey="engajamento"
                  radius={[6, 6, 0, 0]}
                  fill="url(#engGrad)"
                />
                <defs>
                  <linearGradient id="engGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#facc15" />
                    {/* yellow-400 */}
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Timeline de eventos */}
      <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-purple-700">
          Eventos recentes
        </h3>
        <ol className="relative ml-3 space-y-4">
          {/* linha vertical */}
          <span className="absolute left-0 top-0 h-full w-1 rounded bg-gradient-to-b from-purple-600 via-orange-500 to-yellow-400" />
          {events.map((ev, i) => (
            <li key={i} className="relative pl-6">
              {/* nó */}
              <span
                className={cn(
                  "absolute left-[-6px] top-2 h-3 w-3 rounded-full ring-4 ring-white",
                  typeColor[ev.type]
                )}
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-x-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-purple-600" />
                  {formatDate(ev.date)}
                </span>
                {ev.hour && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-purple-600" />
                    {ev.hour}
                  </span>
                )}
                {ev.actor && (
                  <span className="text-purple-700">{ev.actor}</span>
                )}
                <Badge tone={ev.type}>{labelType(ev.type)}</Badge>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {ev.title}
              </p>
              {ev.note && (
                <p className="mt-0.5 text-xs text-gray-700">{ev.note}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Helpers visuais */
function Card({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-purple-100 bg-white p-4 shadow-sm",
        className
      )}
    >
      <h3 className="mb-2 text-sm font-semibold text-purple-700">{title}</h3>
      {children}
    </article>
  );
}

function Kpi({
  label,
  value,
  tone = "purple" as "purple" | "orange" | "yellow",
}) {
  const styles =
    tone === "purple"
      ? "bg-purple-600/10 border-purple-600/30 text-purple-700"
      : tone === "orange"
      ? "bg-orange-500/10 border-orange-500/30 text-orange-600"
      : "bg-yellow-400/20 border-yellow-400/40 text-yellow-700";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        styles
      )}
    >
      <span className="opacity-80">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: EventItem["type"];
  children: React.ReactNode;
}) {
  const base =
    tone === "mediacao"
      ? "bg-purple-600/10 text-purple-700"
      : tone === "familia"
      ? "bg-orange-500/10 text-orange-600"
      : tone === "atividade"
      ? "bg-yellow-400/20 text-yellow-700"
      : tone === "saude"
      ? "bg-rose-500/10 text-rose-600"
      : "bg-slate-400/10 text-slate-600";
  return (
    <span
      className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", base)}
    >
      {children}
    </span>
  );
}

function labelType(t: EventItem["type"]) {
  switch (t) {
    case "mediacao":
      return "Mediação";
    case "familia":
      return "Família";
    case "atividade":
      return "Atividade";
    case "saude":
      return "Saúde";
    default:
      return "Registro";
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
