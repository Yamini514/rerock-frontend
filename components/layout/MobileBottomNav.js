"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Heart, PieChart, Grip } from "lucide-react";
import { MoreSheet } from "@/components/layout/MoreSheet";
import { cn } from "@/lib/utils";

const items = [
  { key: "home", label: "Home", href: "/", icon: Home },
  { key: "properties", label: "Properties", href: "/properties", icon: Building2 },
  { key: "shortlist", label: "Shortlist", href: "/dashboard?tab=shortlist", icon: Heart },
  { key: "portfolio", label: "Portfolio", href: "/dashboard", icon: PieChart },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-lg md:hidden">
        <div className="flex items-stretch justify-between px-2">
          {items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href.split("?")[0]);
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5"
              >
                <span className={cn("flex h-9 w-12 items-center justify-center rounded-xl transition-colors", active && "bg-primary-soft")}>
                  <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-ink-faint")} strokeWidth={active ? 2.25 : 1.75} />
                </span>
                <span className={cn("text-[11px] font-medium", active ? "text-primary" : "text-ink-faint")}>{item.label}</span>
              </Link>
            );
          })}
          <button onClick={() => setMoreOpen(true)} className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5">
            <span className="flex h-9 w-12 items-center justify-center rounded-xl">
              <Grip className="h-5 w-5 text-ink-faint" strokeWidth={1.75} />
            </span>
            <span className="text-[11px] font-medium text-ink-faint">More</span>
          </button>
        </div>
      </nav>
      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
