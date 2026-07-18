"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input, Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { locations as initialLocations } from "@/lib/data/locations";
import { img } from "@/lib/images";
import { slugify } from "@/lib/utils";
import { required, minLength, isPositiveNumber, inRange, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const columns = [
  { key: "name", label: "Location", sortable: true },
  { key: "city", label: "City", sortable: true },
  { key: "propertyCount", label: "Properties", sortable: true },
  { key: "avgPricePerSqft", label: "Avg. Price / sq.ft", sortable: true, render: (r) => `₹${r.avgPricePerSqft.toLocaleString("en-IN")}` },
  { key: "growthPct", label: "YoY Growth", sortable: true, render: (r) => <span className="font-semibold text-success">+{r.growthPct}%</span> },
];

const emptyForm = { name: "", city: "Hyderabad", avgPricePerSqft: "", growthPct: "", description: "" };

export default function AdminLocationsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialLocations);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const rows = items.map((l) => ({ id: l.slug, ...l }));

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
        () => required(form.name, "Name this location"),
        () => notDuplicate(form.name, items.map((i) => i.name), "This location is already tracked"),
      ],
      city: [() => required(form.city, "Enter a city")],
      avgPricePerSqft: [() => isPositiveNumber(form.avgPricePerSqft, "Enter a valid average price")],
      growthPct: [() => inRange(form.growthPct, -50, 100, "Enter a realistic growth percentage")],
      description: [() => required(form.description, "Add a short description"), () => minLength(form.description, 10, "Description must be at least 10 characters")],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    const newLocation = {
      slug: `${slugify(form.name)}-${Date.now().toString().slice(-4)}`,
      name: form.name,
      city: form.city,
      image: img.buildingModern2,
      propertyCount: 0,
      avgPricePerSqft: Number(form.avgPricePerSqft),
      growthPct: Number(form.growthPct),
      description: form.description,
    };
    setItems((list) => [...list, newLocation]);
    closeModal();
    toast({ tone: "success", title: "Location added", description: form.name });
  }

  return (
    <div>
      <AdminPageHeader
        title="Locations"
        description={`${items.length} tracked micro-markets`}
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Location</Button>}
      />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={rows} searchPlaceholder="Search locations..." exportFilename="rerock-locations.csv" />
      </div>

      <AddModal open={open} onClose={closeModal} title="Add Location" description="Add a new tracked micro-market" onSubmit={handleSubmit} submitLabel="Create Location">
        <Input label="Location Name" placeholder="Adibatla" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="City" value={form.city} onChange={(e) => update("city", e.target.value)} error={errors.city} />
          <Input label="Avg. Price / sq.ft (₹)" type="number" min="1" placeholder="6000" value={form.avgPricePerSqft} onChange={(e) => update("avgPricePerSqft", e.target.value)} error={errors.avgPricePerSqft} />
          <Input label="YoY Growth (%)" type="number" step="0.1" min="-50" max="100" placeholder="15" value={form.growthPct} onChange={(e) => update("growthPct", e.target.value)} error={errors.growthPct} />
        </div>
        <Textarea label="Description" placeholder="Describe this location..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} error={errors.description} />
      </AddModal>
    </div>
  );
}
