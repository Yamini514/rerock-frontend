"use client";

import { Award, Banknote, Clock, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { commissionForAgent } from "@/lib/data/commission";
import { formatINR, formatINRFull } from "@/lib/utils";

const statusTone = { Paid: "success", Pending: "warning" };

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "client", label: "Client", sortable: true },
  { key: "property", label: "Property", sortable: true },
  { key: "amount", label: "Amount", sortable: true, render: (r) => formatINRFull(r.amount) },
  { key: "status", label: "Status", render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge> },
  { key: "date", label: "Date", sortable: true },
];

export function CommissionClient() {
  const { user } = useAgentAuth();
  const commission = commissionForAgent(user?.slug);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-6 font-display text-3xl text-ink">Commission</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current Commission" value={formatINR(commission.current)} changePct={8.2} icon={IndianRupee} />
        <StatCard label="Pending Commission" value={formatINR(commission.pending)} changePct={0} icon={Clock} />
        <StatCard label="Paid Commission" value={formatINR(commission.paid)} changePct={12.4} icon={Banknote} />
        <StatCard label="Performance Bonus" value={formatINR(commission.performanceBonus)} changePct={0} icon={Award} />
      </div>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl text-ink">Commission History</h2>
        <Table columns={columns} data={commission.history} searchable={false} exportFilename="my-commission.csv" />
      </section>
    </div>
  );
}
