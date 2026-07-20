import { Suspense } from "react";
import { AgentDashboardClient } from "./AgentDashboardClient";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export const metadata = {
  title: "Agent Dashboard",
  description: "Today's site visits, pending follow-ups, active leads, and performance at a glance.",
};

export default function AgentDashboardPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10"><SkeletonGrid count={4} /></div>}>
      <AgentDashboardClient />
    </Suspense>
  );
}
