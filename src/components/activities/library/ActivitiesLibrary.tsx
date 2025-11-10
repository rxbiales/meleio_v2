// src/components/activities/library/ActivitiesLibrary.tsx
"use client";

import { useState, useMemo } from "react";
import {
  BookMarked,
  Filter,
  Sparkles,
  Clock,
  Star,
  Search,
  X,
  Zap,
  Users,
  Heart,
  Brain,
  MessageCircle,
  Copy,
  TrendingUp,
  Package,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Activity = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  competencias: string[];
  series: string[];
  duracaoMin: number;
  preparoMin: number;
  intensidade: "baixa" | "media" | "alta";
  materiais: string[];
  atualizadaEm: string;
  destaque?: boolean;
};

type Collection = {
  id: string;
  titulo: string;
  descricao: string;
  tags: string[];
  atividadesCount: number;
};

const ACTIVITIES: Activity[] = [
  {
    id: "1",
    titulo: "Círculo de Gratidão",
    descricao:
      "Prática de reconhecimento mútuo fortalecendo vínculos e promovendo clima positivo na turma.",
    categoria: "Roda de conversa",
    competencias: ["Empatia", "Colaboração"],
    series: ["6º ano", "7º ano", "8º ano"],
    duracaoMin: 25,
    preparoMin: 5,
    intensidade: "baixa",
    materiais: ["Nenhum"],
    atualizadaEm: "2025-11-08",
    destaque: true,
  },
  {
    id: "2",
    titulo: "Mapeamento Emocional",
    descricao:
      "Dinâmica de identificação e expressão de emoções através de cores e desenhos.",
    categoria: "Oficina",
    competencias: ["Autogestão", "Autoconsciência"],
    series: ["6º ano", "7º ano"],
    duracaoMin: 40,
    preparoMin: 10,
    intensidade: "media",
    materiais: ["Papel sulfite", "Lápis de cor", "Canetinhas"],
    atualizadaEm: "2025-11-07",
    destaque: true,
  },
  {
    id: "3",
    titulo: "Check-in Rápido: Como Você Está?",
    descricao:
      "Abertura acolhedora para identificar estado emocional da turma em poucos minutos.",
    categoria: "Check-in guiado",
    competencias: ["Autoconsciência"],
    series: ["6º ano", "7º ano", "8º ano", "9º ano"],
    duracaoMin: 10,
    preparoMin: 2,
    intensidade: "baixa",
    materiais: ["Nenhum"],
    atualizadaEm: "2025-11-09",
    destaque: false,
  },
  {
    id: "4",
    titulo: "Desafio da Colaboração",
    descricao:
      "Atividade prática em grupos para resolver problemas complexos estimulando trabalho em equipe.",
    categoria: "Dinâmica",
    competencias: ["Colaboração", "Responsabilidade"],
    series: ["8º ano", "9º ano"],
    duracaoMin: 45,
    preparoMin: 15,
    intensidade: "alta",
    materiais: ["Barbante", "Tesoura", "Fita adesiva", "Jornal"],
    atualizadaEm: "2025-11-05",
    destaque: false,
  },
  {
    id: "5",
    titulo: "Respiração Consciente para Provas",
    descricao:
      "Técnicas de regulação emocional antes de avaliações importantes.",
    categoria: "Prática meditativa",
    competencias: ["Autogestão"],
    series: ["7º ano", "8º ano", "9º ano"],
    duracaoMin: 15,
    preparoMin: 3,
    intensidade: "baixa",
    materiais: ["Nenhum"],
    atualizadaEm: "2025-11-10",
    destaque: true,
  },
  {
    id: "6",
    titulo: "Teatro das Emoções",
    descricao:
      "Expressão dramática de diferentes estados emocionais desenvolvendo empatia e autoconhecimento.",
    categoria: "Oficina",
    competencias: ["Empatia", "Autoconsciência", "Colaboração"],
    series: ["6º ano", "7º ano", "8º ano"],
    duracaoMin: 50,
    preparoMin: 20,
    intensidade: "alta",
    materiais: ["Cartões de emoções", "Fantasias opcionais"],
    atualizadaEm: "2025-11-03",
    destaque: false,
  },
  {
    id: "7",
    titulo: "Escuta Ativa em Duplas",
    descricao:
      "Exercício estruturado para desenvolver habilidades de escuta genuína e comunicação empática.",
    categoria: "Dinâmica",
    competencias: ["Empatia", "Colaboração"],
    series: ["7º ano", "8º ano", "9º ano"],
    duracaoMin: 30,
    preparoMin: 5,
    intensidade: "media",
    materiais: ["Nenhum"],
    atualizadaEm: "2025-11-06",
    destaque: false,
  },
  {
    id: "8",
    titulo: "Diário de Conquistas",
    descricao:
      "Reflexão individual semanal sobre progressos pessoais e acadêmicos.",
    categoria: "Prática reflexiva",
    competencias: ["Autoconsciência", "Responsabilidade"],
    series: ["6º ano", "7º ano", "8º ano", "9º ano"],
    duracaoMin: 20,
    preparoMin: 5,
    intensidade: "baixa",
    materiais: ["Caderno", "Caneta"],
    atualizadaEm: "2025-11-04",
    destaque: false,
  },
];

