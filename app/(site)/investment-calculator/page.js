import { Calculator } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { InvestmentCalculatorClient } from "./InvestmentCalculatorClient";

export const metadata = {
  title: "Investment Calculator",
  description: "Model ROI, EMI, and affordability before you commit to a property investment.",
};

export default function InvestmentCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
      <Badge tone="primary" icon={Calculator}>Plan Ahead</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Investment Calculator</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Model your projected returns, monthly EMI outgo, or how much property you can comfortably afford.
      </p>

      <div className="mt-12">
        <InvestmentCalculatorClient />
      </div>
    </div>
  );
}
