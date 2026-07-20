"use client";

import { useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ramNav } from "./ramNav";
import { Logo } from "@/components/layout/Logo";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { cn } from "@/lib/utils";

export function RamSidebar({ mobileOpen, onCloseMobile }) {
  const pathname = usePathname();
  const { user } = useRamAuth();
  const layoutId = useId();

  function NavRow({ item, scope }) {
    const active = pathname === item.href;
    return (
      <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}>
        <Link
          href={item.href}
          onClick={onCloseMobile}
          className={cn(
            "relative flex items-center gap-3 overflow-hidden rounded-btn px-3 py-2.5 text-sm font-medium transition-colors",
            active ? "text-primary" : "text-ink-muted hover:bg-surface-soft hover:text-ink"
          )}
        >
          {active && (
            <motion.span
              layoutId={`ram-sidebar-active-${scope}-${layoutId}`}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-btn bg-primary-soft shadow-[var(--shadow-glow)]"
            />
          )}
          {active && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary" />}
          <item.icon className="relative h-4.5 w-4.5 shrink-0" strokeWidth={active ? 2.25 : 1.75} />
          <span className="relative truncate">{item.label}</span>
        </Link>
      </motion.div>
    );
  }

  function renderContent(scope) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-6 py-6">
          <Logo />
          <button onClick={onCloseMobile} className="text-ink-muted lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        {user?.name && (
          <div className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-surface-soft p-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/25">
              {user.avatar && <Image src={user.avatar} alt={user.name} fill sizes="44px" className="object-cover" />}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
              <p className="truncate text-xs text-ink-faint">REROCK Advisory Member · {user.region}</p>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-8">
          {ramNav.map((group, i) => (
            <div key={group.label} className={cn(i > 0 && "mt-5 border-t border-border pt-5")}>
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavRow key={item.href} item={item} scope={scope} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-border bg-surface lg:block">{renderContent("desktop")}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onCloseMobile} />
          <div className="relative h-full w-80 max-w-[85vw] bg-surface shadow-[var(--shadow-lg)]">{renderContent("mobile")}</div>
        </div>
      )}
    </>
  );
}
