"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  School,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  subitems?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/home/dashboard",
  },
  {
    id: "students",
    label: "Estudantes",
    icon: <Users className="h-5 w-5" />,
    href: "/home/dashboard/estudantes",
    subitems: [
      { label: "Lista", href: "/home/dashboard/estudantes/lista" },
      { label: "Linha do Tempo", href: "/home/dashboard/estudantes/timeline" },
      { label: "Dimensoes", href: "/home/dashboard/estudantes/dimensoes" },
      { label: "Evidencias", href: "/home/dashboard/estudantes/evidencias" },
      { label: "Planos & Acoes", href: "/home/dashboard/estudantes/planos" },
    ],
  },
  {
    id: "activities",
    label: "Atividades",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/home/dashboard/atividades",
    subitems: [
      { label: "Biblioteca", href: "/home/dashboard/atividades/biblioteca" },
      { label: "Criar", href: "/home/dashboard/atividades/criar" },
      { label: "Resultados", href: "/home/dashboard/atividades/resultados" },
    ],
  },
  {
    id: "classes",
    label: "Turmas",
    icon: <School className="h-5 w-5" />,
    href: "/home/dashboard/turmas",
    subitems: [
      { label: "Lista", href: "/home/dashboard/turmas/lista" },
      { label: "Visao Geral", href: "/home/dashboard/turmas/visao-geral" },
      { label: "Evolucao", href: "/home/dashboard/turmas/evolucao" },
    ],
  },
  {
    id: "help",
    label: "Help",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/home/dashboard/help",
  },
];

export default function Sidebar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <aside
      data-component="sidebar"
      className={`fixed left-0 top-0 z-40 h-screen border-r border-purple-600 bg-purple-700 transition-all duration-300 ease-in-out ${
        isOpen ? "w-60" : "w-16"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setExpandedItem(null);
      }}
    >
      <div className="flex h-full flex-col pt-20">
        <nav
          className="flex-1 space-y-3 px-2 py-4"
          aria-label="Navegacao principal"
        >
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <div key={item.id} data-menu-item={item.id}>
                <Link
                  href={item.href}
                  className={`group relative flex h-12 items-center rounded-xl px-2 transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-inner"
                      : "text-purple-100 hover:bg-purple-600/80 hover:text-white"
                  }`}
                  aria-label={item.label}
                  title={!isOpen ? item.label : undefined}
                  onMouseEnter={() => {
                    if (item.subitems && isOpen) {
                      setExpandedItem(item.id);
                    }
                  }}
                >
                  <div className="flex w-12 items-center justify-center text-white">
                    {item.icon}
                  </div>

                  {isOpen && (
                    <>
                      <span className="flex-1 text-sm font-medium text-white">
                        {item.label}
                      </span>
                      {item.subitems && (
                        <ChevronRight
                          className={`mr-3 h-4 w-4 text-purple-200 transition-transform duration-200 ${
                            expandedItem === item.id ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </>
                  )}
                </Link>

                {isOpen && expandedItem === item.id && item.subitems && (
                  <div
                    className="ml-12 mt-1 space-y-1 rounded-xl bg-purple-600/40 p-2 animate-in slide-in-from-top-2 duration-200"
                    data-subitems={item.id}
                  >
                    {item.subitems.map((subitem, index) => (
                      <Link
                        key={index}
                        href={subitem.href}
                        className="flex h-10 items-center rounded-lg px-3 text-sm text-purple-100 transition-colors hover:bg-purple-600 hover:text-white"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-purple-600 p-4">
          <div className="text-center text-xs text-purple-200">
            {isOpen ? "MELEIO v1.0" : "v1"}
          </div>
        </div>
      </div>
    </aside>
  );
}
