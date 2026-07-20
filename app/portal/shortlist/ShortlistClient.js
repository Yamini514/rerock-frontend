"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/StateScreen";
import { useShortlistStore, SHORTLIST_LIMIT } from "@/lib/store/shortlistStore";
import { formatINR } from "@/lib/utils";
import { recommendations } from "@/lib/data/portfolio";

export function ShortlistClient() {
  const items = useShortlistStore((s) => s.items);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex items-baseline justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">My Shortlist</h1>
        <p className="text-sm text-ink-muted">{items.length}/{SHORTLIST_LIMIT} saved</p>
      </div>

      <section>
        <h2 className="mb-4 font-display text-xl text-ink">Saved Properties</h2>
        {items.length === 0 ? (
          <EmptyState title="No saved properties yet" description="Tap the heart icon on any listing to save it here." action={<Button as={Link} href="/properties" size="sm">Browse Properties</Button>} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <Link key={p.slug} href={`/properties/${p.slug}`}>
                <Card hover className="overflow-hidden">
                  <div className="relative h-44 w-full">
                    <Image src={p.image} alt={p.title} fill sizes="360px" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="font-medium text-ink line-clamp-1">{p.title}</p>
                    <p className="mt-1 font-tabular text-lg font-semibold text-primary">{formatINR(p.price)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-ink">
          <Sparkles className="h-5 w-5 text-primary" /> Recommended For You
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {recommendations.map((r) => (
            <Card key={r.id} hover className="flex items-center gap-4 overflow-hidden p-4">
              <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image src={r.image} alt={r.title} fill sizes="96px" className="object-cover" />
              </span>
              <div>
                <p className="font-medium text-ink">{r.title}</p>
                <p className="mt-1 font-tabular text-sm font-semibold text-primary">{formatINR(r.price)}</p>
                <p className="mt-1 text-xs text-ink-faint">{r.reason}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
