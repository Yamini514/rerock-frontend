"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { ramTeam } from "@/lib/data/staff";

export default function RAMPage() {
  return (
    <div>
      <AdminPageHeader title="Relationship Account Managers" description="Team managing builder partnerships and inventory pipelines" />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 md:p-10">
        {ramTeam.map((m) => (
          <Card key={m.id} className="p-6">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={m.avatar} alt={m.name} fill sizes="48px" className="object-cover" />
              </span>
              <div>
                <p className="font-medium text-ink">{m.name}</p>
                <p className="text-xs text-ink-muted">{m.region}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {m.buildersHandled.map((b) => (
                <Badge key={b} tone="neutral">{b}</Badge>
              ))}
            </div>
            <p className="mt-4 border-t border-border pt-4 text-sm text-ink-muted">
              <span className="font-tabular font-semibold text-ink">{m.dealsThisQuarter}</span> deals this quarter
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
