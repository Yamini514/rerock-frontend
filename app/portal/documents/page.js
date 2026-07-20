import { Card } from "@/components/ui/Card";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { documents } from "@/lib/data/portfolio";

export const metadata = { title: "Documents" };

// Single demo persona (Kiran Kumar Reddy, lib/data/clients.js's "c1") backs the whole Client
// Portal — see lib/data/profile.js's currentUser, which has no matching `id` field of its own.
const CURRENT_CLIENT_ID = "c1";

export default function DocumentsPage() {
  const myDocs = documents.filter((d) => d.clientId === CURRENT_CLIENT_ID);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-8 font-display text-3xl text-ink">Documents</h1>
      <Card className="p-6 md:p-8">
        <p className="mb-4 font-display text-lg text-ink">Your Documents</p>
        <DocumentsSection documents={myDocs} />
      </Card>
    </div>
  );
}
