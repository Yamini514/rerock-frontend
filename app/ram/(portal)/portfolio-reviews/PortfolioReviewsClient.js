"use client";

import Link from "next/link";
import Image from "next/image";
import { LineChart, PieChart, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { clients } from "@/lib/data/clients";
import { portfolioGrowth, portfolioSummary } from "@/lib/data/portfolio";
import { formatINR } from "@/lib/utils";

export function PortfolioReviewsClient() {
  const { user } = useRamAuth();
  const myClients = clients.filter((c) => c.assignedRamId === user?.id);
  const totalValue = myClients.reduce((sum, c) => sum + c.portfolioValue, 0);
  const avgDiversification = myClients.length ? (myClients.reduce((sum, c) => sum + c.properties, 0) / myClients.length).toFixed(1) : 0;

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Portfolio Reviews</h1>
      <p className="mb-6 text-sm text-ink-muted">Investment value, ROI, growth, and diversification across your book</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard label="Total Book Value" value={formatINR(totalValue)} changePct={portfolioSummary.totalGrowthPct} icon={PieChart} />
        <StatCard label="Avg. ROI" value={`${portfolioSummary.totalGrowthPct}%`} changePct={0} icon={TrendingUp} />
        <StatCard label="Avg. Diversification" value={`${avgDiversification} properties`} changePct={0} icon={LineChart} />
      </div>

      <Card className="mt-6 p-6">
        <p className="mb-4 font-display text-lg text-ink">Market Trend — Portfolio Value Over Time</p>
        <GrowthChart data={portfolioGrowth} />
      </Card>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl text-ink">Client-by-Client Review</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myClients.map((c) => (
            <Link key={c.id} href={`/ram/clients/${c.id}`}>
              <Card hover className="p-6">
                <div className="flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={c.avatar} alt={c.name} fill sizes="44px" className="object-cover" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                    <p className="text-xs text-ink-muted">{c.properties} {c.properties === 1 ? "property" : "properties"}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <p className="font-tabular text-lg font-semibold text-ink">{formatINR(c.portfolioValue)}</p>
                  <Badge tone={c.id === "c1" ? "success" : "neutral"}>{c.id === "c1" ? `+${portfolioSummary.totalGrowthPct}%` : "Review pending"}</Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
