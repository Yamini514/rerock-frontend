"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { useToast } from "@/components/ui/Toast";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { leadsForAgent } from "@/lib/data/leads";
import { getCommunity } from "@/lib/data/communities";
import { formatINR } from "@/lib/utils";

const statusTone = {
  New: "neutral",
  Contacted: "primary",
  Qualified: "info",
  "Site Visit Scheduled": "info",
  Negotiation: "warning",
  Won: "success",
  Lost: "danger",
};

const columns = [
  {
    key: "clientName",
    label: "Client",
    sortable: true,
    render: (r) => (
      <Link href={`/agent/leads/${r.id}`} className="flex items-center gap-2.5 hover:text-primary">
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image src={r.avatar} alt={r.clientName} fill sizes="32px" className="object-cover" />
        </span>
        {r.clientName}
      </Link>
    ),
  },
  { key: "communitySlug", label: "Community", sortable: true, render: (r) => getCommunity(r.communitySlug)?.name || r.communitySlug },
  { key: "budget", label: "Budget", sortable: true, render: (r) => formatINR(r.budget) },
  { key: "source", label: "Source", sortable: true },
  { key: "status", label: "Status", sortable: true, render: (r) => <Badge tone={statusTone[r.status] || "neutral"}>{r.status}</Badge> },
  { key: "nextFollowUp", label: "Next Follow-up", sortable: true, render: (r) => r.nextFollowUp || "—" },
];

export function LeadsClient() {
  const { user } = useAgentAuth();
  const { toast } = useToast();
  const myLeads = leadsForAgent(user?.slug);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">My Leads</h1>
          <p className="mt-1 text-sm text-ink-muted">{myLeads.length} leads assigned to you</p>
        </div>
      </div>
      <Table
        columns={columns}
        data={myLeads}
        searchPlaceholder="Search leads..."
        exportFilename="my-leads.csv"
        bulkActions={[{ label: "Call Now", icon: Phone, onClick: () => toast({ tone: "info", title: "Dialer queued" }) }]}
      />
    </div>
  );
}
