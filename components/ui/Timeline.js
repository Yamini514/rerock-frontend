import { cn } from "@/lib/utils";

export function Timeline({ items }) {
  return (
    <ol className="relative">
      {items.map((item, i) => (
        <li key={i} className="relative flex gap-4 pb-8 last:pb-0">
          {i !== items.length - 1 && (
            <span className="absolute left-[0.6875rem] top-6 h-[calc(100%-1.25rem)] w-px bg-border" />
          )}
          <span
            className={cn(
              "relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
              item.done ? "border-primary bg-primary" : "border-border-strong bg-surface"
            )}
          >
            {item.done && <span className="h-2 w-2 rounded-full bg-white" />}
          </span>
          <div className="pb-1">
            <p className="text-sm font-semibold text-ink">{item.title}</p>
            {item.time && <p className="mt-0.5 text-xs text-ink-faint">{item.time}</p>}
            {item.description && <p className="mt-1.5 text-sm text-ink-muted">{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
