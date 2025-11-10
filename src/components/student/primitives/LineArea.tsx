"use client";

import type { ReactElement } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

export type LineAreaDatum = {
  x: string | number;
  y: number;
};

interface LineAreaProps {
  data: LineAreaDatum[];
  area?: boolean;
  yDomain?: [number, number];
  className?: string;
}

export function LineArea({
  data,
  area = false,
  yDomain,
  className,
}: LineAreaProps): ReactElement {
  return (
    <div className={cn("w-full", className)} style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        {area ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="student-line-area"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ede9fe" />
            <XAxis dataKey="x" stroke="#c4b5fd" />
            <YAxis stroke="#c4b5fd" domain={yDomain} />
            <Tooltip
              cursor={{ stroke: "#ddd6fe" }}
              contentStyle={{
                background: "white",
                borderRadius: 12,
                border: "1px solid #ede9fe",
              }}
            />

            <Area
              type="monotone"
              dataKey="y"
              stroke="#7c3aed"
              fill="url(#student-line-area)"
              strokeWidth={2}
              // 👇 bolinhas em TODOS os pontos
              dot={{ r: 3, fill: "#7c3aed", stroke: "white", strokeWidth: 1.5 }}
              // 👇 bolinha maior no hover
              activeDot={{
                r: 5,
                stroke: "#7c3aed",
                strokeWidth: 2,
                fill: "white",
              }}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede9fe" />
            <XAxis dataKey="x" stroke="#c4b5fd" />
            <YAxis stroke="#c4b5fd" domain={yDomain} />
            <Tooltip
              cursor={{ stroke: "#ddd6fe" }}
              contentStyle={{
                background: "white",
                borderRadius: 12,
                border: "1px solid #ede9fe",
              }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
