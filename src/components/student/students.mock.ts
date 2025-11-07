export type StudentId = "ana" | "bruno" | "carla" | "diego" | "elisa";

export const STUDENTS = [
  {
    id: "ana",
    nome: "Ana Souza",
    turma: "2A",
    idade: 15,
    pulso: 78,
    engajamento: 86,
    ivs: 0.72,
  },
  {
    id: "bruno",
    nome: "Bruno Lima",
    turma: "2A",
    idade: 16,
    pulso: 63,
    engajamento: 58,
    ivs: 0.44,
  },
  {
    id: "carla",
    nome: "Carla Prado",
    turma: "2B",
    idade: 15,
    pulso: 82,
    engajamento: 91,
    ivs: 0.79,
  },
  {
    id: "diego",
    nome: "Diego Martins",
    turma: "2B",
    idade: 16,
    pulso: 47,
    engajamento: 42,
    ivs: 0.31,
  },
  {
    id: "elisa",
    nome: "Elisa Ramos",
    turma: "2C",
    idade: 15,
    pulso: 70,
    engajamento: 74,
    ivs: 0.6,
  },
] as const;

export function resolveId(param: string): StudentId | null {
  const byIndex = Number(param);
  if (!Number.isNaN(byIndex) && byIndex >= 1 && byIndex <= STUDENTS.length) {
    return STUDENTS[byIndex - 1].id;
  }
  const slug = param.toLowerCase();
  return (STUDENTS.find((s) => s.id === slug)?.id ?? null) as StudentId | null;
}

export type SeriesPoint = {
  date: string; // YYYY-MM-DD
  pulso: number; // 0..100
  ivs: number; // 0..1
  engajamento: number; // 0..100
  ar: number; // autorregulacao
  em: number; // empatia
  re: number; // responsabilidade
  co: number; // colaboracao
};

export type EventItem = {
  date: string;
  hour?: string;
  title: string;
  type: "mediacao" | "familia" | "atividade" | "saude" | "registro";
  note?: string;
  actor?: string;
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function randBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number) {
  return Math.floor(randBetween(min, max + 1));
}

