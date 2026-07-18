"use client";

import { Check, X } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { permissionMatrix } from "@/lib/data/staff";

export default function AdminPermissionsPage() {
  return (
    <div>
      <AdminPageHeader title="Permissions" description="Module-level access granted to each role" />
      <div className="p-6 md:p-10">
        <Card className="overflow-x-auto p-6">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">Role</th>
                {permissionMatrix.categories.map((c) => (
                  <th key={c} className="whitespace-nowrap px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-ink-faint">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.roles.map((r) => (
                <tr key={r.role} className="border-t border-border">
                  <td className="whitespace-nowrap py-3 pr-4 font-medium text-ink">{r.role}</td>
                  {r.access.map((granted, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      {granted ? (
                        <Check className="mx-auto h-4 w-4 text-success" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-ink-faint" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
