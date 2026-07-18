"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, List, Map as MapIcon, SlidersHorizontal, X } from "lucide-react";
import { FilterPanel } from "@/components/properties/FilterPanel";
import { MapView } from "@/components/properties/MapView";
import { PropertyListRow } from "@/components/properties/PropertyListRow";
import { CompareBar } from "@/components/properties/CompareBar";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { BottomSheet } from "@/components/ui/Sheet";
import { Select } from "@/components/ui/Select";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { NoResultsState } from "@/components/ui/StateScreen";
import { getLocation } from "@/lib/data/locations";
import { getBuilder } from "@/lib/data/builders";
import { properties } from "@/lib/data/properties";
import { communities } from "@/lib/data/communities";
import { cn } from "@/lib/utils";

const defaultFilters = {
  types: [],
  locations: [],
  builders: [],
  bedrooms: [],
  statuses: [],
  amenities: [],
  budget: "",
  minInvestmentScore: 0,
  reraOnly: false,
};

function communityFor(property) {
  return communities.find((c) => c.slug === property.community);
}

export function PropertiesClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const builder = searchParams.get("builder");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resyncs filters when the URL query (external source) changes
    setFilters((f) => ({
      ...f,
      types: type ? [type] : f.types,
      locations: location ? [location] : f.locations,
      builders: builder ? [builder] : f.builders,
    }));
  }, [searchParams]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- simulated fetch latency for skeleton loading state
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [filters, sort]);

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      const community = communityFor(p);
      if (filters.types.length && !filters.types.includes(p.type)) return false;
      if (filters.locations.length && !filters.locations.includes(p.location)) return false;
      if (filters.builders.length && !filters.builders.includes(p.builder)) return false;
      if (filters.statuses.length && !filters.statuses.includes(p.status)) return false;
      if (filters.bedrooms.length) {
        const bedLabel = p.bedrooms ? (p.bedrooms >= 5 ? "5+" : String(p.bedrooms)) : null;
        if (!bedLabel || !filters.bedrooms.includes(bedLabel)) return false;
      }
      if (filters.budget) {
        const [min, max] = filters.budget.split("-").map(Number);
        if (p.price < min || p.price > max) return false;
      }
      if (filters.reraOnly && !p.rera) return false;
      if (community && community.investmentScore < filters.minInvestmentScore) return false;
      if (filters.amenities.length && community) {
        const communityAmenityLabels = community.amenities.map((a) => a.label);
        if (!filters.amenities.every((a) => communityAmenityLabels.includes(a))) return false;
      }
      return true;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "investment") result = [...result].sort((a, b) => (communityFor(b)?.investmentScore ?? 0) - (communityFor(a)?.investmentScore ?? 0));

    return result;
  }, [filters, sort]);

  const activeChips = useMemo(() => {
    const chips = [];
    filters.types.forEach((t) => chips.push({ key: `type-${t}`, label: t, remove: () => setFilters((f) => ({ ...f, types: f.types.filter((x) => x !== t) })) }));
    filters.locations.forEach((l) =>
      chips.push({ key: `loc-${l}`, label: getLocation(l)?.name, remove: () => setFilters((f) => ({ ...f, locations: f.locations.filter((x) => x !== l) })) })
    );
    filters.builders.forEach((b) =>
      chips.push({ key: `builder-${b}`, label: getBuilder(b)?.name, remove: () => setFilters((f) => ({ ...f, builders: f.builders.filter((x) => x !== b) })) })
    );
    filters.bedrooms.forEach((b) => chips.push({ key: `bed-${b}`, label: `${b} BHK`, remove: () => setFilters((f) => ({ ...f, bedrooms: f.bedrooms.filter((x) => x !== b) })) }));
    filters.statuses.forEach((s) => chips.push({ key: `status-${s}`, label: s, remove: () => setFilters((f) => ({ ...f, statuses: f.statuses.filter((x) => x !== s) })) }));
    if (filters.reraOnly) chips.push({ key: "rera", label: "RERA Approved", remove: () => setFilters((f) => ({ ...f, reraOnly: false })) });
    return chips;
  }, [filters]);

  function toggleCompare(property) {
    setCompareList((list) => {
      const exists = list.find((p) => p.slug === property.slug);
      if (exists) return list.filter((p) => p.slug !== property.slug);
      if (list.length >= 3) return list;
      return [...list, property];
    });
  }

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-display text-3xl text-ink md:text-4xl">Explore Properties</h1>
        <p className="text-ink-muted">{loading ? "Searching listings..." : `${filtered.length} properties match your criteria`}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-card border border-border bg-surface p-6">
            <FilterPanel filters={filters} setFilters={setFilters} resultCount={filtered.length} />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-btn border border-border-strong px-4 py-2.5 text-sm font-medium text-ink lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters {activeChips.length > 0 && `(${activeChips.length})`}
            </button>
            <div className="flex items-center gap-3">
              <Select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 w-48">
                <option value="relevance">Sort: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="investment">Investment Score</option>
              </Select>
              <div className="flex rounded-btn border border-border-strong p-1">
                {[
                  { key: "grid", icon: LayoutGrid },
                  { key: "list", icon: List },
                  { key: "map", icon: MapIcon },
                ].map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setView(v.key)}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors", view === v.key ? "bg-primary text-white" : "text-ink-muted hover:bg-surface-soft")}
                    aria-label={v.key}
                  >
                    <v.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={chip.remove}
                  className="flex items-center gap-1.5 rounded-pill bg-primary-soft px-3.5 py-1.5 text-sm font-medium text-primary"
                >
                  {chip.label} <X className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <SkeletonGrid count={6} />
          ) : filtered.length === 0 ? (
            <NoResultsState action={<button onClick={() => setFilters(defaultFilters)} className="text-sm font-semibold text-primary">Clear all filters</button>} />
          ) : view === "map" ? (
            <MapView properties={filtered} />
          ) : view === "list" ? (
            <div className="space-y-4">
              {filtered.map((p) => (
                <PropertyListRow key={p.slug} property={p} compareChecked={compareList.some((x) => x.slug === p.slug)} onCompareToggle={() => toggleCompare(p)} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                  <PropertyCard property={p} compareChecked={compareList.some((x) => x.slug === p.slug)} onCompareToggle={() => toggleCompare(p)} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomSheet open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} title="Filters">
        <FilterPanel filters={filters} setFilters={setFilters} resultCount={filtered.length} />
      </BottomSheet>

      <CompareBar items={compareList} onRemove={(slug) => setCompareList((l) => l.filter((p) => p.slug !== slug))} onClear={() => setCompareList([])} />
    </div>
  );
}
