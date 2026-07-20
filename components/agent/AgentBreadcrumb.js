"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { agentNavFlat } from "./agentNav";

const itemByHref = Object.fromEntries(agentNavFlat.map((item) => [item.href, item]));

export function AgentBreadcrumb() {
  const pathname = usePathname();
  const match = Object.keys(itemByHref)
    .filter((href) => pathname === href || pathname?.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];

  if (!match) return null;
  const item = itemByHref[match];

  return (
    <div className="hidden items-center gap-1.5 text-sm lg:flex">
      <Link href="/agent/dashboard" className="text-ink-faint transition-colors hover:text-ink">Agent Portal</Link>
      <ChevronRight className="h-3.5 w-3.5 text-ink-faint" />
      <span className="flex items-center gap-1.5 font-medium text-ink">
        <item.icon className="h-3.5 w-3.5 text-primary" />
        {item.label}
      </span>
    </div>
  );
}
