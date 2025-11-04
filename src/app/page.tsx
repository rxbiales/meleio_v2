import type { ReactElement } from "react";
import Link from "next/link";
import {
  Users,
  ArrowRight,
  BookOpen,
  Shield,
  Heart,
  Phone,
} from "lucide-react";

const challenges = [
  {
    title: "Materiais estáticos",
    description:
      "Apostilas SEL são caras e não acompanham o ritmo dos estudantes.",
    icon: BookOpen,
    accent: "bg-red-50 border-red-200 text-red-600",
  },
  {
    title: "Falta de indicadores",
    description:
      "Gestores enxergam o problema tarde demais e sem dados confiáveis.",
    icon: Shield,
    accent: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    title: "Família distante",
    description:
      "Responsáveis ficam sem visibilidade sobre bem-estar e engajamento.",
    icon: Heart,
    accent: "bg-purple-50 border-purple-200 text-purple-600",
  },
];

export default function HomePage(): ReactElement {
  return (
    <div data-page="home" className="space-y-16">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-600 p-10 text-white shadow-xl">
        <div className="mx-auto flex max-w-5xl flex-col items-center space-y-8 text-center">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            MELEIO transforma dados em cuidado socioemocional
          </h1>
          <p className="max-w-3xl text-base text-white/90 sm:text-lg">
            Uma plataforma viva que acompanha trajetórias, identifica
            vulnerabilidades reais e cria planos de ação personalizados. Menos
            papel, mais resultado para estudantes, professores e famílias.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-purple-900/80 px-8 py-3 text-base font-semibold transition hover:bg-purple-900"
            >
              <Users className="mr-3 h-5 w-5" />
              Saiba mais
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-purple-700 transition hover:bg-gray-100"
            >
              <ArrowRight className="mr-3 h-5 w-5" />
              Começar
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Do dado ao cuidado
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600">
            Cada resposta vira evidência. Evidência vira ação. Ação vira
            autoconhecimento e desenvolvimento socioemocional para toda a
            comunidade escolar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {challenges.map(({ title, description, icon: Icon, accent }) => (
            <article
              key={title}
              className={`rounded-2xl border bg-white p-6 text-left shadow-sm ${accent}`}
            >
              <Icon className="mb-4 h-10 w-10" />
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-700">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 p-10 text-center text-white shadow-lg">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Transforme dados em cuidado agora
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85">
          Agende uma conversa com nossa equipe ou conheça o painel piloto. O que
          se mede, existe. O que existe, importa. O que importa, recebe cuidado.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-purple-700 transition hover:bg-gray-100"
          >
            <Phone className="mr-3 h-5 w-5" />
            Fale conosco
          </Link>
          <Link
            href="/help"
            className="inline-flex items-center justify-center rounded-full border border-white px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            <BookOpen className="mr-3 h-5 w-5" />
            Tutoriais
          </Link>
        </div>
      </section>
    </div>
  );
}
