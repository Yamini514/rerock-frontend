"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { blogs } from "@/lib/data/blogs";
import { slugify } from "@/lib/utils";
import { required, minLength, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const categories = ["Market Insight", "Investment Strategy", "Buyer's Guide"];

const initialRows = blogs.map((b, i) => ({
  id: b.slug,
  slug: b.slug,
  title: b.title,
  category: b.category,
  author: b.author.name,
  date: b.date,
  status: i === blogs.length - 1 ? "Draft" : "Published",
}));

const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "author", label: "Author", sortable: true },
  { key: "date", label: "Published", sortable: true },
  { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Published" ? "success" : "warning"}>{r.status}</Badge> },
];

const emptyForm = { title: "", category: categories[0], excerpt: "", status: "Draft" };

export default function AdminBlogsPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState(initialRows);
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
      title: [
        () => required(form.title, "Give the article a title"),
        () => minLength(form.title, 8, "Title must be at least 8 characters"),
        () => notDuplicate(form.title, rows.map((r) => r.title), "An article with this title already exists"),
      ],
      excerpt: [() => required(form.excerpt, "Add a short excerpt"), () => minLength(form.excerpt, 30, "Excerpt must be at least 30 characters")],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setRows((list) => [
      {
        id: `${slugify(form.title)}-${Date.now().toString().slice(-4)}`,
        slug: slugify(form.title),
        title: form.title,
        category: form.category,
        author: "Admin",
        date: new Date().toISOString().slice(0, 10),
        status: form.status,
      },
      ...list,
    ]);
    closeModal();
    toast({ tone: "success", title: form.status === "Published" ? "Article published" : "Draft saved", description: form.title });
  }

  return (
    <div>
      <AdminPageHeader
        title="Blogs"
        description={`${rows.length} articles in the REROCK Journal`}
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New Article</Button>}
      />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={rows} searchPlaceholder="Search articles..." exportFilename="rerock-blogs.csv" />
      </div>

      <AddModal open={open} onClose={closeModal} title="New Article" description="Write a new REROCK Journal article" onSubmit={handleSubmit} submitLabel={form.status === "Published" ? "Publish Article" : "Save Draft"}>
        <Input label="Title" placeholder="Kokapet 2027 Outlook" value={form.title} onChange={(e) => update("title", e.target.value)} error={errors.title} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Category" value={form.category} onChange={(e) => update("category", e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </Select>
          <Select label="Status" value={form.status} onChange={(e) => update("status", e.target.value)}>
            <option>Draft</option>
            <option>Published</option>
          </Select>
        </div>
        <Textarea label="Excerpt" placeholder="A short summary of the article..." value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={4} error={errors.excerpt} />
      </AddModal>
    </div>
  );
}
