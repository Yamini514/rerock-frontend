"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { clients } from "@/lib/data/clients";
import { formatINRFull } from "@/lib/utils";

const columns = [
  {
    key: "name",
    label: "Client",
    sortable: true,
    render: (r) => (
      <Link href={`/agent/clients/${r.id}`} className="flex items-center gap-2.5 hover:text-primary">
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image src={r.avatar} alt={r.name} fill sizes="32px" className="object-cover" />
        </span>
        {r.name}
      </Link>
    ),
  },
  { key: "email", label: "Email", sortable: true },
  { key: "phone", label: "Phone", sortable: true },
  { key: "properties", label: "Properties", sortable: true },
  { key: "portfolioValue", label: "Portfolio Value", sortable: true, render: (r) => formatINRFull(r.portfolioValue) },
  { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Active" ? "success" : "neutral"}>{r.status}</Badge> },
];

export function ClientsClient() {
  const { user } = useAgentAuth();
  const myClients = clients.filter((c) => c.assignedAgentSlug === user?.slug);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">My Clients</h1>
      <p className="mb-6 text-sm text-ink-muted">{myClients.length} clients across active portfolios</p>
      <Table columns={columns} data={myClients} searchPlaceholder="Search clients..." exportFilename="my-clients.csv" />
    </div>
  );
}
