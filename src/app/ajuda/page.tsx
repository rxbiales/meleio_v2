import type { ReactElement } from "react";

export default function HelpPage(): ReactElement {
  return (
    <div data-page="help" className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Tutoriales</h1>
        <p className="text-lg text-gray-600">
          Aprende a usar MELEIO de manera efectiva.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-400 transition-colors">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">
            1. Navegar
          </h2>
          <p className="text-gray-700">
            Usa el menu superior para acceder a las diferentes secciones de
            MELEIO. La pagina principal muestra las tres areas principales:
            Alunos, Alertas &amp; Casos e Intervencoes.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-400 transition-colors">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">
            2. Buscar aluno
          </h2>
          <p className="text-gray-700">
            Desde la seccion de Alunos puedes buscar estudiantes por nombre o
            filtrar por diferentes criterios. Los perfiles incluyen informacion
            academica, socioemocional e historico de intervenciones.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-400 transition-colors">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">
            3. Abrir caso
          </h2>
          <p className="text-gray-700">
            Cuando detectes una situacion que requiera atencion puedes crear un
            caso desde la seccion Alertas &amp; Casos. Documenta los detalles,
            asigna responsables y da seguimiento a las acciones implementadas.
          </p>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Paleta de colores MELEIO
        </h2>
        <p className="text-gray-700 mb-4">
          Nuestra paleta visual esta disenada para crear un ambiente acogedor y
          profesional:
        </p>
        <div className="flex gap-4 mb-4">
          <div className="flex-1 text-center">
            <div className="w-full h-12 bg-yellow-400 rounded-lg mb-2" />
            <span className="text-sm text-gray-600">Yellow</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-full h-12 bg-orange-500 rounded-lg mb-2" />
            <span className="text-sm text-gray-600">Orange</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-full h-12 bg-purple-600 rounded-lg mb-2" />
            <span className="text-sm text-gray-600">Purple</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Estos colores se usan en acentos, botones y elementos interactivos
          para guiar tu atencion y crear una experiencia visual agradable.
        </p>
      </div>

      <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">
          Consejo: Usa el boton del Melo
        </h3>
        <p className="text-purple-800">
          El boton flotante del Melo (abajo a la derecha) te proporciona ayuda
          contextual en cualquier momento. Haz clic para abrir el chat y hacer
          preguntas sobre como usar la plataforma.
        </p>
      </div>
    </div>
  );
}
