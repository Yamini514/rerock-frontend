"use client";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { EMICalculator, ROICalculator } from "@/components/calculators/Calculators";

export function InvestmentCalculator() {
  return (
    <section id="calculator" className="bg-surface-soft py-16 md:py-32">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <SectionHeading eyebrow="Plan Ahead" title="Investment & EMI Calculator" description="Model your returns or monthly outgo before you commit." />
        <Card className="p-6 md:p-10">
          <Tabs
            tabs={[
              { value: "roi", label: "ROI Calculator", content: <ROICalculator /> },
              { value: "emi", label: "EMI Calculator", content: <EMICalculator /> },
            ]}
          />
        </Card>
      </div>
    </section>
  );
}
