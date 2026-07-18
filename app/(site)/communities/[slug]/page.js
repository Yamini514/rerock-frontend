import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Building2, MapPin, Star, TrendingUp } from "lucide-react";
import { getCommunity, communities } from "@/lib/data/communities";
import { getBuilder } from "@/lib/data/builders";
import { getLocation } from "@/lib/data/locations";
import { properties } from "@/lib/data/properties";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Gallery } from "@/components/properties/detail/Gallery";
import { NearbyPlaces } from "@/components/properties/detail/NearbyPlaces";
import { MapView } from "@/components/properties/MapView";
import { PricingTrendChart } from "@/components/charts/PricingTrendChart";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { EmptyState } from "@/components/ui/StateScreen";
import { absoluteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) return {};
  const location = getLocation(community.location);
  const title = `${community.name} — ${location?.name || ""}, Hyderabad`;
  return {
    title,
    description: community.overview,
    alternates: { canonical: `/communities/${community.slug}` },
    openGraph: { title, description: community.overview, images: [{ url: community.heroImage }] },
    twitter: { card: "summary_large_image", title, description: community.overview, images: [community.heroImage] },
  };
}

function Section({ title, children }) {
  return (
    <section className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default async function CommunityDetailPage({ params }) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  const builder = getBuilder(community.builder);
  const location = getLocation(community.location);
  const availableProperties = properties.filter((p) => p.community === community.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: community.name,
    description: community.overview,
    url: absoluteUrl(`/communities/${community.slug}`),
    image: absoluteUrl(community.heroImage),
    numberOfAccommodationUnits: community.totalUnits,
    petsAllowed: true,
    address: {
      "@type": "PostalAddress",
      addressLocality: location?.name,
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    ...(location && { geo: { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng } }),
    ...(builder && { developer: { "@type": "Organization", name: builder.name } }),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <Image src={community.heroImage} alt={community.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[90rem] px-6 pb-14 md:px-10">
          <Badge tone="primary">{builder?.name}</Badge>
          <h1 className="mt-4 font-display text-4xl text-white md:text-6xl">{community.name}</h1>
          <p className="mt-2 text-lg text-white/80">{community.tagline}</p>
          <p className="mt-3 flex items-center gap-1.5 text-white/70">
            <MapPin className="h-4 w-4" /> {location?.name}, {location?.city}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#available" size="lg">View Available Units</Button>
            <Button as="a" href="tel:+919848012345" variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:border-white hover:text-white">
              Call an Advisor
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 gap-6 rounded-card border border-border bg-surface p-6 sm:grid-cols-4 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Starting From</p>
            <p className="mt-1 font-tabular text-xl font-semibold text-ink">{formatINR(community.priceRange.min)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Total Units</p>
            <p className="mt-1 font-tabular text-xl font-semibold text-ink">{community.totalUnits}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Possession</p>
            <p className="mt-1 font-tabular text-xl font-semibold text-ink">{community.possession}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint">Investment Score</p>
            <p className="mt-1 font-tabular text-xl font-semibold text-primary">{community.investmentScore}/100</p>
          </div>
        </div>

        <Section title="Overview">
          <p className="max-w-3xl leading-relaxed text-ink-muted">{community.overview}</p>
          <p className="mt-3 text-sm font-medium text-ink-faint">{community.rera}</p>
        </Section>

        <Section title="Gallery">
          <Gallery images={community.gallery} title={community.name} />
        </Section>

        <Section title="Master Plan">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative h-72 overflow-hidden rounded-card border border-border">
              <Image src={community.gallery[3] || community.heroImage} alt="Master plan" fill sizes="500px" className="object-cover" />
            </div>
            <p className="self-center leading-relaxed text-ink-muted">{community.masterPlan}</p>
          </div>
        </Section>

        <Section title="Amenities">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {community.amenities.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-2 rounded-2xl border border-border py-6 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <DynamicIcon name={a.icon} className="h-5 w-5" />
                </span>
                <p className="text-xs font-medium text-ink">{a.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <section id="available" className="border-t border-border py-12">
          <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">Available Properties</h2>
          {availableProperties.length === 0 ? (
            <EmptyState title="No live listings right now" description="New units at this community will appear here as they're released." />
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {availableProperties.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          )}
        </section>

        <Section title="Pricing Trend">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-ink-muted">Price per sq.ft, 2021–2026</p>
              <span className="flex items-center gap-1.5 rounded-pill bg-success-soft px-3 py-1 text-xs font-semibold text-success">
                <TrendingUp className="h-3.5 w-3.5" /> +{community.growthPct}% since 2021
              </span>
            </div>
            <PricingTrendChart data={community.pricingTrend} />
          </Card>
        </Section>

        <Section title="Location & Nearby">
          <div className="grid gap-6 lg:grid-cols-2">
            <MapView properties={availableProperties.length ? availableProperties : [{ location: community.location, slug: community.slug, title: community.name, images: [community.heroImage], price: community.priceRange.min }]} />
            <NearbyPlaces places={community.nearby} />
          </div>
        </Section>

        {builder && (
          <Section title="Builder">
            <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center md:p-8">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Building2 className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <p className="font-display text-xl text-ink">{builder.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{builder.description}</p>
                <div className="mt-3 flex items-center gap-6 text-xs text-ink-faint">
                  <span>Est. {builder.established}</span>
                  <span>{builder.projectsCount}+ Projects</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> {builder.rating}</span>
                </div>
              </div>
              <Link href={`/properties?builder=${builder.slug}`} className="flex items-center gap-1 text-sm font-semibold text-primary">
                View all listings <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Card>
          </Section>
        )}

        <Section title="Investment Potential">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card className="p-6 text-center">
              <p className="font-tabular text-3xl font-semibold text-primary">{community.investmentScore}/100</p>
              <p className="mt-1 text-sm text-ink-muted">Investment Score</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="font-tabular text-3xl font-semibold text-success">+{community.growthPct}%</p>
              <p className="mt-1 text-sm text-ink-muted">YoY Appreciation</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="font-tabular text-3xl font-semibold text-ink">{community.availableUnits}</p>
              <p className="mt-1 text-sm text-ink-muted">Units Remaining</p>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  );
}
