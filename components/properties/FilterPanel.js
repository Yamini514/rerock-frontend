"use client";

import { RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { locations } from "@/lib/data/locations";
import { builders } from "@/lib/data/builders";
import { propertyStatuses } from "@/lib/data/properties";

export const propertyTypes = ["Apartment", "Villa", "Plot", "Commercial"];
export const bedroomOptions = ["1", "2", "3", "4", "5+"];
export const budgetOptions = [
  { label: "Under ₹1 Cr", value: "0-10000000" },
  { label: "₹1 Cr – ₹2 Cr", value: "10000000-20000000" },
  { label: "₹2 Cr – ₹4 Cr", value: "20000000-40000000" },
  { label: "₹4 Cr+", value: "40000000-999999999" },
];
export const amenitiesList = ["Infinity Pool", "Clubhouse & Gym", "24x7 Security", "EV Charging", "Sports Courts", "Jogging Track"];

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-border py-6 first:pt-0 last:border-b-0">
      <p className="mb-4 text-sm font-semibold text-ink">{title}</p>
      {children}
    </div>
  );
}

export function FilterPanel({ filters, setFilters, resultCount }) {
  function toggleArrayValue(key, value) {
    setFilters((f) => {
      const arr = f[key];
      return { ...f, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  }

  function reset() {
    setFilters({
      types: [],
      locations: [],
      builders: [],
      bedrooms: [],
      statuses: [],
      amenities: [],
      budget: "",
      minInvestmentScore: 0,
      reraOnly: false,
    });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-display text-xl text-ink">Filters</p>
        <button onClick={reset} className="flex items-center gap-1 text-xs font-medium text-ink-muted transition-colors hover:text-primary">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <FilterGroup title="Property Type">
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((t) => (
            <button
              key={t}
              onClick={() => toggleArrayValue("types", t)}
              className={`rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filters.types.includes(t)
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border-strong text-ink-muted hover:border-primary/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Budget">
        <div className="space-y-2.5">
          {budgetOptions.map((b) => (
            <label key={b.value} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name="budget"
                checked={filters.budget === b.value}
                onChange={() => setFilters((f) => ({ ...f, budget: b.value }))}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              <span className="text-sm text-ink">{b.label}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((b) => (
            <button
              key={b}
              onClick={() => toggleArrayValue("bedrooms", b)}
              className={`h-10 w-14 rounded-btn border text-sm font-medium transition-colors ${
                filters.bedrooms.includes(b) ? "border-primary bg-primary-soft text-primary" : "border-border-strong text-ink-muted hover:border-primary/50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Location">
        <div className="space-y-2.5">
          {locations.map((l) => (
            <Checkbox key={l.slug} className="w-full" checked={filters.locations.includes(l.slug)} onChange={() => toggleArrayValue("locations", l.slug)} label={l.name} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Builder">
        <div className="space-y-2.5">
          {builders.map((b) => (
            <Checkbox key={b.slug} className="w-full" checked={filters.builders.includes(b.slug)} onChange={() => toggleArrayValue("builders", b.slug)} label={b.name} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Possession Status">
        <div className="space-y-2.5">
          {propertyStatuses.map((s) => (
            <Checkbox key={s} className="w-full" checked={filters.statuses.includes(s)} onChange={() => toggleArrayValue("statuses", s)} label={s} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Amenities">
        <div className="space-y-2.5">
          {amenitiesList.map((a) => (
            <Checkbox key={a} className="w-full" checked={filters.amenities.includes(a)} onChange={() => toggleArrayValue("amenities", a)} label={a} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Minimum Investment Score">
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={filters.minInvestmentScore}
          onChange={(e) => setFilters((f) => ({ ...f, minInvestmentScore: Number(e.target.value) }))}
          className="h-2 w-full cursor-pointer appearance-none rounded-pill bg-surface-soft accent-[var(--color-primary)]"
        />
        <p className="mt-2 font-tabular text-sm text-ink-muted">{filters.minInvestmentScore}+ / 100</p>
      </FilterGroup>

      <FilterGroup title="Compliance">
        <Checkbox checked={filters.reraOnly} onChange={() => setFilters((f) => ({ ...f, reraOnly: !f.reraOnly }))} label="RERA Approved only" />
      </FilterGroup>

      <Button className="mt-2 w-full lg:hidden" size="lg">
        Show {resultCount} Results
      </Button>
    </div>
  );
}
