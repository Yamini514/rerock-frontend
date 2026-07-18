"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { agents } from "@/lib/data/agents";

export default function AdminAgentsPage() {
  return (
    <div>
      <AdminPageHeader title="Agents" description="Client-facing advisors and their performance" />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-10">
        {agents.map((a) => (
          <Card key={a.slug} className="p-6 text-center">
            <span className="relative mx-auto h-16 w-16 overflow-hidden rounded-full">
              <Image src={a.avatar} alt={a.name} fill sizes="64px" className="object-cover" />
            </span>
            <p className="mt-3 font-medium text-ink">{a.name}</p>
            <p className="text-xs text-ink-muted">{a.role}</p>
            <p className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-ink">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {a.rating}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4 text-xs">
              <div>
                <p className="font-tabular font-semibold text-ink">{a.dealsClosed}</p>
                <p className="text-ink-faint">Deals Closed</p>
              </div>
              <div>
                <p className="font-tabular font-semibold text-ink">{a.experienceYears}y</p>
                <p className="text-ink-faint">Experience</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
