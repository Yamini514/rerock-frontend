"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { seoPages } from "@/lib/data/seoPages";

export default function AdminSEOPage() {
  const { toast } = useToast();
  const [editing, setEditing] = useState(null);

  const columns = [
    { key: "route", label: "Route", sortable: true },
    { key: "metaTitle", label: "Meta Title", sortable: true },
    { key: "score", label: "SEO Score", sortable: true, render: (r) => <span className={r.score >= 85 ? "font-semibold text-success" : "font-semibold text-warning"}>{r.score}/100</span> },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <button onClick={() => setEditing(r)} className="flex items-center gap-1 text-sm font-medium text-primary">
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      ),
    },
  ];

  function handleSave(e) {
    e.preventDefault();
    setEditing(null);
    toast({ tone: "success", title: "SEO metadata saved", description: editing.route });
  }

  return (
    <div>
      <AdminPageHeader title="SEO" description="Meta titles, descriptions, and SEO scores per page" />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={seoPages.map((p) => ({ id: p.id, ...p }))} searchPlaceholder="Search routes..." />
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Edit SEO — ${editing?.route || ""}`}>
        {editing && (
          <form className="space-y-4" onSubmit={handleSave}>
            <Input label="Meta Title" defaultValue={editing.metaTitle} />
            <Textarea label="Meta Description" defaultValue={editing.metaDescription} rows={3} />
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
