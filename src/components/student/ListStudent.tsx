"use client";

import { useMemo, KeyboardEvent } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { Search, X } from "lucide-react";

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
import { useTable } from "@/components/layout/Table";
import { STUDENTS, type StudentId } from "@/components/student/students.mock";

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
        aluno: student.nome,
        turma: student.turma,
        pulso: student.pulso,
        idade: student.idade,
        engajamento: student.engajamento,
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

  const sortChevron = (key: keyof Row) =>
    sortKey === key ? (sortDir === "asc" ? "▲" : "▼") : "—";

  const keySort =
    (key: keyof Row) => (e: KeyboardEvent<HTMLTableCellElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSort(key);
      }
    };

  return (
    <>
      <Sidebar />
      <section className="space-y-6 pb-10 lg:space-y-7 xl:space-y-8">
        <div className="rounded-3xl bg-white/85 p-6 shadow-sm ring-1 ring-purple-100 backdrop-blur lg:p-8">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900 lg:text-3xl">
              Turmas - Monitoramento
            </h1>
            <p className="text-sm text-gray-600 lg:text-base">
              Indicadores SEL atualizados por aluno.
            </p>
          </header>
        </div>

        <div className="rounded-3xl bg-white/85 p-4 shadow-sm ring-1 ring-purple-100 backdrop-blur lg:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-purple-700 lg:text-lg">
              Painel de alunos
            </h3>

            <div className="relative">
              <Input
                type="search"
                value={rawQuery}
                onChange={onSearchChange}
                placeholder="Buscar aluno..."
                className="h-10 w-64 rounded-full pr-10 lg:h-11 lg:w-72"
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
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              )}
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-purple-200">
            <div className="w-full overflow-x-auto">
              <ShadTable className="min-w-full">
                <TableCaption className="sr-only">
                  Painel de alunos
                </TableCaption>

                {/* Header com a MESMA cor anterior */}
                <TableHeader className="bg-purple-600 text-white">
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
                        className={`
                          border-b border-purple-100 transition-colors
                          ${idx % 2 === 1 ? "bg-purple-50/30" : "bg-white"}
                          hover:bg-orange-50/40
                        `}
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
                              {/* Progress com o MESMO gradiente anterior */}
                              <Progress
                                value={row.engajamento}
                                className="
                                  h-2 bg-purple-100
                                  [&>div]:bg-gradient-to-r
                                  [&>div]:from-purple-600
                                  [&>div]:via-orange-500
                                  [&>div]:to-yellow-400
                                "
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
    </>
  );
}
