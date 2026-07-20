"use client";

import { Award, Banknote, CalendarClock, IndianRupee, Trophy, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { LeadFunnelChart } from "@/components/charts/LeadFunnelChart";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { performanceForAgent } from "@/lib/data/performance";
import { leadFunnelForAgent } from "@/lib/data/leads";
import { formatINR } from "@/lib/utils";

const rankSuffix = (n) => (n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`);

export function PerformanceClient() {
  const { user } = useAgentAuth();
  const performance = performanceForAgent(user?.slug);

  if (!performance) return null;

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl text-ink">Performance</h1>
        <Badge tone="primary" icon={Trophy}>{rankSuffix(performance.monthlyRanking)} this month</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Leads Converted" value={performance.leadsConverted} changePct={6.4} icon={Users} />
        <StatCard label="Site Visits" value={performance.siteVisits} changePct={4.1} icon={CalendarClock} />
        <StatCard label="Sales Closed" value={performance.salesClosed} changePct={9.8} icon={Award} />
        <StatCard label="Revenue Generated" value={formatINR(performance.revenueGenerated)} changePct={11.2} icon={IndianRupee} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <p className="mb-4 font-display text-lg text-ink">Revenue Trend</p>
          <GrowthChart data={performance.trend} dataKey="revenue" />
        </Card>
        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <Banknote className="h-5 w-5 text-primary" /> Commission Total
          </p>
          <p className="font-tabular text-3xl font-semibold text-primary">{formatINR(performance.commissionTotal)}</p>
          <p className="mt-1 text-sm text-ink-muted">Earned across all closed deals</p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <p className="mb-4 font-display text-lg text-ink">Lead Funnel</p>
        <LeadFunnelChart data={leadFunnelForAgent(user?.slug)} />
      </Card>
    </div>
  );
}
