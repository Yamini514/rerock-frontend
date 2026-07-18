"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { testimonials } from "@/lib/data/testimonials";

export default function AdminTestimonialsPage() {
  const { toast } = useToast();
  const rows = testimonials.map((t, i) => ({ ...t, status: i === testimonials.length - 1 ? "Pending" : "Approved" }));

  return (
    <div>
      <AdminPageHeader title="Testimonials" description={`${testimonials.length} client testimonials submitted`} />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 md:p-10">
        {rows.map((t) => (
          <Card key={t.name} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </div>
              </div>
              <Badge tone={t.status === "Approved" ? "success" : "warning"}>{t.status}</Badge>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
            {t.status === "Pending" && (
              <div className="mt-5 flex gap-2 border-t border-border pt-4">
                <Button size="sm" onClick={() => toast({ tone: "success", title: "Testimonial approved" })}>
                  <Check className="h-3.5 w-3.5" /> Approve
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast({ tone: "info", title: "Testimonial rejected" })}>
                  <X className="h-3.5 w-3.5" /> Reject
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
