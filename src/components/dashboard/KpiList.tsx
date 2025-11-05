"use client";

import { memo, type ReactElement } from "react";
import { BookOpen, AlertCircle } from "lucide-react";
import { numberPtBr } from "@/lib/formatters";
import { MELEIO_PALETTE } from "@/lib/constants";
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
  const perc7d = total === 0 ? 0 : Math.round((feitas / total) * 100);

  return (
    <section
      data-section="secondary-kpis"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8"
    >
      <KpiCard
        title="Alunos acompanhados"
        titleHint="Total de estudantes com dados ativos no periodo."
        value={numberPtBr.format(alunosAcompanhados)}
        description="Atualizado ha 3 horas"
        href="/dashboard/estudantes"
        icon={BookOpen}
        visual={
          <div className="h-2 w-full rounded-full bg-purple-100">
            <div
              className="h-2 rounded-full bg-purple-600"
              style={{ width: "100%" }}
              aria-hidden
            />
          </div>
        }
      />

      <KpiCard
        title="Atividades (7 dias)"
        titleHint="Planejamento versus execucao das intervencoes."
        value={`${numberPtBr.format(feitas)}/${numberPtBr.format(total)}`}
        description="Execucao das intervencoes previstas"
        href="/home/dashboard/atividades"
        icon={AlertCircle}
        visual={
          <div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full transition-[width] duration-300"
                style={{
                  width: `${perc7d}%`,
                  background: MELEIO_PALETTE.orange,
                }}
                aria-label={`Conclusao: ${perc7d}%`}
              />
            </div>
            <div className="mt-1 text-xs text-gray-600">
              {perc7d}% concluidas
            </div>
          </div>
        }
      />
    </section>
  );
}

const KpiList = memo(KpiListComponent);

export default KpiList;
