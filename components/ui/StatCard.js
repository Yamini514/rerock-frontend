import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, changePct, icon: Icon, className, sub }) {
  const positive = changePct >= 0;
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-muted">{label}</p>
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
        )}
      </div>
      <p className="mt-3 font-tabular text-3xl font-semibold tracking-tight text-ink">{value}</p>
      <div className="mt-3 flex items-center gap-2">
        {typeof changePct === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-pill px-2 py-0.5 text-xs font-semibold",
              positive ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
            )}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(changePct)}%
          </span>
        )}
        {sub && <span className="text-xs text-ink-faint">{sub}</span>}
      </div>
    </Card>
  );
}
