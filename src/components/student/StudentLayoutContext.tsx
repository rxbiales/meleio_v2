"use client";

import { createContext, type ReactNode } from "react";

import type {
  EventItem,
  SeriesPoint,
} from "@/components/student/students.mock";

export type StudentLayoutData = {
  studentId: string;
  aluno: { nome: string; turma: string; idade?: number };
  series: SeriesPoint[];
  events: EventItem[];
};

export const StudentLayoutContext = createContext<StudentLayoutData | null>(
  null
);

export function StudentLayoutProvider({
  value,
  children,
}: {
  value: StudentLayoutData;
  children: ReactNode;
}) {
  return (
    <StudentLayoutContext.Provider value={value}>
      {children}
    </StudentLayoutContext.Provider>
  );
}
