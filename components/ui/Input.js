"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(function Input(
  { className, icon: Icon, label, hint, error, ...props },
  ref
) {
  return (
    <label className="block w-full">
      {label && (
        <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      )}
      <span className="relative flex items-center">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 h-4.5 w-4.5 text-ink-faint" strokeWidth={2} />
        )}
        <input
          ref={ref}
          className={cn(
            "h-12 w-full rounded-input border border-border-strong bg-surface px-4 text-sm text-ink placeholder:text-ink-faint outline-none transition-all duration-200",
            "focus:border-primary focus:ring-4 focus:ring-primary/10",
            Icon && "pl-11",
            error && "border-danger focus:border-danger focus:ring-danger/10",
            className
          )}
          {...props}
        />
      </span>
      {hint && !error && <span className="mt-1.5 block text-xs text-ink-muted">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs text-danger">{error}</span>}
    </label>
  );
});

export const Textarea = forwardRef(function Textarea({ className, label, hint, error, ...props }, ref) {
  return (
    <label className="block w-full">
      {label && <span className="mb-2 block text-sm font-medium text-ink">{label}</span>}
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-input border border-border-strong bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-all duration-200",
          "focus:border-primary focus:ring-4 focus:ring-primary/10",
          error && "border-danger focus:border-danger focus:ring-danger/10",
          className
        )}
        {...props}
      />
      {hint && !error && <span className="mt-1.5 block text-xs text-ink-muted">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs text-danger">{error}</span>}
    </label>
  );
});
