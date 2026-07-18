"use client";

import { CheckSquare, Phone } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { useToast } from "@/components/ui/Toast";
import { leadsTable } from "@/lib/data/admin";
import { formatINRFull } from "@/lib/utils";

const stageTone = { "Closed Won": "success", Negotiation: "warning", "Site Visit": "info", Contacted: "primary", "New Lead": "neutral" };

const columns = [
  { key: "id", label: "Enquiry ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "phone", label: "Phone", sortable: true },
  { key: "source", label: "Source", sortable: true },
  { key: "stage", label: "Stage", sortable: true, render: (r) => <Badge tone={stageTone[r.stage] || "neutral"}>{r.stage}</Badge> },
  { key: "agent", label: "Assigned Agent", sortable: true },
  { key: "value", label: "Deal Value", sortable: true, render: (r) => formatINRFull(r.value) },
  { key: "date", label: "Date", sortable: true },
];

export default function AdminEnquiriesPage() {
  const { toast } = useToast();

  return (
    <div>
      <AdminPageHeader title="Enquiries" description={`${leadsTable.length} enquiries received across all channels`} />
      <div className="p-6 md:p-10">
        <Table
          columns={columns}
          data={leadsTable}
          searchPlaceholder="Search enquiries..."
          exportFilename="rerock-enquiries.csv"
          bulkActions={[
            { label: "Call Now", icon: Phone, onClick: () => toast({ tone: "info", title: "Dialer queued" }) },
            { label: "Mark Contacted", icon: CheckSquare, onClick: () => toast({ tone: "success", title: "Enquiries updated" }) },
          ]}
        />
      </div>
    </div>
  );
}
