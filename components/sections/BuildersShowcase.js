"use client";

import { motion } from "framer-motion";
import { Building2, Star } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { builders } from "@/lib/data/builders";

export function BuildersShowcase() {
  return (
    <section className="bg-surface-soft py-16 md:py-32">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <SectionHeading eyebrow="Our Builder Partners" title="Backed by names Hyderabad already trusts" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builders.map((b, i) => (
            <motion.div
              key={b.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-card border border-border bg-surface p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Building2 className="h-6 w-6" />
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-ink">
                  <Star className="h-4 w-4 fill-primary text-primary" /> {b.rating}
                </span>
              </div>
              <p className="mt-5 font-display text-xl text-ink">{b.name}</p>
              <p className="mt-1.5 text-sm text-ink-muted">{b.headline}</p>
              <div className="mt-5 flex items-center gap-6 border-t border-border pt-4 text-xs text-ink-faint">
                <span>Est. {b.established}</span>
                <span>{b.projectsCount}+ Projects</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
