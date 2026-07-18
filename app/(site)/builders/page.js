import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BuilderCard } from "@/components/cards/BuilderCard";
import { builders } from "@/lib/data/builders";

export const metadata = {
  title: "Builders",
  description: "Meet the developers behind Hyderabad's most trusted addresses.",
};

export default function BuildersPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary" icon={Building2}>{builders.length} Builder Partners</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Our Builder Partners</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Every builder on REROCK is vetted for delivery track record, construction quality, and RERA compliance.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {builders.map((b) => (
          <BuilderCard key={b.slug} builder={b} className="h-full" />
        ))}
      </div>
    </div>
  );
}
