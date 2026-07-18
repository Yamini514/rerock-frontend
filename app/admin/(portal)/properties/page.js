"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Badge, statusTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { properties as initialProperties, propertyStatuses } from "@/lib/data/properties";
import { locations, getLocation } from "@/lib/data/locations";
import { builders, getBuilder } from "@/lib/data/builders";
import { communities } from "@/lib/data/communities";
import { formatINRFull, slugify } from "@/lib/utils";
import { required, minLength, isPositiveNumber, inRange, runValidation, hasErrors } from "@/lib/validation";

const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "locationName", label: "Location", sortable: true },
  { key: "builderName", label: "Builder", sortable: true },
  { key: "price", label: "Price", sortable: true, render: (r) => formatINRFull(r.price) },
  { key: "status", label: "Status", sortable: true, render: (r) => <Badge tone={statusTone[r.status] || "neutral"}>{r.status}</Badge> },
];

const emptyForm = {
  title: "",
  type: "Apartment",
  community: communities[0]?.slug || "",
  location: locations[0]?.slug || "",
  builder: builders[0]?.slug || "",
  price: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  status: propertyStatuses[0],
  rera: true,
  images: [],
};

export default function AdminPropertiesPage() {
  const { toast } = useToast();
  const [items, setItems] = useState(initialProperties);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const rows = items.map((p) => ({
    id: p.slug,
    ...p,
    locationName: getLocation(p.location)?.name,
    builderName: getBuilder(p.builder)?.name,
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
      title: [() => required(form.title, "Give this property a title"), () => minLength(form.title, 3, "Title must be at least 3 characters")],
      price: [() => isPositiveNumber(form.price, "Enter a valid price")],
      area: [() => isPositiveNumber(form.area, "Enter a valid area in sq.ft")],
      bedrooms: [() => (form.bedrooms === "" ? null : inRange(form.bedrooms, 0, 20, "Enter a realistic bedroom count"))],
      bathrooms: [() => (form.bathrooms === "" ? null : inRange(form.bathrooms, 0, 20, "Enter a realistic bathroom count"))],
      images: [() => (form.images.length === 0 ? "Add at least one photo" : null)],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    const newProperty = {
      slug: `${slugify(form.title)}-${Date.now().toString().slice(-4)}`,
      title: form.title,
      type: form.type,
      community: form.community,
      location: form.location,
      builder: form.builder,
      price: Number(form.price) || 0,
      pricePerSqft: form.area ? Math.round((Number(form.price) || 0) / Number(form.area)) : 0,
      area: Number(form.area) || 0,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      balconies: null,
      facing: null,
      floor: null,
      rera: form.rera,
      images: form.images.map((img) => img.src),
      highlights: [],
      description: `${form.title} — a new listing in ${getLocation(form.location)?.name || "Hyderabad"}.`,
      floorPlans: [],
      pricingTrend: [],
      agent: null,
      status: form.status,
    };
    setItems((list) => [newProperty, ...list]);
    closeModal();
    toast({ tone: "success", title: "Property created", description: `${form.title} has been added to listings.` });
  }

  return (
    <div>
      <AdminPageHeader
        title="Properties"
        description={`${items.length} listings across all communities`}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        }
      />
      <div className="p-6 md:p-10">
        <Table
          columns={columns}
          data={rows}
          searchPlaceholder="Search properties..."
          exportFilename="rerock-properties.csv"
          bulkActions={[{ label: "Unpublish", onClick: () => toast({ tone: "info", title: "Properties unpublished" }) }]}
        />
      </div>

      <AddModal open={open} onClose={closeModal} title="Add Property" description="Create a new property listing" onSubmit={handleSubmit} submitLabel="Create Property">
        <Input label="Title" placeholder="Luxury 3 BHK" value={form.title} onChange={(e) => update("title", e.target.value)} error={errors.title} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Type" value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Plot</option>
            <option>Commercial</option>
          </Select>
          <Select label="Status" value={form.status} onChange={(e) => update("status", e.target.value)}>
            {propertyStatuses.map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select label="Community" value={form.community} onChange={(e) => update("community", e.target.value)}>
            {communities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </Select>
          <Select label="Location" value={form.location} onChange={(e) => update("location", e.target.value)}>
            {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
          </Select>
          <Select label="Builder" value={form.builder} onChange={(e) => update("builder", e.target.value)}>
            {builders.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </Select>
          <Input label="Price (₹)" type="number" min="1" placeholder="12400000" value={form.price} onChange={(e) => update("price", e.target.value)} error={errors.price} />
          <Input label="Area (sq.ft)" type="number" min="1" placeholder="1512" value={form.area} onChange={(e) => update("area", e.target.value)} error={errors.area} />
          <Input label="Bedrooms" type="number" min="0" max="20" placeholder="3" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} error={errors.bedrooms} />
          <Input label="Bathrooms" type="number" min="0" max="20" placeholder="3" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} error={errors.bathrooms} />
        </div>
        <Checkbox checked={form.rera} onChange={() => update("rera", !form.rera)} label="RERA Approved" />
        <div>
          <ImageUploader images={form.images} onChange={(next) => update("images", next)} />
          {errors.images && <p className="mt-2 text-xs text-danger">{errors.images}</p>}
        </div>
      </AddModal>
    </div>
  );
}
