"use client";

import { useContext } from "react";

import {
  StudentLayoutContext,
  type StudentLayoutData,
} from "@/components/student/StudentLayoutContext";

export function useStudentLayout(): StudentLayoutData {
  const context = useContext(StudentLayoutContext);
  if (!context) {
    throw new Error(
      "useStudentLayout must be used within a StudentLayoutProvider"
    );
  }
  return context;
}
