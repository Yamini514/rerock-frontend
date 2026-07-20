"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/StateScreen";
import { useToast } from "@/components/ui/Toast";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { clients } from "@/lib/data/clients";
import { recommendationsForRam } from "@/lib/data/recommendations";

const statusTone = {
  Sent: "neutral",
  Viewed: "info",
  Interested: "primary",
  "Site Visit Booked": "success",
  Declined: "danger",
};

const typeFilters = [
  { value: "all", label: "All" },
  { value: "Property", label: "Properties" },
  { value: "Community", label: "Communities" },
  { value: "Builder", label: "Builders" },
  { value: "Location", label: "Locations" },
];

export function RecommendationsClient() {
  const { user } = useRamAuth();
  const { toast } = useToast();
  const myClients = clients.filter((c) => c.assignedRamId === user?.id);
  const [items, setItems] = useState(() => recommendationsForRam(user?.id));
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ clientName: myClients[0]?.name || "", type: "Property", title: "" });

  const visible = filter === "all" ? items : items.filter((r) => r.type === filter);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submitRecommendation(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setItems((prev) => [
      { id: `RC-new-${prev.length + 1}`, ramId: user?.id, clientName: form.clientName, type: form.type, title: form.title, status: "Sent", date: "2026-07-18" },
      ...prev,
    ]);
    toast({ tone: "success", title: "Recommendation sent", description: `${form.title} shared with ${form.clientName}.` });
    setModalOpen(false);
    setForm({ clientName: myClients[0]?.name || "", type: "Property", title: "" });
  }

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">Recommendations</h1>
          <p className="mt-1 text-sm text-ink-muted">{items.length} recommendations sent to your clients</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> New Recommendation</Button>
      </div>

      <Tabs tabs={typeFilters} value={filter} onChange={setFilter} scroll className="-mx-6 px-6 md:mx-0 md:px-0" />

      <div className="mt-6 space-y-3">
        {visible.length === 0 ? (
          <EmptyState title="No recommendations here" />
        ) : (
          visible.map((r) => (
            <Card key={r.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink">{r.title}</p>
                  <Badge tone="neutral">{r.type}</Badge>
                </div>
                <p className="mt-1 text-sm text-ink-muted">To {r.clientName} · {r.date}</p>
              </div>
              <Badge tone={statusTone[r.status] || "neutral"} className="w-fit">{r.status}</Badge>
            </Card>
          ))
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Recommendation" description="Share a property, community, builder, or location with a client.">
        <form className="space-y-4" onSubmit={submitRecommendation}>
          <Select label="Client" value={form.clientName} onChange={(e) => update("clientName", e.target.value)}>
            {myClients.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </Select>
          <Select label="Type" value={form.type} onChange={(e) => update("type", e.target.value)}>
            {["Property", "Community", "Builder", "Location"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
          <Input label="Title" placeholder="e.g. Aparna Zenon — 2 BHK" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          <Button type="submit" className="w-full">Send Recommendation</Button>
        </form>
      </Modal>
    </div>
  );
}
