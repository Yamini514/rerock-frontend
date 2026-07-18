"use client";

import { useState } from "react";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookVisitModal } from "@/components/properties/detail/BookVisitModal";
import { formatINR } from "@/lib/utils";

export function StickyCTA({ property, agent }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur-lg md:bottom-0 md:px-10 md:py-4 pb-safe">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-3">
          <div className="hidden sm:block">
            <p className="font-tabular text-lg font-semibold text-ink md:text-xl">{formatINR(property.price)}</p>
            <p className="text-xs text-ink-muted">{property.title} · {property.status}</p>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2 sm:flex-none sm:flex">
            <a
              href={`tel:${agent?.phone?.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-1.5 rounded-btn border border-border-strong px-3 py-3 text-sm font-medium text-ink sm:px-5"
            >
              <Phone className="h-4 w-4" /> <span className="hidden sm:inline">Call</span>
            </a>
            <a
              href={`https://wa.me/${agent?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-btn bg-success px-3 py-3 text-sm font-medium text-white sm:px-5"
            >
              <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Button onClick={() => setOpen(true)} className="px-3 sm:px-6">
              <CalendarCheck className="h-4 w-4" /> <span className="hidden sm:inline">Book Site Visit</span><span className="sm:hidden">Visit</span>
            </Button>
          </div>
        </div>
      </div>
      <BookVisitModal open={open} onClose={() => setOpen(false)} propertyTitle={property.title} />
    </>
  );
}
