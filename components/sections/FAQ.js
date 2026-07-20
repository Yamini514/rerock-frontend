"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";

const faqs = [
  {
    q: "Is REROCK Realty a builder or an advisory?",
    a: "REROCK Realty is a registered real estate investment advisory. We don't construct properties — we curate verified inventory from India's most trusted builders and guide you through the entire buying journey.",
  },
  {
    q: "How do you verify RERA approval and legal title?",
    a: "Every listing on our platform is cross-checked against the Telangana RERA portal, and our legal team independently verifies encumbrance certificates before a property is published.",
  },
  {
    q: "Can I track my portfolio after purchase?",
    a: "Yes — every client gets access to a personal dashboard showing live portfolio valuation, growth charts, documents, and price alerts for their properties.",
  },
  {
    q: "Do you help with home loans and EMI planning?",
    a: "Our advisors work with 12+ leading banks and NBFCs to help you secure the best rate, and our built-in EMI calculator helps you plan affordability before you commit.",
  },
  {
    q: "What's your fee structure for buyers?",
    a: "Our advisory services are free for buyers — we're compensated by our builder partners, and pricing shown to you always matches the builder's official price list.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-10">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" align="center" className="md:text-center [&>div]:mx-auto" />
      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="overflow-hidden rounded-card border border-border bg-surface">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-display text-lg text-ink">{item.q}</span>
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
    </section>
  );
}
