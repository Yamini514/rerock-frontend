import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { communities } from "@/lib/data/communities";

export const metadata = {
  title: "Communities",
  description: "Explore Hyderabad's most trusted gated communities and townships.",
};

export default function CommunitiesPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary" icon={Building2}>{communities.length} Communities</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Gated Communities & Townships</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Every community on REROCK is verified for RERA compliance, build quality, and five-year appreciation potential.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((c) => (
          <CommunityCard key={c.slug} community={c} className="h-full" />
        ))}
      </div>
    </div>
  );
}
