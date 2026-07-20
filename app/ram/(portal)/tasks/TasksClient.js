"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { EmptyState } from "@/components/ui/StateScreen";
import { useToast } from "@/components/ui/Toast";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { tasksForRam } from "@/lib/data/ramTasks";

export function TasksClient() {
  const { user } = useRamAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState(() => tasksForRam(user?.id));

  function toggleDone(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    toast({ tone: "success", title: "Task updated" });
  }

  const sorted = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const pending = sorted.filter((t) => !t.done);
  const completed = sorted.filter((t) => t.done);

  function Row({ t }) {
    return (
      <Card className="flex items-start gap-4 p-5">
        <Checkbox checked={t.done} onChange={() => toggleDone(t.id)} className="mt-1" />
        <div className="min-w-0 flex-1">
          <p className={t.done ? "font-medium text-ink-faint line-through" : "font-medium text-ink"}>{t.title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {t.relatedClient && <Badge tone="info">{t.relatedClient}</Badge>}
            <span className="text-xs text-ink-faint">Due {t.dueDate}</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Tasks</h1>
      <p className="mb-6 text-sm text-ink-muted">{pending.length} pending, {completed.length} completed</p>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Pending</h2>
        {pending.length === 0 ? (
          <EmptyState title="All caught up" className="py-8" />
        ) : (
          <div className="space-y-3">{pending.map((t) => <Row key={t.id} t={t} />)}</div>
        )}
      </section>

      {completed.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Completed</h2>
          <div className="space-y-3">{completed.map((t) => <Row key={t.id} t={t} />)}</div>
        </section>
      )}
    </div>
  );
}
