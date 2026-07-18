"use client";

import { useMemo, useState } from "react";
import { Percent } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { communities } from "@/lib/data/communities";

export default function BulkPricingPage() {
  const { toast } = useToast();
  const [selected, setSelected] = useState([]);
  const [pct, setPct] = useState(3);

  function toggle(slug) {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  }

  function toggleAll() {
    setSelected(selected.length === communities.length ? [] : communities.map((c) => c.slug));
  }

  const preview = useMemo(() => {
    return communities
      .filter((c) => selected.includes(c.slug))
      .map((c) => {
        const current = c.pricingTrend[c.pricingTrend.length - 1].pricePerSqft;
        return { ...c, current, updated: Math.round(current * (1 + pct / 100)) };
      });
  }, [selected, pct]);

  function apply() {
    toast({ tone: "success", title: "Bulk pricing applied", description: `${selected.length} communities updated by ${pct}%.` });
    setSelected([]);
  }

  return (
    <div>
      <AdminPageHeader title="Bulk Pricing" description="Apply a percentage price change across multiple communities at once" />
      <div className="grid gap-6 p-6 md:p-10 lg:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-4">
            <Checkbox checked={selected.length === communities.length} onChange={toggleAll} label="Select all" />
            <span className="text-sm text-ink-muted">{selected.length} selected</span>
          </div>
          <div className="divide-y divide-border">
            {communities.map((c) => (
              <label key={c.slug} className="flex cursor-pointer items-center justify-between gap-4 p-4">
                <span className="flex items-center gap-3">
                  <Checkbox checked={selected.includes(c.slug)} onChange={() => toggle(c.slug)} />
                  <span className="text-sm font-medium text-ink">{c.name}</span>
                </span>
                <span className="font-tabular text-sm text-ink-muted">
                  ₹{c.pricingTrend[c.pricingTrend.length - 1].pricePerSqft.toLocaleString("en-IN")}/sq.ft
                </span>
              </label>
            ))}
          </div>
        </Card>

        <Card className="h-fit p-6">
          <p className="font-display text-lg text-ink">Adjustment</p>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium text-ink-muted"><Percent className="h-4 w-4" /> Price Change</span>
              <span className="font-tabular text-sm font-semibold text-ink">{pct > 0 ? "+" : ""}{pct}%</span>
            </div>
            <input
              type="range"
              min={-15}
              max={15}
              step={0.5}
              value={pct}
              onChange={(e) => setPct(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-pill bg-surface-soft accent-[var(--color-primary)]"
            />
          </div>

          {preview.length > 0 && (
            <div className="mt-6 max-h-64 space-y-3 overflow-y-auto border-t border-border pt-4">
              {preview.map((p) => (
                <div key={p.slug} className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">{p.name}</span>
                  <span className="font-tabular font-medium text-ink">
                    ₹{p.current.toLocaleString("en-IN")} → <span className="text-primary">₹{p.updated.toLocaleString("en-IN")}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          <Button className="mt-6 w-full" disabled={selected.length === 0} onClick={apply}>
            Apply to {selected.length || 0} Communities
          </Button>
        </Card>
      </div>
    </div>
  );
}
