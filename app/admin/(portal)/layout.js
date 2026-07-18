"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { Logo } from "@/components/layout/Logo";
import { PermissionState } from "@/components/ui/StateScreen";
import { Button } from "@/components/ui/Button";
import { canAccess } from "@/lib/data/staff";

export default function AdminPortalLayout({ children }) {
  const { user } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user === null) router.replace("/admin/login");
  }, [user, router]);

  if (user === undefined || user === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg">
        <Logo />
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-border-strong border-t-primary" />
      </div>
    );
  }

  const allowed = canAccess(user.role, pathname);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 bg-bg">
          {allowed ? (
            children
          ) : (
            <PermissionState
              title="This section isn't part of your role"
              description={`Your account is signed in as ${user.role}, which doesn't include access to this page. Contact a Super Admin if you need this unlocked.`}
              action={<Button as="a" href="/admin/dashboard">Go to Dashboard</Button>}
              className="min-h-[70vh]"
            />
          )}
        </main>
      </div>
    </div>
  );
}
