import DashboardPage from "@/components/dashboard/Dashboard";
import type { DashboardData } from "@/components/dashboard/Dashboard";

const palette = {
  yellow: "#FACC15",
  orange: "#F97316",
  purple: "#7C3AED",
};

const data: DashboardData = {
  palette,
  pulse: {
    value: 78,
    target: 80,
    delta7d: 2,
    macro: [
      { name: "Em progresso positivo", value: 38, color: palette.purple },
      { name: "Estáveis", value: 22, color: "#F59E0B" },
      { name: "Com queda leve", value: 18, color: palette.orange },
      { name: "Atenção crítica", value: 12, color: "#EF4444" },
      { name: "Sem dados recentes", value: 10, color: "#94A3B8" },
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
      tooltip: "Sessão agendada para hoje.",
    },
    {
      whenLabel: "Amanhã às 09:30",
      turma: "Turma 8B",
      title: "PULSO guiado com famílias",
      href: "/home/dashboard/atividades/8B",
      tooltip: "Sessão com famílias para 8B.",
    },
    {
      whenLabel: "Sexta às 11:10",
      turma: "Turma 6C",
      title: "Oficinas de regulação emocional",
      href: "/home/dashboard/atividades/6C",
      tooltip: "Oficina de regulação para 6C.",
    },
  ],
  agendaOcupacao: {
    percent: 82,
  },
  melo: {
    bullets: [
      "**Oscilação do PULSO ≥ 12%** em 48h nas turmas 7A e 8B.",
      "**Check-ins familiares −18%** na semana.",
      "**Ocorrências leves ↑** (participação/passividade) em sala.",
      "**Assiduidade SEL** abaixo da mediana do trimestre.",
    ],
    bulletTooltips: [
      "Variação além do limite de estabilidade em 48 horas.",
      "Queda no engajamento da família com check-ins.",
      "Aumento de relatos de baixa participação.",
      "Presença em atividades SEL abaixo da mediana do trimestre.",
    ],
    recomendacoes: [
      {
        text: "Aplicar check-in de humor (3 itens) no início das aulas de hoje.",
        tooltip:
          "Três perguntas rápidas de humor no início da aula.",
      },
      {
        text: "Executar rotina breve de regulação (5–7 min) antes da avaliação.",
        tooltip:
          "Respiração guiada/alongamento breve antes de avaliações.",
      },
      {
        text: "Contatar responsáveis sem check-in há 7 dias.",
        tooltip:
          "Contato ativo para quem está 7 dias sem registrar check-in.",
      },
    ],
    acoes: [
      {
        label: "Aplicar check-in agora",
        href: "/home/checkin/hoje",
        tooltip: "Iniciar check-in em lote para as turmas do dia.",
      },
      {
        label: "Rever plano da 7A",
        href: "/home/planos/7A",
        tooltip: "Abrir os planos e ajustar intervenções da turma 7A.",
      },
    ],
  },
};

export default function Page() {
  return <DashboardPage data={data} />;
}
