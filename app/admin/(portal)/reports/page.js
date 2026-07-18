"use client";

import { Download, FileBarChart } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { reports } from "@/lib/data/activityLogs";

export default function AdminReportsPage() {
  const { toast } = useToast();

  return (
    <div>
      <AdminPageHeader title="Reports" description="Download operational and financial reports" />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:p-10">
        {reports.map((r) => (
          <Card key={r.id} className="flex items-start gap-4 p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <FileBarChart className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="font-display text-lg text-ink">{r.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{r.description}</p>
              <p className="mt-2 text-xs text-ink-faint">Last updated {r.updated}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-4"
                onClick={() => toast({ tone: "success", title: "Report download started", description: r.name })}
              >
                <Download className="h-3.5 w-3.5" /> Download CSV
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
