import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LocationCard } from "@/components/cards/LocationCard";
import { locations } from "@/lib/data/locations";

export const metadata = {
  title: "Locations",
  description: "Explore Hyderabad's top-performing micro-markets and growth corridors.",
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary" icon={MapPin}>{locations.length} Locations</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Explore by Location</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Every micro-market on REROCK is tracked for pricing trends, supply, and infrastructure triggers.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {locations.map((l) => (
          <LocationCard key={l.slug} location={l} className="h-full" />
        ))}
      </div>
    </div>
  );
}
