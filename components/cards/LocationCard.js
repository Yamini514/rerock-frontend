import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function LocationCard({ location, className }) {
  return (
    <Card hover className={className}>
      <Link href={`/locations/${location.slug}`} className="block">
        <div className="relative h-52 w-full overflow-hidden rounded-t-card">
          <Image src={location.image} alt={location.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-xl text-white">{location.name}</p>
            <p className="text-sm text-white/80">{location.city}</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Avg. Price</p>
            <p className="font-tabular text-sm font-semibold text-ink">₹{location.avgPricePerSqft.toLocaleString("en-IN")}/sq.ft</p>
          </div>
          <span className="flex items-center gap-1 rounded-pill bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">
            <TrendingUp className="h-3.5 w-3.5" /> +{location.growthPct}%
          </span>
        </div>
      </Link>
    </Card>
  );
}
