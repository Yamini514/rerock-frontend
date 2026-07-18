"use client";

import { useState } from "react";
import {
  Bell,
  CalendarClock,
  CheckSquare,
  IndianRupee,
  KeyRound,
  ListChecks,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Table } from "@/components/ui/Table";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { LeadFunnelChart } from "@/components/charts/LeadFunnelChart";
import { formatINR, formatINRFull, cn } from "@/lib/utils";
import {
  revenueSummary,
  revenueTrend,
  leadFunnel,
  propertyStatusBoard,
  pricingUpdates,
  followUps,
  recentActivities,
  adminTasks,
  leadsTable,
} from "@/lib/data/admin";
import { notifications } from "@/lib/data/notifications";

const iconMap = { IndianRupee, Users, CalendarClock, KeyRound };
const statusColorMap = { success: "bg-success", warning: "bg-warning", primary: "bg-primary", info: "bg-info" };
const priorityTone = { High: "danger", Medium: "warning", Low: "info" };

const leadColumns = [
  { key: "id", label: "Lead ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "source", label: "Source", sortable: true },
  {
    key: "stage",
    label: "Stage",
    sortable: true,
    render: (r) => (
      <Badge tone={r.stage === "Closed Won" ? "success" : r.stage === "Negotiation" ? "warning" : "info"}>{r.stage}</Badge>
    ),
  },
  { key: "agent", label: "Agent", sortable: true },
  { key: "value", label: "Deal Value", sortable: true, render: (r) => formatINRFull(r.value) },
  { key: "date", label: "Date", sortable: true },
];

export function AdminClient() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(adminTasks);

  function toggleTask(id) {
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ink md:text-4xl">Admin Overview</h1>
        <p className="mt-1 text-ink-muted">Real-time performance across sales, leads, and inventory.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {revenueSummary.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.isCount ? s.value.toLocaleString("en-IN") : formatINR(s.value)}
            changePct={s.changePct}
            icon={iconMap[s.icon]}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-lg text-ink">Revenue Trend</p>
            <Badge tone="success" icon={TrendingUp}>+12.4% MoM</Badge>
          </div>
          <RevenueChart data={revenueTrend} />
        </Card>
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Property Status</p>
          <div className="space-y-4">
            {propertyStatusBoard.map((s) => {
              const total = propertyStatusBoard.reduce((sum, x) => sum + x.count, 0);
              const pct = Math.round((s.count / total) * 100);
              return (
                <div key={s.status}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-ink-muted">{s.status}</span>
                    <span className="font-tabular font-semibold text-ink">{s.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-soft">
                    <div className={cn("h-full rounded-pill", statusColorMap[s.color])} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Lead Funnel</p>
          <LeadFunnelChart data={leadFunnel} />
        </Card>
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Recent Pricing Updates</p>
          <div className="space-y-3">
            {pricingUpdates.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-ink">{p.community}</p>
                  <p className="text-xs text-ink-faint">by {p.updatedBy} · {p.date}</p>
                </div>
                <span className="font-tabular text-sm font-semibold text-success">{p.change}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="mb-6 font-display text-2xl text-ink">Leads</h2>
        <Table
          columns={leadColumns}
          data={leadsTable}
          searchPlaceholder="Search leads..."
          exportFilename="rerock-leads.csv"
          bulkActions={[
            { label: "Mark Contacted", icon: CheckSquare, onClick: () => toast({ tone: "success", title: "Leads updated", description: "Marked as contacted." }) },
          ]}
        />
      </section>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <CalendarClock className="h-5 w-5 text-primary" /> Follow Ups
          </p>
          <div className="space-y-3">
            {followUps.map((f) => (
              <div key={f.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink">{f.client}</p>
                  <Badge tone={priorityTone[f.priority]}>{f.priority}</Badge>
                </div>
                <p className="mt-1 text-xs text-ink-muted">{f.property}</p>
                <p className="mt-1 text-xs text-ink-faint">Due {f.dueDate}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <ListChecks className="h-5 w-5 text-primary" /> Recent Activity
          </p>
          <div className="space-y-4">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm text-ink">{a.text}</p>
                  <p className="text-xs text-ink-faint">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Tasks</p>
          <div className="space-y-3">
            {tasks.map((t) => (
              <label key={t.id} className="flex cursor-pointer items-start gap-3">
                <Checkbox checked={t.done} onChange={() => toggleTask(t.id)} />
                <span className={cn("text-sm", t.done ? "text-ink-faint line-through" : "text-ink")}>{t.title}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="mb-6 flex items-center gap-2 font-display text-2xl text-ink">
          <Bell className="h-5 w-5 text-primary" /> Notifications
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {notifications.map((n) => (
            <div key={n.id} className={cn("flex items-start gap-3 rounded-2xl border p-4", n.read ? "border-border" : "border-primary/30 bg-primary-softer")}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Bell className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{n.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{n.message}</p>
                <p className="mt-1 text-xs text-ink-faint">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
