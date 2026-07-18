"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { communities as initialCommunities } from "@/lib/data/communities";
import { builders, getBuilder } from "@/lib/data/builders";
import { locations, getLocation } from "@/lib/data/locations";
import { formatINR, slugify } from "@/lib/utils";
import { required, minLength, isPositiveNumber, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const columns = [
  { key: "name", label: "Community", sortable: true },
  { key: "builderName", label: "Builder", sortable: true },
  { key: "locationName", label: "Location", sortable: true },
  { key: "totalUnits", label: "Total Units", sortable: true },
  { key: "availableUnits", label: "Available", sortable: true },
  { key: "priceFrom", label: "Starting Price", sortable: true, render: (r) => formatINR(r.priceFrom) },
  { key: "status", label: "Status", render: (r) => <Badge tone="info">{r.status}</Badge> },
];

const emptyForm = {
  name: "",
  builder: builders[0]?.slug || "",
  location: locations[0]?.slug || "",
  status: "Under Construction",
  priceMin: "",
  totalUnits: "",
  possession: "",
};

export default function AdminCommunitiesPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialCommunities);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const rows = items.map((c) => ({
    id: c.slug,
    name: c.name,
    builderName: getBuilder(c.builder)?.name,
    locationName: getLocation(c.location)?.name,
    totalUnits: c.totalUnits,
    availableUnits: c.availableUnits,
    priceFrom: c.priceRange.min,
    status: c.status,
  }));

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
        () => required(form.name, "Name this community"),
        () => minLength(form.name, 3, "Name must be at least 3 characters"),
        () => notDuplicate(form.name, items.map((i) => i.name), "A community with this name already exists"),
      ],
      totalUnits: [() => isPositiveNumber(form.totalUnits, "Enter the total number of units")],
      priceMin: [() => isPositiveNumber(form.priceMin, "Enter a valid starting price")],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    const location = locations.find((l) => l.slug === form.location);
    const newCommunity = {
      slug: `${slugify(form.name)}-${Date.now().toString().slice(-4)}`,
      name: form.name,
      builder: form.builder,
      location: form.location,
      tagline: "A new address, curated by REROCK",
      status: form.status,
      rera: "Pending Filing",
      priceRange: { min: Number(form.priceMin) || 0, max: Number(form.priceMin) * 2 || 0 },
      unitTypes: [],
      totalUnits: Number(form.totalUnits) || 0,
      availableUnits: Number(form.totalUnits) || 0,
      possession: form.possession || "TBD",
      investmentScore: 70,
      growthPct: 12,
      heroImage: location?.image,
      gallery: [location?.image].filter(Boolean),
      overview: `${form.name} is a new community being onboarded to REROCK Realty.`,
      masterPlan: "Master plan details to be added.",
      amenities: [],
      pricingTrend: [],
      nearby: [],
    };
    setItems((list) => [newCommunity, ...list]);
    closeModal();
    toast({ tone: "success", title: "Community created", description: `${form.name} has been added.` });
  }

  return (
    <div>
      <AdminPageHeader
        title="Communities"
        description={`${items.length} communities across builder partners`}
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Community</Button>}
      />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={rows} searchPlaceholder="Search communities..." exportFilename="rerock-communities.csv" />
      </div>

      <AddModal open={open} onClose={closeModal} title="Add Community" description="Onboard a new community" onSubmit={handleSubmit} submitLabel="Create Community">
        <Input label="Community Name" placeholder="Brigade Horizon" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Builder" value={form.builder} onChange={(e) => update("builder", e.target.value)}>
            {builders.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </Select>
          <Select label="Location" value={form.location} onChange={(e) => update("location", e.target.value)}>
            {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
          </Select>
          <Select label="Status" value={form.status} onChange={(e) => update("status", e.target.value)}>
            <option>Under Construction</option>
            <option>Ready To Move</option>
            <option>RERA Approved</option>
          </Select>
          <Input label="Total Units" type="number" min="1" placeholder="480" value={form.totalUnits} onChange={(e) => update("totalUnits", e.target.value)} error={errors.totalUnits} />
          <Input label="Starting Price (₹)" type="number" min="1" placeholder="12400000" value={form.priceMin} onChange={(e) => update("priceMin", e.target.value)} error={errors.priceMin} />
          <Input label="Possession" placeholder="Dec 2028" value={form.possession} onChange={(e) => update("possession", e.target.value)} />
        </div>
      </AddModal>
    </div>
  );
}
