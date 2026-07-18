import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-soft text-ink-muted",
  dark: "bg-[#1c1c1e] text-white",
};

export function Badge({ tone = "neutral", className, children, icon: Icon, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />}
      {children}
    </span>
  );
}

export const statusTone = {
  Available: "success",
  Reserved: "warning",
  Sold: "dark",
  "Under Construction": "info",
  "Ready To Move": "success",
  "RERA Approved": "primary",
};
