import { IndianRupee, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { formatINR } from "@/lib/utils";
import { portfolioSummary, portfolioGrowth, myInvestments } from "@/lib/data/portfolio";
import { HoldingsTable } from "./HoldingsTable";

export const metadata = { title: "My Portfolio" };

export default function PortfolioPage() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <StatCard label="Portfolio Value" value={formatINR(portfolioSummary.totalValue)} changePct={portfolioSummary.totalGrowthPct} icon={IndianRupee} />
        <StatCard label="Total Invested" value={formatINR(portfolioSummary.investedValue)} changePct={12.1} icon={TrendingUp} />
      </div>

      <Card className="mt-6 p-6">
        <p className="mb-4 font-display text-lg text-ink">Growth Over Time</p>
        <GrowthChart data={portfolioGrowth} />
      </Card>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl text-ink">Holdings</h2>
        <HoldingsTable data={myInvestments} />
      </section>
    </div>
  );
}