export function buildSeries(opts: {
  weeks?: number;
  pulso: number;
  ivs: number;
  engajamento: number;
}): SeriesPoint[] {
  const { weeks = 24, pulso, ivs, engajamento } = opts;
  const today = new Date();
  const pulseValues: number[] = [];
  const pulseChanges: number[] = [];

  let pulseCurrent = clamp(Math.round(pulso + randBetween(-8, 8)), 0, 100);
  let trendTimer = 0;
  let trendSlope = randBetween(-3.5, 3.5);

  for (let idx = 0; idx < weeks; idx++) {
    if (trendTimer <= 0) {
      trendSlope = randBetween(-3.5, 3.5);
      if (Math.abs(trendSlope) < 1) {
        trendSlope = trendSlope < 0 ? -1.4 : 1.4;
      }
      trendTimer = randInt(2, 4);
    }

    const noise = randBetween(-12, 12) * 0.6;
    const change = clamp(trendSlope + noise, -14, 14);
    pulseCurrent = clamp(Math.round(pulseCurrent + change), 0, 100);

    pulseValues.push(pulseCurrent);
    pulseChanges.push(change);
    trendTimer -= 1;
  }

  const diff = pulso - pulseValues[pulseValues.length - 1];
  for (let idx = 0; idx < pulseValues.length; idx++) {
    const factor = (idx + 1) / pulseValues.length;
    pulseValues[idx] = clamp(
      Math.round(pulseValues[idx] + diff * factor * 0.6),
      0,
      100
    );
    if (idx === 0) {
      pulseChanges[idx] = 0;
    } else {
      pulseChanges[idx] = clamp(
        pulseValues[idx] - pulseValues[idx - 1],
        -14,
        14
      );
    }
  }

  const correlation = {
    ar: randBetween(0.22, 0.38),
    em: randBetween(0.1, 0.3),
    re: randBetween(0.18, 0.35),
    co: randBetween(0.2, 0.4),
  };

  let arCurrent = clamp(pulseValues[0] + 8 + randBetween(-6, 6), 0, 100);
  let emCurrent = clamp(pulseValues[0] + randBetween(-8, 8), 0, 100);
  let reCurrent = clamp(pulseValues[0] - 6 + randBetween(-7, 7), 0, 100);
  let coCurrent = clamp(pulseValues[0] + 4 + randBetween(-7, 7), 0, 100);

  let engCurrent = clamp(engajamento + randBetween(-12, 12), 0, 100);
  let ivsCurrent = clamp(
    Number((ivs + randBetween(-0.08, 0.08)).toFixed(2)),
    0,
    1
  );

  const series: SeriesPoint[] = [];

  for (let idx = 0; idx < pulseValues.length; idx++) {
    const pulseValue = pulseValues[idx];
    const pulseChange = idx === 0 ? 0 : pulseChanges[idx];
    const correlationFlag = Math.random() < 0.65 ? 1 : 0;

    const competencyUpdate = (
      current: number,
      coeff: number,
      independentAmp: number
    ) => {
      const correlated = correlationFlag * coeff * pulseChange;
      const noise = randBetween(-independentAmp, independentAmp);
      const microDrift =
        idx % 6 === 0
          ? randBetween(-4, 4)
          : idx % 5 === 0
          ? randBetween(-2, 2)
          : 0;
      return clamp(
        Math.round(current + correlated + noise + microDrift),
        0,
        100
      );
    };

    arCurrent = competencyUpdate(arCurrent, correlation.ar, 11);
    emCurrent = competencyUpdate(emCurrent, correlation.em, 10);
    reCurrent = competencyUpdate(reCurrent, correlation.re, 12);
    coCurrent = competencyUpdate(coCurrent, correlation.co, 9);

    const engNoise = randBetween(-15, 15) * 0.55;
    const engDrift =
      idx % 7 === 0
        ? randBetween(-5, 5)
        : idx % 3 === 0
        ? randBetween(-2, 2)
        : 0;
    engCurrent = clamp(
      Math.round(engCurrent + engNoise + pulseChange * 0.45 + engDrift),
      0,
      100
    );

    const ivsNoise = randBetween(-0.12, 0.12) * 0.6;
    const ivsDrift = (pulseChange / 100) * randBetween(0.08, 0.16);
    ivsCurrent = clamp(
      Number((ivsCurrent + ivsNoise + ivsDrift).toFixed(2)),
      0,
      1
    );

    const date = new Date(today);
    date.setDate(today.getDate() - (pulseValues.length - 1 - idx) * 7);

    series.push({
      date: date.toISOString().slice(0, 10),
      pulso: pulseValue,
      ivs: ivsCurrent,
      engajamento: engCurrent,
      ar: arCurrent,
      em: emCurrent,
      re: reCurrent,
      co: coCurrent,
    });
  }

  return series;
}

export function mockEvents(studentId: StudentId): EventItem[] {
  const base: EventItem[] = [
    {
      date: "2025-10-28",
      hour: "09:20",
      title: "Mediacao com a orientadora",
      type: "mediacao",
      actor: "Prof. Karina",
    },
    {
      date: "2025-10-30",
      hour: "14:00",
      title: "Contato com a familia",
      type: "familia",
      actor: "Responsavel",
    },
    {
      date: "2025-11-01",
      hour: "10:15",
      title: "Atividade de projeto integrador",
      type: "atividade",
    },
    {
      date: "2025-11-03",
      hour: "08:00",
      title: "Registro de acompanhamento",
      type: "registro",
    },
  ];
  if (studentId === "diego") {
    base.push({
      date: "2025-11-04",
      hour: "11:30",
      title: "Encaminhamento saude escolar",
      type: "saude",
      actor: "Equipe de Apoio",
    });
  }
  return base;
}

export function getStudentDataset(paramId: string) {
  const id = resolveId(paramId);
  if (!id) return null;
  const s = STUDENTS.find((x) => x.id === id)!;
  return {
    aluno: { nome: s.nome, turma: s.turma, idade: s.idade },
    series: buildSeries({
      pulso: s.pulso,
      ivs: s.ivs,
      engajamento: s.engajamento,
    }),
    events: mockEvents(id),
  };
}
