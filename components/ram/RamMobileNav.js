"use client";

import { useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, LayoutDashboard, Sparkles, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { key: "dashboard", label: "Dashboard", href: "/ram/dashboard", icon: LayoutDashboard },
  { key: "clients", label: "Clients", href: "/ram/clients", icon: Users },
  { key: "recommendations", label: "Recs", href: "/ram/recommendations", icon: Sparkles },
  { key: "notifications", label: "Notifications", href: "/ram/notifications", icon: Bell },
  { key: "profile", label: "Profile", href: "/ram/profile", icon: User },
];

export function RamMobileNav() {
  const pathname = usePathname();
  const layoutId = useId();

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-lg lg:hidden">
      <div className="flex items-stretch justify-between px-2">
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.key} href={item.href} className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5">
              <motion.span
                whileTap={{ scale: 0.88 }}
                transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-9 w-12 items-center justify-center rounded-xl"
              >
                {active && (
                  <motion.span
                    layoutId={`ram-mobile-active-${layoutId}`}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 rounded-xl bg-primary-soft shadow-[var(--shadow-glow)]"
                  />
                )}
                <Icon className={cn("relative h-5 w-5", active ? "text-primary" : "text-ink-faint")} strokeWidth={active ? 2.25 : 1.75} />
              </motion.span>
              <span className={cn("text-[11px] font-medium", active ? "text-primary" : "text-ink-faint")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
