"use client";

import { CalendarDays, Clock } from "lucide-react";

import type { EventItem } from "@/components/student/students.mock";

type EventsListProps = {
  events: EventItem[];
};

const toneClass: Record<EventItem["type"], string> = {
  mediacao: "bg-purple-600",
  familia: "bg-orange-500",
  atividade: "bg-yellow-400",
  saude: "bg-rose-500",
  registro: "bg-slate-400",
};

const toneLabel: Record<EventItem["type"], string> = {
  mediacao: "Mediacao",
  familia: "Familia",
  atividade: "Atividade",
  saude: "Saude",
  registro: "Registro",
};

export function EventsList({ events }: EventsListProps) {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <aside className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Linha de eventos 1:1
        </h3>
        <span className="text-xs font-medium text-gray-500">
          {events.length} registro{events.length === 1 ? "" : "s"}
        </span>
      </header>

      <ol
        className="space-y-4"
        aria-label="Eventos relevantes para o acompanhamento do estudante"
      >
        {events.map((event) => (
          <li
            key={`${event.date}-${event.title}`}
            className="relative rounded-2xl border border-purple-50 bg-purple-50/40 p-4"
          >
            <span
              aria-hidden
              className={`absolute -left-2 top-5 h-2 w-2 rounded-full ${
                toneClass[event.type]
              }`}
            />

            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-gray-900 lg:text-base">
                {event.title}
              </h4>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-purple-700">
                {toneLabel[event.type]}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                {dateFormatter.format(new Date(event.date))}
              </span>
              {event.hour && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {event.hour}
                </span>
              )}
              {event.actor && (
                <span className="inline-flex items-center gap-1 font-medium text-purple-700">
                  {event.actor}
                </span>
              )}
            </div>

            {event.note && (
              <p className="mt-3 text-sm text-gray-600">{event.note}</p>
            )}
          </li>
        ))}
      </ol>
    </aside>
  );
}
