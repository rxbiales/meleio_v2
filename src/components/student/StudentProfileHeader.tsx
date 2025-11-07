"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useStudentLayout } from "@/components/student/useStudentLayout";

const STUDENT_TABS = [
  { id: "timeline", label: "Timeline" },
  { id: "dimensoes", label: "Dimensoes" },
  { id: "evidencias", label: "Evidencias" },
  { id: "planos", label: "Planos & Acoes" },
] as const;

export function StudentProfileHeader() {
  const pathname = usePathname();
  const { aluno, studentId } = useStudentLayout();
  const basePath = `/dashboard/estudantes/${studentId}`;

  const activeTab = useMemo(() => {
    const match = STUDENT_TABS.find((tab) =>
      pathname.startsWith(`${basePath}/${tab.id}`)
    );
    return match ?? STUDENT_TABS[0];
  }, [pathname, basePath]);

  return (
    <header className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm lg:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-purple-500"
          >
            <Link
              href="/dashboard/estudantes"
              className="text-purple-600 transition hover:text-purple-700"
            >
              Estudantes
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-500">{aluno.nome}</span>
            <span aria-hidden="true">/</span>
            <span className="text-gray-900">{activeTab.label}</span>
          </nav>

          <div className="flex flex-wrap items-baseline gap-4">
            <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              {aluno.nome}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>Turma {aluno.turma}</span>
              {typeof aluno.idade === "number" && (
                <span>{aluno.idade} anos</span>
              )}
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Perfil do estudante"
          className="flex flex-wrap gap-2"
        >
          {STUDENT_TABS.map((tab) => {
            const href = `${basePath}/${tab.id}`;
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={tab.id}
                href={href}
                role="tab"
                aria-selected={isActive}
                className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow"
                    : "text-purple-600 hover:bg-purple-50"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export { STUDENT_TABS };
