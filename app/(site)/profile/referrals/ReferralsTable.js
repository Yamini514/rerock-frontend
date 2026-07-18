"use client";

import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { formatINR } from "@/lib/utils";

const statusTone = {
  "Purchase Completed": "success",
  "Site Visit Scheduled": "info",
  "Enquiry Stage": "warning",
};

const columns = [
  { key: "name", label: "Referral", sortable: true },
  { key: "status", label: "Status", render: (r) => <Badge tone={statusTone[r.status] || "neutral"}>{r.status}</Badge> },
  { key: "date", label: "Date", sortable: true },
  { key: "reward", label: "Reward", sortable: true, render: (r) => (r.reward ? formatINR(r.reward) : "Pending") },
];

export function ReferralsTable({ data }) {
  return <Table columns={columns} data={data} searchable={false} pageSize={5} />;
}
