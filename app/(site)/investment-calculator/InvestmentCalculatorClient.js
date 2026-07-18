"use client";

import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { EMICalculator, ROICalculator, AffordabilityCalculator } from "@/components/calculators/Calculators";

export function InvestmentCalculatorClient() {
  return (
    <Card className="p-6 md:p-10">
      <Tabs
        tabs={[
          { value: "roi", label: "ROI Calculator", content: <ROICalculator /> },
          { value: "emi", label: "EMI Calculator", content: <EMICalculator /> },
          { value: "afford", label: "Affordability", content: <AffordabilityCalculator /> },
        ]}
      />
    </Card>
  );
}
