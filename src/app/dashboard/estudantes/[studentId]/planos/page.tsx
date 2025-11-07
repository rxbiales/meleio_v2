"use client";

import { useStudentLayout } from "@/components/student/useStudentLayout";

export default function StudentPlansPage() {
  const { aluno, series } = useStudentLayout();
  const snapshot = series.at(-1);

  const actions = [
    {
      title: "Check-ins focados em autorregulacao",
      owner: "Mentora SEL",
      due: "Proxima semana",
      bullets: [
        "Aplicar check-in breve antes das aulas de maior carga cognitiva.",
        "Registrar gatilhos positivos/negativos observados na ultima semana.",
        "Compartilhar estrategias de respiracao guiada para uso em casa.",
      ],
    },
    {
      title: "Fortalecer participacao colaborativa",
      owner: "Coordenacao pedagogica",
      due: "Proxima quinzena",
      bullets: [
        "Designar {nome} como corresponsavel por uma atividade em grupo.",
        "Dar feedback na hora sobre iniciativas de apoio aos colegas.",
        "Mapear momentos em que a participacao caiu abaixo de 60%.",
      ],
    },
    {
      title: "Alinhamento com a familia",
      owner: "Equipe de apoio",
      due: "Reuniao mensal",
      bullets: [
        "Compartilhar grafico do Pulso (atual: {pulso}) e engajamento ({engajamento}%).",
        "Combinado de rotina noturna para garantir descanso adequado.",
        "Reforcar sinais de alerta que precisam ser comunicados em ate 24h.",
      ],
    },
  ].map((action) => ({
    ...action,
    bullets: action.bullets.map((text) =>
      text
        .replace("{nome}", aluno.nome)
        .replace("{pulso}", String(snapshot?.pulso ?? "--"))
        .replace("{engajamento}", String(snapshot?.engajamento ?? "--"))
    ),
  }));

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
          Planos e acoes integradas
        </h2>
        <p className="text-sm text-gray-600">
          Itinerario com foco em {aluno.nome}, consolidando combinados entre
          mentoria, equipe pedagogica e familia.
        </p>
      </header>

      <div className="space-y-4">
        {actions.map((action) => (
          <article
            key={action.title}
            className="space-y-4 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Responsavel: <span className="font-semibold">{action.owner}</span>
                </p>
              </div>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700">
                {action.due}
              </span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {action.bullets.map((bullet, idx) => (
                <li key={`${action.title}-${idx}`} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
