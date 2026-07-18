import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { FAQClient } from "./FAQClient";

export const metadata = {
  title: "FAQ",
  description: "Answers to common questions about buying, financing, and investing with REROCK Realty.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
      <Badge tone="primary" icon={HelpCircle}>Help Center</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Frequently Asked Questions</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">Everything you need to know before investing with REROCK.</p>

      <div className="mt-12">
        <FAQClient />
      </div>
    </div>
  );
}
