"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Download } from "lucide-react";

import { useStudentLayout } from "@/components/student/useStudentLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MeloInsight from "@/components/insights/MeloInsight";

const DISC_PROFILE = [
  { axis: "Dominancia", value: 82 },
  { axis: "Influencia", value: 74 },
  { axis: "Estabilidade", value: 61 },
  { axis: "Conformidade", value: 68 },
] as const;

const COMPETENCY_PROFILE = [
  { axis: "Autogestao", score: 84 },
  { axis: "Colaboracao", score: 58 },
  { axis: "Comunicacao", score: 76 },
  { axis: "Pensamento Critico", score: 69 },
  { axis: "Criatividade", score: 88 },
] as const;

export default function StudentDimensionsPage() {
  const { aluno } = useStudentLayout();

  const behaviourSummary = {
    archetype: "Inovador pragmatico",
    tensions: "Alta Dominancia x baixa estabilidade emocional",
    narrative:
      "Opera com ritmo acelerado, prefere liderar iniciativas e se inquieta quando processos ficam lentos ou excessivamente normativos.",
    levers: [
      "Desafios com autonomia e entregaveis claros",
      "Feedback imediato para canalizar energia competitiva",
      "Mentoria focada em empatia situacional",
    ],
  };

  const competencyGaps = {
    balanceLabel: "Equilibrio entre criatividade e colaboracao",
    gap: "20pts entre Autogestao (84) e Colaboracao (58)",
    description:
      "Quanto maior o gap, maior o risco de rotinas individuais excederem a capacidade do grupo. Precisamos aproximar iniciativa propria de rituais coletivos.",
    nextSteps: [
      "Mapear papéis em equipe que exijam corresponsabilidade semanal",
      "Celebrar entregas colaborativas com o mesmo peso das individuais",
      "Explicitar contratos sociais antes das dinâmicas de co-criacao",
    ],
  };

  const campbellNarrative = {
    title: "De Campbell a Melo",
    description:
      "Segundo Campbell, {nome} oscila entre o Missionario visionario e o Rebelde que testa sistemas. O impulso criativo busca impacto, mas precisa de pertencimento para nao saturar relacoes.",
    traits: [
      "Busca proposito claro para sustentar esforco.",
      "Responde bem a desafios que combinem autonomia + reconhecimento.",
      "Pode demonstrar impaciencia quando divergencias nao evoluem para acao.",
    ],
  };

  const meloData = {
    bullets: [
      "**Dominancia elevada** e comunicacao fluida indicam protagonismo natural e agilidade para sintetizar ideias complexas.",
      "Existe um **descompasso entre iniciativa e constancia**: mergulha rapido em novas frentes, mas pode dispersar em processos longos.",
      "**Campbell** o descreve como \"inovador pragmatico\": desafia sistemas, mas precisa de propositos tangiveis para se manter engajado.",
      "Nas competencias SEL, a **autogestao** sustenta a autonomia, enquanto colaboracao pede rotinas mais intencionais.",
    ],
    acoes: [
      { label: "Planejar rotina semanal", href: "/dashboard/planos" },
      { label: "Ativar mentor colaborativo", href: "/dashboard/mentorias" },
    ],
  };

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">
            Dimensoes humanas
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 lg:text-3xl">
            Dimensoes do aluno
          </h1>
          <p className="text-sm text-gray-600 lg:text-base">
            Analise integrada de comportamento, competencias e identidade para{" "}
            {aluno.nome}.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-sm font-semibold text-purple-700"
        >
          <Download className="h-4 w-4" />
          Exportar PDF
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="backdrop-blur">
          <CardContent>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                Perfil DISC
              </p>
              <h2 className="text-xl font-semibold text-gray-900">
                Radar comportamental
              </h2>
              <p className="text-sm text-gray-600">
                Dominancia, Influencia, Estabilidade e Conformidade.
              </p>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={DISC_PROFILE} outerRadius="70%">
                  <PolarGrid stroke="#E9D5FF" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "#6B21A8" }} />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#a855f7" }}
                    axisLine={false}
                  />
                  <Radar
                    name="DISC"
                    dataKey="value"
                    fill="rgba(109, 40, 217, 0.35)"
                    stroke="#7c3aed"
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur">
          <CardContent>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                Competencias SEL
              </p>
              <h2 className="text-xl font-semibold text-gray-900">
                Radar de habilidades
              </h2>
              <p className="text-sm text-gray-600">
                Cruzamento entre Autogestao, Colaboracao, Comunicacao, Pensamento
                Critico e Criatividade.
              </p>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={COMPETENCY_PROFILE} outerRadius="70%">
                  <PolarGrid stroke="#FEE2E2" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "#ea580c" }} />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#fb923c" }}
                    axisLine={false}
                  />
                  <Radar
                    name="Competencias"
                    dataKey="score"
                    fill="rgba(249, 115, 22, 0.35)"
                    stroke="#f97316"
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                Sintese DISC
              </p>
              <h3 className="text-xl font-semibold text-gray-900">
                {behaviourSummary.archetype}
              </h3>
              <p className="text-sm text-gray-600">{behaviourSummary.narrative}</p>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                Tencao principal
              </p>
              <p className="text-base font-semibold text-purple-900">
                {behaviourSummary.tensions}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-purple-900/90">
                {behaviourSummary.levers.map((lever) => (
                  <li key={lever} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <span>{lever}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                Equilibrio de competencias
              </p>
              <h3 className="text-xl font-semibold text-gray-900">
                {competencyGaps.balanceLabel}
              </h3>
              <p className="text-sm text-gray-600">{competencyGaps.description}</p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                Gap identificado
              </p>
              <p className="text-base font-semibold text-orange-900">
                {competencyGaps.gap}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-orange-900/90">
                {competencyGaps.nextSteps.map((step) => (
                  <li key={step} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="bg-gradient-to-r from-purple-600/90 via-purple-500/80 to-orange-400/80 text-white">
        <CardContent className="space-y-4 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              {campbellNarrative.title}
            </p>
            <h3 className="text-2xl font-semibold">
              Identidade narrativa de {aluno.nome}
            </h3>
            <p className="text-sm text-white/80">
              {campbellNarrative.description.replace("{nome}", aluno.nome)}
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {campbellNarrative.traits.map((trait) => (
              <div
                key={trait}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-relaxed"
              >
                {trait}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <MeloInsight melo={meloData} />
    </section>
  );
}
