"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { PricingComparisonChart } from "@/components/charts/PricingComparisonChart";
import { communities } from "@/lib/data/communities";
import { pricingUpdates } from "@/lib/data/admin";

const columns = [
  { key: "community", label: "Community", sortable: true },
  { key: "change", label: "Change", sortable: true, render: (r) => <span className="font-semibold text-success">{r.change}</span> },
  { key: "updatedBy", label: "Updated By", sortable: true },
  { key: "date", label: "Date", sortable: true },
];

export default function AdminPricingHistoryPage() {
  const [selected, setSelected] = useState(communities.slice(0, 3).map((c) => c.slug));

  function toggle(slug) {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length >= 4 ? s : [...s, slug]));
  }

  const series = communities.filter((c) => selected.includes(c.slug)).map((c) => ({ key: c.slug, label: c.name, data: c.pricingTrend }));

  return (
    <div>
      <AdminPageHeader title="Pricing History" description="Historical price movement audit across communities" />
      <div className="space-y-8 p-6 md:p-10">
        <Card className="p-6">
          <div className="mb-6 flex flex-wrap gap-2">
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

        <section>
          <h2 className="mb-4 font-display text-xl text-ink">Recent Updates</h2>
          <Table columns={columns} data={pricingUpdates} searchable={false} />
        </section>
      </div>
    </div>
  );
}
