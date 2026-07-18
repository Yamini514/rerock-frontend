"use client";

import { useState } from "react";
import { Plus, Shield } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { roles as initialRoles, permissionMatrix } from "@/lib/data/staff";
import { required, minLength, notDuplicate, runValidation, hasErrors } from "@/lib/validation";

const emptyForm = { name: "", description: "", permissions: [] };

export default function AdminRolesPage() {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const [roles, setRoles] = useState(initialRoles);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function togglePermission(category) {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(category) ? f.permissions.filter((p) => p !== category) : [...f.permissions, category],
    }));
    if (errors.permissions) setErrors((e) => ({ ...e, permissions: null }));
  }

  function closeModal() {
    setOpen(false);
    setForm(emptyForm);
    setErrors({});
  }

  function validate() {
    return runValidation({
      name: [
        () => required(form.name, "Name this role"),
        () => notDuplicate(form.name, roles.map((r) => r.name), "A role with this name already exists"),
      ],
      description: [() => required(form.description, "Describe what this role can access"), () => minLength(form.description, 10, "Description must be at least 10 characters")],
      permissions: [() => (form.permissions.length === 0 ? "Select at least one module" : null)],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setRoles((list) => [...list, { id: `role${Date.now().toString().slice(-4)}`, name: form.name, description: form.description, users: 0, permissions: form.permissions.length }]);
    closeModal();
    toast({ tone: "success", title: "Role created", description: form.name });
  }

  return (
    <div>
      <AdminPageHeader
        title="Roles"
        description="Access roles assigned to platform users"
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Role</Button>}
      />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:p-10">
        {roles.map((r) => (
          <Card key={r.id} className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Shield className="h-5 w-5" />
                </span>
                <p className="font-display text-lg text-ink">{r.name}</p>
              </div>
              {user?.role === r.name && <Badge tone="success">Your role</Badge>}
            </div>
            <p className="mt-3 text-sm text-ink-muted">{r.description}</p>
            {r.accessLevel && <p className="mt-2 text-xs font-medium uppercase tracking-wide text-primary">{r.accessLevel}</p>}
            <div className="mt-4 flex items-center gap-6 border-t border-border pt-4 text-xs text-ink-faint">
              <span>{r.users} users</span>
              <span>{r.permissions} pages accessible</span>
            </div>
          </Card>
        ))}
      </div>

      <AddModal open={open} onClose={closeModal} title="Add Role" description="Create a new access role" onSubmit={handleSubmit} submitLabel="Create Role" size="md">
        <Input label="Role Name" placeholder="Regional Manager" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <Textarea label="Description" placeholder="Describe what this role can access..." value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} error={errors.description} />
        <div>
          <p className="mb-3 text-sm font-medium text-ink">Module Access</p>
          <div className="grid grid-cols-2 gap-3">
            {permissionMatrix.categories.map((c) => (
              <Checkbox key={c} checked={form.permissions.includes(c)} onChange={() => togglePermission(c)} label={c} />
            ))}
          </div>
          {errors.permissions && <p className="mt-2 text-xs text-danger">{errors.permissions}</p>}
        </div>
      </AddModal>
    </div>
  );
}
