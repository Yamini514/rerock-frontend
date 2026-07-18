"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  Bell,
  Building2,
  CalendarClock,
  FileText,
  Gift,
  Heart,
  IndianRupee,
  MessageSquareText,
  PieChart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, statusTone } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/StateScreen";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { formatINR, formatINRFull } from "@/lib/utils";
import {
  portfolioSummary,
  portfolioGrowth,
  myInvestments,
  upcomingVisits,
  savedProperties,
  recentEnquiries,
  priceAlerts,
  recommendations,
  referralSummary,
  documents,
} from "@/lib/data/portfolio";

const investmentColumns = [
  { key: "name", label: "Property", sortable: true },
  { key: "purchasePrice", label: "Purchase Price", sortable: true, render: (r) => formatINRFull(r.purchasePrice) },
  { key: "currentValue", label: "Current Value", sortable: true, render: (r) => formatINRFull(r.currentValue) },
  {
    key: "growthPct",
    label: "Growth",
    sortable: true,
    render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span>,
  },
  { key: "status", label: "Status", render: (r) => <Badge tone={statusTone[r.status] || "neutral"}>{r.status}</Badge> },
];

export function DashboardClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      const el = document.getElementById(tab);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-ink-muted">Welcome back,</p>
          <h1 className="font-display text-3xl text-ink md:text-4xl">Kiran Kumar Reddy</h1>
        </div>
        <Button as={Link} href="/properties" variant="outline">Browse New Properties</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Portfolio Value" value={formatINR(portfolioSummary.totalValue)} changePct={portfolioSummary.totalGrowthPct} icon={IndianRupee} sub={`${formatINR(portfolioSummary.monthlyChange)} this month`} />
        <StatCard label="Total Invested" value={formatINR(portfolioSummary.investedValue)} changePct={12.1} icon={Banknote} />
        <StatCard label="Active Properties" value={portfolioSummary.properties} changePct={0} icon={Building2} />
        <StatCard label="Referral Earnings" value={formatINR(referralSummary.totalEarned)} changePct={8.4} icon={Gift} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-lg text-ink">Portfolio Growth</p>
            <Badge tone="success" icon={TrendingUp}>+{portfolioSummary.totalGrowthPct}% overall</Badge>
          </div>
          <GrowthChart data={portfolioGrowth} />
        </Card>
        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <CalendarClock className="h-5 w-5 text-primary" /> Upcoming Visits
          </p>
          {upcomingVisits.length === 0 ? (
            <EmptyState title="No visits scheduled" description="Book a site visit from any property page." />
          ) : (
            <div className="space-y-4">
              {upcomingVisits.map((v) => (
                <div key={v.id} className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-ink">{v.property}</p>
                  <p className="mt-1 text-xs text-ink-muted">{v.date} · {v.time}</p>
                  <p className="mt-1 text-xs text-ink-faint">With {v.agent}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <section id="investments" className="mt-10">
        <h2 className="mb-6 font-display text-2xl text-ink">Current Investments</h2>
        <Table columns={investmentColumns} data={myInvestments} searchable={false} pageSize={5} />
      </section>

      <section id="shortlist" className="mt-12">
        <h2 className="mb-6 flex items-center gap-2 font-display text-2xl text-ink">
          <Heart className="h-5 w-5 text-primary" /> Saved Properties
        </h2>
        {savedProperties.length === 0 ? (
          <EmptyState title="No saved properties yet" description="Tap the heart icon on any listing to save it here." action={<Button as={Link} href="/properties" size="sm">Browse Properties</Button>} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((p) => (
              <Card key={p.id} hover className="overflow-hidden">
                <div className="relative h-44 w-full">
                  <Image src={p.image} alt={p.title} fill sizes="360px" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-medium text-ink line-clamp-1">{p.title}</p>
                  <p className="mt-1 font-tabular text-lg font-semibold text-primary">{formatINR(p.price)}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <MessageSquareText className="h-5 w-5 text-primary" /> Recent Enquiries
          </p>
          {recentEnquiries.length === 0 ? (
            <EmptyState title="No enquiries yet" />
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((e) => (
                <div key={e.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{e.property}</p>
                    <p className="text-xs text-ink-faint">{e.date}</p>
                  </div>
                  <Badge tone="info">{e.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <Bell className="h-5 w-5 text-primary" /> Pricing Alerts
          </p>
          <div className="space-y-3">
            {priceAlerts.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                <p className="text-sm font-medium text-ink">{a.property}</p>
                <span className="font-tabular text-sm font-semibold text-success">{a.change} {a.period}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 flex items-center gap-2 font-display text-2xl text-ink">
          <Sparkles className="h-5 w-5 text-primary" /> Recommended For You
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {recommendations.map((r) => (
            <Card key={r.id} hover className="flex items-center gap-4 overflow-hidden p-4">
              <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image src={r.image} alt={r.title} fill sizes="96px" className="object-cover" />
              </span>
              <div>
                <p className="font-medium text-ink">{r.title}</p>
                <p className="mt-1 font-tabular text-sm font-semibold text-primary">{formatINR(r.price)}</p>
                <p className="mt-1 text-xs text-ink-faint">{r.reason}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <PieChart className="h-5 w-5 text-primary" /> Referral Program
          </p>
          <p className="font-tabular text-3xl font-semibold text-primary">{formatINR(referralSummary.totalEarned)}</p>
          <p className="mt-1 text-sm text-ink-muted">Total earned across {referralSummary.referralsCount} referrals</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
            <span className="text-ink-muted">Pending payout</span>
            <span className="font-tabular font-semibold text-ink">{formatINR(referralSummary.pendingPayout)}</span>
          </div>
          <Button className="mt-5 w-full" size="sm">Invite a Friend</Button>
        </Card>

        <Card id="documents" className="p-6 lg:col-span-2">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <FileText className="h-5 w-5 text-primary" /> Documents
          </p>
          <DocumentsSection documents={documents} />
        </Card>
      </div>
    </div>
  );
}
