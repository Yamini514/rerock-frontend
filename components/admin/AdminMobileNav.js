"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grip, Inbox, LayoutDashboard, Building2, FileBarChart } from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { canAccessPage } from "@/lib/data/staff";
import { cn } from "@/lib/utils";

const items = [
  { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { key: "properties", label: "Properties", href: "/admin/properties", icon: Building2 },
  { key: "crm", label: "CRM", href: "/admin/enquiries", icon: Inbox },
  { key: "reports", label: "Reports", href: "/admin/reports", icon: FileBarChart },
];

export function AdminMobileNav({ onOpenMore }) {
  const pathname = usePathname();
  const { user } = useAdminAuth();
  const visibleItems = items.filter((item) => canAccessPage(user, item.href));

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-lg lg:hidden">
      <div className="flex items-stretch justify-between px-2">
        {visibleItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.key} href={item.href} className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5">
              <span className={cn("flex h-9 w-12 items-center justify-center rounded-xl transition-colors", active && "bg-primary-soft")}>
                <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-ink-faint")} strokeWidth={active ? 2.25 : 1.75} />
              </span>
              <span className={cn("text-[11px] font-medium", active ? "text-primary" : "text-ink-faint")}>{item.label}</span>
            </Link>
          );
        })}
        <button onClick={onOpenMore} className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5">
          <span className="flex h-9 w-12 items-center justify-center rounded-xl">
            <Grip className="h-5 w-5 text-ink-faint" strokeWidth={1.75} />
          </span>
          <span className="text-[11px] font-medium text-ink-faint">More</span>
        </button>
      </div>
    </nav>
  );
}
