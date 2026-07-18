"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { PricingComparisonChart } from "@/components/charts/PricingComparisonChart";
import { communities } from "@/lib/data/communities";
import { locations } from "@/lib/data/locations";
import { getLocation } from "@/lib/data/locations";
import { getBuilder } from "@/lib/data/builders";

const communityColumns = [
  { key: "name", label: "Community", sortable: true },
  { key: "locationName", label: "Location", sortable: true },
  { key: "builderName", label: "Builder", sortable: true },
  { key: "pricePerSqft", label: "Price / sq.ft", sortable: true, render: (r) => `₹${r.pricePerSqft.toLocaleString("en-IN")}` },
  { key: "growthPct", label: "5yr Growth", sortable: true, render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span> },
  { key: "investmentScore", label: "Investment Score", sortable: true, render: (r) => `${r.investmentScore}/100` },
];

const locationColumns = [
  { key: "name", label: "Location", sortable: true },
  { key: "avgPricePerSqft", label: "Avg. Price / sq.ft", sortable: true, render: (r) => `₹${r.avgPricePerSqft.toLocaleString("en-IN")}` },
  { key: "growthPct", label: "YoY Growth", sortable: true, render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span> },
  { key: "propertyCount", label: "Listed Properties", sortable: true },
];

export function PricingTrendsClient() {
  const [selected, setSelected] = useState(communities.slice(0, 3).map((c) => c.slug));

  function toggle(slug) {
    setSelected((s) => {
      if (s.includes(slug)) return s.filter((x) => x !== slug);
      if (s.length >= 4) return s;
      return [...s, slug];
    });
  }

  const series = communities
    .filter((c) => selected.includes(c.slug))
    .map((c) => ({ key: c.slug, label: c.name, data: c.pricingTrend }));

  const communityRows = communities.map((c) => ({
    id: c.slug,
    name: c.name,
    locationName: getLocation(c.location)?.name,
    builderName: getBuilder(c.builder)?.name,
    pricePerSqft: c.pricingTrend[c.pricingTrend.length - 1].pricePerSqft,
    growthPct: c.growthPct,
    investmentScore: c.investmentScore,
  }));

  const locationRows = locations.map((l) => ({ id: l.slug, ...l }));

  return (
    <div>
      <Card className="p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl text-ink">Compare Communities</p>
            <p className="text-sm text-ink-muted">Select up to 4 communities to overlay their pricing trend.</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-pill bg-success-soft px-3 py-1.5 text-xs font-semibold text-success">
            <TrendingUp className="h-3.5 w-3.5" /> {selected.length} selected
          </span>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {communities.map((c) => (
            <button
              key={c.slug}
              onClick={() => toggle(c.slug)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                selected.includes(c.slug) ? "bg-primary text-white" : "bg-surface-soft text-ink-muted hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        {series.length > 0 && <PricingComparisonChart series={series} />}
      </Card>

      <section className="mt-12">
        <h2 className="mb-6 font-display text-2xl text-ink">All Communities</h2>
        <Table columns={communityColumns} data={communityRows} searchPlaceholder="Search communities..." exportFilename="rerock-community-pricing.csv" />
      </section>

      <section className="mt-12">
        <h2 className="mb-6 font-display text-2xl text-ink">By Location</h2>
        <Table columns={locationColumns} data={locationRows} searchable={false} exportFilename="rerock-location-pricing.csv" pageSize={10} />
      </section>
    </div>
  );
}
