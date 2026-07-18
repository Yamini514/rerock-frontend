"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Clock, Mic, Search, TrendingUp, X } from "lucide-react";
import { communities } from "@/lib/data/communities";
import { locations } from "@/lib/data/locations";
import { builders } from "@/lib/data/builders";

const recentSearches = ["3 BHK in Kokapet", "Villas under ₹5 Cr", "Sobha Royal Crest"];
const popularSearches = ["Ready to move villas", "RERA approved plots", "Grade A offices", "Gachibowli apartments"];

export function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function goToProperties(q) {
    onClose();
    router.push(`/properties${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-24 w-[92%] max-w-3xl overflow-hidden rounded-dialog bg-surface shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-center gap-3 border-b border-border px-6 py-5">
              <Search className="h-5 w-5 shrink-0 text-ink-faint" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goToProperties(query)}
                placeholder="Search communities, builders, locations..."
                className="flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-ink-faint"
              />
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-soft" aria-label="Voice search">
                <Mic className="h-4.5 w-4.5" />
              </button>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-soft" aria-label="Close search">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              <div className="mb-6">
                <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  <Clock className="h-3.5 w-3.5" /> Recent Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s) => (
                    <button key={s} onClick={() => goToProperties(s)} className="rounded-pill border border-border px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-primary hover:text-primary">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  <TrendingUp className="h-3.5 w-3.5" /> Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((s) => (
                    <button key={s} onClick={() => goToProperties(s)} className="rounded-pill bg-surface-soft px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:bg-primary-soft hover:text-primary">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Communities</p>
                  <ul className="space-y-1.5">
                    {communities.slice(0, 4).map((c) => (
                      <li key={c.slug}>
                        <button onClick={() => goToProperties(c.name)} className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-primary">
                          <Building2 className="h-3.5 w-3.5 text-ink-faint" /> {c.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Builders</p>
                  <ul className="space-y-1.5">
                    {builders.slice(0, 4).map((b) => (
                      <li key={b.slug}>
                        <button onClick={() => goToProperties(b.name)} className="text-sm text-ink transition-colors hover:text-primary">
                          {b.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Locations</p>
                  <ul className="space-y-1.5">
                    {locations.slice(0, 4).map((l) => (
                      <li key={l.slug}>
                        <button onClick={() => goToProperties(l.name)} className="text-sm text-ink transition-colors hover:text-primary">
                          {l.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
