"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Scale, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { compareRows as rows } from "@/lib/compareRows";

export function CompareBar({ items, onRemove, onClear }) {
  const [open, setOpen] = useState(false);
  if (!items.length) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-24 z-40 mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-dialog border border-border bg-surface p-4 shadow-[var(--shadow-lg)] md:bottom-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Scale className="h-5 w-5" />
            </span>
            <div className="flex -space-x-3">
              {items.slice(0, 3).map((p) => (
                <span key={p.slug} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-surface">
                  <Image src={p.images[0]} alt={p.title} fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="hidden text-sm font-medium text-ink sm:block">{items.length} selected to compare</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={onClear}>Clear</Button>
            <Button size="sm" onClick={() => setOpen(true)} disabled={items.length < 2}>Compare</Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <Modal open={open} onClose={() => setOpen(false)} title="Compare Properties" size="xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-32 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">Property</th>
                {items.map((p) => (
                  <th key={p.slug} className="px-3 py-3 text-left">
                    <div className="relative mb-2 h-20 w-28 overflow-hidden rounded-xl">
                      <Image src={p.images[0]} alt={p.title} fill sizes="112px" className="object-cover" />
                    </div>
                    <p className="font-display text-sm text-ink">{p.title}</p>
                    <button onClick={() => onRemove(p.slug)} className="mt-1 flex items-center gap-1 text-xs text-danger">
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="py-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">{row.label}</td>
                  {items.map((p) => (
                    <td key={p.slug} className="px-3 py-3 font-medium text-ink">
                      {row.get(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}
