"use client";

import { useMemo } from "react";
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

type CorrelationMiniChartProps = {
  data: Array<{ date: string; pulso: number; engajamento: number }>;
};

export function CorrelationMiniChart({ data }: CorrelationMiniChartProps) {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
    []
  );

  if (data.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-2xl bg-purple-50/40 text-sm text-gray-500 lg:h-[220px]">
        Sem dados suficientes para correlacionar.
      </div>
    );
  }

  return (
    <figure className="h-[200px] w-full lg:h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 20, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#ede9fe" vertical={false} strokeDasharray="4 6" />
          <XAxis
            dataKey="date"
            tickMargin={8}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickFormatter={(value: string) => formatter.format(new Date(value))}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            width={32}
          />
          <ReTooltip
            cursor={{ stroke: "rgba(124,58,237,0.6)", strokeDasharray: "3 3" }}
            contentStyle={{
              borderRadius: 12,
              borderColor: "rgba(124, 58, 237, 0.16)",
            }}
            labelFormatter={(value) => formatter.format(new Date(value))}
            formatter={(value: number, name: string) => [
              `${Math.round(value)}%`,
              name === "pulso" ? "Pulso" : "Engajamento",
            ]}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ paddingTop: 12, fontSize: 12 }}
            formatter={(text: string) =>
              text === "pulso" ? "Pulso" : "Engajamento"
            }
          />
          <Line
            type="monotone"
            dataKey="pulso"
            stroke="#7C3AED"
            strokeWidth={2.2}
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
            stroke="#F97316"
            strokeWidth={2.2}
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
        Comparativo entre o pulso e o engajamento nas ultimas oito semanas.
      </figcaption>
    </figure>
  );
}
