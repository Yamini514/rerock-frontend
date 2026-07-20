"use client";

import { useState } from "react";
import { Pencil, TriangleAlert } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { communities } from "@/lib/data/communities";
import { getLocation } from "@/lib/data/locations";
import { isPositiveNumber, runValidation, hasErrors } from "@/lib/validation";

const REVIEW_CADENCE_DAYS = 90;

const initialRows = communities.map((c) => ({
  id: c.slug,
  name: c.name,
  locationName: getLocation(c.location)?.name,
  pricePerSqft: c.pricingTrend[c.pricingTrend.length - 1].pricePerSqft,
  growthPct: c.growthPct,
  lastPriceUpdate: c.lastPriceUpdate,
}));

function daysSince(dateString) {
  return Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
}

export default function AdminPricingPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState(initialRows);
  const [editing, setEditing] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [error, setError] = useState(null);

  const overdueRows = rows.filter((r) => daysSince(r.lastPriceUpdate) > REVIEW_CADENCE_DAYS);

  const columns = [
    { key: "name", label: "Community", sortable: true },
    { key: "locationName", label: "Location", sortable: true },
    { key: "pricePerSqft", label: "Price / sq.ft", sortable: true, render: (r) => `₹${r.pricePerSqft.toLocaleString("en-IN")}` },
    { key: "growthPct", label: "YoY Growth", sortable: true, render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span> },
    {
      key: "lastPriceUpdate",
      label: "Last Reviewed",
      sortable: true,
      render: (r) => (
        <div className="flex items-center gap-2">
          <span>{r.lastPriceUpdate}</span>
          {daysSince(r.lastPriceUpdate) > REVIEW_CADENCE_DAYS && <Badge tone="warning">Overdue</Badge>}
        </div>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <button
          onClick={() => {
            setEditing(r);
            setPriceInput(String(r.pricePerSqft));
            setError(null);
          }}
          className="flex items-center gap-1 text-sm font-medium text-primary"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      ),
    },
  ];

  function closeModal() {
    setEditing(null);
    setPriceInput("");
    setError(null);
  }

  function handleSave(e) {
    e.preventDefault();
    const errors = runValidation({ price: [() => isPositiveNumber(priceInput, "Enter a valid price greater than 0")] });
    if (hasErrors(errors)) {
      setError(errors.price);
      return;
    }
    const newPrice = Number(priceInput);
    const today = new Date().toISOString().slice(0, 10);
    setRows((list) => list.map((r) => (r.id === editing.id ? { ...r, pricePerSqft: newPrice, lastPriceUpdate: today } : r)));
    toast({ tone: "success", title: "Pricing updated", description: `${editing.name} is now ₹${newPrice.toLocaleString("en-IN")}/sq.ft.` });
    closeModal();
  }

  return (
    <div>
      <AdminPageHeader title="Pricing" description="Current price per sq.ft across all communities" />
      <div className="p-6 md:p-10">
        {overdueRows.length > 0 && (
          <Card className="mb-6 flex items-center gap-3 border-warning/40 bg-warning-soft p-4">
            <TriangleAlert className="h-5 w-5 shrink-0 text-warning" />
            <p className="text-sm text-ink">
              <span className="font-semibold">{overdueRows.length} {overdueRows.length === 1 ? "community is" : "communities are"}</span> overdue for a pricing review (past the {REVIEW_CADENCE_DAYS}-day cadence): {overdueRows.map((r) => r.name).join(", ")}.
            </p>
          </Card>
        )}
        <Table columns={columns} data={rows} searchPlaceholder="Search communities..." exportFilename="rerock-pricing.csv" />
      </div>

      <Modal open={!!editing} onClose={closeModal} title={`Edit Pricing — ${editing?.name || ""}`} size="sm">
        {editing && (
          <form className="space-y-4" onSubmit={handleSave}>
            <Input
              label="Price per sq.ft (₹)"
              type="number"
              min="0"
              value={priceInput}
              onChange={(e) => {
                setPriceInput(e.target.value);
                if (error) setError(null);
              }}
              error={error}
            />
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
