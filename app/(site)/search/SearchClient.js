"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Clock, Mic, Search as SearchIcon, TrendingUp } from "lucide-react";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { BuilderCard } from "@/components/cards/BuilderCard";
import { LocationCard } from "@/components/cards/LocationCard";
import { NoResultsState } from "@/components/ui/StateScreen";
import { properties } from "@/lib/data/properties";
import { communities } from "@/lib/data/communities";
import { builders } from "@/lib/data/builders";
import { locations } from "@/lib/data/locations";

const recentSearches = ["3 BHK in Kokapet", "Villas under ₹5 Cr", "Sobha Royal Crest"];
const popularSearches = ["Ready to move villas", "RERA approved plots", "Grade A offices", "Gachibowli apartments"];

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  function runSearch(q) {
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  const results = useMemo(() => {
    if (!initialQuery) return null;
    const q = initialQuery.toLowerCase();
    return {
      properties: properties.filter((p) => p.title.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)),
      communities: communities.filter((c) => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)),
      builders: builders.filter((b) => b.name.toLowerCase().includes(q)),
      locations: locations.filter((l) => l.name.toLowerCase().includes(q)),
    };
  }, [initialQuery]);

  const totalResults = results
    ? results.properties.length + results.communities.length + results.builders.length + results.locations.length
    : 0;

  return (
    <div>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch(query)}
          placeholder="Search communities, builders, locations, or property types..."
          className="h-16 w-full rounded-dialog border border-border-strong bg-surface pl-14 pr-14 text-lg text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <button className="absolute right-5 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-primary" aria-label="Voice search">
          <Mic className="h-5 w-5" />
        </button>
      </div>

      {!results ? (
        <div className="mt-12">
          <div className="mb-8">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              <Clock className="h-3.5 w-3.5" /> Recent Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button key={s} onClick={() => runSearch(s)} className="rounded-pill border border-border px-4 py-2 text-sm text-ink-muted transition-colors hover:border-primary hover:text-primary">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              <TrendingUp className="h-3.5 w-3.5" /> Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s) => (
                <button key={s} onClick={() => runSearch(s)} className="rounded-pill bg-surface-soft px-4 py-2 text-sm text-ink-muted transition-colors hover:bg-primary-soft hover:text-primary">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              <Building2 className="h-3.5 w-3.5" /> Suggested Communities
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {communities.slice(0, 3).map((c) => (
                <CommunityCard key={c.slug} community={c} />
              ))}
            </div>
          </div>
        </div>
      ) : totalResults === 0 ? (
        <div className="mt-12">
          <NoResultsState title={`No results for "${initialQuery}"`} description="Try a different community, builder, or location name." />
        </div>
      ) : (
        <div className="mt-12 space-y-14">
          <p className="text-sm text-ink-muted">{totalResults} results for &ldquo;{initialQuery}&rdquo;</p>

          {results.properties.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl text-ink">Properties</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {results.properties.map((p) => <PropertyCard key={p.slug} property={p} />)}
              </div>
            </section>
          )}

          {results.communities.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl text-ink">Communities</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {results.communities.map((c) => <CommunityCard key={c.slug} community={c} />)}
              </div>
            </section>
          )}

          {results.builders.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl text-ink">Builders</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {results.builders.map((b) => <BuilderCard key={b.slug} builder={b} />)}
              </div>
            </section>
          )}

          {results.locations.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl text-ink">Locations</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {results.locations.map((l) => <LocationCard key={l.slug} location={l} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
