"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { NoResultsState } from "@/components/ui/StateScreen";
import { faqs, faqCategories } from "@/lib/data/faqs";

export function FAQClient() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (query && !f.q.toLowerCase().includes(query.toLowerCase()) && !f.a.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [category, query]);

  return (
    <div>
      <div className="mb-8 max-w-md">
        <Input icon={Search} placeholder="Search questions..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {["All", ...faqCategories].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
              category === c ? "bg-primary text-white" : "bg-surface-soft text-ink-muted hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <NoResultsState title="No matching questions" description="Try a different search term or category." />
      ) : (
        <div className="space-y-3">
          {filtered.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-card border border-border bg-surface">
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                  <span>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary">{item.category}</span>
                    <span className="font-display text-lg text-ink">{item.q}</span>
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-soft text-ink">
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-ink-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
