"use client";

import { memo, type ReactElement, useState } from "react";
import { BookOpen, AlertCircle } from "lucide-react";
import { numberPtBr } from "@/lib/formatters";
import KpiCard from "./KpiCard";
import type { DashboardData } from "./types";

interface KpiListProps {
  alunosAcompanhados: number;
  atividades7d: DashboardData["atividades7d"];
}

function KpiListComponent({
  alunosAcompanhados,
  atividades7d,
}: KpiListProps): ReactElement {
  const { feitas, total } = atividades7d;

  const [abaAlunos, setAbaAlunos] = useState<"total" | "novos" | "risco">(
    "total"
  );
  const [abaAtividades, setAbaAtividades] = useState<
    "total" | "concluidas" | "pendentes"
  >("total");

  const valorAlunos = { total: alunosAcompanhados, novos: 15, risco: 8 };
  const valorAtividades = {
    total,
    concluidas: feitas,
    pendentes: total - feitas,
  };

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
      <div>
        <div className="flex gap-2 mb-2">
          {["total", "novos", "risco"].map((tab) => (
            <button
              key={tab}
              className={`
                px-4 py-1 rounded-full text-sm font-medium transition-colors
                ${
                  abaAlunos === tab
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }
              `}
              onClick={() => setAbaAlunos(tab as "total" | "novos" | "risco")}
            >
              {tab === "total"
                ? "Total"
                : tab === "novos"
                ? "Novos"
                : "Com risco"}
            </button>
          ))}
        </div>

        <KpiCard
          title="Alunos acompanhados"
          titleHint="Total de estudantes com dados ativos no período."
          value={`${numberPtBr.format(valorAlunos[abaAlunos])} alunos`}
          description="Atualizado há 3 horas"
          href="/dashboard/estudantes"
          icon={BookOpen}
          visual={
            <div className="flex flex-col justify-end items-center h-full gap-1 opacity-20">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              </div>
            </div>
          }
        />
      </div>

      <div>
        <div className="flex gap-2 mb-2">
          {["total", "concluidas", "pendentes"].map((tab) => (
            <button
              key={tab}
              className={`
                px-4 py-1 rounded-full text-sm font-medium transition-colors
                ${
                  abaAtividades === tab
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }
              `}
              onClick={() =>
                setAbaAtividades(tab as "total" | "concluidas" | "pendentes")
              }
            >
              {tab === "total"
                ? "Total"
                : tab === "concluidas"
                ? "Concluídas"
                : "Pendentes"}
            </button>
          ))}
        </div>

        <KpiCard
          title="Atividades (7 dias)"
          titleHint="Total de atividades realizadas na última semana."
          value={`${numberPtBr.format(
            valorAtividades[abaAtividades]
          )} atividades`}
          description=""
          href="/home/dashboard/atividades"
          icon={AlertCircle}
          visual={
            <div className="flex flex-col justify-end items-center h-full gap-1 opacity-20">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}

const KpiList = memo(KpiListComponent);

export default KpiList;
