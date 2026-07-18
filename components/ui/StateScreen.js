"use client";

import { motion } from "framer-motion";
import { AlertOctagon, Inbox, Lock, SearchX, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function Base({ icon: Icon, iconTone = "primary", title, description, action, secondaryAction, className }) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    danger: "bg-danger-soft text-danger",
    success: "bg-success-soft text-success",
    neutral: "bg-surface-soft text-ink-muted",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex flex-col items-center justify-center px-6 py-20 text-center", className)}
    >
      <span className={cn("mb-6 flex h-20 w-20 items-center justify-center rounded-full", tones[iconTone])}>
        <Icon className="h-9 w-9" strokeWidth={1.75} />
      </span>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-ink-muted">{description}</p>}
      {(action || secondaryAction) && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </motion.div>
  );
}

export function EmptyState({ title = "Nothing here yet", description, action, className, icon = Inbox }) {
  return <Base icon={icon} iconTone="neutral" title={title} description={description} action={action} className={className} />;
}

export function NoResultsState({ title = "No matches found", description = "Try adjusting your filters or search terms.", action, className }) {
  return <Base icon={SearchX} iconTone="neutral" title={title} description={description} action={action} className={className} />;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this right now. Please try again.",
  onRetry,
  className,
}) {
  return (
    <Base
      icon={AlertOctagon}
      iconTone="danger"
      title={title}
      description={description}
      action={
        onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Try again
          </Button>
        )
      }
      className={className}
    />
  );
}

export function SuccessState({ title = "All set", description, action, className }) {
  return <Base icon={CheckCircle2} iconTone="success" title={title} description={description} action={action} className={className} />;
}

export function PermissionState({
  title = "Restricted access",
  description = "You don't have permission to view this. Contact your advisor or admin for access.",
  action,
  className,
}) {
  return <Base icon={Lock} iconTone="neutral" title={title} description={description} action={action} className={className} />;
}
