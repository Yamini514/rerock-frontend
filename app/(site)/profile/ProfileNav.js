"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Gift, Heart, PieChart, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/profile", icon: User },
  { label: "Portfolio", href: "/profile/portfolio", icon: PieChart },
  { label: "Shortlist", href: "/profile/shortlist", icon: Heart },
  { label: "Referrals", href: "/profile/referrals", icon: Gift },
  { label: "Documents", href: "/profile/documents", icon: FileText },
  { label: "Settings", href: "/profile/settings", icon: Settings },
];

export function ProfileNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden lg:block">
        <div className="sticky top-28 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-btn px-4 py-3 text-sm font-medium transition-colors",
                  active ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-surface-soft hover:text-ink"
                )}
              >
                <item.icon className="h-4.5 w-4.5" /> {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="-mx-6 mb-8 flex gap-2 overflow-x-auto px-6 lg:hidden">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-white" : "bg-surface-soft text-ink-muted"
              )}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
