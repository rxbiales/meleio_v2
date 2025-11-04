"use client";

import { Fragment, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import Sidebar from "@/components/layouts/Sidebar";
import {
  BookOpen,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const nf = new Intl.NumberFormat("pt-BR");

type Palette = {
  yellow: string;
  orange: string;
  purple: string;
};

export type MacroSlice = {
  name: string;
  value: number;
  color: string;
};

type PulseData = {
  value: number;
  target: number;
  delta7d: number;
  macro: MacroSlice[];
};

type AtividadesData = {
  feitas: number;
  total: number;
};

type FamiliasData = {
  novas: number;
  confirmadas: number;
  pendentes: number;
  urgentes: number;
};

type AgendaItem = {
  whenLabel: string;
  turma: string;
  title: string;
  href: string;
  tooltip: string;
};

type MeloAction = {
  label: string;
  href: string;
  tooltip: string;
};

type MeloRecommendation = {
  text: string;
  tooltip: string;
};

type MeloData = {
  bullets: string[];
  bulletTooltips: string[];
  recomendacoes: MeloRecommendation[];
  acoes: MeloAction[];
};

export type DashboardData = {
  palette: Palette;
  pulse: PulseData;
  alunosAcompanhados: number;
  atividades7d: AtividadesData;
  familias: FamiliasData;
  agenda: AgendaItem[];
  agendaOcupacao: {
    percent: number;
  };
  melo: MeloData;
};

interface DashboardPageProps {
  data: DashboardData;
}

/* ========= Tooltip (hover + foco, sem libs) ========= */
function Tooltip({
  children,
  text,
  side = "top",
  className = "",
}: {
  children: ReactNode;
  text: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const pos =
    side === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : side === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-2"
      : side === "left"
      ? "right-full top-1/2 -translate-y-1/2 mr-2"
      : "left-full top-1/2 -translate-y-1/2 ml-2";

  return (
    <div
      className={`group relative ${className}`}
      tabIndex={0}
      aria-describedby={text ? "tip" : undefined}
    >
      {children}
      <div
        role="tooltip"
        className={`pointer-events-none absolute ${pos} z-[60] max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md opacity-0 invisible transition-opacity duration-150 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible`}
      >
        {text}
      </div>
    </div>
  );
}

function renderHighlightedSegments(text: string, bulletIndex: number): ReactNode {
  const parts = text.split("**");

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={`highlight-${bulletIndex}-${index}`}>{part}</strong>
    ) : (
      <Fragment key={`highlight-${bulletIndex}-${index}`}>{part}</Fragment>
    )
  );
}

/* ========= HERO visual do PULSO ========= */
function PulseHero({
  value,
  target,
  delta,
  palette,
  macro,
}: {
  value: number;
  target: number;
  delta: number;
  palette: Palette;
  macro: MacroSlice[];
}) {
  const isUp = delta >= 0;
  const half = Math.ceil(macro.length / 2);
  const firstHalf = macro.slice(0, half);
  const secondHalf = macro.slice(half);

  return (
    <section
      data-section="hero-pulso"
      className="mb-8 rounded-3xl border border-purple-100 bg-white shadow"
    >
      {/* faixa superior com a paleta */}
      <div
        className="h-2 rounded-t-3xl"
        style={{
          background: `linear-gradient(90deg, ${palette.yellow}, ${palette.orange}, ${palette.purple})`,
        }}
        aria-hidden
      />

      <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
        {/* Bloco esquerdo: valor + variação + barra com meta */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">PULSO da rede</h1>
            <Tooltip text="Índice agregado socioemocional da rede (0 a 100). Atualiza diariamente.">
              <Info className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>

          {/* Valor e variação visual */}
          <div className="mt-3 flex items-end gap-3">
            <Tooltip text="Valor atual do PULSO (quanto maior, melhor).">
              <span className="text-5xl font-extrabold text-gray-900">
                {value}
              </span>
            </Tooltip>
            <span className="text-lg text-gray-500">/100</span>

            <Tooltip
              text={`Variação em relação aos últimos 7 dias (${isUp ? "subiu" : "caiu"} ${Math.abs(delta)} pontos).`}
            >
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
                aria-label={`Variação versus 7 dias: ${delta}`}
              >
                {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(delta)}
              </span>
            </Tooltip>
          </div>

          {/* Barra de progresso com marcador de meta */}
          <Tooltip
            text="Preenchimento indica o PULSO atual; o alvo marca a meta da rede."
            className="block w-full"
          >
            <div className="mt-4 relative h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-full w-full rounded-full transition-[width] duration-300"
                style={{
                  width: `${value}%`,
                  background: `linear-gradient(90deg, ${palette.yellow}, ${palette.orange}, ${palette.purple})`,
                }}
                aria-label={`Valor atual do PULSO: ${value}`}
              />
              {/* marcador de meta */}
              <div
                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 translate-x-[-50%] rounded-full border-2 border-purple-600 bg-white shadow-sm"
                style={{ left: `${target}%` }}
                title="Meta"
                aria-label={`Meta: ${target}`}
              />
            </div>
          </Tooltip>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
            <Tooltip text="Valor-alvo definido para a rede.">
              <span className="rounded bg-gray-100 px-2 py-0.5">
                Meta: {target}
              </span>
            </Tooltip>
            <Tooltip text="Os dados são consolidados diariamente.">
              <span className="rounded bg-gray-100 px-2 py-0.5">
                Atualização: diária
              </span>
            </Tooltip>
          </div>

          {/* Ações objetivas */}
          <div className="mt-4 flex gap-2">
            <Tooltip text="Aplicar check-in rápido de humor (3 itens) agora.">
              <Link
                href="/home/checkin/hoje"
                className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                Check-in rápido
              </Link>
            </Tooltip>
            <Tooltip text="Rever e ajustar planos ativos das turmas.">
              <Link
                href="/home/planos"
                className="rounded-lg border border-purple-300 px-3 py-1.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                Rever planos
              </Link>
            </Tooltip>
          </div>
        </div>

        {/* Bloco direito: donut simples 7 dias */}
        <Tooltip text="Distribuição das tendências do PULSO nos últimos 7 dias.">
          <div className="mx-auto h-56 w-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={macro}
                  dataKey="value"
                  innerRadius="65%"
                  outerRadius="85%"
                  paddingAngle={2}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {macro.map((slice) => (
                    <Cell key={slice.name} fill={slice.color} />
                  ))}
                  <Label
                    position="center"
                    content={() => (
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#6B7280"
                        fontSize="12"
                      >
                        7 dias
                      </text>
                    )}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Tooltip>
      </div>

      {/* Legenda compacta e objetiva */}
      <div className="grid grid-cols-1 gap-2 border-t border-purple-100 p-6 sm:grid-cols-2">
        <ul className="grid grid-cols-1 gap-2 text-sm">
          {firstHalf.map((slice) => (
            <Tooltip key={slice.name} text={`${slice.value}% → ${slice.name}`}>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: slice.color }}
                />
                <span>
                  <strong className="text-gray-900">{slice.value}%</strong>{" "}
                  {slice.name.toLowerCase()}
                </span>
              </li>
            </Tooltip>
          ))}
        </ul>
        <ul className="grid grid-cols-1 gap-2 text-sm">
          {secondHalf.map((slice) => (
            <Tooltip key={slice.name} text={`${slice.value}% → ${slice.name}`}>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: slice.color }}
                />
                <span>
                  <strong className="text-gray-900">{slice.value}%</strong>{" "}
                  {slice.name.toLowerCase()}
                </span>
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ========= KPI visual simples ========= */
function KpiBlock({
  title,
  value,
  info,
  visual,
  href,
  icon: Icon,
  tip,
}: {
  title: string;
  value: string;
  info: string;
  visual: ReactNode;
  href: string;
  icon: any;
  tip: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-purple-100 bg-white p-6 shadow transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Tooltip text={tip}>
            <Info className="h-4 w-4 text-gray-400" />
          </Tooltip>
        </div>
        <Icon className="h-6 w-6 text-purple-600" />
      </div>

      <Tooltip text={value}>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </Tooltip>
      <p className="mt-1 text-xs text-gray-600">{info}</p>

      <div className="mt-4">{visual}</div>
    </Link>
  );
}

/* ========= Página ========= */
export default function DashboardPage({ data }: DashboardPageProps): ReactElement {
  const {
    palette,
    pulse,
    alunosAcompanhados,
    atividades7d,
    familias,
    agenda,
    agendaOcupacao,
    melo,
  } = data;

  const perc7d =
    atividades7d.total === 0
      ? 0
      : Math.round((atividades7d.feitas / atividades7d.total) * 100);

  return (
    <div className="min-h-screen bg-gray-50" data-page="dashboard">
      <Sidebar />

      <main className="ml-16 pt-6 md:pt-8">
        <div className="px-4 md:px-8 lg:px-12">
          {/* HERO – PULSO */}
          <PulseHero
            value={pulse.value}
            target={pulse.target}
            delta={pulse.delta7d}
            palette={palette}
            macro={pulse.macro}
          />

          {/* KPIs secundários abaixo do HERO */}
          <section
            data-section="secondary-kpis"
            className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <KpiBlock
              title="Alunos acompanhados"
              value={nf.format(alunosAcompanhados)}
              info="Último painel há 3 horas"
              href="/home/dashboard/turmas"
              icon={BookOpen}
              tip="Total de estudantes com dados ativos no período."
              visual={
                <Tooltip
                  text="Indicador puramente quantitativo (100%)."
                  className="block w-full"
                >
                  <div className="h-2 w-full rounded-full bg-purple-100">
                    <div
                      className="h-2 rounded-full bg-purple-600"
                      style={{ width: "100%" }}
                      aria-hidden
                    />
                  </div>
                </Tooltip>
              }
            />

            <KpiBlock
              title="Atividades (7 dias)"
              value={`${nf.format(atividades7d.feitas)}/${nf.format(
                atividades7d.total
              )}`}
              info="Execução das intervenções previstas"
              href="/home/dashboard/atividades"
              icon={AlertCircle}
              tip="Atividades planejadas vs. executadas nos últimos 7 dias."
              visual={
                <div>
                  <Tooltip
                    text={`Progresso de execução: ${perc7d}%`}
                    className="block w-full"
                  >
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full transition-[width] duration-300"
                        style={{
                          width: `${perc7d}%`,
                          background: palette.orange,
                        }}
                        aria-label={`Conclusão: ${perc7d}%`}
                      />
                    </div>
                  </Tooltip>
                  <div className="mt-1 text-xs text-gray-600">
                    {perc7d}% concluídas
                  </div>
                </div>
              }
            />
          </section>

          {/* Lugar MELEIO + Famílias (Famílias geral, sem nomes) */}
          <section
            data-section="meleio-room-and-families"
            className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Lugar MELEIO */}
            <article
              data-block="meleio-room"
              className="rounded-2xl border border-purple-100 bg-white p-6 shadow"
            >
              <header className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    Lugar MELEIO
                  </h2>
                  <Tooltip text="Sala imersiva com agenda de sessões SEL.">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Tooltip>
                </div>
                <Tooltip text="Porcentagem de slots reservados na semana.">
                  <span className="text-sm font-medium text-purple-700">
                    Ocupação:{" "}
                    <span className="font-bold">
                      {agendaOcupacao.percent}%
                    </span>
                  </span>
                </Tooltip>
              </header>

              <Tooltip
                text="Uso semanal do espaço (reservas / capacidade)."
                className="block w-full"
              >
                <div className="mb-5">
                  <div className="h-2.5 w-full rounded-full bg-purple-100">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${agendaOcupacao.percent}%`,
                        background: `linear-gradient(90deg, ${palette.yellow} 0%, ${palette.orange} 50%, ${palette.purple} 100%)`,
                      }}
                      aria-label={`Taxa de ocupação ${agendaOcupacao.percent}%`}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    Capacidade semanal utilizada (sessões reservadas versus
                    disponíveis).
                  </p>
                </div>
              </Tooltip>

              <ul className="space-y-3">
                {agenda.map((item, index) => (
                  <Tooltip key={`${item.turma}-${index}`} text={item.tooltip}>
                    <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3 transition hover:bg-purple-50">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.whenLabel}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.turma} – {item.title}
                        </p>
                      </div>
                      <Link
                        href={item.href}
                        className="rounded text-xs font-medium text-purple-700 transition hover:text-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                        aria-label={`Ver detalhes da sessão ${item.turma} ${item.title}, ${item.whenLabel}`}
                      >
                        Detalhes
                      </Link>
                    </li>
                  </Tooltip>
                ))}
              </ul>

              <div className="mt-4 text-right">
                <Tooltip text="Abrir a agenda completa do Lugar MELEIO.">
                  <Link
                    href="/home/dashboard/atividades"
                    className="text-sm font-medium text-purple-700 transition hover:text-purple-800"
                  >
                    Ver agenda completa →
                  </Link>
                </Tooltip>
              </div>
            </article>

            {/* Famílias – geral */}
            <article
              data-block="family-notifications"
              className="rounded-2xl border border-purple-100 bg-white p-6 shadow"
            >
              <header className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">Famílias</h2>
                  <Tooltip text="Resumo de mensagens trocadas com responsáveis nas últimas 24h.">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Tooltip>
                </div>
                <Tooltip text="Período considerado neste resumo.">
                  <span className="text-sm text-gray-600">Últimas 24h</span>
                </Tooltip>
              </header>

              <ul className="space-y-3">
                <Tooltip text="Mensagens recebidas e ainda não verificadas.">
                  <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
                    <span className="text-sm font-semibold text-gray-900">
                      Mensagens novas
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {nf.format(familias.novas)}
                    </span>
                  </li>
                </Tooltip>
                <Tooltip text="Mensagens já confirmadas pela equipe.">
                  <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
                    <span className="text-sm font-semibold text-gray-900">
                      Confirmadas
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      {nf.format(familias.confirmadas)}
                    </span>
                  </li>
                </Tooltip>
                <Tooltip text="Mensagens pendentes de resposta.">
                  <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
                    <span className="text-sm font-semibold text-gray-900">
                      Pendentes
                    </span>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                      {nf.format(familias.pendentes)}
                    </span>
                  </li>
                </Tooltip>
                <Tooltip text="Mensagens que exigem retorno prioritário.">
                  <li className="flex items-center justify-between rounded-xl border border-purple-100 p-3">
                    <span className="text-sm font-semibold text-gray-900">
                      Urgentes
                    </span>
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                      {nf.format(familias.urgentes)}
                    </span>
                  </li>
                </Tooltip>
              </ul>

              <div className="mt-4 flex items-center justify-between">
                <Tooltip text="Abrir todas as conversas com famílias.">
                  <Link
                    href="/home/dashboard/familias"
                    className="text-sm font-medium text-purple-700 transition hover:text-purple-800"
                  >
                    Ver todas as mensagens →
                  </Link>
                </Tooltip>
                <Tooltip text="Abrir a Central de ajuda com dúvidas frequentes.">
                  <Link
                    href="/help"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 transition hover:text-gray-700"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Central de ajuda
                  </Link>
                </Tooltip>
              </div>
            </article>
          </section>

          {/* Melo (IA) – objetivo, com ações claras */}
          <article className="w-full rounded-2xl border border-purple-100 bg-white p-5 shadow">
            <header className="mb-3 flex items-center gap-3">
              <img
                src="/meloIcon.png"
                alt="Melo"
                className="h-10 w-10 rounded-full ring-2 ring-purple-100"
              />
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">Melo (IA)</h2>
                <Tooltip text="Assistente que recomenda ações a partir dos sinais do PULSO.">
                  <Info className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
            </header>

            <div className="space-y-3 text-sm leading-relaxed text-gray-800">
              <ul className="list-disc pl-5">
                {melo.bullets.map((bullet, index) => (
                  <Tooltip
                    key={`melo-bullet-${index}`}
                    text={melo.bulletTooltips[index] ?? ""}
                  >
                    <li>{renderHighlightedSegments(bullet, index)}</li>
                  </Tooltip>
                ))}
              </ul>

              <div className="rounded-xl bg-purple-50/60 p-3 text-[13px]">
                <p className="font-semibold text-purple-900">Ações</p>
                <ul className="mt-1 list-disc pl-5 text-purple-900/90">
                  {melo.recomendacoes.map((item, index) => (
                    <Tooltip key={`melo-recomendacao-${index}`} text={item.tooltip}>
                      <li>{item.text}</li>
                    </Tooltip>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  {melo.acoes.map((acao, index) => {
                    const isPrimary = index === 0;
                    const actionClass = isPrimary
                      ? "rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                      : "rounded-lg border border-purple-200 px-3 py-1.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500";

                    return (
                      <Tooltip key={`melo-cta-${index}`} text={acao.tooltip}>
                        <Link href={acao.href} className={actionClass}>
                          {acao.label}
                        </Link>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
