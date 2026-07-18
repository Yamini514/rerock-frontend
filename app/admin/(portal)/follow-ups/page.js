"use client";

import { CalendarClock } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { followUps } from "@/lib/data/admin";

const priorityTone = { High: "danger", Medium: "warning", Low: "info" };

const columns = [
  { key: "client", label: "Client", sortable: true },
  { key: "property", label: "Property", sortable: true },
  { key: "dueDate", label: "Due Date", sortable: true },
  { key: "priority", label: "Priority", sortable: true, render: (r) => <Badge tone={priorityTone[r.priority]}>{r.priority}</Badge> },
];

export default function AdminFollowUpsPage() {
  return (
    <div>
      <AdminPageHeader title="Follow Ups" description="Scheduled client follow-ups across the advisory team" action={<Badge tone="primary" icon={CalendarClock}>{followUps.length} pending</Badge>} />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={followUps} searchable={false} />
      </div>
    </div>
  );
}
