"use client";

import { Users } from "lucide-react";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { EmptyState } from "@/components/ui/StateScreen";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { properties } from "@/lib/data/properties";
import { leadsForAgent } from "@/lib/data/leads";

export function PropertiesClient() {
  const { user } = useAgentAuth();
  const myLeads = leadsForAgent(user?.slug);
  const slugs = [...new Set(myLeads.map((l) => l.interestedPropertySlug))];
  const myProperties = properties.filter((p) => slugs.includes(p.slug));

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Assigned Properties</h1>
      <p className="mb-6 text-sm text-ink-muted">{myProperties.length} properties your leads are interested in</p>

      {myProperties.length === 0 ? (
        <EmptyState title="No properties assigned yet" />
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {myProperties.map((p) => {
            const matches = myLeads.filter((l) => l.interestedPropertySlug === p.slug);
            return (
              <div key={p.slug}>
                <PropertyCard property={p} />
                <div className="mt-2 flex items-center gap-1.5 px-1 text-xs text-ink-faint">
                  <Users className="h-3.5 w-3.5" />
                  Matching: {matches.map((m) => m.clientName).join(", ")}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
