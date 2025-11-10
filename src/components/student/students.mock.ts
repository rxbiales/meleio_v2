import type {
  DimensionScore,
  Evidence,
  Plan,
  PlanStatus,
  Student,
  StudentContextValue,
  StudentId,
  TimeRange,
  TimelineData,
  TimelinePoint,
} from "@/components/student/types";

export const STUDENTS: ReadonlyArray<Student> = [
  {
    id: "ana",
    name: "Ana Souza",
    classGroup: "2A",
    age: 15,
    pulse: 78,
    engagement: 86,
    ivs: 0.72,
  },
  {
    id: "bruno",
    name: "Bruno Lima",
    classGroup: "2A",
    age: 16,
    pulse: 63,
    engagement: 58,
    ivs: 0.44,
  },
  {
    id: "carla",
    name: "Carla Prado",
    classGroup: "2B",
    age: 15,
    pulse: 82,
    engagement: 91,
    ivs: 0.79,
  },
  {
    id: "diego",
    name: "Diego Martins",
    classGroup: "2B",
    age: 16,
    pulse: 47,
    engagement: 42,
    ivs: 0.31,
  },
  {
    id: "elisa",
    name: "Elisa Ramos",
    classGroup: "2C",
    age: 15,
    pulse: 70,
    engagement: 74,
    ivs: 0.6,
  },
];

type InternalPoint = {
  date: string;
  pulse: number;
  engagement: number;
  competencies: Record<string, number>;
};

const SERIES_CACHE = new Map<StudentId, InternalPoint[]>();

const COMP_KEYS = [
  { key: "ar", label: "Autogestao" },
  { key: "em", label: "Empatia" },
  { key: "re", label: "Responsabilidade" },
  { key: "co", label: "Colaboracao" },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function buildSeries(student: Student): InternalPoint[] {
  const weeks = 30;
  const today = new Date();
  const items: InternalPoint[] = [];
  let pulse = student.pulse;
  let engagement = student.engagement;
  const competencies: Record<string, number> = {
    ar: clamp(student.pulse + randomBetween(-10, 10), 0, 100),
    em: clamp(student.engagement + randomBetween(-8, 8), 0, 100),
    re: clamp(student.pulse + randomBetween(-12, 12), 0, 100),
    co: clamp(student.engagement + randomBetween(-6, 6), 0, 100),
  };

  for (let idx = weeks; idx >= 0; idx -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - idx * 7);
    pulse = clamp(Math.round(pulse + randomBetween(-6, 6)), 40, 100);
    engagement = clamp(Math.round(engagement + randomBetween(-8, 8)), 30, 100);
    for (const key of Object.keys(competencies)) {
      competencies[key] = clamp(
        Math.round(competencies[key] + randomBetween(-5, 5)),
        0,
        100
      );
    }

    items.push({
      date: date.toISOString().slice(0, 10),
      pulse,
      engagement,
      competencies: { ...competencies },
    });
  }

  return items;
}

function ensureSeries(studentId: StudentId): InternalPoint[] {
  if (SERIES_CACHE.has(studentId)) return SERIES_CACHE.get(studentId)!;
  const student = STUDENTS.find((item) => item.id === studentId);
  if (!student) return [];
  const series = buildSeries(student);
  SERIES_CACHE.set(studentId, series);
  return series;
}

function sliceRange(points: InternalPoint[], range: TimeRange): InternalPoint[] {
  const from = new Date(range.from).getTime();
  const to = new Date(range.to).getTime();
  return points.filter((point) => {
    const ts = new Date(point.date).getTime();
    return ts >= from && ts <= to;
  });
}

function toTimelinePoints(
  points: InternalPoint[],
  key: keyof InternalPoint | "competency",
  competencyKey?: string
): TimelinePoint[] {
  return points.map((point, index) => ({
    id: `${point.date}-${key}-${competencyKey ?? "base"}`,
    date: point.date,
    value:
      key === "competency" && competencyKey
        ? point.competencies[competencyKey]
        : (point[key as keyof InternalPoint] as number),
    tag: competencyKey ?? key.toString(),
  }));
}

export function fetchStudentTimeline(studentId: StudentId, range: TimeRange): TimelineData {
  const base = ensureSeries(studentId);
  const points = sliceRange(base, range);
  return {
    pulse: toTimelinePoints(points, "pulse"),
    engagement: toTimelinePoints(points, "engagement"),
    competencies: COMP_KEYS.reduce<Record<string, TimelinePoint[]>>(
      (acc, item) => ({
        ...acc,
        [item.key]: toTimelinePoints(points, "competency", item.key),
      }),
      {}
    ),
  };
}

