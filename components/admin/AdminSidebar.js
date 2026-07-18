"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { adminNav } from "./adminNav";
import { Logo } from "@/components/layout/Logo";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { rolePageAccess } from "@/lib/data/staff";
import { cn } from "@/lib/utils";

export function AdminSidebar({ mobileOpen, onCloseMobile }) {
  const pathname = usePathname();
  const { user } = useAdminAuth();
  const allowed = rolePageAccess[user?.role] || [];

  const visibleNav = adminNav
    .map((group) => ({ ...group, items: group.items.filter((item) => allowed.includes(item.href)) }))
    .filter((group) => group.items.length > 0);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-6">
        <Logo />
        <button onClick={onCloseMobile} className="text-ink-muted lg:hidden" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-8">
        {visibleNav.map((group) => (
          <div key={group.label}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={cn(
                      "flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-colors",
                      active ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-surface-soft hover:text-ink"
                    )}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      {user?.role && (
        <div className="border-t border-border px-6 py-4">
          <p className="text-xs text-ink-faint">Signed in as</p>
          <p className="text-sm font-medium text-ink">{user.role}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-border bg-surface lg:block">{content}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onCloseMobile} />
          <div className="relative h-full w-80 max-w-[85vw] bg-surface shadow-[var(--shadow-lg)]">{content}</div>
        </div>
      )}
    </>
  );
}
