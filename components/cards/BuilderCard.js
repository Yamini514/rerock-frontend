import Link from "next/link";
import { Building2, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function BuilderCard({ builder, className }) {
  return (
    <Card hover className={className}>
      <Link href={`/builders/${builder.slug}`} className="block p-7">
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Building2 className="h-6 w-6" />
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-ink">
            <Star className="h-4 w-4 fill-primary text-primary" /> {builder.rating}
          </span>
        </div>
        <p className="mt-5 font-display text-xl text-ink">{builder.name}</p>
        <p className="mt-1.5 text-sm text-ink-muted">{builder.headline}</p>
        <div className="mt-5 flex items-center gap-6 border-t border-border pt-4 text-xs text-ink-faint">
          <span>Est. {builder.established}</span>
          <span>{builder.projectsCount}+ Projects</span>
        </div>
      </Link>
    </Card>
  );
}
