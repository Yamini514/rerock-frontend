"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { areas as initialAreas } from "@/lib/data/areas";
import { locations, getLocation } from "@/lib/data/locations";
import { required, isPositiveNumber, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const columns = [
  { key: "name", label: "Area", sortable: true },
  { key: "locationName", label: "Parent Location", sortable: true },
  { key: "propertyCount", label: "Properties", sortable: true },
  { key: "avgPricePerSqft", label: "Avg. Price / sq.ft", sortable: true, render: (r) => `₹${r.avgPricePerSqft.toLocaleString("en-IN")}` },
];

const emptyForm = { name: "", location: locations[0]?.slug || "", avgPricePerSqft: "" };

export default function AdminAreasPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialAreas);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const rows = items.map((a) => ({ ...a, locationName: getLocation(a.location)?.name }));

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function closeModal() {
    setOpen(false);
    setForm(emptyForm);
    setErrors({});
  }

  function validate() {
    return runValidation({
      name: [
        () => required(form.name, "Name this area"),
        () => notDuplicate(form.name, items.map((i) => i.name), "This area already exists"),
      ],
      avgPricePerSqft: [() => isPositiveNumber(form.avgPricePerSqft, "Enter a valid average price")],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setItems((list) => [
      ...list,
      { id: `a${Date.now().toString().slice(-5)}`, name: form.name, location: form.location, propertyCount: 0, avgPricePerSqft: Number(form.avgPricePerSqft) },
    ]);
    closeModal();
    toast({ tone: "success", title: "Area added", description: form.name });
  }

  return (
    <div>
      <AdminPageHeader
        title="Areas"
        description="Micro-areas and sub-localities within each tracked location"
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Area</Button>}
      />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={rows} searchPlaceholder="Search areas..." exportFilename="rerock-areas.csv" />
      </div>

      <AddModal open={open} onClose={closeModal} title="Add Area" description="Add a new micro-area under a tracked location" onSubmit={handleSubmit} submitLabel="Create Area" size="sm">
        <Input label="Area Name" placeholder="Kokapet Phase 2" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <Select label="Parent Location" value={form.location} onChange={(e) => update("location", e.target.value)}>
          {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
        </Select>
        <Input label="Avg. Price / sq.ft (₹)" type="number" min="1" placeholder="8000" value={form.avgPricePerSqft} onChange={(e) => update("avgPricePerSqft", e.target.value)} error={errors.avgPricePerSqft} />
      </AddModal>
    </div>
  );
}
