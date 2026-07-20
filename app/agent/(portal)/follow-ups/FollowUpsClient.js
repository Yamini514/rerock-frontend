"use client";

import { useState } from "react";
import { Mail, MessageCircle, Phone, Users as MeetingIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { EmptyState } from "@/components/ui/StateScreen";
import { useToast } from "@/components/ui/Toast";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { followUpsForAgent } from "@/lib/data/followUps";

const typeIcon = { Call: Phone, WhatsApp: MessageCircle, Email: Mail, Meeting: MeetingIcon };
const priorityTone = { High: "danger", Medium: "warning", Low: "info" };

export function FollowUpsClient() {
  const { user } = useAgentAuth();
  const { toast } = useToast();
  const [items, setItems] = useState(() => followUpsForAgent(user?.slug));

  function toggleDone(id) {
    setItems((prev) => prev.map((f) => (f.id === id ? { ...f, done: !f.done } : f)));
    toast({ tone: "success", title: "Follow-up updated" });
  }

  const sorted = [...items].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const pending = sorted.filter((f) => !f.done);
  const completed = sorted.filter((f) => f.done);

  function Row({ f }) {
    const Icon = typeIcon[f.type] || Phone;
    return (
      <Card className="flex items-start gap-4 p-5">
        <Checkbox checked={f.done} onChange={() => toggleDone(f.id)} className="mt-1" />
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className={f.done ? "font-medium text-ink-faint line-through" : "font-medium text-ink"}>{f.clientName}</p>
            <Badge tone={priorityTone[f.priority]}>{f.priority}</Badge>
            <Badge tone="neutral">{f.type}</Badge>
          </div>
          <p className="mt-1 text-sm text-ink-muted">{f.note}</p>
          <p className="mt-1 text-xs text-ink-faint">Due {f.dueDate}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Follow-ups</h1>
      <p className="mb-6 text-sm text-ink-muted">{pending.length} pending, {completed.length} completed</p>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Pending</h2>
        {pending.length === 0 ? (
          <EmptyState title="All caught up" description="No pending follow-ups right now." className="py-8" />
        ) : (
          <div className="space-y-3">
            {pending.map((f) => <Row key={f.id} f={f} />)}
          </div>
        )}
      </section>

      {completed.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Completed</h2>
          <div className="space-y-3">
            {completed.map((f) => <Row key={f.id} f={f} />)}
          </div>
        </section>
      )}
    </div>
  );
}
