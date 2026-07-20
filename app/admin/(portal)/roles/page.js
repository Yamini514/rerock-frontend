"use client";

import { ArrowRight, Shield, ShieldCheck } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { roles } from "@/lib/data/staff";

const roleIcon = { "Super Admin": ShieldCheck, Admin: Shield };

export default function AdminRolesPage() {
  const { user } = useAdminAuth();

  return (
    <div>
      <AdminPageHeader
        title="Roles"
        description="REROCK Realty's Admin Portal runs on two roles — access within Admin is then scoped per person via granular permission flags"
      />
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:p-10">
        {roles.map((r) => {
          const Icon = roleIcon[r.name] || Shield;
          return (
            <Card key={r.id} className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-display text-lg text-ink">{r.name}</p>
                </div>
                {user?.role === r.name && <Badge tone="success">Your role</Badge>}
              </div>
              <p className="mt-3 text-sm text-ink-muted">{r.description}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-primary">{r.accessLevel}</p>
              <div className="mt-4 flex items-center gap-6 border-t border-border pt-4 text-xs text-ink-faint">
                <span>{r.users} user{r.users === 1 ? "" : "s"}</span>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="px-6 pb-10 md:px-10">
        <Card className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base text-ink">See exactly what each Admin can access</p>
            <p className="mt-1 text-sm text-ink-muted">The Permissions matrix shows every module-level flag granted to each person.</p>
          </div>
          <Button as="a" href="/admin/permissions" variant="outline">
            Open Permissions <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
