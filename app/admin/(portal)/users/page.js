"use client";

import { useState } from "react";
import { Mail, Plus, User } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { adminUsers as initialUsers, roles } from "@/lib/data/staff";
import { required, minLength, isEmail, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true, render: (r) => <Badge tone="primary">{r.role}</Badge> },
  { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Active" ? "success" : "neutral"}>{r.status}</Badge> },
  { key: "lastLogin", label: "Last Login", sortable: true },
];

const emptyForm = { name: "", email: "", role: roles[0]?.name || "Advisor" };

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
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
      name: [() => required(form.name, "Enter the team member's name"), () => minLength(form.name, 2, "Name must be at least 2 characters")],
      email: [
        () => required(form.email, "Enter a work email"),
        () => isEmail(form.email, "Enter a valid email address"),
        () => notDuplicate(form.email, users.map((u) => u.email), "This email has already been invited"),
      ],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setUsers((list) => [
      { id: `u${Date.now().toString().slice(-4)}`, name: form.name, email: form.email, role: form.role, status: "Active", lastLogin: "Never" },
      ...list,
    ]);
    closeModal();
    toast({ tone: "success", title: "Invite sent", description: `${form.email} has been invited as ${form.role}.` });
  }

  return (
    <div>
      <AdminPageHeader
        title="Users"
        description={`${users.length} admin platform users`}
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Invite User</Button>}
      />
      <div className="p-6 md:p-10">
        <Table columns={columns} data={users} searchPlaceholder="Search users..." exportFilename="rerock-admin-users.csv" />
      </div>

      <AddModal open={open} onClose={closeModal} title="Invite User" description="Send a platform invite to a new team member" onSubmit={handleSubmit} submitLabel="Send Invite" size="sm">
        <Input label="Full Name" icon={User} placeholder="Team member name" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <Input label="Email" icon={Mail} type="email" placeholder="name@rerockrealty.com" value={form.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
        <Select label="Role" value={form.role} onChange={(e) => update("role", e.target.value)}>
          {roles.map((r) => <option key={r.id}>{r.name}</option>)}
        </Select>
      </AddModal>
    </div>
  );
}
