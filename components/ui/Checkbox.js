"use client";

import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({ checked, indeterminate, onChange, label, className, ...props }) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2.5 select-none", className)}>
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer absolute h-5 w-5 cursor-pointer opacity-0"
          {...props}
        />
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-md border-2 border-border-strong transition-colors duration-150",
            (checked || indeterminate) && "border-primary bg-primary"
          )}
        >
          {indeterminate ? (
            <Minus className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          ) : checked ? (
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          ) : null}
        </span>
      </span>
      {label && <span className="text-sm text-ink">{label}</span>}
    </label>
  );
}

export function Radio({ checked, onChange, label, className, ...props }) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2.5 select-none", className)}>
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="peer absolute h-5 w-5 cursor-pointer opacity-0"
          {...props}
        />
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-2 border-border-strong transition-colors duration-150",
            checked && "border-primary"
          )}
        >
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
        </span>
      </span>
      {label && <span className="text-sm text-ink">{label}</span>}
    </label>
  );
}

export function Switch({ checked, onChange, label, className }) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2.5 select-none", className)}>
      <span
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-pill transition-colors duration-200",
          checked ? "bg-primary" : "bg-border-strong"
        )}
      >
        <span
          className={cn(
            "inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-md transition-transform duration-200",
            checked ? "translate-x-5.5" : "translate-x-1"
          )}
        />
      </span>
      {label && <span className="text-sm text-ink">{label}</span>}
    </label>
  );
}
