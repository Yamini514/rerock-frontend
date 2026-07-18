import { Suspense } from "react";
import { PropertiesClient } from "./PropertiesClient";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export const metadata = {
  title: "Properties",
  description: "Browse luxury apartments, villas, plots and commercial spaces across Hyderabad.",
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10"><SkeletonGrid count={6} /></div>}>
      <PropertiesClient />
    </Suspense>
  );
}
