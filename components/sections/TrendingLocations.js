"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { locations } from "@/lib/data/locations";

export function TrendingLocations() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 py-16 md:px-10 md:py-10">
      <SectionHeading
        eyebrow="Trending Locations"
        title="Micro-markets outperforming the city average"
        description="Track appreciation, supply, and infrastructure triggers across Hyderabad's growth corridors."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {locations.map((l, i) => (
          <motion.div
            key={l.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link href={`/properties?location=${l.slug}`} className="group relative block h-48 overflow-hidden rounded-card">
              <Image src={l.image} alt={l.name} fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-lg text-white">{l.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-success">
                  <TrendingUp className="h-3 w-3" /> +{l.growthPct}% YoY
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
