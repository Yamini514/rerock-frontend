"use client";

import { useState } from "react";
import { Calendar, Check, FileText, RotateCcw, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { EmptyState } from "@/components/ui/StateScreen";
import { useToast } from "@/components/ui/Toast";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { siteVisitsForAgent } from "@/lib/data/siteVisits";
import { getProperty } from "@/lib/data/properties";
import { getCommunity } from "@/lib/data/communities";

const statusTone = { Scheduled: "info", Completed: "success", Cancelled: "danger", Rescheduled: "warning" };

export function SiteVisitsClient() {
  const { user } = useAgentAuth();
  const { toast } = useToast();
  const [visits, setVisits] = useState(() => siteVisitsForAgent(user?.slug));
  const [notesModal, setNotesModal] = useState(null);
  const [draftNote, setDraftNote] = useState("");

  function setStatus(id, status, toastMsg) {
    setVisits((vs) => vs.map((v) => (v.id === id ? { ...v, status } : v)));
    toast({ tone: "success", title: toastMsg });
  }

  function openNotes(visit) {
    setNotesModal(visit);
    setDraftNote(visit.notes || "");
  }

  function saveNotes() {
    setVisits((vs) => vs.map((v) => (v.id === notesModal.id ? { ...v, notes: draftNote } : v)));
    toast({ tone: "success", title: "Visit notes saved" });
    setNotesModal(null);
  }

  const sorted = [...visits].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">Site Visits</h1>
          <p className="mt-1 text-sm text-ink-muted">{visits.length} visits scheduled, completed, or in progress</p>
        </div>
        <Button as="a" href="/agent/calendar" variant="outline" size="sm"><Calendar className="h-4 w-4" /> View Calendar</Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState title="No site visits yet" />
      ) : (
        <div className="space-y-3">
          {sorted.map((v) => {
            const property = getProperty(v.propertySlug);
            const community = getCommunity(v.communitySlug);
            return (
              <Card key={v.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-ink">{v.clientName}</p>
                    <Badge tone={statusTone[v.status] || "neutral"}>{v.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{property?.title} — {community?.name}</p>
                  <p className="mt-1 text-xs text-ink-faint">{v.date} · {v.time}</p>
                  {v.notes && <p className="mt-2 max-w-lg rounded-xl bg-surface-soft p-3 text-xs text-ink-muted">{v.notes}</p>}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openNotes(v)}>
                    <FileText className="h-4 w-4" /> Notes
                  </Button>
                  <Dropdown
                    align="right"
                    trigger={() => <Button variant="outline" size="sm">Manage</Button>}
                  >
                    <DropdownItem onClick={() => setStatus(v.id, "Completed", "Visit marked complete")}>
                      <Check className="h-4 w-4" /> Mark Complete
                    </DropdownItem>
                    <DropdownItem onClick={() => setStatus(v.id, "Rescheduled", "Visit rescheduled")}>
                      <RotateCcw className="h-4 w-4" /> Reschedule
                    </DropdownItem>
                    <DropdownItem onClick={() => setStatus(v.id, "Cancelled", "Visit cancelled")} className="text-danger">
                      <X className="h-4 w-4" /> Cancel
                    </DropdownItem>
                  </Dropdown>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={Boolean(notesModal)} onClose={() => setNotesModal(null)} title="Visit Notes" description={notesModal ? `${notesModal.clientName} · ${notesModal.date}` : ""}>
        <Textarea rows={5} placeholder="Capture what happened during the visit..." value={draftNote} onChange={(e) => setDraftNote(e.target.value)} />
        <Button className="mt-4 w-full" onClick={saveNotes}>Save Notes</Button>
      </Modal>
    </div>
  );
}
