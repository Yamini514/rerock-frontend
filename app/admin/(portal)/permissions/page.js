"use client";

import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { adminUsers, permissionModules, ROLE, ALL_FLAGS, updateUserPermissions } from "@/lib/data/staff";
import { cn } from "@/lib/utils";

export default function AdminPermissionsPage() {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN;
  const [selectedId, setSelectedId] = useState(adminUsers[0]?.id);
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);

  const selected = adminUsers.find((u) => u.id === selectedId);
  const effectivePermissions = selected?.role === ROLE.SUPER_ADMIN ? ALL_FLAGS : draft ?? selected?.permissions ?? [];
  const canEditSelected = isSuperAdmin && selected?.role !== ROLE.SUPER_ADMIN;

  function selectUser(u) {
    setSelectedId(u.id);
    setDraft(null);
    setDirty(false);
  }

  function toggleFlag(flag) {
    if (!canEditSelected) return;
    const base = draft ?? selected.permissions;
    const next = base.includes(flag) ? base.filter((f) => f !== flag) : [...base, flag];
    setDraft(next);
    setDirty(true);
  }

  function save() {
    updateUserPermissions(selected.id, draft ?? selected.permissions);
    setDirty(false);
    toast({ tone: "success", title: "Permissions updated", description: `${selected.name}'s access has been saved.` });
  }

  return (
    <div>
      <AdminPageHeader title="Permissions" description="Per-person permission flags — Super Admin always has full access" />
      <div className="grid grid-cols-1 gap-6 p-6 md:p-10 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit p-3">
          {adminUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => selectUser(u)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-btn px-3 py-2.5 text-left text-sm transition-colors",
                selectedId === u.id ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-surface-soft hover:text-ink"
              )}
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{u.name}</span>
                <span className="block truncate text-xs text-ink-faint">{u.email}</span>
              </span>
              {u.role === ROLE.SUPER_ADMIN && <ShieldCheck className="h-4 w-4 shrink-0" />}
            </button>
          ))}
        </Card>

        {selected && (
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
              <div>
                <p className="font-display text-lg text-ink">{selected.name}</p>
                <p className="text-sm text-ink-muted">{selected.email}</p>
              </div>
              <Badge tone={selected.role === ROLE.SUPER_ADMIN ? "primary" : "neutral"}>{selected.role}</Badge>
            </div>

            {selected.role === ROLE.SUPER_ADMIN ? (
              <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
                <ShieldCheck className="h-4 w-4 text-primary" /> Super Admin has every permission — this can&apos;t be restricted.
              </p>
            ) : (
              <>
                {!isSuperAdmin && (
                  <p className="mt-5 flex items-center gap-2 text-sm text-ink-faint">
                    <Lock className="h-3.5 w-3.5" /> Only a Super Admin can edit permissions.
                  </p>
                )}
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {permissionModules.map((mod) => (
                    <div key={mod.key}>
                      <p className="mb-2 text-sm font-medium text-ink">{mod.label}</p>
                      <div className="space-y-2">
                        {mod.actions.map((action) => {
                          const flag = `${mod.key}.${action}`;
                          return (
                            <Checkbox
                              key={flag}
                              checked={effectivePermissions.includes(flag)}
                              onChange={() => toggleFlag(flag)}
                              disabled={!canEditSelected}
                              label={action}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {canEditSelected && (
                  <div className="mt-6 flex justify-end border-t border-border pt-5">
                    <Button onClick={save} disabled={!dirty}>Save Changes</Button>
                  </div>
                )}
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