export function fetchStudentDimensions(
  studentId: StudentId,
  range: TimeRange
): DimensionScore[] {
  const points = sliceRange(ensureSeries(studentId), range);
  const recent = points.at(-1);
  const previous = points.at(-5) ?? points[0];
  if (!recent || !previous) return [];
  return COMP_KEYS.map((item) => {
    const value = recent.competencies[item.key];
    const delta = value - previous.competencies[item.key];
    return {
      id: `${studentId}-${item.key}`,
      key: item.key,
      label: item.label,
      value: Number(value.toFixed(0)),
      delta: Number(delta.toFixed(1)),
    };
  });
}

const BASE_EVIDENCES: Record<StudentId, Evidence[]> = {
  ana: [
    {
      id: "ana-1",
      date: "2025-11-04",
      label: "Contato com a familia (feedback positivo)",
      tags: ["familia", "feedback"],
    },
    {
      id: "ana-2",
      date: "2025-11-06",
      label: "Mediacao com orientador SEL",
      tags: ["mediacao"],
    },
    {
      id: "ana-3",
      date: "2025-11-08",
      label: "Projeto integrador - destaque de colaboracao",
      tags: ["projeto", "colaboracao"],
    },
  ],
  bruno: [],
  carla: [],
  diego: [],
  elisa: [],
};

function cloneEvidence(studentId: StudentId): Evidence[] {
  const fallback = BASE_EVIDENCES.ana;
  return fallback.map((item, index) => ({
    ...item,
    id: `${studentId}-evidence-${index}`,
  }));
}

export function fetchStudentEvidences(
  studentId: StudentId,
  filters: { tags?: string[]; query?: string }
): Evidence[] {
  const list = BASE_EVIDENCES[studentId]?.length
    ? BASE_EVIDENCES[studentId]!
    : cloneEvidence(studentId);
  return list.filter((item) => {
    const matchesQuery =
      !filters.query ||
      item.label.toLowerCase().includes(filters.query.toLowerCase());
    const matchesTag =
      !filters.tags || filters.tags.length === 0
        ? true
        : filters.tags.some((tag) => item.tags?.includes(tag));
    return matchesQuery && matchesTag;
  });
}

const PLAN_LIBRARY: Array<Plan & { templateStatus: PlanStatus }> = [
  {
    id: "plan-autonomy",
    title: "Rotina de autorregulacao",
    status: "open",
    owner: "Mentora SEL",
    due: "2025-11-15",
    actions: [
      "Check-in breve nas aulas de maior carga cognitiva.",
      "Registro de gatilhos positivos e negativos semanal.",
      "Pratica de respiracao guiada com familia.",
    ],
    templateStatus: "open",
  },
  {
    id: "plan-collab",
    title: "Fortalecer colaboracao em grupo",
    status: "doing",
    owner: "Coordenacao pedagogica",
    due: "2025-11-25",
    actions: [
      "Definir papeis fixos nas atividades de projeto.",
      "Aplicar feedback rapido ao final das dinâmicas.",
      "Compartilhar evidencias de apoio entre pares.",
    ],
    templateStatus: "doing",
  },
  {
    id: "plan-family",
    title: "Ciclo com familia",
    status: "done",
    owner: "Equipe de apoio",
    due: "2025-12-05",
    actions: [
      "Revisar indicadores semanais com responsavel.",
      "Ajustar rotina de descanso e estudo.",
      "Definir sinais de alerta e canal rapido.",
    ],
    templateStatus: "done",
  },
];

export function fetchStudentPlans(
  studentId: StudentId,
  filters: { status?: PlanStatus; owner?: string }
): Plan[] {
  return PLAN_LIBRARY.filter((plan) => {
    const matchesStatus = filters.status
      ? plan.templateStatus === filters.status
      : true;
    const matchesOwner = filters.owner
      ? plan.owner?.toLowerCase().includes(filters.owner.toLowerCase())
      : true;
    return matchesStatus && matchesOwner;
  }).map((plan, index) => ({
    ...plan,
    id: `${studentId}-${plan.id}-${index}`,
  }));
}

export function resolveStudentId(param: string): StudentId | null {
  const index = Number(param);
  if (!Number.isNaN(index) && index >= 1 && index <= STUDENTS.length) {
    return STUDENTS[index - 1].id;
  }
  const lower = param.toLowerCase();
  return STUDENTS.find((student) => student.id === lower)?.id ?? null;
}

export function getStudentContextValue(studentId: StudentId): StudentContextValue | null {
  const student = STUDENTS.find((item) => item.id === studentId);
  if (!student) return null;
  return { studentId, student };
}
