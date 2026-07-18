"use client";

import Link from "next/link";
import {
  Building,
  Calculator,
  FileText,
  HelpCircle,
  Landmark,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Settings,
} from "lucide-react";
import { BottomSheet } from "@/components/ui/Sheet";

const links = [
  { label: "Communities", href: "/communities", icon: Building },
  { label: "Builders", href: "/builders", icon: Landmark },
  { label: "Locations", href: "/locations", icon: MapPin },
  { label: "Investment Calculator", href: "/investment-calculator", icon: Calculator },
  { label: "Blog & Insights", href: "/blog", icon: Newspaper },
  { label: "Documents", href: "/profile/documents", icon: FileText },
  { label: "Admin Portal", href: "/admin", icon: LayoutDashboard },
  { label: "FAQs", href: "/faq", icon: HelpCircle },
  { label: "Settings", href: "/profile/settings", icon: Settings },
];

export function MoreSheet({ open, onClose }) {
  return (
    <BottomSheet open={open} onClose={onClose} title="More">
      <div className="grid grid-cols-3 gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 text-center transition-colors active:bg-surface-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <link.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="text-xs font-medium text-ink">{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <a href="tel:+919848012345" className="flex items-center justify-center gap-2 rounded-btn border border-border-strong py-3 text-sm font-medium text-ink">
          <Phone className="h-4 w-4" /> Call Advisor
        </a>
        <a
          href="https://wa.me/919848012345"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-btn bg-success py-3 text-sm font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </BottomSheet>
  );
}