const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    titulo: "Regulação em Semanas de Prova",
    descricao:
      "Conjunto de práticas para manter equilíbrio emocional durante avaliações.",
    tags: ["Autogestão", "Stress", "Foco"],
    atividadesCount: 5,
  },
  {
    id: "c2",
    titulo: "Construindo Vínculos Fortes",
    descricao:
      "Sequência de atividades para fortalecer conexões entre estudantes.",
    tags: ["Empatia", "Colaboração", "Comunidade"],
    atividadesCount: 8,
  },
  {
    id: "c3",
    titulo: "Início de Ano Acolhedor",
    descricao:
      "Roteiro completo para integrar turmas no começo do período letivo.",
    tags: ["Integração", "Autoconhecimento", "Turma"],
    atividadesCount: 6,
  },
];

const CATEGORIAS = [
  "Oficina",
  "Roda de conversa",
  "Check-in guiado",
  "Dinâmica",
  "Prática meditativa",
  "Prática reflexiva",
];
const DURACOES = ["Até 20min", "20-40min", "Mais de 40min"];
const SERIES = ["6º ano", "7º ano", "8º ano", "9º ano"];
const COMPETENCIAS = [
  "Autogestão",
  "Empatia",
  "Responsabilidade",
  "Colaboração",
  "Autoconsciência",
];

