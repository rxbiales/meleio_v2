"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

type Align = "left" | "center" | "right";

type Column = {
  key: string;
  label: string;
  align?: Align;
  render?: (row: any, rowIndex: number) => ReactNode;
  sortable?: boolean;
  className?: string;
};

type TableProps = {
  caption?: string;
  columns: Column[];
  rows: any[];
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
};

export default function Table({
  caption,
  columns,
  rows,
  emptyMessage = "Sem dados para exibir.",
  searchable = true,
  searchPlaceholder = "Buscar aluno...",
}: TableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [rawQuery, setRawQuery] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handle = window.setTimeout(() => setQuery(rawQuery), 150);
    return () => window.clearTimeout(handle);
  }, [rawQuery]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const needle = query.trim().toLowerCase();
    return rows.filter((row) =>
      String(row.aluno ?? "")
        .toLowerCase()
        .includes(needle)
    );
  }, [rows, query]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const va = a?.[sortKey];
      const vb = b?.[sortKey];

      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === "asc" ? -1 : 1;
      if (vb == null) return sortDir === "asc" ? 1 : -1;

      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }

      return sortDir === "asc"
        ? String(va).localeCompare(String(vb), "pt-BR", { numeric: true })
        : String(vb).localeCompare(String(va), "pt-BR", { numeric: true });
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  useEffect(() => {
    setSortKey(null);
    setSortDir("asc");
  }, [query]);

  const handleSort = (key: string, sortable: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir((direction) => (direction === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir("asc");
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        {caption ? (
          <h3 className="text-base font-semibold text-purple-700 lg:text-lg">
            {caption}
          </h3>
        ) : (
          <div />
        )}

        {searchable && (
          <div className="relative">
            <input
              type="search"
              value={rawQuery}
              onChange={(event) => setRawQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 w-64 rounded-full border border-purple-200 bg-white px-4 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 lg:h-11 lg:w-72 lg:text-base"
              aria-label="Buscar por aluno"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-purple-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="20" y1="20" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
        )}
      </div>

      <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-purple-200">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full border-collapse">
            <thead className="bg-purple-600 text-white">
              <tr>
                {columns.map((column) => {
                  const align = column.align ?? "left";
                  const sortable = column.sortable !== false;
                  const active = sortKey === column.key;
                  return (
                    <th
                      key={column.key}
                      className={cn(
                        "border-b border-black/10 px-4 py-3 text-sm font-semibold lg:px-5 lg:py-4 lg:text-base",
                        align === "center" && "text-center",
                        align === "right" && "text-right"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleSort(column.key, sortable)}
                        className={cn(
                          "inline-flex items-center gap-1",
                          sortable
                            ? "cursor-pointer hover:opacity-90"
                            : "cursor-default"
                        )}
                        title={sortable ? "Ordenar coluna" : undefined}
                      >
                        <span>{column.label}</span>
                        {sortable && (
                          <span
                            className={cn(
                              "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                              active
                                ? "bg-white text-purple-600"
                                : "bg-white/25 text-white"
                            )}
                          >
                            {active ? (sortDir === "asc" ? "^" : "v") : "-"}
                          </span>
                        )}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="text-sm text-gray-900 lg:text-base">
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-gray-500 lg:px-5"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}

              {sorted.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    "border-b border-purple-100 transition-colors",
                    rowIndex % 2 === 1 ? "bg-purple-50/30" : "bg-white",
                    "hover:bg-orange-50/40"
                  )}
                >
                  {columns.map((column) => {
                    const align = column.align ?? "left";
                    const content = column.render
                      ? column.render(row, rowIndex)
                      : row?.[column.key];
                    return (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3 lg:px-5 lg:py-4",
                          align === "center" && "text-center",
                          align === "right" && "text-right",
                          column.className
                        )}
                      >
                        {content ?? "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <div className="h-1 w-full rounded-b-2xl bg-gradient-to-r from-purple-600 via-orange-500 to-yellow-400" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
