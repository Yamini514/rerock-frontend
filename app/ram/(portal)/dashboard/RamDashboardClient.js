"use client";

import Link from "next/link";
import {
  CalendarClock,
  Gift,
  ListChecks,
  PieChart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/StateScreen";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { clients } from "@/lib/data/clients";
import { communities } from "@/lib/data/communities";
import { meetingsForRam } from "@/lib/data/meetings";
import { recommendationsForRam } from "@/lib/data/recommendations";
import { referralsForRam } from "@/lib/data/referrals";
import { tasksForRam } from "@/lib/data/ramTasks";
import { portfolioGrowth } from "@/lib/data/portfolio";
import { formatINR } from "@/lib/utils";

const TODAY = "2026-07-18";

export function RamDashboardClient() {
  const { user } = useRamAuth();
  const ramId = user?.id;

  const myClients = clients.filter((c) => c.assignedRamId === ramId);
  const portfolioValue = myClients.reduce((sum, c) => sum + c.portfolioValue, 0);
  const myMeetings = meetingsForRam(ramId);
  const myRecommendations = recommendationsForRam(ramId);
  const myReferrals = referralsForRam(ramId);
  const myTasks = tasksForRam(ramId);
  const opportunities = communities.filter((c) => c.investmentScore >= 85);

  const upcomingMeetings = myMeetings.filter((m) => m.status === "Scheduled");
  const activeReferrals = myReferrals.filter((r) => r.status !== "Purchase Completed");
  const pendingRecommendations = myRecommendations.filter((r) => ["Sent", "Viewed"].includes(r.status));
  const tasksDueToday = myTasks.filter((t) => !t.done && t.dueDate === TODAY);

  const recentActivities = [
    ...myReferrals.map((r) => ({ date: r.date, text: `${r.referrer} referred ${r.referred} — ${r.status}` })),
    ...myRecommendations.map((r) => ({ date: r.date, text: `Recommended ${r.title} to ${r.clientName} — ${r.status}` })),
    ...myMeetings.filter((m) => m.status === "Completed").map((m) => ({ date: m.date, text: `Meeting completed with ${m.clientName}` })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-ink-muted">Welcome back,</p>
          <h1 className="font-display text-3xl text-ink md:text-4xl">{user?.name || "Advisor"}</h1>
        </div>
        <Button as={Link} href="/ram/clients" variant="outline">View My Clients</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Clients" value={myClients.length} changePct={0} icon={Users} />
        <StatCard label="Portfolio Value" value={formatINR(portfolioValue)} changePct={9.6} icon={PieChart} />
        <StatCard label="Active Referrals" value={activeReferrals.length} changePct={0} icon={Gift} />
        <StatCard label="Upcoming Meetings" value={upcomingMeetings.length} changePct={0} icon={CalendarClock} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Investment Opportunities" value={opportunities.length} changePct={0} icon={TrendingUp} />
        <StatCard label="Pending Recommendations" value={pendingRecommendations.length} changePct={0} icon={Sparkles} />
        <StatCard label="Tasks Due Today" value={tasksDueToday.length} changePct={0} icon={ListChecks} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <p className="mb-4 font-display text-lg text-ink">Client Portfolio Growth</p>
          <GrowthChart data={portfolioGrowth} />
        </Card>
        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <CalendarClock className="h-5 w-5 text-primary" /> Upcoming Meetings
          </p>
          {upcomingMeetings.length === 0 ? (
            <EmptyState title="No meetings scheduled" className="py-8" />
          ) : (
            <div className="space-y-3">
              {upcomingMeetings.map((m) => (
                <div key={m.id} className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-ink">{m.clientName}</p>
                  <p className="mt-1 text-xs text-ink-muted">{m.date} · {m.time} · {m.type}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Recent Activities</p>
          {recentActivities.length === 0 ? (
            <EmptyState title="No recent activity" className="py-8" />
          ) : (
            <div className="space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
                  <p className="text-sm text-ink">{a.text}</p>
                  <span className="shrink-0 text-xs text-ink-faint">{a.date}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <ListChecks className="h-5 w-5 text-primary" /> Tasks Due Today
          </p>
          {tasksDueToday.length === 0 ? (
            <EmptyState title="Nothing due today" className="py-8" />
          ) : (
            <div className="space-y-3">
              {tasksDueToday.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-ink">{t.title}</p>
                  {t.relatedClient && <Badge tone="info">{t.relatedClient}</Badge>}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
