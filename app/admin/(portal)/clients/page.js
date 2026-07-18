"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Table } from "@/components/ui/Table";
import { clients } from "@/lib/data/clients";
import { formatINRFull } from "@/lib/utils";

const columns = [
  {
    key: "name",
    label: "Client",
    sortable: true,
    render: (r) => (
      <span className="flex items-center gap-2.5">
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image src={r.avatar} alt={r.name} fill sizes="32px" className="object-cover" />
        </span>
        {r.name}
      </span>
    ),
  },
  { key: "email", label: "Email", sortable: true },
  { key: "phone", label: "Phone", sortable: true },
  { key: "properties", label: "Properties", sortable: true },
  { key: "portfolioValue", label: "Portfolio Value", sortable: true, render: (r) => formatINRFull(r.portfolioValue) },
  { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Active" ? "success" : "neutral"}>{r.status}</Badge> },
];

export default function AdminClientsPage() {
  return (
    <div>
      <AdminPageHeader title="Clients" description={`${clients.length} clients across active portfolios`} />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={clients} searchPlaceholder="Search clients..." exportFilename="rerock-clients.csv" />
      </div>
    </div>
  );
}
