"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { AgentTopbar } from "@/components/agent/AgentTopbar";
import { AgentMobileNav } from "@/components/agent/AgentMobileNav";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";
import { Logo } from "@/components/layout/Logo";

export default function AgentPortalLayout({ children }) {
  const { user } = useAgentAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user === null) router.replace("/agent/login");
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
      <AgentSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AgentTopbar onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 bg-bg pb-24 lg:pb-0">{children}</main>
      </div>
      <AgentMobileNav />
    </div>
  );
}
