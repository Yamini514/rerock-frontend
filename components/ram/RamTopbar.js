"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Bell, Globe, LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { RamBreadcrumb } from "@/components/ram/RamBreadcrumb";
import { ramNotifications } from "@/lib/data/ramNotifications";
import { cn } from "@/lib/utils";

export function RamTopbar({ onOpenMobile }) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useRamAuth();
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

  const myNotifications = ramNotifications.filter((n) => n.ramId === user?.id);
  const unread = myNotifications.filter((n) => !n.read).length;

  function handleLogout() {
    logout();
    router.push("/ram/login");
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

      <RamBreadcrumb />

      <div className="ml-auto flex items-center gap-2">
        {mounted && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </motion.button>
        )}

        <Dropdown
          align="right"
          trigger={() => (
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft"
              aria-label="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />}
            </motion.button>
          )}
        >
          <div className="max-h-80 overflow-y-auto">
            {myNotifications.slice(0, 5).map((n) => (
              <div key={n.id} className="rounded-xl p-3 hover:bg-surface-soft">
                <p className="text-sm font-medium text-ink">{n.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{n.message}</p>
                <p className="mt-1 text-xs text-ink-faint">{n.time}</p>
              </div>
            ))}
          </div>
          <Link href="/ram/notifications" className="mt-1 block rounded-xl px-3 py-2 text-center text-sm font-medium text-primary hover:bg-surface-soft">
            View all notifications
          </Link>
        </Dropdown>

        <Dropdown
          align="right"
          trigger={() => (
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-colors hover:bg-surface-soft"
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full bg-primary-soft ring-2 ring-primary/20">
                {user?.avatar && <Image src={user.avatar} alt={user?.name || "RAM"} fill sizes="32px" className="object-cover" />}
              </span>
              <span className="hidden text-sm font-medium text-ink sm:inline">{user?.name || "Account"}</span>
            </motion.button>
          )}
        >
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-ink">{user?.name}</p>
            <p className="text-xs text-ink-muted">{user?.email}</p>
          </div>
          <div className="my-1 h-px bg-border" />
          <Link href="/ram/profile" className="block">
            <DropdownItem><User className="h-4 w-4" /> My Profile</DropdownItem>
          </Link>
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
