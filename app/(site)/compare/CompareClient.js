"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Plus, Scale, Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/StateScreen";
import { properties } from "@/lib/data/properties";
import { compareRows } from "@/lib/compareRows";
import { formatINR } from "@/lib/utils";

export function CompareClient() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const slugs = searchParams.get("slugs");
    if (slugs) {
      const matched = slugs.split(",").map((s) => properties.find((p) => p.slug === s)).filter(Boolean);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- seeds selection from the URL (external source) on initial load
      if (matched.length) setSelected(matched.slice(0, 4));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only read on initial mount
  }, []);

  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return properties
      .filter((p) => !selected.some((s) => s.slug === p.slug))
      .filter((p) => p.title.toLowerCase().includes(q) || p.community.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, selected]);

  function addProperty(p) {
    if (selected.length >= 4) return;
    setSelected((s) => [...s, p]);
    setQuery("");
  }

  function removeProperty(slug) {
    setSelected((s) => s.filter((p) => p.slug !== slug));
  }

  return (
    <div>
      <Card className="p-6 md:p-8">
        <div className="relative">
          <Input
            icon={Search}
            placeholder="Search a property to add (up to 4)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={selected.length >= 4}
          />
          {suggestions.length > 0 && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lg)]">
              {suggestions.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => addProperty(p)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-soft"
                >
                  <span className="relative h-10 w-12 shrink-0 overflow-hidden rounded-lg">
                    <Image src={p.images[0]} alt={p.title} fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink">{p.title}</span>
                  <span className="font-tabular text-sm text-ink-muted">{formatINR(p.price)}</span>
                  <Plus className="h-4 w-4 text-primary" />
                </button>
              ))}
            </div>
          )}
        </div>

        {selected.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {selected.map((p) => (
              <span key={p.slug} className="flex items-center gap-2 rounded-pill bg-primary-soft px-3.5 py-1.5 text-sm font-medium text-primary">
                {p.title}
                <button onClick={() => removeProperty(p.slug)} aria-label={`Remove ${p.title}`}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </Card>

      <div className="mt-10">
        {selected.length < 2 ? (
          <EmptyState
            icon={Scale}
            title="Add at least 2 properties to compare"
            description="Search above to add properties from anywhere on REROCK to your comparison."
          />
        ) : (
          <Card className="overflow-x-auto p-6 md:p-8">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-32 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">Property</th>
                  {selected.map((p) => (
                    <th key={p.slug} className="px-3 py-3 text-left">
                      <div className="relative mb-2 h-24 w-32 overflow-hidden rounded-xl">
                        <Image src={p.images[0]} alt={p.title} fill sizes="128px" className="object-cover" />
                      </div>
                      <p className="font-display text-sm text-ink">{p.title}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <td className="py-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">{row.label}</td>
                    {selected.map((p) => (
                      <td key={p.slug} className="px-3 py-3 font-medium text-ink">
                        {row.get(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}
