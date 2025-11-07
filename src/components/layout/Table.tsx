"use client";

import { useEffect, useMemo, useState, ChangeEvent } from "react";

type SortDir = "asc" | "desc";

export type UseTableOptions<T> = {
  searchableKeys?: (keyof T)[];
  initialSortKey?: keyof T | null;
  initialSortDir?: SortDir;
  searchDebounceMs?: number;
};

export function useTable<T extends Record<string, any>>(
  rows: T[],
  {
    searchableKeys = [],
    initialSortKey = null,
    initialSortDir = "asc",
    searchDebounceMs = 150,
  }: UseTableOptions<T> = {}
) {
  const [sortKey, setSortKey] = useState<keyof T | null>(initialSortKey);
  const [sortDir, setSortDir] = useState<SortDir>(initialSortDir);
  const [rawQuery, setRawQuery] = useState("");
  const [query, setQuery] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  // debounce da busca
  useEffect(() => {
    const handle = window.setTimeout(
      () => setQuery(rawQuery),
      searchDebounceMs
    );
    return () => window.clearTimeout(handle);
  }, [rawQuery, searchDebounceMs]);

  // flag digitando
  useEffect(() => {
    setIsWriting(rawQuery.length > 0);
  }, [rawQuery]);

  // filtra
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    if (!searchableKeys.length) return rows;
    return rows.filter((row) =>
      searchableKeys.some((k) =>
        String(row?.[k] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [rows, query, searchableKeys]);

  // ordena
  const sortedRows = useMemo(() => {
    if (!sortKey) return filteredRows;
    const copy = [...filteredRows];
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
  }, [filteredRows, sortKey, sortDir]);

  // ao trocar query, reseta ordenação para a inicial
  useEffect(() => {
    setSortKey(initialSortKey);
    setSortDir(initialSortDir);
  }, [query, initialSortDir, initialSortKey]);

  // handlers
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRawQuery(e.target.value);
  };

  const clearSearch = () => setRawQuery("");

  return {
    rawQuery,
    query,
    isWriting,
    onSearchChange,
    clearSearch,
    sortKey,
    sortDir,
    handleSort,
    filteredRows,
    sortedRows,
  };
}
