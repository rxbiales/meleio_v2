import DashboardPage, {
  type DashboardData,
} from "@/components/dashboard/Dashboard";
import { MELEIO_PALETTE } from "@/lib/constants";

const data: DashboardData = {
  pulse: {
    value: 78,
    target: 80,
    delta7d: 2,
    macro: [
      {
        name: "Em progresso positivo: Alunos com melhora constante",
        value: 38,
        color: MELEIO_PALETTE.purple,
      },
      { name: "Estáveis: Sem grandes variações", value: 22, color: "#F59E0B" },
      {
        name: "Com queda leve: Pequena redução no desempenho",
        value: 18,
        color: MELEIO_PALETTE.orange,
      },
      {
        name: "Atenção crítica: Necessitam acompanhamento próximo",
        value: 12,
        color: "#EF4444",
      },
      {
        name: "Sem dados recentes: Sem atualizações nos últimos dias",
        value: 10,
        color: "#94A3B8",
      },
    ],
  },
  alunosAcompanhados: 1312,
  atividades7d: {
    feitas: 80,
    total: 92,
  },
  familias: {
    novas: 7,
    confirmadas: 21,
    pendentes: 3,
    urgentes: 1,
  },
  agenda: [
    {
      whenLabel: "Hoje às 14:00",
      turma: "Turma 7A",
      title: "Acolhimento colaborativo",
      href: "/home/dashboard/atividades/7A",
    },
    {
      whenLabel: "Amanhã às 09:30",
      turma: "Turma 8B",
      title: "PULSO guiado com famílias",
      href: "/home/dashboard/atividades/8B",
    },
    {
      whenLabel: "Sexta às 11:10",
      turma: "Turma 6C",
      title: "Oficinas de regulação emocional",
      href: "/home/dashboard/atividades/6C",
    },
  ],
  agendaOcupacaoPercent: 82,
  melo: {
    bullets: [
      "**Oscilação do PULSO ≥ 12%** em 48h nas turmas 7A e 8B.",
      "**Check-ins familiares −18%** na semana.",
      "**Ocorrências leves ↑** (participação/passividade) em sala.",
      "**Assiduidade SEL** abaixo da mediana do trimestre.",
    ],
    acoes: [
      {
        label: "Aplicar check-in agora",
        href: "/home/checkin/hoje",
      },
      {
        label: "Rever plano da 7A",
        href: "/home/planos/7A",
      },
    ],
  },
};

export default function Page() {
  return <DashboardPage data={data} />;
}
