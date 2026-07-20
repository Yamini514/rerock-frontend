"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, Gift, Mail, MessageCircle, PieChart, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/StateScreen";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { getClient } from "@/lib/data/clients";
import { siteVisits } from "@/lib/data/siteVisits";
import { portfolioSummary, savedProperties, recommendations, referralSummary, documents } from "@/lib/data/portfolio";
import { formatINR, formatINRFull } from "@/lib/utils";

export function ClientDetailClient({ id }) {
  const client = getClient(id);

  if (!client) {
    return (
      <div className="mx-auto max-w-[70rem] px-6 py-14 text-center md:px-10">
        <p className="text-ink-muted">Client not found.</p>
        <Link href="/agent/clients" className="mt-4 inline-block text-sm font-semibold text-primary">← Back to Clients</Link>
      </div>
    );
  }

  // Kiran Kumar Reddy (c1) is the one client with full mock-data depth elsewhere in the app —
  // everyone else shows a summary view built from lib/data/clients.js + their own site visits.
  const hasFullDepth = client.id === "c1";
  const clientVisits = siteVisits.filter((v) => v.clientName === client.name);

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <Link href="/agent/clients" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
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
        <StatCard label="Portfolio Value" value={formatINR(client.portfolioValue)} changePct={hasFullDepth ? portfolioSummary.totalGrowthPct : 0} icon={PieChart} />
        <StatCard label="Properties Owned" value={client.properties} changePct={0} icon={Sparkles} />
        <StatCard label="Status" value={client.status} changePct={0} icon={Gift} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Site Visits</p>
          {clientVisits.length === 0 ? (
            <EmptyState title="No site visits yet" className="py-8" />
          ) : (
            <div className="space-y-3">
              {clientVisits.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{v.date} · {v.time}</p>
                  </div>
                  <Badge tone={v.status === "Completed" ? "success" : v.status === "Cancelled" ? "danger" : "info"}>{v.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <Gift className="h-5 w-5 text-primary" /> Referral Status
          </p>
          {hasFullDepth ? (
            <>
              <p className="font-tabular text-2xl font-semibold text-primary">{formatINR(referralSummary.totalEarned)}</p>
              <p className="mt-1 text-sm text-ink-muted">Earned across {referralSummary.referralsCount} referrals</p>
            </>
          ) : (
            <EmptyState title="No referrals yet" description="This client hasn't referred anyone." className="py-8" />
          )}
        </Card>
      </div>

      {hasFullDepth && (
        <>
          <section className="mt-8">
            <h2 className="mb-4 font-display text-xl text-ink">Interested / Saved Properties</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((p) => (
                <Card key={p.id} hover className="overflow-hidden">
                  <div className="relative h-40 w-full">
                    <Image src={p.image} alt={p.title} fill sizes="360px" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-ink line-clamp-1">{p.title}</p>
                    <p className="mt-1 font-tabular text-sm font-semibold text-primary">{formatINR(p.price)}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-ink">
              <Sparkles className="h-5 w-5 text-primary" /> Recommendations
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {recommendations.map((r) => (
                <Card key={r.id} hover className="flex items-center gap-4 overflow-hidden p-4">
                  <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image src={r.image} alt={r.title} fill sizes="80px" className="object-cover" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{r.title}</p>
                    <p className="mt-1 text-xs text-ink-faint">{r.reason}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Card className="mt-8 p-6">
            <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
              <FileText className="h-5 w-5 text-primary" /> Documents
            </p>
            <DocumentsSection documents={documents} />
          </Card>
        </>
      )}

      <div className="mt-8 flex justify-end">
        <Button as="a" href={`https://wa.me/${client.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
          <MessageCircle className="h-4 w-4" /> WhatsApp Client
        </Button>
      </div>
    </div>
  );
}
