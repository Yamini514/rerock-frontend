"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { properties } from "@/lib/data/properties";
import { formatINRFull } from "@/lib/utils";
import { required, minLength, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const typeDescriptions = {
  Apartment: "Multi-storey residential units within gated communities.",
  Villa: "Independent or semi-independent houses with private land.",
  Plot: "Open land parcels for self-construction or land banking.",
  Commercial: "Offices, retail spaces, and warehousing assets.",
};

const baseTypes = Array.from(new Set(properties.map((p) => p.type))).map((type) => {
  const items = properties.filter((p) => p.type === type);
  const avgPrice = items.reduce((sum, p) => sum + p.price, 0) / items.length;
  return { type, count: items.length, avgPrice, description: typeDescriptions[type] };
});

const emptyForm = { name: "", description: "" };

export default function PropertyTypesPage() {
  const { toast } = useToast();
  const [types, setTypes] = useState(baseTypes);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

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
        () => required(form.name, "Name this property type"),
        () => notDuplicate(form.name, types.map((t) => t.type), "This type already exists"),
      ],
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
    setTypes((t) => [...t, { type: form.name, count: 0, avgPrice: 0, description: form.description }]);
    closeModal();
    toast({ tone: "success", title: "Property type added", description: form.name });
  }

  return (
    <div>
      <AdminPageHeader
        title="Property Types"
        description="Manage the property type taxonomy used across listings and filters"
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add Type
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-10">
        {types.map((t) => (
          <Card key={t.type} className="p-6">
            <p className="font-display text-xl text-ink">{t.type}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{t.description}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
              <span className="text-ink-muted">{t.count} listings</span>
              <span className="font-tabular font-semibold text-ink">{t.count > 0 ? formatINRFull(t.avgPrice) : "—"} avg.</span>
            </div>
          </Card>
        ))}
      </div>

      <AddModal open={open} onClose={closeModal} title="Add Property Type" description="Create a new property type for listings and filters" onSubmit={handleSubmit} submitLabel="Create Type" size="sm">
        <Input label="Type Name" placeholder="Farmhouse" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <Textarea label="Description" placeholder="Describe this property type..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} error={errors.description} />
      </AddModal>
    </div>
  );
}
