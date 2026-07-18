import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const config = {
  success: { icon: CheckCircle2, cls: "bg-success-soft text-success border-success/20" },
  warning: { icon: AlertTriangle, cls: "bg-warning-soft text-warning border-warning/20" },
  danger: { icon: XCircle, cls: "bg-danger-soft text-danger border-danger/20" },
  info: { icon: Info, cls: "bg-info-soft text-info border-info/20" },
};

export function Alert({ tone = "info", title, children, className }) {
  const { icon: Icon, cls } = config[tone];
  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4", cls, className)}>
      <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
      <div className="text-sm">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn("text-current/90", title && "mt-0.5")}>{children}</div>}
      </div>
    </div>
  );
}
