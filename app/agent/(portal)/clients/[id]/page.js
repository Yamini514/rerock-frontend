import { ClientDetailClient } from "./ClientDetailClient";

export const metadata = { title: "Client Details" };

export default async function ClientDetailPage({ params }) {
  const { id } = await params;
  return <ClientDetailClient id={id} />;
}
