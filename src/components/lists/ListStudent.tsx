"use client";

import { KeyboardEvent, useMemo } from "react";
import Link from "next/link";
import { Search, X, Users, Activity, Sparkles } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import { useTable } from "@/components/layout/Table";
import { STUDENTS, type StudentId } from "@/components/student/students.mock";
import {
  Table as ShadTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Row = {
  id: StudentId;
  aluno: string;
  turma: string;
  pulso: number;
  idade: number;
  engajamento: number;
};

export default function StudentList() {
  const rows: Row[] = useMemo(
    () =>
      STUDENTS.map((student) => ({
        id: student.id,
        aluno: student.name,
        turma: student.classGroup,
        pulso: student.pulse,
        idade: student.age ?? 0,
        engajamento: student.engagement,
      })),
    []
  );

  const {
    rawQuery,
    isWriting,
    onSearchChange,
    clearSearch,
    sortedRows,
    sortKey,
    sortDir,
    handleSort,
  } = useTable<Row>(rows, {
    searchableKeys: ["aluno"],
    initialSortKey: "aluno",
  });

  const totalStudents = rows.length;
  const averagePulse =
    totalStudents > 0
      ? Math.round(
          rows.reduce((sum, student) => sum + student.pulso, 0) / totalStudents
        )
      : 0;
  const highEngagementCount = rows.filter(
    (student) => student.engajamento >= 75
  ).length;
  const highEngagementPercent =
    totalStudents > 0
      ? Math.round((highEngagementCount / totalStudents) * 100)
      : 0;

  const sortChevron = (key: keyof Row) => {
    if (sortKey !== key) return "-";
    return sortDir === "asc" ? "^" : "v";
  };

  const keySort =
    (key: keyof Row) => (e: KeyboardEvent<HTMLTableCellElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSort(key);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50" data-page="students-list">
      <Sidebar />
      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-10 sm:px-6 lg:space-y-8 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-orange-50 to-yellow-50 p-6 shadow-sm lg:p-8">
          <div className="absolute -top-10 right-0 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-700">
                    Pulso em tempo real
                  </p>
                  <h1 className="mt-1 text-3xl font-bold text-gray-900 lg:text-4xl">
                    Turmas - Monitoramento ativo
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-gray-700 lg:text-base">
                    Acompanhe indicadores SEL, veja quem precisa de acolhimento
                    imediato e celebre quem esta entregando muita energia.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/60 bg-white/80 p-4 backdrop-blur">
                <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-purple-600" />
                  Total de estudantes
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {totalStudents}
                </p>
              </div>
              <div className="rounded-xl border border-orange-100 bg-white/80 p-4 backdrop-blur">
                <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                  <Activity className="h-4 w-4 text-orange-500" />
                  Pulso medio
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {averagePulse}
                </p>
              </div>
              <div className="rounded-xl border border-yellow-100 bg-white/80 p-4 backdrop-blur">
                <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Engajamento alto
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {highEngagementPercent}%
                </p>
                <p className="text-xs text-gray-500">
                  {highEngagementCount} estudantes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white/90 p-4 shadow-sm backdrop-blur lg:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">
                Explorar dados
              </p>
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
                Painel de alunos
              </h3>
            </div>

            <div className="relative">
              <Input
                type="search"
                value={rawQuery}
                onChange={onSearchChange}
                placeholder="Buscar aluno..."
                className="h-12 w-full rounded-2xl border-gray-200 bg-white/90 pl-10 pr-12 text-base shadow-inner focus-visible:ring-purple-500 sm:w-72"
                aria-label="Buscar por aluno"
              />
              {isWriting ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-purple-600"
                  aria-label="Limpar busca"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              ) : (
                <Search
                  size={18}
                  strokeWidth={2}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-purple-400"
                />
              )}
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50/30 shadow-lg">
            <div className="pointer-events-none absolute -right-8 top-0 h-36 w-36 rounded-full bg-yellow-200/30 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
            <div className="relative z-10 w-full overflow-x-auto">
              <ShadTable className="min-w-full">
                <TableCaption className="sr-only">
                  Painel de alunos
                </TableCaption>

                <TableHeader className="bg-gradient-to-r from-purple-600 via-orange-500 to-yellow-400 text-white">
                  <TableRow className="hover:bg-purple-700/10">
                    <TableHead
                      onClick={() => handleSort("aluno")}
                      onKeyDown={keySort("aluno")}
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortKey === "aluno"
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className="cursor-pointer select-none px-4 py-3 text-white"
                      title="Ordenar por Aluno"
                    >
                      <span className="inline-flex items-center gap-1">
                        <span>Aluno</span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[10px] font-bold">
                          {sortChevron("aluno")}
                        </span>
                      </span>
                    </TableHead>

                    <TableHead
                      onClick={() => handleSort("turma")}
                      onKeyDown={keySort("turma")}
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortKey === "turma"
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className="cursor-pointer select-none px-4 py-3 text-center text-white"
                      title="Ordenar por Turma"
                    >
                      <span className="inline-flex items-center justify-center gap-1">
                        <span>Turma</span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[10px] font-bold">
                          {sortChevron("turma")}
                        </span>
                      </span>
                    </TableHead>

                    <TableHead
                      onClick={() => handleSort("pulso")}
                      onKeyDown={keySort("pulso")}
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortKey === "pulso"
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className="cursor-pointer select-none px-4 py-3 text-center text-white"
                      title="Ordenar por Pulso"
                    >
                      <span className="inline-flex items-center justify-center gap-1">
                        <span>Pulso</span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[10px] font-bold">
                          {sortChevron("pulso")}
                        </span>
                      </span>
                    </TableHead>

                    <TableHead
                      onClick={() => handleSort("idade")}
                      onKeyDown={keySort("idade")}
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortKey === "idade"
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className="cursor-pointer select-none px-4 py-3 text-center text-white"
                      title="Ordenar por Idade"
                    >
                      <span className="inline-flex items-center justify-center gap-1">
                        <span>Idade</span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[10px] font-bold">
                          {sortChevron("idade")}
                        </span>
                      </span>
                    </TableHead>

                    <TableHead
                      onClick={() => handleSort("engajamento")}
                      onKeyDown={keySort("engajamento")}
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortKey === "engajamento"
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className="cursor-pointer select-none px-4 py-3 text-right text-white"
                      title="Ordenar por Engajamento"
                    >
                      <span className="inline-flex items-center justify-end gap-1">
                        <span>Engajamento</span>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[10px] font-bold">
                          {sortChevron("engajamento")}
                        </span>
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-sm text-gray-900 lg:text-base">
                  {sortedRows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="px-4 py-10 text-center text-gray-500"
                      >
                        Sem dados para exibir.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedRows.map((row, idx) => (
                      <TableRow
                        key={`${row.aluno}-${idx}`}
                        className={`border-b border-purple-100 transition-colors ${
                          idx % 2 === 1 ? "bg-purple-50/30" : "bg-white"
                        } hover:bg-orange-50/40`}
                      >
                        <TableCell className="px-4 py-3">
                          <Link
                            href={`/dashboard/estudantes/${row.id}/timeline`}
                            className="font-semibold text-purple-700 underline-offset-2 transition hover:text-purple-900 hover:underline"
                          >
                            {row.aluno}
                          </Link>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-center">
                          {row.turma}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-center">
                          <Badge
                            variant="outline"
                            className="border-purple-600/30 bg-purple-600/10 px-2.5 py-0.5 text-[12px] font-semibold text-purple-700 lg:text-sm"
                          >
                            {row.pulso}
                          </Badge>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-center">
                          {row.idade}
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-40 lg:w-48">
                              <Progress
                                value={row.engajamento}
                                className="h-2 bg-purple-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:via-orange-500 [&>div]:to-yellow-400"
                              />
                            </div>
                            <span className="w-10 text-right text-sm font-semibold text-purple-700">
                              {row.engajamento}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </ShadTable>
            </div>

            <div className="h-1 w-full rounded-b-2xl bg-gradient-to-r from-purple-600 via-orange-500 to-yellow-400" />
          </div>
        </div>
      </section>
    </div>
  );
}
