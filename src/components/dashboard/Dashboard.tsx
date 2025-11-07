"use client";

import type { ReactElement } from "react";
import Sidebar from "@/components/layout/Sidebar";
import PulseHero from "./PulseHero";
import KpiList from "./KpiList";
import MeleioRoomCard from "./MeleioRoomCard";
import FamiliesSummaryCard from "./FamiliesSummaryCard";
import MeloInsights from "../layout/MeloInsights";
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
      <Sidebar />
      <section className="space-y-8 pt-2 md:space-y-9 md:pt-4 xl:space-y-10">
        <PulseHero pulse={pulse} />
        <KpiList
          alunosAcompanhados={alunosAcompanhados}
          atividades7d={atividades7d}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
          <MeleioRoomCard
            agenda={agenda}
            occupancyPercent={agendaOcupacaoPercent}
          />
          <FamiliesSummaryCard familias={familias} />
        </div>

        <MeloInsights melo={melo} />
      </section>
    </div>
  );
}

export type { DashboardData } from "./types";
