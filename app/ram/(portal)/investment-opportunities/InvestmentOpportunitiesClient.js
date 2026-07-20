"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { communities } from "@/lib/data/communities";

export function InvestmentOpportunitiesClient() {
  const { toast } = useToast();
  const opportunities = [...communities].filter((c) => c.investmentScore >= 85).sort((a, b) => b.investmentScore - a.investmentScore);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Investment Opportunities</h1>
      <p className="mb-6 text-sm text-ink-muted">Top-scoring communities worth recommending to your clients right now</p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((c) => (
          <div key={c.slug}>
            <CommunityCard community={c} />
            <div className="mt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast({ tone: "success", title: "Ready to recommend", description: `Open Recommendations to send ${c.name} to a client.` })}
              >
                <Sparkles className="h-4 w-4" /> Recommend
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-muted">
        Ready to share one? <Link href="/ram/recommendations" className="font-semibold text-primary">Go to Recommendations →</Link>
      </p>
    </div>
  );
}
