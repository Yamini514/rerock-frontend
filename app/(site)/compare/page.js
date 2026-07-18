import { Suspense } from "react";
import { Scale } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CompareClient } from "./CompareClient";

export const metadata = {
  title: "Compare Properties",
  description: "Compare up to four properties side by side across price, area, builder, and RERA status.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
      <Badge tone="primary" icon={Scale}>Compare</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Compare Properties</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Add up to four properties and compare price, area, builder, and compliance side by side.
      </p>

      <div className="mt-12">
        <Suspense fallback={null}>
          <CompareClient />
        </Suspense>
      </div>
    </div>
  );
}
