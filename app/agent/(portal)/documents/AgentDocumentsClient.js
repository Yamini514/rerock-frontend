"use client";

import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/StateScreen";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { clients } from "@/lib/data/clients";
import { documents } from "@/lib/data/portfolio";

export function AgentDocumentsClient() {
  const { user } = useAgentAuth();
  const myClientIds = clients.filter((c) => c.assignedAgentSlug === user?.slug).map((c) => c.id);
  const myDocs = documents.filter((d) => myClientIds.includes(d.clientId));

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-8 font-display text-3xl text-ink">Documents</h1>
      <Card className="p-6 md:p-8">
        <p className="mb-4 font-display text-lg text-ink">Deal Documents</p>
        {myDocs.length === 0 ? (
          <EmptyState title="No documents yet" description="Documents uploaded for your clients will show up here." className="py-8" />
        ) : (
          <DocumentsSection documents={myDocs} />
        )}
      </Card>
    </div>
  );
}
