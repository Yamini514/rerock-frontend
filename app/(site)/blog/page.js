import { Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BlogListClient } from "./BlogListClient";

export const metadata = {
  title: "Blog & Insights",
  description: "Market intelligence, buyer guides, and investment strategy from the REROCK Journal.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary" icon={Newspaper}>The REROCK Journal</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Insights & Market Intelligence</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Data-backed articles on pricing trends, investment strategy, and buyer guidance from our advisory team.
      </p>

      <div className="mt-12">
        <BlogListClient />
      </div>
    </div>
  );
}
