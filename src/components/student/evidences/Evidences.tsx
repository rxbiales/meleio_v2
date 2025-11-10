"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Section } from "@/components/student/primitives/Section";
import { FilterBar } from "@/components/student/primitives/FilterBar";
import { DataList } from "@/components/student/primitives/DataList";
import { useStudent, useStudentId } from "@/components/student/StudentProvider";
import { useStudentEvidences } from "@/components/student/dataHooks";

export function StudentEvidences() {
  const student = useStudent();
  const studentId = useStudentId();
  const [query, setQuery] = useState("");
  const evidences = useStudentEvidences(studentId, { query });

  const items = useMemo(() => evidences.data ?? [], [evidences.data]);

  return (
    <Section
      title={`Evidencias de ${student.name}`}
      description="Registros recentes e tags associadas."
      actionsSlot={
        <FilterBar
          leftSlot={<Search className="h-4 w-4 text-purple-500" />}
          rightSlot={
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar..."
              className="h-9 w-48 rounded-full border border-purple-200 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            />
          }
        />
      }
    >
      <DataList
        items={items}
        isLoading={evidences.isLoading}
        renderItem={(item) => (
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-purple-500">
              {item.tags?.join(", ")}
            </p>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-900">
                {item.label}
              </h3>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
          </div>
        )}
      />
    </Section>
  );
}
