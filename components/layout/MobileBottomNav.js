"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Building2, PieChart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { key: "home", label: "Home", href: "/", icon: Home },
  { key: "properties", label: "Properties", href: "/properties", icon: Building2 },
  { key: "portfolio", label: "Portfolio", href: "/portal/portfolio", icon: PieChart },
  { key: "notifications", label: "Notifications", href: "/portal/notifications", icon: Bell },
  { key: "profile", label: "Profile", href: "/portal/profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-lg lg:hidden">
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
      </div>
    </nav>
  );
}
