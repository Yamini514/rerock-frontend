import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/StateScreen";
import { formatINR } from "@/lib/utils";
import { savedProperties, recommendations } from "@/lib/data/portfolio";

export const metadata = { title: "My Shortlist" };

export default function ShortlistPage() {
  return (
    <div>
      <section>
        <h2 className="mb-4 font-display text-xl text-ink">Saved Properties</h2>
        {savedProperties.length === 0 ? (
          <EmptyState title="No saved properties yet" description="Tap the heart icon on any listing to save it here." action={<Button as="a" href="/properties" size="sm">Browse Properties</Button>} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((p) => (
              <Card key={p.id} hover className="overflow-hidden">
                <div className="relative h-44 w-full">
                  <Image src={p.image} alt={p.title} fill sizes="360px" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-medium text-ink line-clamp-1">{p.title}</p>
                  <p className="mt-1 font-tabular text-lg font-semibold text-primary">{formatINR(p.price)}</p>
                </div>
              </Card>
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
