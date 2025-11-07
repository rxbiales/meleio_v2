"use client";

import { useStudentLayout } from "@/components/student/useStudentLayout";

const EVENT_LABEL: Record<
  "mediacao" | "familia" | "atividade" | "saude" | "registro",
  string
> = {
  mediacao: "Mediacao",
  familia: "Contato familia",
  atividade: "Atividade",
  saude: "Saude",
  registro: "Registro",
};

export default function StudentEvidencesPage() {
  const { aluno, events } = useStudentLayout();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
          Evidencias recentes
        </h2>
        <p className="text-sm text-gray-600">
          Atividades, interacoes e registros vinculados a {aluno.nome} nas
          ultimas semanas.
        </p>
      </header>

      <div className="space-y-3">
        {events.map((event) => (
          <article
            key={`${event.date}-${event.title}`}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-purple-100 bg-white p-4 shadow-sm"
          >
            <div className="text-sm font-semibold text-purple-600">
              <p>{event.date}</p>
              {event.hour && <p className="text-gray-500">{event.hour}</p>}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold text-purple-500">
                {EVENT_LABEL[event.type]}
              </p>
              <h3 className="text-base font-semibold text-gray-900">
                {event.title}
              </h3>
              {event.note && (
                <p className="text-sm text-gray-600">{event.note}</p>
              )}
            </div>
            {event.actor && (
              <div className="text-sm text-gray-600">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Responsavel
                </p>
                <p className="font-semibold text-gray-900">{event.actor}</p>
              </div>
            )}
          </article>
        ))}

        {events.length === 0 && (
          <p className="rounded-2xl border border-dashed border-purple-200 p-6 text-center text-sm text-gray-600">
            Nenhuma evidencia registrada para este estudante neste periodo.
          </p>
        )}
      </div>
    </section>
  );
}
