"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { NoResultsState } from "@/components/ui/StateScreen";
import { cn } from "@/lib/utils";

export function Table({
  columns,
  data,
  pageSize = 8,
  searchable = true,
  searchPlaceholder = "Search...",
  bulkActions = [],
  exportable = true,
  exportFilename = "rerock-export.csv",
  emptyTitle = "No records found",
  emptyDescription = "Try a different search or clear your filters.",
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) => columns.some((c) => String(row[c.key] ?? "").toLowerCase().includes(q)));
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") return sort.dir === "asc" ? av - bv : bv - av;
      return sort.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }

  function toggleRow(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function toggleAll() {
    setSelected(selected.length === pageRows.length ? [] : pageRows.map((r) => r.id));
  }

  function exportCSV() {
    const header = columns.map((c) => c.label).join(",");
    const rows = sorted.map((row) => columns.map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportFilename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        {searchable ? (
          <div className="w-full max-w-xs">
            <Input
              icon={Search}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-10"
            />
          </div>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-2">
          {selected.length > 0 &&
            bulkActions.map((action) => (
              <Button key={action.label} size="sm" variant="outline" onClick={() => action.onClick(selected)}>
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label} ({selected.length})
              </Button>
            ))}
          {exportable && (
            <Button size="sm" variant="outline" onClick={exportCSV}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          )}
        </div>
      </div>

      {pageRows.length === 0 ? (
        <NoResultsState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-surface-soft">
              <tr>
                {bulkActions.length > 0 && (
                  <th className="w-12 px-4 py-3.5">
                    <Checkbox checked={selected.length === pageRows.length} onChange={toggleAll} />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "whitespace-nowrap px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted",
                      col.sortable && "cursor-pointer select-none hover:text-ink"
                    )}
                    onClick={() => col.sortable && toggleSort(col.key)}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.label}
                      {col.sortable &&
                        (sort.key === col.key ? (
                          sort.dir === "asc" ? (
                            <ArrowUp className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDown className="h-3.5 w-3.5" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                        ))}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id} className="border-t border-border transition-colors hover:bg-surface-soft/60">
                  {bulkActions.length > 0 && (
                    <td className="px-4 py-3.5">
                      <Checkbox checked={selected.includes(row.id)} onChange={() => toggleRow(row.id)} />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap px-4 py-3.5 text-ink">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pageRows.length > 0 && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3.5">
          <p className="text-xs text-ink-muted">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-soft disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-xs font-medium text-ink">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-soft disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
