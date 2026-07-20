"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { adminNav } from "./adminNav";

const itemByHref = Object.fromEntries(adminNav.flatMap((g) => g.items.map((item) => [item.href, item])));

export function Breadcrumbs() {
  const pathname = usePathname();
  const match = Object.keys(itemByHref)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];
  const item = match ? itemByHref[match] : null;

  if (!item) return null;

  return (
    <nav className="hidden items-center gap-1.5 text-sm text-ink-faint md:flex" aria-label="Breadcrumb">
      <Link href="/admin/dashboard" className="hover:text-ink">Admin</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="font-medium text-ink">{item.label}</span>
    </nav>
  );
}
