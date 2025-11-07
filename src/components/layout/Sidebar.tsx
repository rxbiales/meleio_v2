"use client";

import { useEffect, useState, type ReactElement, type ReactNode } from "react";
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

type MenuLink = string;

interface MenuSubitem {
  label: string;
  href: MenuLink;
}

interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: MenuLink;
  subitems?: MenuSubitem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    id: "students",
    label: "Estudantes",
    icon: <Users className="h-5 w-5" />,
    href: "/dashboard/estudantes",
  },
  {
    id: "activities",
    label: "Atividades",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/dashboard/atividades",
    subitems: [
      { label: "Biblioteca", href: "/dashboard/atividades/biblioteca" },
      { label: "Criar", href: "/dashboard/atividades/criar" },
      { label: "Resultados", href: "/dashboard/atividades/resultados" },
    ],
  },
  {
    id: "classes",
    label: "Turmas",
    icon: <School className="h-5 w-5" />,
    href: "/dashboard/turmas",
    subitems: [
      { label: "Lista", href: "/dashboard/turmas/lista" },
      { label: "Visão geral", href: "/dashboard/turmas/visao-geral" },
      { label: "Evolução", href: "/dashboard/turmas/evolucao" },
    ],
  },
  {
    id: "help",
    label: "Help",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/dashboard/help",
  },
];

// Função que identifica o item ativo mais específico
function getActiveMenuItem(pathname: string, items: MenuItem[]): string | null {
  let activeId: string | null = null;

  for (const item of items) {
    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
      activeId = item.id;
    }

    if (item.subitems) {
      for (const sub of item.subitems) {
        if (pathname === sub.href || pathname.startsWith(`${sub.href}/`)) {
          activeId = item.id; // Prioriza o subitem correspondente
        }
      }
    }
  }

  return activeId;
}

export default function Sidebar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();
  const activeItemId = getActiveMenuItem(pathname, MENU_ITEMS);

  useEffect(() => {
    const width = isOpen ? "16rem" : "4rem";
    document.documentElement.style.setProperty("--sb-w", width);
    return () => {
      document.documentElement.style.setProperty("--sb-w", "4rem");
    };
  }, [isOpen]);

  return (
    <aside
      data-component="sidebar"
      className={`fixed left-0 top-0 z-40 h-screen border-r border-purple-600 bg-purple-700 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
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
          aria-label="Navegação principal"
        >
          {MENU_ITEMS.map((item) => {
            const isActive = item.id === activeItemId;
            const isExpanded = expandedItem === item.id;

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
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </>
                  )}
                </Link>

                {isOpen && isExpanded && item.subitems && (
                  <div
                    className="ml-12 mt-1 space-y-1 rounded-xl bg-purple-600/40 p-2 animate-in slide-in-from-top-2 duration-200"
                    data-subitems={item.id}
                  >
                    {item.subitems.map((subitem) => {
                      const subActive =
                        pathname === subitem.href ||
                        pathname.startsWith(`${subitem.href}/`);
                      return (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className={`flex h-10 items-center rounded-lg px-3 text-sm transition-colors ${
                            subActive
                              ? "bg-purple-600 text-white"
                              : "text-purple-100 hover:bg-purple-600 hover:text-white"
                          }`}
                        >
                          {subitem.label}
                        </Link>
                      );
                    })}
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
