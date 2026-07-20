import { LeadDetailClient } from "./LeadDetailClient";

export const metadata = { title: "Lead Details" };

export default async function LeadDetailPage({ params }) {
  const { id } = await params;
  return <LeadDetailClient id={id} />;
}
