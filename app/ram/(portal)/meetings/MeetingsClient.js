"use client";

import { useState } from "react";
import { Check, FileText, RotateCcw, Video, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { EmptyState } from "@/components/ui/StateScreen";
import { useToast } from "@/components/ui/Toast";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { meetingsForRam } from "@/lib/data/meetings";

const statusTone = { Scheduled: "info", Completed: "success", Cancelled: "danger", Rescheduled: "warning" };

export function MeetingsClient() {
  const { user } = useRamAuth();
  const { toast } = useToast();
  const [meetings, setMeetings] = useState(() => meetingsForRam(user?.id));
  const [notesModal, setNotesModal] = useState(null);
  const [draftNote, setDraftNote] = useState("");

  function setStatus(id, status, msg) {
    setMeetings((ms) => ms.map((m) => (m.id === id ? { ...m, status } : m)));
    toast({ tone: "success", title: msg });
  }

  function openNotes(meeting) {
    setNotesModal(meeting);
    setDraftNote(meeting.notes || "");
  }

  function saveNotes() {
    setMeetings((ms) => ms.map((m) => (m.id === notesModal.id ? { ...m, notes: draftNote } : m)));
    toast({ tone: "success", title: "Meeting notes saved" });
    setNotesModal(null);
  }

  const sorted = [...meetings].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-1 font-display text-3xl text-ink">Meetings</h1>
      <p className="mb-6 text-sm text-ink-muted">{meetings.length} online and site meetings</p>

      {sorted.length === 0 ? (
        <EmptyState title="No meetings yet" />
      ) : (
        <div className="space-y-3">
          {sorted.map((m) => (
            <Card key={m.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink">{m.clientName}</p>
                  <Badge tone={statusTone[m.status] || "neutral"}>{m.status}</Badge>
                  <Badge tone="neutral">{m.type}</Badge>
                </div>
                <p className="mt-1 text-xs text-ink-faint">{m.date} · {m.time}</p>
                {m.notes && <p className="mt-2 max-w-lg rounded-xl bg-surface-soft p-3 text-xs text-ink-muted">{m.notes}</p>}
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {m.type === "Online" && m.link && m.status === "Scheduled" && (
                  <Button as="a" href={m.link} target="_blank" rel="noopener noreferrer" size="sm">
                    <Video className="h-4 w-4" /> Join
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => openNotes(m)}>
                  <FileText className="h-4 w-4" /> Notes
                </Button>
                <Dropdown align="right" trigger={() => <Button variant="outline" size="sm">Manage</Button>}>
                  <DropdownItem onClick={() => setStatus(m.id, "Completed", "Meeting marked complete")}>
                    <Check className="h-4 w-4" /> Mark Complete
                  </DropdownItem>
                  <DropdownItem onClick={() => setStatus(m.id, "Rescheduled", "Meeting rescheduled")}>
                    <RotateCcw className="h-4 w-4" /> Reschedule
                  </DropdownItem>
                  <DropdownItem onClick={() => setStatus(m.id, "Cancelled", "Meeting cancelled")} className="text-danger">
                    <X className="h-4 w-4" /> Cancel
                  </DropdownItem>
                </Dropdown>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={Boolean(notesModal)} onClose={() => setNotesModal(null)} title="Meeting Notes" description={notesModal ? `${notesModal.clientName} · ${notesModal.date}` : ""}>
        <Textarea rows={5} placeholder="Capture what was discussed..." value={draftNote} onChange={(e) => setDraftNote(e.target.value)} />
        <Button className="mt-4 w-full" onClick={saveNotes}>Save Notes</Button>
      </Modal>
    </div>
  );
}
