"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Timeline } from "@/components/ui/Timeline";
import { useToast } from "@/components/ui/Toast";
import { getLead, LEAD_STATUSES } from "@/lib/data/leads";
import { getProperty } from "@/lib/data/properties";
import { getCommunity } from "@/lib/data/communities";
import { getLocation } from "@/lib/data/locations";
import { ramTeam } from "@/lib/data/staff";
import { formatINR } from "@/lib/utils";

const statusTone = {
  New: "neutral",
  Contacted: "primary",
  Qualified: "info",
  "Site Visit Scheduled": "info",
  Negotiation: "warning",
  Won: "success",
  Lost: "danger",
};

export function LeadDetailClient({ id }) {
  const lead = getLead(id);
  const { toast } = useToast();
  const [status, setStatus] = useState(lead?.status);
  const [note, setNote] = useState("");
  const [timeline, setTimeline] = useState(lead?.timeline || []);

  if (!lead) {
    return (
      <div className="mx-auto max-w-[70rem] px-6 py-14 text-center md:px-10">
        <p className="text-ink-muted">Lead not found.</p>
        <Link href="/agent/leads" className="mt-4 inline-block text-sm font-semibold text-primary">← Back to Leads</Link>
      </div>
    );
  }

  const property = getProperty(lead.interestedPropertySlug);
  const community = getCommunity(lead.communitySlug);
  const location = getLocation(lead.preferredLocation);
  const ram = ramTeam.find((r) => r.id === lead.ramId);

  function updateStatus(next) {
    setStatus(next);
    setTimeline((t) => [...t, { date: "2026-07-18", event: `Status updated to ${next}`, note: "Updated by agent." }]);
    toast({ tone: "success", title: "Status updated", description: `Lead moved to ${next}.` });
  }

  function addNote(e) {
    e.preventDefault();
    if (!note.trim()) return;
    setTimeline((t) => [...t, { date: "2026-07-18", event: "Follow-up note added", note }]);
    toast({ tone: "success", title: "Note added" });
    setNote("");
  }

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <Link href="/agent/leads" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to Leads
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image src={lead.avatar} alt={lead.clientName} fill sizes="64px" className="object-cover" />
          </span>
          <div>
            <h1 className="font-display text-2xl text-ink md:text-3xl">{lead.clientName}</h1>
            <p className="text-sm text-ink-muted">{lead.id} · {lead.source}</p>
          </div>
        </div>
        <Badge tone={statusTone[status] || "neutral"} className="w-fit text-sm">{status}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <p className="font-display text-lg text-ink">Client Details</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <p className="flex items-center gap-2 text-sm text-ink-muted"><Phone className="h-4 w-4 text-primary" /> {lead.clientPhone}</p>
              <p className="flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4 text-primary" /> {lead.clientEmail}</p>
              <p className="flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4 text-primary" /> Prefers {location?.name || lead.preferredLocation}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button as="a" href={`tel:${lead.clientPhone}`} size="sm"><Phone className="h-4 w-4" /> Call</Button>
              <Button as="a" href={`mailto:${lead.clientEmail}`} variant="outline" size="sm"><Mail className="h-4 w-4" /> Email</Button>
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-display text-lg text-ink">Interested In</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-ink-faint">Property</p>
                <Link href={`/properties/${property?.slug}`} className="text-sm font-medium text-primary hover:underline">{property?.title || "—"}</Link>
              </div>
              <div>
                <p className="text-xs text-ink-faint">Community</p>
                <Link href={`/communities/${community?.slug}`} className="text-sm font-medium text-primary hover:underline">{community?.name || "—"}</Link>
              </div>
              <div>
                <p className="text-xs text-ink-faint">Budget</p>
                <p className="font-tabular text-sm font-semibold text-ink">{formatINR(lead.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-faint">Preferred Location</p>
                <p className="text-sm text-ink">{location?.name || lead.preferredLocation}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-display text-lg text-ink">Timeline</p>
            <div className="mt-5">
              <Timeline items={timeline.map((t) => ({ title: t.event, time: t.date, description: t.note, done: true }))} />
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-display text-lg text-ink">Add Follow-up Note</p>
            <form className="mt-4 space-y-3" onSubmit={addNote}>
              <Textarea placeholder="What happened in your last conversation?" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
              <Button type="submit" size="sm"><Plus className="h-4 w-4" /> Add Note</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <p className="font-display text-lg text-ink">Update Status</p>
            <div className="mt-4">
              <Select value={status} onChange={(e) => updateStatus(e.target.value)}>
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <p className="flex items-center justify-between"><span className="text-ink-muted">Last Follow-up</span> <span className="text-ink">{lead.lastFollowUp || "—"}</span></p>
              <p className="flex items-center justify-between"><span className="text-ink-muted">Next Follow-up</span> <span className="text-ink">{lead.nextFollowUp || "—"}</span></p>
            </div>
          </Card>

          {ram && (
            <Card className="p-6">
              <p className="font-display text-lg text-ink">Assigned RAM</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image src={ram.avatar} alt={ram.name} fill sizes="44px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{ram.name}</p>
                  <p className="text-xs text-ink-muted">{ram.region}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
