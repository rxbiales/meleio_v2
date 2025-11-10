"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { StudentContextValue, StudentId, Student } from "@/components/student/types";

const StudentContext = createContext<StudentContextValue | null>(null);

interface StudentProviderProps {
  value: StudentContextValue;
  children: ReactNode;
}

export function StudentProvider({ value, children }: StudentProviderProps) {
  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent(): Student {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within StudentProvider");
  }
  return context.student;
}

export function useStudentId(): StudentId {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentId must be used within StudentProvider");
  }
  return context.studentId;
}
