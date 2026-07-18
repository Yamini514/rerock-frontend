import Image from "next/image";
import { notFound } from "next/navigation";
import { Building2, MapPin, TrendingUp } from "lucide-react";
import { getLocation, locations } from "@/lib/data/locations";
import { communities } from "@/lib/data/communities";
import { properties } from "@/lib/data/properties";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { EmptyState } from "@/components/ui/StateScreen";
import { PricingTrendChart } from "@/components/charts/PricingTrendChart";
import { absoluteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  const title = `${location.name}, ${location.city} — Real Estate & Pricing Trends`;
  return {
    title,
    description: location.description,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: { title, description: location.description, images: [{ url: location.image }] },
    twitter: { card: "summary_large_image", title, description: location.description, images: [location.image] },
  };
}

function buildLocationTrend(locationCommunities, fallbackPrice) {
  if (!locationCommunities.length) {
    return ["2021", "2022", "2023", "2024", "2025", "2026"].map((year, i) => ({
      year,
      pricePerSqft: Math.round(fallbackPrice * (0.7 + i * 0.06)),
    }));
  }
  const years = locationCommunities[0].pricingTrend.map((p) => p.year);
  return years.map((year, i) => ({
    year,
    pricePerSqft: Math.round(
      locationCommunities.reduce((sum, c) => sum + c.pricingTrend[i].pricePerSqft, 0) / locationCommunities.length
    ),
  }));
}

export default async function LocationDetailPage({ params }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const locationCommunities = communities.filter((c) => c.location === location.slug);
  const locationProperties = properties.filter((p) => p.location === location.slug);
  const trend = buildLocationTrend(locationCommunities, location.avgPricePerSqft);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${location.name}, ${location.city}`,
    description: location.description,
    url: absoluteUrl(`/locations/${location.slug}`),
    image: absoluteUrl(location.image),
    geo: { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng },
    address: { "@type": "PostalAddress", addressLocality: location.name, addressRegion: "Telangana", addressCountry: "IN" },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden">
        <Image src={location.image} alt={location.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[90rem] px-6 pb-12 md:px-10">
          <Badge tone="primary">{location.city}</Badge>
          <h1 className="mt-4 flex items-center gap-2 font-display text-4xl text-white md:text-6xl">
            <MapPin className="h-8 w-8" /> {location.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-white/80">{location.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 gap-6 rounded-card border border-border bg-surface p-6 sm:grid-cols-4 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Avg. Price / sq.ft</p>
            <p className="mt-1 font-tabular text-xl font-semibold text-ink">₹{location.avgPricePerSqft.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">YoY Growth</p>
            <p className="mt-1 flex items-center gap-1 font-tabular text-xl font-semibold text-success">
              <TrendingUp className="h-4 w-4" /> +{location.growthPct}%
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Listed Properties</p>
            <p className="mt-1 font-tabular text-xl font-semibold text-ink">{location.propertyCount}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Communities</p>
            <p className="mt-1 font-tabular text-xl font-semibold text-ink">{locationCommunities.length}</p>
          </div>
        </div>

        <section className="border-t border-border py-12">
          <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">Pricing Trend</h2>
          <Card className="p-6">
            <PricingTrendChart data={trend} />
          </Card>
        </section>

        <section className="border-t border-border py-12">
          <h2 className="mb-6 flex items-center gap-2 font-display text-2xl text-ink md:text-3xl">
            <Building2 className="h-6 w-6 text-primary" /> Communities in {location.name}
          </h2>
          {locationCommunities.length === 0 ? (
            <EmptyState title="No communities here yet" description="New communities in this location will appear here." />
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {locationCommunities.map((c) => (
                <CommunityCard key={c.slug} community={c} />
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-border py-12">
          <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">Available Listings</h2>
          {locationProperties.length === 0 ? (
            <EmptyState title="No live listings right now" />
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {locationProperties.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
