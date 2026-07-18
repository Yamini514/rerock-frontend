import Link from "next/link";
import { FileText, Gift, Heart, Mail, MapPin, PieChart, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { currentUser } from "@/lib/data/profile";
import { portfolioSummary, savedProperties, referralSummary, documents } from "@/lib/data/portfolio";
import { formatINR } from "@/lib/utils";

export const metadata = { title: "My Profile" };

const quickLinks = [
  { href: "/profile/portfolio", icon: PieChart, label: "Portfolio", value: formatINR(portfolioSummary.totalValue), sub: `+${portfolioSummary.totalGrowthPct}% growth` },
  { href: "/profile/shortlist", icon: Heart, label: "Shortlist", value: `${savedProperties.length} saved`, sub: "Properties you're watching" },
  { href: "/profile/referrals", icon: Gift, label: "Referrals", value: formatINR(referralSummary.totalEarned), sub: `${referralSummary.referralsCount} referrals` },
  { href: "/profile/documents", icon: FileText, label: "Documents", value: `${documents.length} files`, sub: "Agreements & certificates" },
];

export default function ProfileOverviewPage() {
  return (
    <div>
      <Card className="p-6 md:p-8">
        <p className="font-display text-xl text-ink">Contact Information</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4 text-primary" /> {currentUser.email}</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Phone className="h-4 w-4 text-primary" /> {currentUser.phone}</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4 text-primary" /> {currentUser.location}</p>
        </div>
        <Link href="/profile/settings" className="mt-5 inline-block text-sm font-semibold text-primary">Edit profile →</Link>
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
