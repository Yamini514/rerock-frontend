import { Suspense } from "react";
import { RamDashboardClient } from "./RamDashboardClient";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export const metadata = {
  title: "RAM Dashboard",
  description: "Assigned clients, portfolio value, referrals, meetings, and recommendations at a glance.",
};

export default function RamDashboardPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10"><SkeletonGrid count={4} /></div>}>
      <RamDashboardClient />
    </Suspense>
  );
}
