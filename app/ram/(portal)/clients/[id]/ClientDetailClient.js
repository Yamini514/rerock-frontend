"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, Gift, Mail, PieChart, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { EmptyState } from "@/components/ui/StateScreen";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { DocumentUploader } from "@/components/documents/DocumentUploader";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { PricingTrendChart } from "@/components/charts/PricingTrendChart";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { getClient } from "@/lib/data/clients";
import { getProperty } from "@/lib/data/properties";
import { siteVisits } from "@/lib/data/siteVisits";
import { referralHistory } from "@/lib/data/profile";
import { portfolioSummary, portfolioGrowth, myInvestments, documents, addDocument } from "@/lib/data/portfolio";
import { formatINR, formatINRFull } from "@/lib/utils";

const holdingsColumns = [
  { key: "name", label: "Property", sortable: true },
  { key: "purchasePrice", label: "Purchase Price", sortable: true, render: (r) => formatINRFull(r.purchasePrice) },
  { key: "currentValue", label: "Current Value", sortable: true, render: (r) => formatINRFull(r.currentValue) },
  { key: "growthPct", label: "Growth", sortable: true, render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span> },
];

const referralColumns = [
  { key: "name", label: "Referral", sortable: true },
  { key: "status", label: "Status", render: (r) => <Badge tone="neutral">{r.status}</Badge> },
  { key: "date", label: "Date", sortable: true },
  { key: "reward", label: "Reward", render: (r) => (r.reward ? formatINR(r.reward) : "Pending") },
];

export function ClientDetailClient({ id }) {
  const { user } = useRamAuth();
  const client = getClient(id);
  const [clientDocs, setClientDocs] = useState(() => documents.filter((d) => d.clientId === id));

  function handleUpload(fileMetas) {
    const added = fileMetas.map((meta) => addDocument({ ...meta, clientId: id, uploadedBy: user?.name, uploadedByRole: "RAM" }));
    setClientDocs((docs) => [...added, ...docs]);
  }

  if (!client) {
    return (
      <div className="mx-auto max-w-[70rem] px-6 py-14 text-center md:px-10">
        <p className="text-ink-muted">Client not found.</p>
        <Link href="/ram/clients" className="mt-4 inline-block text-sm font-semibold text-primary">← Back to Clients</Link>
      </div>
    );
  }

  const hasFullDepth = client.id === "c1";
  const clientVisits = siteVisits.filter((v) => v.clientName === client.name);
  const pricingTrendProperty = getProperty("sobha-royal-crest-5bhk-villa");

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <Link href="/ram/clients" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to Clients
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image src={client.avatar} alt={client.name} fill sizes="64px" className="object-cover" />
          </span>
          <div>
            <h1 className="font-display text-2xl text-ink md:text-3xl">{client.name}</h1>
            <p className="text-sm text-ink-muted">Client since {client.joined}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button as="a" href={`tel:${client.phone}`} size="sm">Call</Button>
          <Button as="a" href={`mailto:${client.email}`} variant="outline" size="sm"><Mail className="h-4 w-4" /> Email</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard label="Investment Portfolio" value={formatINR(client.portfolioValue)} changePct={hasFullDepth ? portfolioSummary.totalGrowthPct : 0} icon={PieChart} />
        <StatCard label="Current Investments" value={client.properties} changePct={0} icon={TrendingUp} />
        <StatCard label="ROI" value={hasFullDepth ? `${portfolioSummary.totalGrowthPct}%` : "—"} changePct={0} icon={TrendingUp} />
      </div>

      {hasFullDepth ? (
        <>
          <Card className="mt-8 p-6">
            <p className="mb-4 font-display text-lg text-ink">Portfolio Growth</p>
            <GrowthChart data={portfolioGrowth} />
          </Card>

          <section className="mt-8">
            <h2 className="mb-4 font-display text-xl text-ink">Current Investments</h2>
            <Table columns={holdingsColumns} data={myInvestments} searchable={false} pageSize={5} />
          </section>

          <Card className="mt-8 p-6">
            <p className="mb-4 font-display text-lg text-ink">Pricing Trends — {pricingTrendProperty?.title}</p>
            <PricingTrendChart data={pricingTrendProperty?.pricingTrend || []} />
          </Card>
        </>
      ) : (
        <Card className="mt-8 p-6">
          <p className="font-display text-lg text-ink">Current Investments</p>
          <p className="mt-2 text-sm text-ink-muted">{client.properties} {client.properties === 1 ? "property" : "properties"} worth {formatINR(client.portfolioValue)}.</p>
        </Card>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Site Visits</p>
          {clientVisits.length === 0 ? (
            <EmptyState title="No site visits yet" className="py-8" />
          ) : (
            <div className="space-y-3">
              {clientVisits.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-ink">{v.date} · {v.time}</p>
                  <Badge tone={v.status === "Completed" ? "success" : v.status === "Cancelled" ? "danger" : "info"}>{v.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <Gift className="h-5 w-5 text-primary" /> Referral History
          </p>
          {hasFullDepth ? (
            <Table columns={referralColumns} data={referralHistory} searchable={false} pageSize={4} />
          ) : (
            <EmptyState title="No referrals yet" className="py-8" />
          )}
        </Card>
      </div>

      <Card className="mt-8 p-6">
        <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
          <FileText className="h-5 w-5 text-primary" /> Property Documents
        </p>
        {clientDocs.length === 0 ? (
          <EmptyState title="No documents yet" description="Upload documents for this client." className="py-8" />
        ) : (
          <div className="mb-6">
            <DocumentsSection documents={clientDocs} />
          </div>
        )}
        <DocumentUploader label="Upload a document for this client" onFilesSelected={handleUpload} />
      </Card>
    </div>
  );
}
