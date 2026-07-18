"use client";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Table } from "@/components/ui/Table";
import { activityLogs } from "@/lib/data/activityLogs";

const columns = [
  { key: "user", label: "User", sortable: true },
  { key: "action", label: "Action", sortable: true },
  { key: "target", label: "Target", sortable: true },
  { key: "time", label: "Timestamp", sortable: true },
  { key: "ip", label: "IP Address" },
];

export default function AdminActivityLogsPage() {
  return (
    <div>
      <AdminPageHeader title="Activity Logs" description="Audit trail of actions taken across the admin portal" />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={activityLogs.map((l) => ({ id: l.id, ...l }))} searchPlaceholder="Search activity..." exportFilename="rerock-activity-logs.csv" />
      </div>
    </div>
  );
}
