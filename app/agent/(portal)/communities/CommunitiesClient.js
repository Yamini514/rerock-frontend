"use client";

import { CommunityCard } from "@/components/cards/CommunityCard";
import { EmptyState } from "@/components/ui/StateScreen";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { communities } from "@/lib/data/communities";
import { leadsForAgent } from "@/lib/data/leads";

export function CommunitiesClient() {
  const { user } = useAgentAuth();
  const slugs = [...new Set(leadsForAgent(user?.slug).map((l) => l.communitySlug))];
  const myCommunities = communities.filter((c) => slugs.includes(c.slug));

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Assigned Communities</h1>
      <p className="mb-6 text-sm text-ink-muted">{myCommunities.length} communities your leads are exploring</p>

      {myCommunities.length === 0 ? (
        <EmptyState title="No communities assigned yet" />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myCommunities.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      )}
    </div>
  );
}