export function ActivitiesLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>(
    []
  );
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (
    value: string,
    state: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedDurations.length +
    selectedSeries.length +
    selectedCompetencies.length;

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedDurations([]);
    setSelectedSeries([]);
    setSelectedCompetencies([]);
    setSearchTerm("");
  };

  const filteredActivities = useMemo(() => {
    let results = [...ACTIVITIES];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (act) =>
          act.titulo.toLowerCase().includes(term) ||
          act.descricao.toLowerCase().includes(term)
      );
    }

    if (selectedCategories.length > 0) {
      results = results.filter((act) =>
        selectedCategories.includes(act.categoria)
      );
    }

    if (selectedDurations.length > 0) {
      results = results.filter((act) => {
        if (selectedDurations.includes("Até 20min") && act.duracaoMin <= 20)
          return true;
        if (
          selectedDurations.includes("20-40min") &&
          act.duracaoMin > 20 &&
          act.duracaoMin <= 40
        )
          return true;
        if (selectedDurations.includes("Mais de 40min") && act.duracaoMin > 40)
          return true;
        return false;
      });
    }

    if (selectedSeries.length > 0) {
      results = results.filter((act) =>
        act.series.some((s) => selectedSeries.includes(s))
      );
    }

    if (selectedCompetencies.length > 0) {
      results = results.filter((act) =>
        act.competencias.some((c) => selectedCompetencies.includes(c))
      );
    }

    return results.sort((a, b) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return (
        new Date(b.atualizadaEm).getTime() - new Date(a.atualizadaEm).getTime()
      );
    });
  }, [
    searchTerm,
    selectedCategories,
    selectedDurations,
    selectedSeries,
    selectedCompetencies,
  ]);

  const newThisWeekCount = ACTIVITIES.filter((act) => {
    const diff = Date.now() - new Date(act.atualizadaEm).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50" data-page="activities-library">
      <Sidebar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-orange-50 to-yellow-50 border border-purple-100 p-8 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-orange-200/30 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <BookMarked className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Biblioteca Viva de Atividades SEL
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Explore práticas validadas, descubra novas dinâmicas e
                  transforme sua sala em espaço de desenvolvimento
                  socioemocional.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">
                    Total de atividades
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {ACTIVITIES.length}
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-600">
                    Novas esta semana
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {newThisWeekCount}
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-yellow-100">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">
                    Coleções curadas
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {COLLECTIONS.length}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white border-gray-200 focus-visible:ring-purple-500"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 border-gray-200"
              >
                <Filter className="w-4 h-4" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-purple-100 text-purple-700"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              <Button
                size="lg"
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="w-4 h-4" />
                Explorar novidades
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="p-6 mb-6 rounded-2xl border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                Filtros dinâmicos
              </h3>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Limpar tudo
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Categoria
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIAS.map((cat) => (
                    <Badge
                      key={cat}
                      variant={
                        selectedCategories.includes(cat) ? "default" : "outline"
                      }
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedCategories.includes(cat)
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "hover:border-purple-300"
                      )}
                      onClick={() =>
                        toggleFilter(
                          cat,
                          selectedCategories,
                          setSelectedCategories
                        )
                      }
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Duração
                </label>
                <div className="flex flex-wrap gap-2">
                  {DURACOES.map((dur) => (
                    <Badge
                      key={dur}
                      variant={
                        selectedDurations.includes(dur) ? "default" : "outline"
                      }
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedDurations.includes(dur)
                          ? "bg-orange-600 hover:bg-orange-700"
                          : "hover:border-orange-300"
                      )}
                      onClick={() =>
                        toggleFilter(
                          dur,
                          selectedDurations,
                          setSelectedDurations
                        )
                      }
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {dur}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Série
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERIES.map((serie) => (
                    <Badge
                      key={serie}
                      variant={
                        selectedSeries.includes(serie) ? "default" : "outline"
                      }
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedSeries.includes(serie)
                          ? "bg-yellow-600 hover:bg-yellow-700 text-gray-900"
                          : "hover:border-yellow-300"
                      )}
                      onClick={() =>
                        toggleFilter(serie, selectedSeries, setSelectedSeries)
                      }
                    >
                      {serie}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Competências SEL
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMPETENCIAS.map((comp) => (
                    <Badge
                      key={comp}
                      variant={
                        selectedCompetencies.includes(comp)
                          ? "default"
                          : "outline"
                      }
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedCompetencies.includes(comp)
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "hover:border-purple-300"
                      )}
                      onClick={() =>
                        toggleFilter(
                          comp,
                          selectedCompetencies,
                          setSelectedCompetencies
                        )
                      }
                    >
                      <Brain className="w-3 h-3 mr-1" />
                      {comp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Results counter */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredActivities.length}
            </span>{" "}
            atividade{filteredActivities.length !== 1 ? "s" : ""} encontrada
            {filteredActivities.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className={cn(
                "p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1",
                activity.destaque
                  ? "border-orange-200 bg-gradient-to-br from-white to-orange-50/30"
                  : "border-purple-100 bg-white"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {activity.destaque && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                        <Star className="w-3 h-3 mr-1 fill-orange-700" />
                        Destaque
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="border-purple-200 text-purple-700"
                    >
                      {activity.categoria}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {activity.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {activity.descricao}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    <span className="font-medium text-gray-900">
                      {activity.duracaoMin}min
                    </span>{" "}
                    de aplicação
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    <span className="font-medium text-gray-900">
                      {activity.preparoMin}min
                    </span>{" "}
                    preparo
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Zap
                    className={cn(
                      "w-4 h-4",
                      activity.intensidade === "baixa"
                        ? "text-green-500"
                        : activity.intensidade === "media"
                        ? "text-yellow-500"
                        : "text-red-500"
                    )}
                  />
                  <span className="text-sm text-gray-600">
                    Energia {activity.intensidade}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activity.competencias.map((comp) => (
                    <Badge
                      key={comp}
                      variant="secondary"
                      className="text-xs bg-purple-50 text-purple-700 border border-purple-100"
                    >
                      {comp}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activity.series.map((serie) => (
                    <Badge
                      key={serie}
                      variant="outline"
                      className="text-xs border-gray-200 text-gray-600"
                    >
                      {serie}
                    </Badge>
                  ))}
                </div>

                {activity.materiais[0] !== "Nenhum" && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Materiais:</span>{" "}
                    {activity.materiais.join(", ")}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Aplicar agora
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  Ver detalhes
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Curated Collections */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-orange-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Coleções Curadas pelo Melo
              </h2>
              <p className="text-sm text-gray-600">
                Sequências especiais para momentos específicos do ano letivo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection) => (
              <Card
                key={collection.id}
                className="p-6 rounded-2xl border-purple-100 bg-gradient-to-br from-white to-purple-50/20 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {collection.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {collection.descricao}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {collection.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-orange-50 text-orange-700 border border-orange-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {collection.atividadesCount}
                    </span>{" "}
                    atividades
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    Ver coleção
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <Card className="p-8 rounded-2xl border-purple-100 bg-gradient-to-r from-purple-50 via-white to-orange-50 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Precisa de algo específico?
            </h3>
            <p className="text-gray-600 mb-6">
              O Melobot pode ajudar você a encontrar ou criar atividades
              personalizadas para sua turma.
            </p>
            <Button
              variant="ghost"
              size="lg"
              className="gap-2 border border-purple-200 hover:bg-purple-50"
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
              Conversar com Melobot
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
