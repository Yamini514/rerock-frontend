import { Card } from "@/components/ui/Card";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { documents } from "@/lib/data/portfolio";

export const metadata = { title: "Documents" };

export default function DocumentsPage() {
  return (
    <Card className="p-6 md:p-8">
      <p className="mb-4 font-display text-lg text-ink">Your Documents</p>
      <DocumentsSection documents={documents} />
    </Card>
  );
}
