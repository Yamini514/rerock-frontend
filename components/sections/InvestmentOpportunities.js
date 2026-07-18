"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { communities } from "@/lib/data/communities";
import { formatINR } from "@/lib/utils";

const featured = [...communities].sort((a, b) => b.growthPct - a.growthPct).slice(0, 3);

export function InvestmentOpportunities() {
  return (
    <section className="bg-[#1c1c1e] py-16 md:py-32">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <SectionHeading
          eyebrow="Investment Opportunities"
          title="Where the data points to outsized returns"
          description="Ranked by five-year appreciation, rental yield, and infrastructure triggers."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featured.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/communities/${c.slug}`}
                className="group relative block overflow-hidden rounded-card border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-primary/40"
              >
                <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl">
                  <Image src={c.heroImage} alt={c.name} fill sizes="400px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-display text-xl text-white">{c.name}</p>
                  <span className="flex items-center gap-1 rounded-pill bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">
                    <TrendingUp className="h-3.5 w-3.5" /> +{c.growthPct}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60">Entry from {formatINR(c.priceRange.min)}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs uppercase tracking-wide text-white/50">Investment Score</span>
                  <span className="font-tabular text-lg font-semibold text-primary">{c.investmentScore}/100</span>
                </div>
                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white/40 transition-colors group-hover:text-primary" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
