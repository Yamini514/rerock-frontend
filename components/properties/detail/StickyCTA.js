"use client";

import { useState } from "react";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookVisitModal } from "@/components/properties/detail/BookVisitModal";
import { useClientAuth } from "@/components/portal/ClientAuthContext";
import { formatINR } from "@/lib/utils";

export function StickyCTA({ property, agent }) {
  const [open, setOpen] = useState(false);
  const { user } = useClientAuth();

  return (
    <>
      <div className="fixed inset-x-0 bottom-[calc(76px_+_env(safe-area-inset-bottom))] z-[45] border-t border-border bg-surface/95 px-4 pt-3 backdrop-blur-lg lg:bottom-0 lg:px-10 lg:py-4">

        <div className="mx-auto max-w-[90rem] pb-3 lg:pb-0">
          <div className="mb-2.5 flex items-baseline justify-between gap-3 md:hidden">
            <p className="font-tabular text-lg font-semibold text-ink">{formatINR(property.price)}</p>
            <p className="truncate text-xs text-ink-muted">{property.title} · {property.status}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="hidden md:block">
              <p className="font-tabular text-xl font-semibold text-ink">{formatINR(property.price)}</p>
              <p className="text-xs text-ink-muted">{property.title} · {property.status}</p>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2 md:flex-none md:flex">
              <a
                href={`tel:${agent?.phone?.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-1.5 rounded-btn border border-border-strong px-3 py-3 text-sm font-medium text-ink md:px-5"
              >
                <Phone className="h-4 w-4" /> <span className="hidden md:inline">Call</span>
              </a>
              <a
                href={`https://wa.me/${agent?.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-btn bg-success px-3 py-3 text-sm font-medium text-white md:px-5"
              >
                <MessageCircle className="h-4 w-4" /> <span className="hidden md:inline">WhatsApp</span>
              </a>
              <Button onClick={() => setOpen(true)} className="px-3 md:px-6">
                <CalendarCheck className="h-4 w-4" /> <span className="hidden md:inline">Book Site Visit</span><span className="md:hidden">Visit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BookVisitModal open={open} onClose={() => setOpen(false)} propertyTitle={property.title} propertySlug={property.slug} client={user} />
    </>
  );
}
