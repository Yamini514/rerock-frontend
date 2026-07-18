"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin, Scale } from "lucide-react";
import { Badge, statusTone } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { formatINR } from "@/lib/utils";
import { getLocation } from "@/lib/data/locations";

export function PropertyListRow({ property, compareChecked, onCompareToggle }) {
  const location = getLocation(property.location);

  return (
    <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 transition-shadow hover:shadow-[var(--shadow-md)] sm:flex-row">
      <Link href={`/properties/${property.slug}`} className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-52">
        <Image src={property.images[0]} alt={property.title} fill sizes="208px" className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[property.status] || "neutral"}>{property.status}</Badge>
            {property.rera && <Badge tone="primary">RERA</Badge>}
          </div>
          <Link href={`/properties/${property.slug}`}>
            <p className="mt-2 font-display text-xl text-ink">{property.title}</p>
          </Link>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
            <MapPin className="h-3.5 w-3.5" /> {location?.name}, {location?.city}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
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
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-tabular text-2xl font-semibold text-ink">{formatINR(property.price)}</p>
          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ink-muted">
            <Checkbox checked={compareChecked} onChange={onCompareToggle} />
            <Scale className="h-3.5 w-3.5" /> Compare
          </label>
        </div>
      </div>
    </div>
  );
}
