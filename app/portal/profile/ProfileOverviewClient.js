"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, Gift, Heart, Mail, MapPin, PieChart, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useClientAuth } from "@/components/portal/ClientAuthContext";
import { useShortlistStore } from "@/lib/store/shortlistStore";
import { portfolioSummary, referralSummary, documents } from "@/lib/data/portfolio";
import { formatINR } from "@/lib/utils";

export function ProfileOverviewClient() {
  const { user } = useClientAuth();
  const shortlistCount = useShortlistStore((s) => s.items.length);

  const quickLinks = [
    { href: "/portal/portfolio", icon: PieChart, label: "Portfolio", value: formatINR(portfolioSummary.totalValue), sub: `+${portfolioSummary.totalGrowthPct}% growth` },
    { href: "/portal/shortlist", icon: Heart, label: "Shortlist", value: `${shortlistCount} saved`, sub: "Properties you're watching" },
    { href: "/portal/referrals", icon: Gift, label: "Referrals", value: formatINR(referralSummary.totalEarned), sub: `${referralSummary.referralsCount} referrals` },
    { href: "/portal/documents", icon: FileText, label: "Documents", value: `${documents.length} files`, sub: "Agreements & certificates" },
  ];

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex items-center gap-4">
        <span className="relative h-16 w-16 overflow-hidden rounded-full bg-primary-soft">
          {user?.avatar && <Image src={user.avatar} alt={user.name} fill sizes="64px" className="object-cover" />}
        </span>
        <div>
          <h1 className="font-display text-2xl text-ink md:text-3xl">{user?.name}</h1>
          <p className="text-sm text-ink-muted">Member since {user?.memberSince}</p>
        </div>
      </div>

      <Card className="p-6 md:p-8">
        <p className="font-display text-xl text-ink">Contact Information</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4 text-primary" /> {user?.email}</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Phone className="h-4 w-4 text-primary" /> {user?.phone}</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4 text-primary" /> {user?.location}</p>
        </div>
        <Link href="/portal/profile/settings" className="mt-5 inline-block text-sm font-semibold text-primary">Edit profile →</Link>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {quickLinks.map((q) => (
          <Link key={q.href} href={q.href}>
            <Card hover className="flex items-center gap-4 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <q.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm text-ink-muted">{q.label}</p>
                <p className="font-tabular text-lg font-semibold text-ink">{q.value}</p>
                <p className="text-xs text-ink-faint">{q.sub}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
