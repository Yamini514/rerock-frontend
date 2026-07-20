"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { EmptyState } from "@/components/ui/StateScreen";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { investmentReportsForRam } from "@/lib/data/investmentReports";

const filters = [
  { value: "all", label: "All" },
  { value: "Investment Report", label: "Investment Reports" },
  { value: "Market Analysis", label: "Market Analysis" },
  { value: "Portfolio Report", label: "Portfolio Reports" },
  { value: "Recommendation Report", label: "Recommendation Reports" },
];

export function ReportsClient() {
  const { user } = useRamAuth();
  const reports = investmentReportsForRam(user?.id);
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? reports : reports.filter((r) => r.type === filter);
  const documents = visible.map((r) => ({ name: r.clientName ? `${r.title} — ${r.clientName}` : r.title, type: r.fileType, date: r.date }));

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Reports</h1>
      <p className="mb-6 text-sm text-ink-muted">{reports.length} reports across your book</p>

      <Tabs tabs={filters} value={filter} onChange={setFilter} scroll className="-mx-6 mb-6 px-6 md:mx-0 md:px-0" />

      <Card className="p-6 md:p-8">
        {documents.length === 0 ? <EmptyState title="No reports here" /> : <DocumentsSection documents={documents} />}
      </Card>
    </div>
  );
}
