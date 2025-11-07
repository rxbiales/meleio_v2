"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MELEIO_PALETTE } from "@/lib/constants";

type DeltaBarsProps = {
  data: Array<{ label: string; value: number }>;
  mode: "pulso" | "competencias";
};

export function DeltaBars({ data, mode }: DeltaBarsProps) {
  const domain = useMemo(() => {
    if (data.length === 0) return [0, 0] as const;
    if (mode === "competencias") {
      return [0, 100] as const;
    }
    const min = Math.min(...data.map((d) => d.value));
    const max = Math.max(...data.map((d) => d.value));
    const pad = Math.max(Math.abs(min), Math.abs(max)) * 0.2 + 2;
    return [Math.floor(min - pad), Math.ceil(max + pad)] as const;
  }, [data, mode]);

  if (data.length === 0) {
    return <EmptyState />;
  }

  const gradientId = `delta-bars-${mode}`;
  const gradientColors =
    mode === "pulso"
      ? { start: MELEIO_PALETTE.purple, end: MELEIO_PALETTE.yellow }
      : { start: MELEIO_PALETTE.orange, end: MELEIO_PALETTE.purple };

  return (
    <figure
      aria-label={
        mode === "pulso"
          ? "Barras com variacao semanal do pulso"
          : "Barras com media semanal das competencias"
      }
      className="h-[200px] w-full lg:h-[220px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientColors.start} stopOpacity={0.9} />
              <stop offset="100%" stopColor={gradientColors.end} stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f3e8ff" vertical={false} />
          <XAxis
            dataKey="label"
            tickMargin={8}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            domain={domain as [number, number]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            width={32}
          />
          {mode === "pulso" && (
            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
          )}
          <ReTooltip
            cursor={{ fill: "rgba(124,58,237,0.08)" }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 12,
              borderColor: "rgba(124, 58, 237, 0.2)",
            }}
            formatter={(value: number) =>
              mode === "pulso"
                ? [`${value > 0 ? "+" : ""}${value}`, "Delta do pulso"]
                : [`${value}`, "Media das competencias"]
            }
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            fill={`url(#${gradientId})`}
            maxBarSize={mode === "pulso" ? 24 : 28}
          />
        </BarChart>
      </ResponsiveContainer>
      <figcaption className="sr-only">
        {mode === "pulso"
          ? "Variacao semanal do pulso em relacao a semana anterior."
          : "Medias semanais das quatro competencias monitoradas."}
      </figcaption>
    </figure>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[200px] items-center justify-center rounded-2xl bg-purple-50/40 text-sm text-gray-500 lg:h-[220px]">
      Sem dados para exibir.
    </div>
  );
}
