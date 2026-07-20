"use client";

import { motion } from "framer-motion";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { communities } from "@/lib/data/communities";

export function FeaturedCommunities() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-10">
      <SectionHeading
        eyebrow="Featured Communities"
        title="Gated townships people aspire to live in"
        description="Six of Hyderabad's most in-demand addresses — curated for build quality, appreciation, and lifestyle."
        href="/communities"
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <CommunityCard community={c} className="h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
