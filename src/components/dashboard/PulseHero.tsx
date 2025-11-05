"use client";

import { memo, type ReactElement } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { MELEIO_GRADIENT } from "@/lib/constants";
import Tooltip from "./Tooltip";
import type { DashboardData } from "./types";

function splitLegend(macro: DashboardData["pulse"]["macro"]) {
  const half = Math.ceil(macro.length / 2);
  return [macro.slice(0, half), macro.slice(half)];
}

interface PulseHeroProps {
  pulse: DashboardData["pulse"];
}

function PulseHeroComponent({ pulse }: PulseHeroProps): ReactElement {
  const { value, target, delta7d, macro } = pulse;
  const isUp = delta7d >= 0;
  const [leftLegend, rightLegend] = splitLegend(macro);

  return (
    <section
      data-section="hero-pulso"
      className="rounded-3xl border border-purple-100 bg-white shadow"
    >
      <div
        className="h-2 rounded-t-3xl"
        style={{ background: MELEIO_GRADIENT }}
        aria-hidden
      />

      <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">Pulso da rede</h1>
            <Tooltip text="Indice socioemocional consolidado diariamente (0 a 100).">
              <Info className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>

          <div className="mt-3 flex items-end gap-3">
            <span className="text-5xl font-extrabold text-gray-900">
              {value}
            </span>
            <span className="text-lg text-gray-500">/100</span>
            <Tooltip
              text={`Variacao em 7 dias: ${isUp ? "subiu" : "caiu"} ${Math.abs(delta7d)} pontos.`}
            >
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(delta7d)}
              </span>
            </Tooltip>
          </div>

          <div className="relative mt-4 h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{ width: `${value}%`, background: MELEIO_GRADIENT }}
              aria-label={`Pulso atual: ${value}`}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 translate-x-[-50%] rounded-full border-2 border-purple-600 bg-white shadow-sm"
              style={{ left: `${target}%` }}
              aria-label={`Meta: ${target}`}
            />
          </div>

          <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
            <span className="rounded bg-gray-100 px-2 py-0.5">Meta: {target}</span>
            <span className="rounded bg-gray-100 px-2 py-0.5">
              Atualizacao diaria
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              href="/home/checkin/hoje"
              className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              Check-in rapido
            </Link>
            <Link
              href="/home/planos"
              className="rounded-lg border border-purple-300 px-3 py-1.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              Rever planos
            </Link>
          </div>
        </div>

        <div className="mx-auto h-56 w-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={macro}
                dataKey="value"
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
              >
                {macro.map((slice) => (
                  <Cell key={slice.name} fill={slice.color} />
                ))}
                <Label
                  position="center"
                  content={() => (
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#6B7280"
                      fontSize="12"
                    >
                      7 dias
                    </text>
                  )}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 border-t border-purple-100 p-6 sm:grid-cols-2">
        {[leftLegend, rightLegend].map((legend, legendIndex) => (
          <ul key={legendIndex} className="grid grid-cols-1 gap-2 text-sm">
            {legend.map((slice) => (
              <li key={slice.name} className="flex items-start gap-2">
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: slice.color }}
                />
                <span>
                  <strong className="text-gray-900">{slice.value}%</strong>{" "}
                  {slice.name.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

const PulseHero = memo(PulseHeroComponent);

export default PulseHero;
