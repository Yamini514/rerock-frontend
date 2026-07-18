import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-xl", className)} />;
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn("overflow-hidden rounded-card border border-border bg-surface", className)}>
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow({ cols = 5 }) {
  return (
    <div className="flex items-center gap-4 border-b border-border px-4 py-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 6, className }) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
