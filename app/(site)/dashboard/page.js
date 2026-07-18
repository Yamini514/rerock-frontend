import { Suspense } from "react";
import { DashboardClient } from "./DashboardClient";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export const metadata = {
  title: "My Dashboard",
  description: "Track your property portfolio, visits, documents, and referral earnings.",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10"><SkeletonGrid count={4} /></div>}>
      <DashboardClient />
    </Suspense>
  );
}
