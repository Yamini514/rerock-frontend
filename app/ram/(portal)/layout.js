"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RamSidebar } from "@/components/ram/RamSidebar";
import { RamTopbar } from "@/components/ram/RamTopbar";
import { RamMobileNav } from "@/components/ram/RamMobileNav";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { Logo } from "@/components/layout/Logo";

export default function RamPortalLayout({ children }) {
  const { user } = useRamAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user === null) router.replace("/ram/login");
  }, [user, router]);

  if (user === undefined || user === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg">
        <Logo />
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-border-strong border-t-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <RamSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <RamTopbar onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 bg-bg pb-24 lg:pb-0">{children}</main>
      </div>
      <RamMobileNav />
    </div>
  );
}
