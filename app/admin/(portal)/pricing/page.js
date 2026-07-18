"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { communities } from "@/lib/data/communities";
import { getLocation } from "@/lib/data/locations";
import { isPositiveNumber, runValidation, hasErrors } from "@/lib/validation";

const initialRows = communities.map((c) => ({
  id: c.slug,
  name: c.name,
  locationName: getLocation(c.location)?.name,
  pricePerSqft: c.pricingTrend[c.pricingTrend.length - 1].pricePerSqft,
  growthPct: c.growthPct,
}));

export default function AdminPricingPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState(initialRows);
  const [editing, setEditing] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [error, setError] = useState(null);

  const columns = [
    { key: "name", label: "Community", sortable: true },
    { key: "locationName", label: "Location", sortable: true },
    { key: "pricePerSqft", label: "Price / sq.ft", sortable: true, render: (r) => `₹${r.pricePerSqft.toLocaleString("en-IN")}` },
    { key: "growthPct", label: "YoY Growth", sortable: true, render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span> },
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
    setRows((list) => list.map((r) => (r.id === editing.id ? { ...r, pricePerSqft: newPrice } : r)));
    toast({ tone: "success", title: "Pricing updated", description: `${editing.name} is now ₹${newPrice.toLocaleString("en-IN")}/sq.ft.` });
    closeModal();
  }

  return (
    <div>
      <AdminPageHeader title="Pricing" description="Current price per sq.ft across all communities" />
      <div className="p-6 md:p-10">
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
