"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Clock, Star, X } from "lucide-react";
import { adminNav } from "./adminNav";
import { Logo } from "@/components/layout/Logo";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { canAccessPage } from "@/lib/data/staff";
import { useAdminUIStore } from "@/lib/store/adminUIStore";
import { cn } from "@/lib/utils";

export function AdminSidebar({ mobileOpen, onCloseMobile }) {
  const pathname = usePathname();
  const { user } = useAdminAuth();
  const favorites = useAdminUIStore((s) => s.favorites);
  const recents = useAdminUIStore((s) => s.recents);
  const collapsedGroups = useAdminUIStore((s) => s.collapsedGroups);
  const toggleFavorite = useAdminUIStore((s) => s.toggleFavorite);
  const toggleGroup = useAdminUIStore((s) => s.toggleGroup);

  const visibleNav = adminNav
    .map((group) => ({ ...group, items: group.items.filter((item) => canAccessPage(user, item.href)) }))
    .filter((group) => group.items.length > 0);

  const allItems = visibleNav.flatMap((g) => g.items);
  const itemByHref = Object.fromEntries(allItems.map((item) => [item.href, item]));
  const favoriteItems = favorites.map((href) => itemByHref[href]).filter(Boolean);
  const recentItems = recents.map((href) => itemByHref[href]).filter(Boolean).slice(0, 5);

  function NavRow({ item }) {
    const active = pathname === item.href;
    const isFavorite = favorites.includes(item.href);
    return (
      <div
        className={cn(
          "group flex items-center gap-1 rounded-btn pr-1.5 text-sm font-medium transition-colors",
          active ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-surface-soft hover:text-ink"
        )}
      >
        <Link href={item.href} onClick={onCloseMobile} className="flex flex-1 items-center gap-3 px-3 py-2.5 min-w-0">
          <item.icon className="h-4.5 w-4.5 shrink-0" />
          <span className="truncate">{item.label}</span>
        </Link>
        <button
          type="button"
          onClick={() => toggleFavorite(item.href)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={cn(
            "shrink-0 rounded-md p-1 transition-opacity",
            isFavorite ? "text-primary opacity-100" : "text-ink-faint opacity-0 group-hover:opacity-100"
          )}
        >
          <Star className="h-3.5 w-3.5" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    );
  }

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-6">
        <Logo />
        <button onClick={onCloseMobile} className="text-ink-muted lg:hidden" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-4 pb-8">
        {favoriteItems.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              <Star className="h-3 w-3" /> Favorites
            </p>
            <div className="space-y-0.5">
              {favoriteItems.map((item) => <NavRow key={`fav-${item.href}`} item={item} />)}
            </div>
          </div>
        )}

        {recentItems.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              <Clock className="h-3 w-3" /> Recently Visited
            </p>
            <div className="space-y-0.5">
              {recentItems.map((item) => <NavRow key={`recent-${item.href}`} item={item} />)}
            </div>
          </div>
        )}

        {visibleNav.map((group) => {
          const collapsed = collapsedGroups.includes(group.label);
          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className="flex w-full items-center justify-between px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint"
              >
                <span>{group.label}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", collapsed && "-rotate-90")} />
              </button>
              {!collapsed && (
                <div className="space-y-0.5">
                  {group.items.map((item) => <NavRow key={item.href} item={item} />)}
                </div>
              )}
            </div>
          );
        })}
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
