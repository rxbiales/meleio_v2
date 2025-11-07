"use client";

import { useId, useMemo } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SeriesPoint } from "@/components/student/students.mock";
import { MELEIO_PALETTE } from "@/lib/constants";

type TimelineMainChartProps = {
  data: SeriesPoint[];
  tab: "pulso" | "competencias";
  lines: Array<{
    key: "ar" | "em" | "re" | "co";
    label: string;
    color: string;
  }>;
  student: string;
};

export function TimelineMainChart({
  data,
  tab,
  lines,
  student,
}: TimelineMainChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
    []
  );

  const isEmpty = data.length === 0;
  const chartData = useMemo(
    () =>
      data.map((point) => ({
        ...point,
        ivsPercent: Math.round(point.ivs * 100),
      })),
    [data]
  );

  return (
    <figure
      className="h-[360px] w-full lg:h-[400px]"
      aria-label={
        tab === "pulso"
          ? `Evolucao semanal do pulso socioemocional de ${student}`
          : `Evolucao semanal das competencias de ${student}`
      }
    >
      {isEmpty ? (
        <div className="flex h-full items-center justify-center rounded-2xl bg-purple-50/40 text-sm text-gray-500">
          Nenhum dado disponivel para o periodo selecionado.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 24, right: 32, left: 0, bottom: 12 }}
          >
            <defs>
              <linearGradient
                id={`timeline-pulse-${gradientId}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={MELEIO_PALETTE.purple}
                  stopOpacity={0.22}
                />
                <stop
                  offset="100%"
                  stopColor={MELEIO_PALETTE.orange}
                  stopOpacity={0.04}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#ede9fe"
              vertical={false}
              strokeDasharray="4 8"
            />
            <XAxis
              dataKey="date"
              tickMargin={12}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value: string) =>
                dateFormatter.format(new Date(value))
              }
            />
            <YAxis
              yAxisId="score"
              domain={[0, 100]}
              width={40}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            {tab === "pulso" && (
              <YAxis
                yAxisId="ivs"
                orientation="right"
                domain={[0, 100]}
                width={50}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value: number) => `${value}%`}
              />
            )}
            <ReTooltip
              cursor={{
                stroke:
                  tab === "pulso"
                    ? MELEIO_PALETTE.purple
                    : "rgba(107,114,128,0.6)",
                strokeWidth: 1.6,
                strokeDasharray: "3 3",
              }}
              contentStyle={{
                borderRadius: 16,
                borderColor: "rgba(124, 58, 237, 0.16)",
                boxShadow:
                  "0 12px 20px -12px rgba(124, 58, 237, 0.25), 0 6px 12px -8px rgba(15, 23, 42, 0.12)",
              }}
              labelFormatter={(value) => dateFormatter.format(new Date(value))}
              formatter={(value, name) =>
                formatTooltip(value as number, name as string)
              }
              itemSorter={(item) => sortTooltipItems(item.dataKey?.toString())}
            />
            {tab === "pulso" ? (
              <>
                <Legend
                  verticalAlign="top"
                  align="left"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: 16 }}
                  formatter={(value: string) =>
                    value === "pulso"
                      ? "Pulso"
                      : value === "engajamento"
                      ? "Engajamento"
                      : "IVS"
                  }
                />
                <Area
                  type="monotone"
                  dataKey="pulso"
                  yAxisId="score"
                  stroke={MELEIO_PALETTE.purple}
                  strokeWidth={2.8}
                  fill={`url(#timeline-pulse-${gradientId})`}
                  dot={{
                    r: 3.5,
                    stroke: `${MELEIO_PALETTE.purple}`,
                    strokeWidth: 1.75,
                    fill: "#fff",
                  }}
                  activeDot={{
                    r: 7,
                    strokeWidth: 2,
                    stroke: "#fff",
                    style: {
                      filter: "drop-shadow(0 0 10px rgba(124,58,237,0.45))",
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Legend
                  verticalAlign="top"
                  align="left"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: 16 }}
                />
                {lines.map((line) => (
                  <Line
                    key={line.key}
                    type="monotone"
                    dataKey={line.key}
                    name={line.label}
                    stroke={line.color}
                    strokeWidth={2.8}
                    dot={{
                      r: 3.5,
                      stroke: `${line.color}`,
                      strokeWidth: 1.75,
                      fill: "#fff",
                    }}
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                      stroke: "#fff",
                      style: {
                        filter: `drop-shadow(0 0 8px ${hexToShadow(
                          line.color
                        )})`,
                      },
                    }}
                  />
                ))}
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      )}
      <figcaption className="sr-only">
        {tab === "pulso"
          ? "Pulso com banda preenchida e linhas de engajamento e IVS."
          : "Quatro linhas representando autorregulacao, empatia, responsabilidade e colaboracao."}
      </figcaption>
    </figure>
  );
}

function formatTooltip(value: number, name: string) {
  if (name.toLowerCase().includes("ivs")) {
    return [`${Math.round(value)}%`, "IVS"];
  }
  if (name.toLowerCase().includes("engajamento")) {
    return [`${Math.round(value)}%`, "Engajamento"];
  }
  if (name.toLowerCase().includes("pulso")) {
    return [Math.round(value), "Pulso"];
  }
  return [Math.round(value), name];
}

function hexToShadow(hex: string) {
  const parsed = hex.replace("#", "");
  if (parsed.length !== 6) return "rgba(124,58,237,0.45)";
  const r = parseInt(parsed.slice(0, 2), 16);
  const g = parseInt(parsed.slice(2, 4), 16);
  const b = parseInt(parsed.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.45)`;
}

function sortTooltipItems(dataKey?: string) {
  switch (dataKey) {
    case "pulso":
      return 0;
    case "engajamento":
      return 1;
    case "ivsPercent":
      return 2;
    default:
      return 3;
  }
}
