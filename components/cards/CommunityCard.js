"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getBuilder } from "@/lib/data/builders";
import { getLocation } from "@/lib/data/locations";
import { formatINR } from "@/lib/utils";

export function CommunityCard({ community, className }) {
  const builder = getBuilder(community.builder);
  const location = getLocation(community.location);

  return (
    <Card hover className={className}>
      <Link href={`/communities/${community.slug}`} className="block">
        <div className="relative h-72 w-full overflow-hidden rounded-t-card">
          <motion.div className="h-full w-full" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Image src={community.heroImage} alt={community.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge tone="primary">{builder?.name}</Badge>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-pill bg-white/90 px-3 py-1 text-xs font-semibold text-success">
            <TrendingUp className="h-3.5 w-3.5" /> +{community.growthPct}% YoY
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-2xl text-white">{community.name}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/85">
              <MapPin className="h-3.5 w-3.5" /> {location?.name}, {location?.city}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Starting from</p>
            <p className="font-tabular text-lg font-semibold text-ink">{formatINR(community.priceRange.min)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-ink-faint">Investment Score</p>
            <p className="font-tabular text-lg font-semibold text-primary">{community.investmentScore}/100</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-soft text-ink transition-colors group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight className="h-4.5 w-4.5" />
          </span>
        </div>
      </Link>
    </Card>
  );
}
