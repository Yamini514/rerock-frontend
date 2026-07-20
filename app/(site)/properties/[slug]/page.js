import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  Building2,
  Compass,
  Layers,
  MapPin,
  Ruler,
  ShieldCheck,
  Star,
} from "lucide-react";
import { getProperty, properties } from "@/lib/data/properties";
import { getCommunity } from "@/lib/data/communities";
import { getBuilder } from "@/lib/data/builders";
import { getLocation } from "@/lib/data/locations";
import { getAgent, matchingAgents } from "@/lib/data/agents";
import { absoluteUrl } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { Badge, statusTone } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Gallery } from "@/components/properties/detail/Gallery";
import { Tour360 } from "@/components/properties/detail/Tour360";
import { StickyCTA } from "@/components/properties/detail/StickyCTA";
import { NearbyPlaces } from "@/components/properties/detail/NearbyPlaces";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { MapView } from "@/components/properties/MapView";
import { PricingTrendChart } from "@/components/charts/PricingTrendChart";
import { EMICalculator, ROICalculator } from "@/components/calculators/Calculators";
import { PropertyCard } from "@/components/cards/PropertyCard";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  const community = getCommunity(property.community);
  const location = getLocation(property.location);
  const title = `${property.title} — ${community?.name || ""}, ${location?.name || ""}`;
  return {
    title,
    description: property.description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: { title, description: property.description, images: [{ url: property.images[0] }] },
    twitter: { card: "summary_large_image", title, description: property.description, images: [property.images[0]] },
  };
}

