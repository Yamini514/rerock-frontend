"use client";

import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = forwardRef(function Select(
  { className, label, hint, error, children, ...props },
  ref
) {
  return (
    <label className="block w-full">
      {label && <span className="mb-2 block text-sm font-medium text-ink">{label}</span>}
      <span className="relative flex items-center">
        <select
          ref={ref}
          className={cn(
            "h-12 w-full appearance-none rounded-input border border-border-strong bg-surface px-4 pr-10 text-sm text-ink outline-none transition-all duration-200",
            "focus:border-primary focus:ring-4 focus:ring-primary/10",
            error && "border-danger",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-ink-faint" strokeWidth={2} />
      </span>
      {hint && !error && <span className="mt-1.5 block text-xs text-ink-muted">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs text-danger">{error}</span>}
    </label>
  );
});
