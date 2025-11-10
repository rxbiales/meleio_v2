export type StudentId = "ana" | "bruno" | "carla" | "diego" | "elisa";

export type Student = {
  id: StudentId;
  name: string;
  classGroup: string;
  age?: number;
  pulse: number;
  engagement: number;
  ivs: number;
};

export type StudentContextValue = {
  studentId: StudentId;
  student: Student;
};

export type TimeRange = {
  from: string; // ISO date
  to: string; // ISO date
};

export type TimelinePoint = {
  id: string;
  date: string; // ISO date
  value: number;
  tag?: string;
};

export type TimelineData = {
  pulse: TimelinePoint[];
  engagement: TimelinePoint[];
  competencies: Record<string, TimelinePoint[]>;
};

export type DimensionScore = {
  id: string;
  key: string;
  label: string;
  value: number;
  delta?: number;
};

export type Evidence = {
  id: string;
  date: string;
  label: string;
  tags?: string[];
  url?: string;
};

export type PlanStatus = "open" | "doing" | "done";

export type Plan = {
  id: string;
  title: string;
  status: PlanStatus;
  owner?: string;
  due?: string;
  actions?: string[];
};
