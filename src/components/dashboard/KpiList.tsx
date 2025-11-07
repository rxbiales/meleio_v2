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

  const valorAlunos = { total: alunosAcompanhados, novos: 15, risco: 8 };
  const engajamento = total > 0 ? Math.round((feitas / total) * 100) : 0;

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 shadow-md transition-all">
        <div className="bg-white rounded-2xl p-4">
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

          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
            <KpiCard
              title="Alunos acompanhados"
              titleHint="Total de estudantes com dados ativos no período."
              value={`${numberPtBr.format(valorAlunos[abaAlunos])} alunos`}
              description="Atualizado há 3 horas"
              href="/dashboard/estudantes"
              icon={BookOpen}
              visual={<div />}
            />
          </div>
        </div>
      </div>

      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 shadow-md transition-all">
        <div className="bg-white rounded-[calc(1rem-2px)] p-4 flex flex-col justify-between h-full">
          <h3 className="text-sm font-medium text-purple-700 mb-2">
            Engajamento com atividades
          </h3>

          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
            <KpiCard
              title="Atividades (7 dias)"
              titleHint="Total de atividades realizadas na última semana."
              value={`${engajamento}% de engajamento`}
              description=""
              href="/home/dashboard/atividades"
              icon={AlertCircle}
              visual={<div />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const KpiList = memo(KpiListComponent);
export default KpiList;
