"use client";

import Sidebar from "@/components/layout/Sidebar";
import Table from "@/components/layout/Table";

export default function StudentList() {
  const columns = [
    { key: "aluno", label: "Aluno" },
    { key: "turma", label: "Turma", align: "center" as const },
    {
      key: "pulso",
      label: "Pulso",
      align: "center" as const,
      render: (row: any) => (
        <span className="inline-flex items-center justify-center rounded-full border border-purple-600/30 bg-purple-600/10 px-2.5 py-0.5 text-[12px] font-semibold text-purple-700 lg:text-sm">
          {row.pulso}
        </span>
      ),
    },
    { key: "idade", label: "Idade", align: "center" as const },
    {
      key: "engajamento",
      label: "Engajamento",
      align: "right" as const,
      render: (row: any) => (
        <div className="inline-flex items-center gap-2">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-purple-100 lg:w-48">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-orange-500 to-yellow-400"
              style={{ width: `${row.engajamento}%` }}
            />
          </div>
          <span className="w-10 text-right text-sm font-semibold text-purple-700">
            {row.engajamento}%
          </span>
        </div>
      ),
    },
  ];

  const rows = [
    { aluno: "Ana Souza", turma: "2A", pulso: 78, idade: 15, engajamento: 86 },
    { aluno: "Bruno Lima", turma: "2A", pulso: 63, idade: 16, engajamento: 58 },
    {
      aluno: "Carla Prado",
      turma: "2B",
      pulso: 82,
      idade: 15,
      engajamento: 91,
    },
    {
      aluno: "Diego Martins",
      turma: "2B",
      pulso: 47,
      idade: 16,
      engajamento: 42,
    },
    {
      aluno: "Elisa Ramos",
      turma: "2C",
      pulso: 70,
      idade: 15,
      engajamento: 74,
    },
  ];

  return (
    <>
      <Sidebar />
      <section className="space-y-6 pb-10 lg:space-y-7 xl:space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900 lg:text-3xl">
            Turmas - Monitoramento
          </h1>
          <p className="text-sm text-gray-600 lg:text-base">
            Indicadores SEL atualizados por aluno.
          </p>
        </header>

        <div className="rounded-3xl bg-white/85 p-6 shadow-sm ring-1 ring-purple-100 backdrop-blur lg:p-8">
          <Table caption="Painel de alunos" columns={columns} rows={rows} />
        </div>
      </section>
    </>
  );
}
