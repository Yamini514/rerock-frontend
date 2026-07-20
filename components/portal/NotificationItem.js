"use client";

import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const typeTone = {
  price: "success",
  visit: "info",
  recommendation: "primary",
  portfolio: "success",
  document: "neutral",
  lead: "primary",
  followup: "warning",
  commission: "success",
  meeting: "info",
  referral: "primary",
};

const typeLabel = {
  price: "Price Update",
  visit: "Site Visit",
  recommendation: "Recommendation",
  portfolio: "Portfolio",
  document: "Document",
  lead: "Lead",
  followup: "Follow-up",
  commission: "Commission",
  meeting: "Meeting",
  referral: "Referral",
};

export function NotificationItem({ notification, onToggleRead }) {
  const { type, icon, title, message, time, read } = notification;

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl border p-5 transition-colors",
        read ? "border-border bg-surface" : "border-primary/30 bg-primary-softer"
      )}
    >
      <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", read ? "bg-surface-soft text-ink-muted" : "bg-primary-soft text-primary")}>
        <DynamicIcon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-ink">{title}</p>
          {!read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
        </div>
        <p className="mt-1 text-sm text-ink-muted">{message}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Badge tone={typeTone[type] || "neutral"}>{typeLabel[type] || type}</Badge>
          <span className="text-xs text-ink-faint">{time}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onToggleRead(notification.id)}
        className="shrink-0 text-xs font-semibold text-primary hover:underline"
      >
        {read ? "Mark unread" : "Mark read"}
      </button>
    </div>
  );
}
