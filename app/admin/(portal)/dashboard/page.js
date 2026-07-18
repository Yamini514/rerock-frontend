import { AdminClient } from "./AdminClient";

export const metadata = {
  title: "Admin Dashboard",
  description: "Sales analytics, lead funnel, and inventory management for REROCK Realty administrators.",
};

export default function AdminDashboardPage() {
  return <AdminClient />;
}
