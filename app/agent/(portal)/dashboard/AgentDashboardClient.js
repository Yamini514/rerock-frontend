"use client";

import Link from "next/link";
import {
  Banknote,
  CalendarClock,
  Gauge,
  IndianRupee,
  ListChecks,
  Percent,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/StateScreen";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { LeadFunnelChart } from "@/components/charts/LeadFunnelChart";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { clients } from "@/lib/data/clients";
import { leadsForAgent, leadFunnelForAgent } from "@/lib/data/leads";
import { siteVisitsForAgent } from "@/lib/data/siteVisits";
import { followUpsForAgent } from "@/lib/data/followUps";
import { commissionForAgent } from "@/lib/data/commission";
import { performanceForAgent } from "@/lib/data/performance";
import { formatINR } from "@/lib/utils";

const TODAY = "2026-07-18";

export function AgentDashboardClient() {
  const { user } = useAgentAuth();
  const agentSlug = user?.slug;

  const myLeads = leadsForAgent(agentSlug);
  const myVisits = siteVisitsForAgent(agentSlug);
  const myFollowUps = followUpsForAgent(agentSlug);
  const myClients = clients.filter((c) => c.assignedAgentSlug === agentSlug);
  const commission = commissionForAgent(agentSlug);
  const performance = performanceForAgent(agentSlug);

  const todaysVisits = myVisits.filter((v) => v.date === TODAY && v.status !== "Cancelled");
  const pendingFollowUps = myFollowUps.filter((f) => !f.done);
  const activeLeads = myLeads.filter((l) => !["Won", "Lost"].includes(l.status));
  const wonLeads = myLeads.filter((l) => l.status === "Won");
  const conversionRate = myLeads.length ? Math.round((wonLeads.length / myLeads.length) * 100) : 0;
  const assignedCommunities = [...new Set(myLeads.map((l) => l.communitySlug))];
  const assignedProperties = [...new Set(myLeads.map((l) => l.interestedPropertySlug))];
  const upcomingMeetings = myFollowUps.filter((f) => f.type === "Meeting" && !f.done);
  const performanceScore = Math.round((user?.rating || 4.5) * 20);

  const recentActivities = [...myLeads]
    .flatMap((l) => l.timeline.map((t) => ({ ...t, clientName: l.clientName })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-ink-muted">Welcome back,</p>
          <h1 className="font-display text-3xl text-ink md:text-4xl">{user?.name || "Agent"}</h1>
        </div>
        <Button as={Link} href="/agent/leads" variant="outline">View My Leads</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Site Visits" value={todaysVisits.length} changePct={0} icon={CalendarClock} sub="Scheduled today" />
        <StatCard label="Pending Follow-ups" value={pendingFollowUps.length} changePct={0} icon={ListChecks} />
        <StatCard label="Active Leads" value={activeLeads.length} changePct={0} icon={Users} />
        <StatCard label="Assigned Clients" value={myClients.length} changePct={0} icon={Users} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Communities" value={assignedCommunities.length} changePct={0} icon={TrendingUp} />
        <StatCard label="Assigned Properties" value={assignedProperties.length} changePct={0} icon={TrendingUp} />
        <StatCard label="Commission Earned" value={formatINR(commission.current)} changePct={8.2} icon={IndianRupee} sub={`${formatINR(commission.pending)} pending`} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} changePct={0} icon={Percent} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-lg text-ink">Monthly Sales</p>
            <Badge tone="success" icon={TrendingUp}>Rank #{performance?.monthlyRanking} this month</Badge>
          </div>
          <GrowthChart data={performance?.trend || []} dataKey="revenue" />
        </Card>
        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <Gauge className="h-5 w-5 text-primary" /> Performance Score
          </p>
          <div className="flex items-center justify-center py-2">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary-soft">
              <span className="font-tabular text-4xl font-semibold text-primary">{performanceScore}</span>
              <span className="absolute bottom-6 text-xs text-ink-faint">/ 100</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-4 text-center text-xs">
            <div>
              <p className="font-tabular font-semibold text-ink">{performance?.salesClosed}</p>
              <p className="text-ink-faint">Sales Closed</p>
            </div>
            <div>
              <p className="font-tabular font-semibold text-ink">{performance?.siteVisits}</p>
              <p className="text-ink-faint">Site Visits</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Lead Funnel</p>
          <LeadFunnelChart data={leadFunnelForAgent(agentSlug)} />
        </Card>

        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <CalendarClock className="h-5 w-5 text-primary" /> Today&rsquo;s Site Visits
          </p>
          {todaysVisits.length === 0 ? (
            <EmptyState title="No visits today" description="Enjoy the breather, or line up your next follow-up." className="py-10" />
          ) : (
            <div className="space-y-3">
              {todaysVisits.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{v.clientName}</p>
                    <p className="mt-1 text-xs text-ink-muted">{v.time}</p>
                  </div>
                  <Badge tone="info">{v.status}</Badge>
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
            <EmptyState title="No recent activity" className="py-10" />
          ) : (
            <div className="space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-ink">{a.event} — {a.clientName}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{a.note}</p>
                  </div>
                  <span className="shrink-0 text-xs text-ink-faint">{a.date}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
            <Banknote className="h-5 w-5 text-primary" /> Upcoming Meetings
          </p>
          {upcomingMeetings.length === 0 ? (
            <EmptyState title="No meetings scheduled" className="py-10" />
          ) : (
            <div className="space-y-3">
              {upcomingMeetings.map((m) => (
                <div key={m.id} className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-ink">{m.clientName}</p>
                  <p className="mt-1 text-xs text-ink-muted">{m.note}</p>
                  <p className="mt-1 text-xs text-ink-faint">Due {m.dueDate}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
