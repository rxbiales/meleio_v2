"use client";

import type { ReactElement } from "react";
import Sidebar from "@/components/layout/Sidebar";
import PulseHero from "./PulseHero";
import KpiList from "./KpiList";
import MeleioRoomCard from "./MeleioRoomCard";
import FamiliesSummaryCard from "./FamiliesSummaryCard";
import MeloInsights from "./MeloInsights";
import type { DashboardData } from "./types";

interface DashboardPageProps {
  data: DashboardData;
}

export default function DashboardPage({
  data,
}: DashboardPageProps): ReactElement {
  const {
    pulse,
    alunosAcompanhados,
    atividades7d,
    familias,
    agenda,
    agendaOcupacaoPercent,
    melo,
  } = data;

  return (
    <div className="min-h-screen bg-gray-50" data-page="dashboard">
      {/* Shell principal da pagina com o sidebar fixo */}
      <Sidebar />
      <main className="pt-6 md:pt-8">
        <div className="space-y-8">
          <PulseHero pulse={pulse} />
          <KpiList
            alunosAcompanhados={alunosAcompanhados}
            atividades7d={atividades7d}
          />

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MeleioRoomCard
              agenda={agenda}
              occupancyPercent={agendaOcupacaoPercent}
            />
            <FamiliesSummaryCard familias={familias} />
          </section>

          <MeloInsights melo={melo} />
        </div>
      </main>
    </div>
  );
}

export type { DashboardData } from "./types";
