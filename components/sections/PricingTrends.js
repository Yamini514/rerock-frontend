"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/Card";
import { PricingTrendChart } from "@/components/charts/PricingTrendChart";
import { communities } from "@/lib/data/communities";

export function PricingTrends() {
  const [active, setActive] = useState(communities[0].slug);
  const community = communities.find((c) => c.slug === active);

  return (
    <section className="mx-auto max-w-[90rem] px-6 py-16 md:px-10 md:py-32">
      <SectionHeading
        eyebrow="Pricing Trends"
        title="Five years of appreciation, at a glance"
        description="Historical price-per-sq.ft data across our featured communities — updated quarterly."
      />
      <Card className="p-6 md:p-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {communities.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                active === c.slug ? "bg-primary text-white" : "bg-surface-soft text-ink-muted hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl text-ink">{community.name}</p>
            <p className="text-sm text-ink-muted">Price per sq.ft, 2021–2026</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-pill bg-success-soft px-3.5 py-1.5 text-sm font-semibold text-success">
            <TrendingUp className="h-4 w-4" /> +{community.growthPct}% since 2021
          </span>
        </div>
        <PricingTrendChart data={community.pricingTrend} height={340} />
      </Card>
    </section>
  );
}
