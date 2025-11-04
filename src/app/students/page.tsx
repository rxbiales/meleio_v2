import type { ReactElement } from 'react';

export default function StudentsPage(): ReactElement {
  return (
    <div data-page="students" className="space-y-6 rounded-3xl border border-purple-100 bg-white p-8 shadow-lg">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900">Mapa SEL de alunos</h1>
        <p className="text-sm text-gray-600">
          Em breve você poderá acompanhar indicadores de autoconhecimento, autorregulação e engajamento de todo o
          corpo discente neste painel.
        </p>
      </header>
      <div className="rounded-2xl border border-dashed border-purple-200 bg-purple-50/60 p-8 text-center text-purple-700">
        Dashboard em construção — conecte seus dados acadêmicos e socioemocionais à plataforma MELEIO.
      </div>
    </div>
  );
}
