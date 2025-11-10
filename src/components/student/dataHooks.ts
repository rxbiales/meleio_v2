"use client";

import { useMemo } from "react";

import type {
  DimensionScore,
  Evidence,
  Plan,
  PlanStatus,
  StudentId,
  TimeRange,
  TimelineData,
} from "@/components/student/types";
import {
  fetchStudentDimensions,
  fetchStudentEvidences,
  fetchStudentPlans,
  fetchStudentTimeline,
} from "@/components/student/students.mock";

type HookResult<T> = {
  data: T | null;
  isLoading: boolean;
};

type EvidenceFilters = {
  query?: string;
  tags?: string[];
};

type PlanFilters = {
  status?: PlanStatus;
  owner?: string;
};

export function useStudentTimeline(
  studentId: StudentId,
  range: TimeRange
): HookResult<TimelineData> {
  const data = useMemo(() => {
    if (!studentId) return null;
    return fetchStudentTimeline(studentId, range);
  }, [studentId, range.from, range.to]);

  return { data, isLoading: false };
}

export function useStudentDimensions(
  studentId: StudentId,
  range: TimeRange
): HookResult<DimensionScore[]> {
  const data = useMemo(() => {
    if (!studentId) return null;
    return fetchStudentDimensions(studentId, range);
  }, [studentId, range.from, range.to]);

  return { data, isLoading: false };
}

export function useStudentEvidences(
  studentId: StudentId,
  filters: EvidenceFilters = {}
): HookResult<Evidence[]> {
  const queryKey = filters.query ?? "";
  const tagsKey = (filters.tags ?? []).join("|");

  const data = useMemo(() => {
    if (!studentId) return null;
    return fetchStudentEvidences(studentId, filters);
  }, [studentId, queryKey, tagsKey]);

  return { data, isLoading: false };
}

export function useStudentPlans(
  studentId: StudentId,
  filters: PlanFilters = {}
): HookResult<Plan[]> {
  const statusKey = filters.status ?? "all";
  const ownerKey = filters.owner ?? "";

  const data = useMemo(() => {
    if (!studentId) return null;
    return fetchStudentPlans(studentId, filters);
  }, [studentId, statusKey, ownerKey]);

  return { data, isLoading: false };
}
