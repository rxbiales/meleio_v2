import type { ReactElement } from "react";

export default function HelpPage(): ReactElement {
  return (
    <div data-page="help" className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Tutoriais</h1>
        <p className="text-lg text-gray-600">
          Aprenda a usar o MELEIO de forma eficaz.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-400 transition-colors">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">
            1. Navegar
          </h2>
          <p className="text-gray-700">
            Use o menu superior para acessar as diferentes seções do MELEIO. A
            página principal mostra as três áreas principais: Alunos, Alertas
            &amp; Casos e Intervenções.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-400 transition-colors">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">
            2. Buscar aluno
          </h2>
          <p className="text-gray-700">
            Na seção Alunos, você pode buscar estudantes pelo nome ou filtrar
            por diferentes critérios. Os perfis incluem informações acadêmicas,
            socioemocionais e histórico de intervenções.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-400 transition-colors">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">
            3. Abrir caso
          </h2>
          <p className="text-gray-700">
            Quando você detectar uma situação que exija atenção, poderá criar um
            caso na seção Alertas &amp; Casos. Documente os detalhes, atribua
            responsáveis e acompanhe as ações implementadas.
          </p>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Paleta de colores MELEIO
        </h2>
        <p className="text-gray-700 mb-4">
          Nossa paleta visual foi criada para transmitir um ambiente acolhedor e
          profissional:
        </p>
        <div className="flex gap-4 mb-4">
          <div className="flex-1 text-center">
            <div className="w-full h-12 bg-yellow-400 rounded-lg mb-2" />
            <span className="text-sm text-gray-600">Amarelo</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-full h-12 bg-orange-500 rounded-lg mb-2" />
            <span className="text-sm text-gray-600">Laranja</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-full h-12 bg-purple-600 rounded-lg mb-2" />
            <span className="text-sm text-gray-600">Roxo</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Essas cores são usadas em destaques, botões e elementos interativos
          para guiar sua atenção e criar uma experiência visual agradável.
        </p>
      </div>

      <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">
          Dica: Use o botão do Melo
        </h3>
        <p className="text-purple-800">
          O botão flutuante do Melo (na parte inferior direita) oferece ajuda
          contextual a qualquer momento. Clique para abrir o chat e fazer
          perguntas sobre como usar a plataforma.
        </p>
      </div>
    </div>
  );
}
