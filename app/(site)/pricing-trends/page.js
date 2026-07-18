import { LineChart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PricingTrendsClient } from "./PricingTrendsClient";

export const metadata = {
  title: "Pricing Trends",
  description: "Compare five-year price appreciation across REROCK's featured communities and locations.",
};

export default function PricingTrendsPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary" icon={LineChart}>Market Data</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Pricing Trends</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Five years of price-per-sq.ft history across every community and location we track — updated quarterly.
      </p>

      <div className="mt-12">
        <PricingTrendsClient />
      </div>
    </div>
  );
}
