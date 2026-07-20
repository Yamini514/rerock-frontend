"use client";

import { useState } from "react";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookVisitModal } from "@/components/properties/detail/BookVisitModal";
import { useClientAuth } from "@/components/portal/ClientAuthContext";

// Desktop-sidebar counterpart to StickyCTA's Call/WhatsApp/Book actions — StickyCTA is lg:hidden,
// so the sidebar (hidden below lg) needs its own copy of these actions rather than losing them.
export function AdvisorActions({ agent, property }) {
  const [open, setOpen] = useState(false);
  const { user } = useClientAuth();

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a
          href={`tel:${agent?.phone?.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-1.5 rounded-btn border border-border-strong px-3 py-2.5 text-sm font-medium text-ink"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={`https://wa.me/${agent?.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-btn bg-success px-3 py-2.5 text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
      <Button onClick={() => setOpen(true)} className="mt-2 w-full">
        <CalendarCheck className="h-4 w-4" /> Book Site Visit
      </Button>
      <BookVisitModal open={open} onClose={() => setOpen(false)} propertyTitle={property.title} propertySlug={property.slug} client={user} />
    </>
  );
}
