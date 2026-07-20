"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FAB } from "@/components/layout/FAB";
import { ClientSidebar } from "@/components/portal/ClientSidebar";
import { ClientTopbar } from "@/components/portal/ClientTopbar";
import { ClientMobileNav } from "@/components/portal/ClientMobileNav";
import { useClientAuth } from "@/components/portal/ClientAuthContext";

// Shared public catalog pages that a signed-in client should browse from inside the
// portal shell rather than the marketing chrome — kept as single URLs (no /portal
// duplicates) so guests, SEO, and sharing all still see one canonical page per route.
const PORTAL_CHROME_PATHS = ["/properties", "/communities", "/pricing-trends"];

export function SiteChrome({ children }) {
  const pathname = usePathname();
  const { user } = useClientAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const showPortalChrome = Boolean(user) && PORTAL_CHROME_PATHS.includes(pathname);

  if (showPortalChrome) {
    return (
      <div className="flex min-h-screen">
        <ClientSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <ClientTopbar onOpenMobile={() => setMobileOpen(true)} />
          <main className="flex-1 bg-bg pb-24 lg:pb-0">{children}</main>
        </div>
        <ClientMobileNav />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <FAB />
    </>
  );
}
