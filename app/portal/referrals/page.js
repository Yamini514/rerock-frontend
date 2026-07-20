import { Gift } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { formatINR } from "@/lib/utils";
import { referralSummary } from "@/lib/data/portfolio";
import { referralHistory } from "@/lib/data/profile";
import { InviteForm } from "./InviteForm";
import { ReferralsTable } from "./ReferralsTable";

export const metadata = { title: "Referrals" };

export default function ReferralsPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-8 font-display text-3xl text-ink">Referrals</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard label="Total Earned" value={formatINR(referralSummary.totalEarned)} changePct={8.4} icon={Gift} />
        <StatCard label="Pending Payout" value={formatINR(referralSummary.pendingPayout)} changePct={0} icon={Gift} />
        <StatCard label="Total Referrals" value={referralSummary.referralsCount} changePct={0} icon={Gift} />
      </div>

      <Card className="mt-6 p-6">
        <p className="mb-1 font-display text-lg text-ink">Invite a Friend</p>
        <p className="mb-4 text-sm text-ink-muted">Earn ₹50,000+ for every successful referral that completes a purchase.</p>
        <InviteForm />
      </Card>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl text-ink">Referral History</h2>
        <ReferralsTable data={referralHistory} />
      </section>
    </div>
  );
}
