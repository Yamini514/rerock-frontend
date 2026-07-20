"use client";

import { useMemo, useState } from "react";
import { CalendarClock, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/StateScreen";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { siteVisitsForAgent } from "@/lib/data/siteVisits";
import { followUpsForAgent } from "@/lib/data/followUps";
import { cn } from "@/lib/utils";

const MONTH_YEAR = { year: 2026, month: 6 }; // July 2026 (0-indexed month) — the mock data's active window
const TODAY = "2026-07-18";

function pad(n) {
  return String(n).padStart(2, "0");
}

export function CalendarClient() {
  const { user } = useAgentAuth();
  const visits = siteVisitsForAgent(user?.slug);
  const followUps = followUpsForAgent(user?.slug);
  const [selectedDate, setSelectedDate] = useState(TODAY);

  const eventsByDate = useMemo(() => {
    const map = {};
    visits.forEach((v) => {
      if (v.status === "Cancelled") return;
      (map[v.date] ||= { visits: [], followUps: [] }).visits.push(v);
    });
    followUps.forEach((f) => {
      if (f.done) return;
      (map[f.dueDate] ||= { visits: [], followUps: [] }).followUps.push(f);
    });
    return map;
  }, [visits, followUps]);

  const firstOfMonth = new Date(MONTH_YEAR.year, MONTH_YEAR.month, 1);
  const daysInMonth = new Date(MONTH_YEAR.year, MONTH_YEAR.month + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay();
  const cells = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const selected = eventsByDate[selectedDate];

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Calendar</h1>
      <p className="mb-6 text-sm text-ink-muted">Site visits and follow-ups, unified</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="p-5">
          <p className="mb-4 font-display text-lg text-ink">July 2026</p>
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold uppercase tracking-wide text-ink-faint">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dateStr = `2026-07-${pad(day)}`;
              const dayEvents = eventsByDate[dateStr];
              const isToday = dateStr === TODAY;
              const isSelected = dateStr === selectedDate;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-sm transition-colors",
                    isSelected ? "bg-primary text-white" : isToday ? "bg-primary-soft text-primary font-semibold" : "text-ink hover:bg-surface-soft"
                  )}
                >
                  {day}
                  {dayEvents && (
                    <span className="flex gap-0.5">
                      {dayEvents.visits.length > 0 && <span className={cn("h-1.5 w-1.5 rounded-full", isSelected ? "bg-white" : "bg-primary")} />}
                      {dayEvents.followUps.length > 0 && <span className={cn("h-1.5 w-1.5 rounded-full", isSelected ? "bg-white" : "bg-warning")} />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <p className="mb-4 font-display text-lg text-ink">{selectedDate}</p>
          {!selected || (selected.visits.length === 0 && selected.followUps.length === 0) ? (
            <EmptyState title="Nothing scheduled" description="No visits or follow-ups on this day." className="py-8" />
          ) : (
            <div className="space-y-3">
              {selected.visits.map((v) => (
                <div key={v.id} className="flex items-start gap-3 rounded-2xl border border-border p-3">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-ink">{v.clientName}</p>
                    <p className="text-xs text-ink-muted">{v.time} · Site Visit</p>
                  </div>
                  <Badge tone="info" className="ml-auto">{v.status}</Badge>
                </div>
              ))}
              {selected.followUps.map((f) => (
                <div key={f.id} className="flex items-start gap-3 rounded-2xl border border-border p-3">
                  <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-ink">{f.clientName}</p>
                    <p className="text-xs text-ink-muted">{f.type} follow-up</p>
                  </div>
                  <Badge tone="warning" className="ml-auto">{f.priority}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
