"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { communities } from "@/lib/data/communities";
import { locations } from "@/lib/data/locations";
import { builders } from "@/lib/data/builders";

const propertyTypes = [
  { label: "Luxury Apartments", href: "/properties?type=Apartment", desc: "2–4 BHK residences in premium towers" },
  { label: "Villas", href: "/properties?type=Villa", desc: "Independent villas in gated communities" },
  { label: "Open Plots", href: "/properties?type=Plot", desc: "RERA-approved, clear-title plots" },
  { label: "Commercial Spaces", href: "/properties?type=Commercial", desc: "Grade A offices, retail & warehouses" },
];

export function MegaMenuPanel({ menu }) {
  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-full z-30 border-t border-border bg-surface shadow-[var(--shadow-lg)]"
        >
          <div className="mx-auto max-w-[90rem] px-10 py-10">
            {menu === "properties" && (
              <div className="grid grid-cols-4 gap-6">
                {propertyTypes.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group rounded-2xl p-4 transition-colors hover:bg-surface-soft"
                  >
                    <p className="flex items-center gap-1.5 font-display text-lg text-ink">
                      {item.label}
                      <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </p>
                    <p className="mt-1.5 text-sm text-ink-muted">{item.desc}</p>
                  </Link>
                ))}
              </div>
            )}

            {menu === "communities" && (
              <div className="grid grid-cols-3 gap-6">
                {communities.slice(0, 6).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/communities/${c.slug}`}
                    className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-surface-soft"
                  >
                    <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image src={c.heroImage} alt={c.name} fill sizes="80px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{c.name}</span>
                      <span className="block text-xs text-ink-muted">{c.tagline}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {menu === "locations" && (
              <div className="grid grid-cols-4 gap-4">
                {locations.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/properties?location=${l.slug}`}
                    className="group rounded-2xl border border-border p-4 transition-colors hover:border-primary hover:bg-primary-softer"
                  >
                    <p className="font-medium text-ink">{l.name}</p>
                    <p className="mt-1 text-xs text-ink-muted">{l.propertyCount} properties · +{l.growthPct}% YoY</p>
                  </Link>
                ))}
              </div>
            )}

            {menu === "builders" && (
              <div className="grid grid-cols-3 gap-6">
                {builders.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/properties?builder=${b.slug}`}
                    className="rounded-2xl p-4 transition-colors hover:bg-surface-soft"
                  >
                    <p className="font-display text-lg text-ink">{b.name}</p>
                    <p className="mt-1 text-sm text-ink-muted">{b.headline}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
