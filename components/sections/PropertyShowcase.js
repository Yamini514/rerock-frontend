"use client";

import { motion } from "framer-motion";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { properties } from "@/lib/data/properties";

export function PropertyShowcase({ eyebrow, title, description, type, href, tone = "light" }) {
  const items = properties.filter((p) => p.type === type);
  if (!items.length) return null;

  return (
    <section className={tone === "soft" ? "bg-surface-soft" : ""}>
      <div className="mx-auto max-w-[90rem] px-6 py-16 md:px-10 md:py-32">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} href={href} />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <PropertyCard property={p} className="h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
