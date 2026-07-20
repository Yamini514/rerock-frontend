"use client";

import { Gift } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { referralsForRam } from "@/lib/data/referrals";
import { formatINR } from "@/lib/utils";

const statusTone = {
  "Purchase Completed": "success",
  "Site Visit Scheduled": "info",
  "Enquiry Stage": "warning",
};

const columns = [
  { key: "referrer", label: "Referred By", sortable: true },
  { key: "referred", label: "Referral", sortable: true },
  { key: "type", label: "Type", render: (r) => <Badge tone="neutral">{r.type}</Badge> },
  { key: "status", label: "Status", render: (r) => <Badge tone={statusTone[r.status] || "neutral"}>{r.status}</Badge> },
  { key: "reward", label: "Reward", sortable: true, render: (r) => (r.reward ? formatINR(r.reward) : "Pending") },
  { key: "date", label: "Date", sortable: true },
];

export function ReferralsClient() {
  const { user } = useRamAuth();
  const referrals = referralsForRam(user?.id);
  const totalRewards = referrals.reduce((sum, r) => sum + r.reward, 0);
  const clientReferrals = referrals.filter((r) => r.type === "Client Referral").length;
  const agentReferrals = referrals.filter((r) => r.type === "Agent Referral").length;

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-6 font-display text-3xl text-ink">Referrals</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard label="Total Rewards" value={formatINR(totalRewards)} changePct={0} icon={Gift} />
        <StatCard label="Client Referrals" value={clientReferrals} changePct={0} icon={Gift} />
        <StatCard label="Agent Referrals" value={agentReferrals} changePct={0} icon={Gift} />
      </div>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl text-ink">Referral History</h2>
        <Table columns={columns} data={referrals} searchable={false} exportFilename="my-referrals.csv" />
      </section>
    </div>
  );
}
