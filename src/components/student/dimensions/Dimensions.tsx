"use client";

import { useMemo, useState } from "react";

import { Section } from "@/components/student/primitives/Section";
import { Tabs } from "@/components/student/primitives/Tabs";
import { DeltaBars } from "@/components/student/primitives/DeltaBars";
import { LineArea } from "@/components/student/primitives/LineArea";
import { DataList } from "@/components/student/primitives/DataList";
import { useStudent, useStudentId } from "@/components/student/StudentProvider";
import {
  useStudentDimensions,
  useStudentPlans,
} from "@/components/student/dataHooks";
import type { TimeRange, DimensionScore } from "@/components/student/types";

const DIM_RANGE: TimeRange = buildRange(12);
const VIEW_TABS = [
  { key: "overview", label: "Valores atuais" },
  { key: "trend", label: "Evolucao" },
];

export function StudentDimensions() {
  const student = useStudent();
  const studentId = useStudentId();
  const [view, setView] = useState("overview");
  const dimensions = useStudentDimensions(studentId, DIM_RANGE);
  const plans = useStudentPlans(studentId);

  const deltaData = (dimensions.data ?? []).map((item) => ({
    label: item.label,
    delta: item.delta ?? 0,
  }));

  const trendData = useMemo(
    () =>
      (dimensions.data ?? []).map((item, index) => ({
        x: index,
        y: item.value,
      })),
    [dimensions.data]
  );

  return (
    <div className="space-y-8">
      <Section
        title={`Dimensoes de ${student.name}`}
        description="Competencias SEL resumidas e comparaveis."
        actionsSlot={
          <Tabs items={VIEW_TABS} value={view} onValueChange={setView} />
        }
      >
        {view === "overview" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(dimensions.data ?? []).map((dimension) => (
              <MetricCard key={dimension.id} score={dimension} />
            ))}
          </div>
        ) : (
          <LineArea data={trendData} area className="mt-4" yDomain={[0, 100]} />
        )}
      </Section>

      <Section
        title="Oscilacoes recentes"
        description="Delta semanal por competencia."
      >
        <DeltaBars data={deltaData} />
      </Section>

      <Section
        title="Planos relacionados"
        description="Acoes conectadas com as dimensoes observadas."
      >
        <DataList
          items={plans.data ?? []}
          isLoading={plans.isLoading}
          renderItem={(plan) => (
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-500">
                {plan.status}
              </p>
              <h3 className="text-base font-semibold text-gray-900">
                {plan.title}
              </h3>
              <p className="text-sm text-gray-600">
                {plan.owner
                  ? `Responsavel: ${plan.owner}`
                  : "Responsavel nao definido"}
                {plan.due ? ` · Limite: ${plan.due}` : ""}
              </p>
            </div>
          )}
        />
      </Section>
    </div>
  );
}

function MetricCard({ score }: { score: DimensionScore }) {
  return (
    <article className="rounded-2xl border border-purple-100 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
            {score.label}
          </p>
          <p className="text-3xl font-bold text-gray-900">{score.value}</p>
        </div>
        {typeof score.delta === "number" ? (
          <span className="text-xs font-semibold text-purple-700">
            {score.delta >= 0 ? "+" : ""}
            {score.delta}
          </span>
        ) : null}
      </div>
      <div className="mt-3 h-2 rounded-full bg-purple-50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-orange-500 to-yellow-400"
          style={{ width: `${Math.min(score.value, 100)}%` }}
        />
      </div>
    </article>
  );
}

function buildRange(weeks: number): TimeRange {
  const to = new Date();
  const from = new Date(to);
  from.setDate(from.getDate() - weeks * 7);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}
