import { notFound } from "next/navigation";
import { Award, Building2, MapPinned, Star } from "lucide-react";
import { getBuilder, builders } from "@/lib/data/builders";
import { communities } from "@/lib/data/communities";
import { properties } from "@/lib/data/properties";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { EmptyState } from "@/components/ui/StateScreen";

export async function generateStaticParams() {
  return builders.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const builder = getBuilder(slug);
  if (!builder) return {};
  return { title: `${builder.name}`, description: builder.description };
}

function Section({ title, children }) {
  return (
    <section className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default async function BuilderDetailPage({ params }) {
  const { slug } = await params;
  const builder = getBuilder(slug);
  if (!builder) notFound();

  const builderCommunities = communities.filter((c) => c.builder === builder.slug);
  const builderProperties = properties.filter((p) => p.builder === builder.slug);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <div className="flex flex-col gap-8 rounded-card border border-border bg-surface-soft p-8 sm:flex-row sm:items-center md:p-12">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-primary-soft text-primary">
          <Building2 className="h-9 w-9" />
        </span>
        <div className="flex-1">
          <Badge tone="primary">Est. {builder.established}</Badge>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{builder.name}</h1>
          <p className="mt-2 max-w-2xl text-ink-muted md:text-lg">{builder.headline}</p>
        </div>
        <div className="flex items-center gap-1 text-lg font-semibold text-ink">
          <Star className="h-5 w-5 fill-primary text-primary" /> {builder.rating}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <p className="font-tabular text-2xl font-semibold text-ink">{builder.projectsCount}+</p>
          <p className="mt-1 text-xs text-ink-muted">Projects</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="font-tabular text-2xl font-semibold text-ink">{builder.sqftDelivered}</p>
          <p className="mt-1 text-xs text-ink-muted">Delivered</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="font-tabular text-2xl font-semibold text-ink">{new Date().getFullYear() - builder.established}+</p>
          <p className="mt-1 text-xs text-ink-muted">Years Active</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="font-tabular text-2xl font-semibold text-ink">{builder.rating}/5</p>
          <p className="mt-1 text-xs text-ink-muted">Client Rating</p>
        </Card>
      </div>

      <Section title="About">
        <p className="max-w-3xl leading-relaxed text-ink-muted">{builder.description}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-faint">
          <MapPinned className="h-4 w-4" /> Headquartered in {builder.headquarters}
        </p>
      </Section>

      <Section title="Awards & Recognition">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {builder.awards.map((a) => (
            <div key={a} className="flex items-start gap-3 rounded-2xl bg-surface-soft p-4">
              <Award className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
              <p className="text-sm text-ink">{a}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-t border-border py-12">
        <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">Communities by {builder.name}</h2>
        {builderCommunities.length === 0 ? (
          <EmptyState title="No communities listed yet" />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {builderCommunities.map((c) => (
              <CommunityCard key={c.slug} community={c} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border py-12">
        <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">Available Listings</h2>
        {builderProperties.length === 0 ? (
          <EmptyState title="No live listings right now" />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {builderProperties.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
