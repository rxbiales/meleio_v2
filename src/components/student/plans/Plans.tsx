"use client";

import { useState } from "react";

import { Section } from "@/components/student/primitives/Section";
import { FilterBar } from "@/components/student/primitives/FilterBar";
import { DataList } from "@/components/student/primitives/DataList";
import { useStudent, useStudentId } from "@/components/student/StudentProvider";
import { useStudentPlans } from "@/components/student/dataHooks";
import type { PlanStatus } from "@/components/student/types";

const STATUS_OPTIONS: Array<{ value: PlanStatus | "all"; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "open", label: "A iniciar" },
  { value: "doing", label: "Em progresso" },
  { value: "done", label: "Concluido" },
];

export function StudentPlans() {
  const student = useStudent();
  const studentId = useStudentId();
  const [status, setStatus] = useState<PlanStatus | "all">("all");
  const plans = useStudentPlans(studentId, {
    status: status === "all" ? undefined : status,
  });

  return (
    <Section
      title={`Planos ativos para ${student.name}`}
      description="Acoes compartilhadas entre equipe e familia."
      actionsSlot={
        <FilterBar
          rightSlot={
            <select
              className="rounded-full border border-purple-200 bg-white px-3 py-1 text-sm text-purple-700"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as PlanStatus | "all")
              }
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          }
        />
      }
    >
      <DataList
        items={plans.data ?? []}
        isLoading={plans.isLoading}
        renderItem={(plan) => (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-900">
                {plan.title}
              </h3>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700">
                {plan.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {plan.owner
                ? `Responsavel: ${plan.owner}`
                : "Responsavel nao definido"}
              {plan.due ? ` · Limite: ${plan.due}` : ""}
            </p>
            {plan.actions?.length ? (
              <ul className="space-y-1 text-sm text-gray-700">
                {plan.actions.map((action) => (
                  <li key={action} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      />
    </Section>
  );
}
