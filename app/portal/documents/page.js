import { Card } from "@/components/ui/Card";
import { DocumentsSection } from "@/components/properties/detail/DocumentsSection";
import { documents } from "@/lib/data/portfolio";

export const metadata = { title: "Documents" };

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-8 font-display text-3xl text-ink">Documents</h1>
      <Card className="p-6 md:p-8">
        <p className="mb-4 font-display text-lg text-ink">Your Documents</p>
        <DocumentsSection documents={documents} />
      </Card>
    </div>
  );
}
