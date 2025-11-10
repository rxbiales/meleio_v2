import type { ReactElement, ReactNode } from "react";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import { StudentProfileHeader } from "@/components/student/StudentProfileHeader";
import { StudentProvider } from "@/components/student/StudentProvider";
import {
  getStudentContextValue,
  resolveStudentId,
} from "@/components/student/students.mock";

interface StudentLayoutProps {
  children: ReactNode;
  params: { studentId: string };
}

export default function StudentLayout({
  children,
  params,
}: StudentLayoutProps): ReactElement {
  const normalizedId = resolveStudentId(params.studentId);
  const contextValue = normalizedId
    ? getStudentContextValue(normalizedId)
    : null;

  if (!contextValue) {
    return (
      <>
        <Sidebar />
        <section className="space-y-4 rounded-3xl border border-red-100 bg-white/90 p-6 text-red-700 shadow-sm lg:p-8">
          <div>
            <h1 className="text-2xl font-semibold text-red-700">
              Estudante nao encontrado
            </h1>
            <p className="text-sm text-red-600">
              Verifique se o identificador informado esta correto ou se voce
              tem permissao para acessar este perfil.
            </p>
          </div>
          <Link
            href="/dashboard/estudantes"
            className="inline-flex w-fit items-center rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            {"Voltar \u00e0 lista"}
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <StudentProvider value={contextValue}>
        <section className="space-y-6 pb-12">
          <StudentProfileHeader />
          <div className="space-y-6" data-slot="student-detail">
            {children}
          </div>
        </section>
      </StudentProvider>
    </>
  );
}
