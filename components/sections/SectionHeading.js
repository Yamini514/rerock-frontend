import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, href, linkLabel = "View all", align = "left", className }) {
  return (
    <div className={cn("mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between", className)}>
      <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && <Badge tone="primary">{eyebrow}</Badge>}
        <h2 className="mt-4 font-display text-3xl text-ink md:text-5xl">{title}</h2>
        {description && <p className="mt-3 text-ink-muted md:text-lg">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary md:mb-1">
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
