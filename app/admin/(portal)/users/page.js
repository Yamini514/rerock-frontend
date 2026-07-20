"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Mail, Plus, User } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { adminUsers as initialUsers, roles, ROLE, permissionModules, defaultAdminPermissions } from "@/lib/data/staff";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true, render: (r) => <Badge tone="primary">{r.role}</Badge> },
  { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Active" ? "success" : "neutral"}>{r.status}</Badge> },
  { key: "lastLogin", label: "Last Login", sortable: true },
];

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [permissions, setPermissions] = useState(defaultAdminPermissions);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", email: "", role: roles[0]?.name || ROLE.ADMIN } });

  const role = useWatch({ control, name: "role" });

  function closeModal() {
    setOpen(false);
    reset();
    setPermissions(defaultAdminPermissions);
  }

  function togglePermission(flag) {
    setPermissions((p) => (p.includes(flag) ? p.filter((f) => f !== flag) : [...p, flag]));
  }

  function onSubmit(data) {
    setUsers((list) => [
      {
        id: `u${Date.now().toString().slice(-4)}`,
        name: data.name,
        email: data.email,
        role: data.role,
        status: "Active",
        lastLogin: "Never",
        permissions: data.role === ROLE.SUPER_ADMIN ? undefined : permissions,
      },
      ...list,
    ]);
    closeModal();
    toast({ tone: "success", title: "Invite sent", description: `${data.email} has been invited as ${data.role}.` });
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

      <AddModal open={open} onClose={closeModal} title="Invite User" description="Send a platform invite to a new team member" onSubmit={handleSubmit(onSubmit)} submitLabel="Send Invite" size={role === ROLE.ADMIN ? "lg" : "sm"}>
        <Input
          label="Full Name"
          icon={User}
          placeholder="Team member name"
          error={errors.name?.message}
          {...register("name", { required: "Enter the team member's name", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
        />
        <Input
          label="Email"
          icon={Mail}
          type="email"
          placeholder="name@rerockrealty.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Enter a work email",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
            validate: (v) => !users.some((u) => u.email.toLowerCase() === v.trim().toLowerCase()) || "This email has already been invited",
          })}
        />
        <Select label="Role" {...register("role")}>
          {roles.map((r) => <option key={r.id}>{r.name}</option>)}
        </Select>

        {role === ROLE.ADMIN && (
          <div className="rounded-2xl border border-border p-4">
            <p className="mb-3 text-sm font-medium text-ink">Permissions</p>
            <div className="grid grid-cols-2 gap-4">
              {permissionModules.map((mod) => (
                <div key={mod.key}>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">{mod.label}</p>
                  <div className="space-y-1.5">
                    {mod.actions.map((action) => {
                      const flag = `${mod.key}.${action}`;
                      return (
                        <Checkbox key={flag} checked={permissions.includes(flag)} onChange={() => togglePermission(flag)} label={action} />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </AddModal>
    </div>
  );
}