function Section({ id, title, children, className }) {
  return (
    <section id={id} className={`border-t border-border py-12 first:border-t-0 first:pt-0 ${className || ""}`}>
      <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const community = getCommunity(property.community);
  const builder = getBuilder(property.builder);
  const location = getLocation(property.location);
  const agent = getAgent(property.agent);
  const similar = properties.filter((p) => p.slug !== property.slug && p.type === property.type).slice(0, 3);
  const nearbyAgents = matchingAgents(property.location).filter((a) => a.slug !== agent?.slug);

  const documents = [
    { name: `Sale Agreement — ${property.title}`, type: "PDF", date: "Updated Jul 2026" },
    { name: `RERA Certificate — ${community?.name}`, type: "PDF", date: community?.rera?.split("·")[1]?.trim() || "Verified" },
    { name: "Title Deed & Encumbrance Certificate", type: "PDF", date: "Verified" },
    { name: "Floor Plan Specification Sheet", type: "PDF", date: "Updated Jun 2026" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: property.images.map((src) => absoluteUrl(src.startsWith("http") ? "" : src) || src),
    brand: { "@type": "Organization", name: builder?.name || "REROCK REALTY" },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/properties/${property.slug}`),
      priceCurrency: "INR",
      price: property.price,
      availability: property.status === "Sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      areaServed: location?.name,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Area", value: `${property.area} sq.ft` },
      property.bedrooms ? { "@type": "PropertyValue", name: "Bedrooms", value: property.bedrooms } : null,
      { "@type": "PropertyValue", name: "RERA Approved", value: property.rera ? "Yes" : "Pending" },
    ].filter(Boolean),
    ...(location && {
      itemLocation: {
        "@type": "Place",
        name: `${location.name}, ${location.city}`,
        geo: { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng },
      },
    }),
  };

  return (
    <div className="pb-52 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[90rem] px-4 pt-6 md:px-10 md:pt-10">
        <Gallery images={property.images} title={property.title} />
      </div>

      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="grid gap-10 py-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={statusTone[property.status] || "neutral"}>{property.status}</Badge>
              {property.rera && <Badge tone="primary" icon={ShieldCheck}>RERA Approved</Badge>}
              <Badge tone="neutral">{property.type}</Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">{property.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-ink-muted">
              <MapPin className="h-4 w-4" /> {community?.name}, {location?.name}, {location?.city}
            </p>

            <div className="mt-6 flex items-baseline gap-2 lg:hidden">
              <p className="font-tabular text-3xl font-semibold text-ink">{formatINR(property.price)}</p>
              <p className="font-tabular text-sm text-ink-faint">₹{property.pricePerSqft.toLocaleString("en-IN")}/sq.ft</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-border py-6 sm:flex sm:flex-wrap sm:gap-8">
              {property.bedrooms && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-faint"><BedDouble className="h-3.5 w-3.5" /> Bedrooms</p>
                  <p className="mt-1 font-tabular text-lg font-semibold text-ink">{property.bedrooms}</p>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-faint"><Bath className="h-3.5 w-3.5" /> Bathrooms</p>
                  <p className="mt-1 font-tabular text-lg font-semibold text-ink">{property.bathrooms}</p>
                </div>
              )}
              <div>
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-faint"><Ruler className="h-3.5 w-3.5" /> Area</p>
                <p className="mt-1 font-tabular text-lg font-semibold text-ink">{property.area.toLocaleString("en-IN")} sq.ft</p>
              </div>
              {property.floor && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-faint"><Layers className="h-3.5 w-3.5" /> Floor</p>
                  <p className="mt-1 font-tabular text-lg font-semibold text-ink">{property.floor}</p>
                </div>
              )}
              {property.facing && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-faint"><Compass className="h-3.5 w-3.5" /> Facing</p>
                  <p className="mt-1 font-tabular text-lg font-semibold text-ink">{property.facing}</p>
                </div>
              )}
            </div>

            <Section id="tour" title="360° Virtual Tour" className="pt-10">
              <Tour360 image={property.images[1] || property.images[0]} title={property.title} />
            </Section>

            <Section title="Property Highlights">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 rounded-2xl bg-surface-soft p-4">
                    <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                    <p className="text-sm text-ink">{h}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 leading-relaxed text-ink-muted">{property.description}</p>
            </Section>

            {community && (
              <Section title="Amenities">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
            )}

            {property.floorPlans.length > 0 && (
              <Section title="Floor Plans">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {property.floorPlans.map((fp) => (
                    <div key={fp.label} className="overflow-hidden rounded-card border border-border">
                      <div className="relative h-56 w-full bg-surface-soft">
                        <Image src={fp.image} alt={fp.label} fill sizes="400px" className="object-cover" />
                      </div>
                      <p className="p-4 text-sm font-medium text-ink">{fp.label}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {community && (
              <Section title="Master Plan">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="relative h-72 overflow-hidden rounded-card border border-border">
                    <Image src={community.gallery[4] || community.heroImage} alt="Master plan" fill sizes="500px" className="object-cover" />
                  </div>
                  <p className="self-center leading-relaxed text-ink-muted">{community.masterPlan}</p>
                </div>
              </Section>
            )}

            {community && (
              <Section title="Pricing Trend">
                <Card className="p-6">
                  <PricingTrendChart data={community.pricingTrend} />
                </Card>
              </Section>
            )}

            <Section title="Plan Your Investment">
              <Card className="p-6 md:p-8">
                <Tabs
                  tabs={[
                    { value: "roi", label: "ROI Calculator", content: <ROICalculator defaultInvestment={property.price} defaultGrowth={community?.growthPct || 18} /> },
                    { value: "emi", label: "EMI Calculator", content: <EMICalculator defaultPrincipal={property.price} /> },
                  ]}
                />
              </Card>
            </Section>

            {community && (
              <Section title="Nearby Places">
                <NearbyPlaces places={community.nearby} />
              </Section>
            )}

            {builder && (
              <Section title="Builder Information">
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

            {community && (
              <Section title="Community Overview">
                <Card hover className="overflow-hidden">
                  <Link href={`/communities/${community.slug}`} className="flex flex-col sm:flex-row">
                    <div className="relative h-52 w-full sm:h-auto sm:w-64 shrink-0">
                      <Image src={community.heroImage} alt={community.name} fill sizes="260px" className="object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <p className="font-display text-xl text-ink">{community.name}</p>
                      <p className="mt-1 text-sm text-ink-muted line-clamp-2">{community.overview}</p>
                      <div className="mt-4 flex flex-wrap gap-6 text-xs text-ink-faint">
                        <span>{community.totalUnits} Total Units</span>
                        <span>{community.availableUnits} Available</span>
                        <span>Possession: {community.possession}</span>
                      </div>
                    </div>
                  </Link>
                </Card>
              </Section>
            )}

            <Section title="Documents">
              <DocumentsSection documents={documents} />
            </Section>

            <Section title="Location">
              <MapView properties={[property]} />
            </Section>

            {similar.length > 0 && (
              <Section title="Similar Properties">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {similar.map((p) => (
                    <PropertyCard key={p.slug} property={p} />
                  ))}
                </div>
              </Section>
            )}

            {nearbyAgents.length > 0 && (
              <Section title={`Agents Strong in ${location?.name || "this Area"}`}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {nearbyAgents.map((a) => (
                    <Card key={a.slug} className="flex items-center gap-4 p-5">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                        <Image src={a.avatar} alt={a.name} fill sizes="56px" className="object-cover" />
                      </span>
                      <div>
                        <p className="font-medium text-ink">{a.name}</p>
                        <p className="text-xs text-ink-muted">{a.role}</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-ink-faint">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {a.rating} · {a.dealsClosed} deals closed
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <Card className="p-6">
                <p className="text-xs uppercase tracking-wide text-ink-faint">Price</p>
                <p className="mt-1 font-tabular text-3xl font-semibold text-ink">{formatINR(property.price)}</p>
                <p className="mt-1 font-tabular text-sm text-ink-muted">₹{property.pricePerSqft.toLocaleString("en-IN")} / sq.ft</p>
              </Card>
              {agent && (
                <Card className="p-6">
                  <p className="mb-4 text-xs uppercase tracking-wide text-ink-faint">Your Advisor</p>
                  <div className="flex items-center gap-3">
                    <span className="relative h-14 w-14 overflow-hidden rounded-full">
                      <Image src={agent.avatar} alt={agent.name} fill sizes="56px" className="object-cover" />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{agent.name}</p>
                      <p className="text-xs text-ink-muted">{agent.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs text-ink-faint">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {agent.rating} · {agent.dealsClosed} deals closed
                  </div>
                </Card>
              )}
            </div>
          </aside>
        </div>
      </div>

      <StickyCTA property={property} agent={agent} />
    </div>
  );
}
