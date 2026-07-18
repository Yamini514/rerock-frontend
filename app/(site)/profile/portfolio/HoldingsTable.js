"use client";

import { Badge, statusTone } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { formatINRFull } from "@/lib/utils";

const columns = [
  { key: "name", label: "Property", sortable: true },
  { key: "purchasePrice", label: "Purchase Price", sortable: true, render: (r) => formatINRFull(r.purchasePrice) },
  { key: "currentValue", label: "Current Value", sortable: true, render: (r) => formatINRFull(r.currentValue) },
  { key: "growthPct", label: "Growth", sortable: true, render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span> },
  { key: "status", label: "Status", render: (r) => <Badge tone={statusTone[r.status] || "neutral"}>{r.status}</Badge> },
];

export function HoldingsTable({ data }) {
  return <Table columns={columns} data={data} searchable={false} pageSize={5} />;
}
