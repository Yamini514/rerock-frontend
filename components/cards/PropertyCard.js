"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BedDouble, Bath, Heart, MapPin, Ruler, Scale } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, statusTone } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { useShortlistStore, SHORTLIST_LIMIT } from "@/lib/store/shortlistStore";
import { formatINR } from "@/lib/utils";
import { getLocation } from "@/lib/data/locations";
import { cn } from "@/lib/utils";

export function PropertyCard({ property, className, compareChecked, onCompareToggle }) {
  const { toast } = useToast();
  const saved = useShortlistStore((s) => s.isSaved(property.slug));
  const toggleShortlist = useShortlistStore((s) => s.toggle);
  const location = getLocation(property.location);

  return (
    <Card hover className={cn("group overflow-hidden", className)}>
      <div className="relative h-64 w-full overflow-hidden rounded-t-card">
        <Link href={`/properties/${property.slug}`}>
          <motion.div className="h-full w-full" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </Link>
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge tone={statusTone[property.status] || "neutral"}>{property.status}</Badge>
          {property.rera && <Badge tone="primary">RERA</Badge>}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            const ok = toggleShortlist(property);
            if (!ok) {
              toast({
                tone: "warning",
                title: `Shortlist is full (${SHORTLIST_LIMIT}/${SHORTLIST_LIMIT})`,
                description: "Remove one to add another.",
              });
            }
          }}
          aria-label="Save property"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform active:scale-90"
        >
          <motion.span animate={saved ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.35 }}>
            <Heart className={cn("h-4.5 w-4.5 transition-colors", saved ? "fill-primary text-primary" : "text-ink-muted")} />
          </motion.span>
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-3 pt-8">
          <p className="font-tabular text-xl font-semibold text-white">{formatINR(property.price)}</p>
        </div>
      </div>
      <div className="p-6">
        <Link href={`/properties/${property.slug}`}>
          <p className="font-display text-lg text-ink line-clamp-1">{property.title}</p>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
          <MapPin className="h-3.5 w-3.5" /> {location?.name}, {location?.city}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
          {property.bedrooms && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" /> {property.bedrooms} Bed
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" /> {property.bathrooms} Bath
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Ruler className="h-4 w-4" /> {property.area.toLocaleString("en-IN")} sq.ft
          </span>
        </div>
        {onCompareToggle && (
          <button
            onClick={onCompareToggle}
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-1.5 rounded-btn border py-2 text-xs font-medium transition-colors",
              compareChecked ? "border-primary bg-primary-soft text-primary" : "border-border-strong text-ink-muted hover:border-primary/50"
            )}
          >
            <Scale className="h-3.5 w-3.5" /> {compareChecked ? "Added to Compare" : "Add to Compare"}
          </button>
        )}
      </div>
    </Card>
  );
}
