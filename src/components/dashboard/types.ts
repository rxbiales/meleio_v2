export type DashboardData = {
  pulse: {
    value: number;
    target: number;
    delta7d: number;
    macro: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  };
  alunosAcompanhados: number;
  atividades7d: {
    feitas: number;
    total: number;
  };
  familias: {
    novas: number;
    confirmadas: number;
    pendentes: number;
    urgentes: number;
  };
  agenda: Array<{
    whenLabel: string;
    turma: string;
    title: string;
    href: string;
  }>;
  agendaOcupacaoPercent: number;
  melo: {
    bullets: string[];
    acoes: Array<{
      label: string;
      href: string;
    }>;
  };
};
