"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Globe, LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Badge } from "@/components/ui/Badge";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { GlobalSearch } from "@/components/admin/GlobalSearch";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { notifications } from "@/lib/data/notifications";
import { cn } from "@/lib/utils";

export function AdminTopbar({ onOpenMobile }) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAdminAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- client-mount flag to avoid theme hydration mismatch
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-18 items-center gap-4 px-5 py-3 transition-all duration-300",
        scrolled ? "border-b border-border bg-surface/95 backdrop-blur" : "border-b border-transparent bg-transparent"
      )}
    >
      <button onClick={onOpenMobile} className="text-ink-muted lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>

      <Breadcrumbs />
      <GlobalSearch />

      <div className="ml-auto flex items-center gap-2">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
        )}

        <Dropdown
          align="right"
          trigger={() => (
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
              {unread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />}
            </button>
          )}
        >
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="rounded-xl p-3 hover:bg-surface-soft">
                <p className="text-sm font-medium text-ink">{n.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{n.message}</p>
                <p className="mt-1 text-xs text-ink-faint">{n.time}</p>
              </div>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          align="right"
          trigger={() => (
            <button className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-colors hover:bg-surface-soft">
              <span className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={user?.avatar} alt={user?.name || "Admin"} fill sizes="32px" className="object-cover" />
              </span>
              <span className="hidden text-sm font-medium text-ink sm:inline">{user?.name || "Admin"}</span>
            </button>
          )}
        >
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-ink">{user?.name}</p>
            <p className="text-xs text-ink-muted">{user?.email}</p>
            <Badge tone="primary" className="mt-2">{user?.role}</Badge>
          </div>
          <div className="my-1 h-px bg-border" />
          <DropdownItem><User className="h-4 w-4" /> My Profile</DropdownItem>
          <Link href="/" className="block">
            <DropdownItem><Globe className="h-4 w-4" /> Back to Website</DropdownItem>
          </Link>
          <DropdownItem onClick={handleLogout} className="text-danger">
            <LogOut className="h-4 w-4" /> Log Out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
