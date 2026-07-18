"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { portfolioMembers } from "@/lib/data/staff";
import { formatINR } from "@/lib/utils";

export default function PortfolioMembersPage() {
  return (
    <div>
      <AdminPageHeader title="Portfolio Members" description="Internal team managing client portfolio relationships" />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 md:p-10">
        {portfolioMembers.map((m) => (
          <Card key={m.id} className="p-6">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={m.avatar} alt={m.name} fill sizes="48px" className="object-cover" />
              </span>
              <div>
                <p className="font-medium text-ink">{m.name}</p>
                <p className="text-xs text-ink-muted">{m.email}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
              <div>
                <p className="text-xs text-ink-faint">Clients Managed</p>
                <p className="font-tabular font-semibold text-ink">{m.clientsManaged}</p>
              </div>
              <div>
                <p className="text-xs text-ink-faint">AUM</p>
                <p className="font-tabular font-semibold text-ink">{formatINR(m.aum)}</p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1 text-sm font-medium text-ink">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {m.rating}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
