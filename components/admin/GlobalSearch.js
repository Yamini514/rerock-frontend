"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { adminNav } from "./adminNav";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { canAccessPage } from "@/lib/data/staff";
import { useAdminUIStore } from "@/lib/store/adminUIStore";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { user } = useAdminAuth();
  const pushRecent = useAdminUIStore((s) => s.pushRecent);

  const allItems = useMemo(
    () => adminNav.flatMap((g) => g.items.map((item) => ({ ...item, group: g.label }))).filter((item) => canAccessPage(user, item.href)),
    [user]
  );

  const results = query.trim()
    ? allItems.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))
    : allItems.slice(0, 8);

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(item) {
    pushRecent(item.href);
    close();
    router.push(item.href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative hidden max-w-sm flex-1 items-center gap-2 rounded-btn border border-border-strong bg-surface px-3.5 text-sm text-ink-faint transition-colors hover:border-primary/40 sm:flex"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search pages...</span>
        <kbd className="rounded-md border border-border-strong px-1.5 py-0.5 text-[10px] font-medium">Ctrl K</kbd>
      </button>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 w-full max-w-lg overflow-hidden rounded-dialog bg-surface shadow-[var(--shadow-lg)]"
                >
                  <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                    <Search className="h-4.5 w-4.5 text-ink-faint" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search Dashboard, Properties, Clients..."
                      className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                    />
                    <button onClick={close} aria-label="Close search" className="text-ink-faint hover:text-ink">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-ink-faint">No pages match &ldquo;{query}&rdquo;</p>}
                    {results.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => go(item)}
                        className="flex w-full items-center gap-3 rounded-btn px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface-soft"
                      >
                        <item.icon className="h-4 w-4 text-ink-faint" />
                        <span className="font-medium">{item.label}</span>
                        <span className="ml-auto text-xs text-ink-faint">{item.group}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
