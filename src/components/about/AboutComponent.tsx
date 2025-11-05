import Link from "next/link";
import {
  Sparkles,
  Users,
  Shield,
  BookOpen,
  Heart,
  Brain,
  Target,
  Zap,
  TrendingUp,
  School
} from "lucide-react";


export function AboutComponent() {
  return (
    <div
      data-page="about"
      className="flex min-h-screen flex-col justify-between"
    >
      <main className="flex-1 space-y-20">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 px-6 py-20 text-white shadow-xl">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-10 text-center">
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                plataforma sel + aprendizagem ativa + analytics
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Sobre o MELEIO
              </h1>
              <p className="text-base text-white/85 sm:text-lg">
                Transformamos cada resposta em historia viva. O MELEIO une
                dados, metodologias ativas e IA para apoiar decisoes
                socioemocionais em toda a rede escolar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Pulso socioemocional continuo
              </span>
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur">
                <Brain className="h-4 w-4" />
                Planos adaptativos guiados por dados
              </span>
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur">
                <Heart className="h-4 w-4" />
                Rede unificada escola-familia-saude
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full border border-purple-200 px-10 py-4 text-lg font-semibold text-white transition hover:bg-purple-50 hover:text-purple-700">
                    Ir para o Dashboard 
                </Link>

                <Link href="/help"
                  className="inline-flex items-center justify-center rounded-full border border-purple-200 px-10 py-4 text-lg font-semibold text-white transition hover:bg-purple-50 hover:text-purple-700">

                    Ajuda
                </Link>

            </div>  
          </div>
          
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Por que existimos
              </h2>
              <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
                Do dado ao cuidado: resposta vira evidencia, evidencia guia
                acao, acao fortalece autonomia e proposito.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <article className="rounded-2xl border bg-white p-7 text-left shadow-sm transition hover:shadow-md border-orange-200 bg-orange-50 text-orange-600">
                <BookOpen className="mb-4 h-10 w-10" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Materiais impressos ficam para tras
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Apostilas engessam o SEL em tarefas repetitivas. Cada turma
                  vive realidades diferentes e precisa de respostas vivas.
                </p>
              </article>
              <article className="rounded-2xl border bg-white p-7 text-left shadow-sm transition hover:shadow-md border-red-200 bg-red-50 text-red-600">
                <Shield className="mb-4 h-10 w-10" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Sem metricas, acoes chegam tarde
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Decidir no escuro gera desperdicio de tempo e energia.
                  Precisamos enxergar vulnerabilidades antes que viemem crises.
                </p>
              </article>
              <article className="rounded-2xl border bg-white p-7 text-left shadow-sm transition hover:shadow-md border-purple-200 bg-purple-50 text-purple-600">
                <Users className="mb-4 h-10 w-10" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Familias e equipes desconectadas
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Check-ins esporadicos nao bastam. A rede de apoio precisa
                  acompanhar a jornada de cada estudante em tempo real.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-16">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Como o MELEIO funciona
              </h2>
              <p className="mx-auto max-w-3xl text-base text-gray-700">
                Inteligencia de dados, acompanhamento humano e planos acionaveis
                em um unico fluxo.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Target className="mb-4 h-10 w-10 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  IVS + Pulso
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Indice de vulnerabilidade socioemocional e termometro de
                  urgencia por turma.
                </p>
              </article>
              <article className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Brain className="mb-4 h-10 w-10 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  SkillsTree
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Mapa radial das competencias CASEL com trilhas sugeridas para
                  cada perfil.
                </p>
              </article>
              <article className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Zap className="mb-4 h-10 w-10 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Motor de intervencoes
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Sugestoes inteligentes avaliadas via Thompson Sampling para
                  descobrir o que funciona melhor.
                </p>
              </article>
              <article className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <TrendingUp className="mb-4 h-10 w-10 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Linha do tempo viva
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Registro longitudinal de mediacoes, autorregulacao e
                  devolutivas para toda a rede.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">
            <article className="rounded-3xl border border-purple-100 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                Metodologias que geram protagonismo
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-gray-700">
                <li className="flex gap-3 text-left">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <span>
                    BNCC inspira dialogo e escuta ativa das vozes estudantis.
                  </span>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <span>
                    Metodologias ativas conectam desafios reais aos objetivos
                    socioemocionais.
                  </span>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <span>
                    Apoio continuado substitui tarefas estaticas por
                    experiencias marcantes.
                  </span>
                </li>
              </ul>
            </article>
            <article className="rounded-3xl border border-purple-100 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                Cuidado compartilhado e etico
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-gray-700">
                <li className="flex gap-3 text-left">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <span>
                    Relatorios longitudinais autorizados pela familia criam
                    ponte segura com saude.
                  </span>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <span>
                    Dados acionaveis para cada aluno, inclusive quem ainda nao
                    possui diagnostico formal.
                  </span>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <span>
                    Rede de apoio alinhada em torno de planos claros, humanos e
                    baseados em evidencias.
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-10 text-center text-white shadow-lg">
            <blockquote className="text-2xl font-semibold leading-relaxed md:text-3xl">
              <em>
                O que se mede, existe. O que existe, importa. O que importa,
                recebe cuidado.
              </em>
            </blockquote>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center space-y-10">
            <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              Proximos passos
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              Comece um piloto gratuito ou agende uma conversa com nossa equipe.
              Estamos prontos para construir a rede de cuidado socioemocional
              que sua comunidade merece.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-purple-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-purple-700"
              >
                <Users className="mr-3 h-6 w-6" />
                Iniciar piloto gratuito
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center justify-center rounded-full border border-purple-200 px-10 py-4 text-lg font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                <School className="mr-3 h-6 w-6" />
                Conversar com a equipe
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-gray-900 px-6 py-12 text-gray-300">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-2xl font-bold text-white">MELEIO</h3>
              <p className="mt-3 text-sm opacity-80">
                Plataforma SEL + Aprendizagem Ativa + Analytics para transformar
                a educacao publica brasileira.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Produto</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-white transition" href="#">
                    IVS &amp; Pulso
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    SkillsTree
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Timeline
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Kit Professor
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Para voce</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-white transition" href="#">
                    Escolas
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Professores
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Municipios
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Empresas ESG
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Contato</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-white transition" href="#">
                    Suporte
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Parceiros
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Imprensa
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Carreiras
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm opacity-60">
            <p>
              © 2025 Empresa Arvoredu. Todos os direitos reservados.
              <span className="mt-2 block italic">
                &quot;Menos papel, mais resultado.&quot;
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
