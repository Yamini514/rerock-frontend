import { AdminAuthProvider } from "@/components/admin/AdminAuthContext";

export default function AdminRootLayout({ children }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
