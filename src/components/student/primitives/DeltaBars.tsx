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
  Cell,
} from "recharts";
import { MELEIO_PALETTE } from "@/lib/constants";

type Raw = { label: string; value?: number; delta?: number };

type DeltaBarsProps = {
  data: Raw[];
  mode: "pulso" | "competencias";
};

export function DeltaBars({ data, mode }: DeltaBarsProps) {
  // 🔧 Normaliza: aceita value OU delta
  const normalized = useMemo(
    () =>
      (data ?? []).map((d) => ({
        label: d.label,
        value: Number.isFinite(d.value as number)
          ? (d.value as number)
          : Number.isFinite(d.delta as number)
          ? (d.delta as number)
          : 0,
      })),
    [data]
  );

  const domain = useMemo(() => {
    if (normalized.length === 0) return [0, 0] as const;
    if (mode === "competencias") return [0, 100] as const;

    const vals = normalized.map((d) => d.value ?? 0);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [-1, 1] as const;

    const pad = Math.max(Math.abs(min), Math.abs(max)) * 0.2 + 2;
    return [Math.floor(min - pad), Math.ceil(max + pad)] as const;
  }, [normalized, mode]);

  if (normalized.length === 0) return <EmptyState />;

  const gradPosId = `delta-bars-${mode}-pos`;
  const gradNegId = `delta-bars-${mode}-neg`;

  const pos =
    mode === "pulso"
      ? { start: MELEIO_PALETTE.purple, end: MELEIO_PALETTE.yellow }
      : { start: MELEIO_PALETTE.orange, end: MELEIO_PALETTE.purple };

  const neg = { start: pos.end, end: pos.start };

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
        <BarChart data={normalized}>
          <defs>
            <linearGradient id={gradPosId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={pos.start} stopOpacity={0.95} />
              <stop offset="100%" stopColor={pos.end} stopOpacity={0.65} />
            </linearGradient>
            <linearGradient id={gradNegId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={neg.start} stopOpacity={0.95} />
              <stop offset="100%" stopColor={neg.end} stopOpacity={0.65} />
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
              background: "white",
            }}
            formatter={(v: number) =>
              mode === "pulso"
                ? [`${v > 0 ? "+" : ""}${v}`, "Delta do pulso"]
                : [`${v}`, "Media das competencias"]
            }
          />

          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            maxBarSize={mode === "pulso" ? 24 : 28}
          >
            {normalized.map((d, i) => (
              <Cell
                key={i}
                fill={`url(#${d.value >= 0 ? gradPosId : gradNegId})`}
              />
            ))}
          </Bar>
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
