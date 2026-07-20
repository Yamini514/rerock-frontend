"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { areas as initialAreas } from "@/lib/data/areas";
import { locations, getLocation } from "@/lib/data/locations";
import { required, isPositiveNumber, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const emptyForm = { name: "", location: locations[0]?.slug || "", avgPricePerSqft: "" };

export default function AdminAreasPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialAreas);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editErrors, setEditErrors] = useState({});
  const [deleting, setDeleting] = useState(null);

  const rows = items.map((a) => ({ ...a, locationName: getLocation(a.location)?.name }));

  const columns = [
    { key: "name", label: "Area", sortable: true },
    { key: "locationName", label: "Parent Location", sortable: true },
    { key: "propertyCount", label: "Properties", sortable: true },
    { key: "avgPricePerSqft", label: "Avg. Price / sq.ft", sortable: true, render: (r) => `₹${r.avgPricePerSqft.toLocaleString("en-IN")}` },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditing(r);
              setEditForm({ name: r.name, location: r.location, avgPricePerSqft: String(r.avgPricePerSqft) });
              setEditErrors({});
            }}
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            onClick={() => setDeleting(r)}
            className="flex items-center gap-1 text-sm font-medium text-danger"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      ),
    },
  ];

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

  function updateEdit(field, value) {
    setEditForm((f) => ({ ...f, [field]: value }));
    if (editErrors[field]) setEditErrors((e) => ({ ...e, [field]: null }));
  }

  function closeEditModal() {
    setEditing(null);
    setEditForm(emptyForm);
    setEditErrors({});
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const validationErrors = runValidation({
      name: [
        () => required(editForm.name, "Name this area"),
        () => notDuplicate(editForm.name, items.filter((i) => i.id !== editing.id).map((i) => i.name), "This area already exists"),
      ],
      avgPricePerSqft: [() => isPositiveNumber(editForm.avgPricePerSqft, "Enter a valid average price")],
    });
    if (hasErrors(validationErrors)) {
      setEditErrors(validationErrors);
      return;
    }
    setItems((list) =>
      list.map((a) =>
        a.id === editing.id
          ? { ...a, name: editForm.name, location: editForm.location, avgPricePerSqft: Number(editForm.avgPricePerSqft) }
          : a
      )
    );
    toast({ tone: "success", title: "Area updated", description: editForm.name });
    closeEditModal();
  }

  function handleDelete() {
    setItems((list) => list.filter((a) => a.id !== deleting.id));
    toast({ tone: "success", title: "Area deleted", description: deleting.name });
    setDeleting(null);
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

      <Modal open={!!editing} onClose={closeEditModal} title={`Edit Area — ${editing?.name || ""}`} size="sm">
        {editing && (
          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <Input label="Area Name" value={editForm.name} onChange={(e) => updateEdit("name", e.target.value)} error={editErrors.name} />
            <Select label="Parent Location" value={editForm.location} onChange={(e) => updateEdit("location", e.target.value)}>
              {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
            </Select>
            <Input label="Avg. Price / sq.ft (₹)" type="number" min="1" value={editForm.avgPricePerSqft} onChange={(e) => updateEdit("avgPricePerSqft", e.target.value)} error={editErrors.avgPricePerSqft} />
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )}
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete Area" size="sm">
        {deleting && (
          <div className="space-y-5">
            <p className="text-sm text-ink-muted">
              Are you sure you want to delete <span className="font-medium text-ink">{deleting.name}</span>? This can&rsquo;t be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full" onClick={() => setDeleting(null)}>Cancel</Button>
              <Button variant="destructive" className="w-full" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
