"use client";

import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input, Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { builders as initialBuilders } from "@/lib/data/builders";
import { slugify } from "@/lib/utils";
import { required, minLength, inRange, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const columns = [
  { key: "name", label: "Builder", sortable: true },
  { key: "headquarters", label: "Headquarters", sortable: true },
  { key: "established", label: "Established", sortable: true },
  { key: "projectsCount", label: "Projects", sortable: true },
  { key: "rating", label: "Rating", sortable: true, render: (r) => <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> {r.rating}</span> },
];

const emptyForm = { name: "", headquarters: "", established: "", headline: "", description: "" };
const currentYear = 2026;

export default function AdminBuildersPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialBuilders);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const rows = items.map((b) => ({ id: b.slug, ...b }));

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
        () => required(form.name, "Enter the builder's name"),
        () => notDuplicate(form.name, items.map((i) => i.name), "This builder is already onboarded"),
      ],
      headquarters: [() => required(form.headquarters, "Enter a headquarters location")],
      established: [() => inRange(form.established, 1900, currentYear, `Enter a year between 1900 and ${currentYear}`)],
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
    const newBuilder = {
      slug: `${slugify(form.name)}-${Date.now().toString().slice(-4)}`,
      name: form.name,
      established: Number(form.established),
      projectsCount: 0,
      rating: 4.5,
      headquarters: form.headquarters,
      sqftDelivered: "—",
      description: form.description,
      headline: form.headline || `Newly onboarded to REROCK Realty`,
      awards: [],
    };
    setItems((list) => [newBuilder, ...list]);
    closeModal();
    toast({ tone: "success", title: "Builder added", description: form.name });
  }

  return (
    <div>
      <AdminPageHeader
        title="Builders"
        description={`${items.length} builder partners onboarded`}
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Builder</Button>}
      />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={rows} searchPlaceholder="Search builders..." exportFilename="rerock-builders.csv" />
      </div>

      <AddModal open={open} onClose={closeModal} title="Add Builder" description="Onboard a new builder partner" onSubmit={handleSubmit} submitLabel="Create Builder">
        <Input label="Builder Name" placeholder="Brigade Group" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Headquarters" placeholder="Bengaluru, Karnataka" value={form.headquarters} onChange={(e) => update("headquarters", e.target.value)} error={errors.headquarters} />
          <Input label="Established Year" type="number" min="1900" max={currentYear} placeholder="1986" value={form.established} onChange={(e) => update("established", e.target.value)} error={errors.established} />
        </div>
        <Input label="Headline" placeholder="40 years of building trust" value={form.headline} onChange={(e) => update("headline", e.target.value)} />
        <Textarea label="Description" placeholder="Describe this builder..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} error={errors.description} />
      </AddModal>
    </div>
  );
}
