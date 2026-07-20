import { AdminAuthProvider } from "@/components/admin/AdminAuthContext";
import { QueryProvider } from "@/components/admin/QueryProvider";

export default function AdminRootLayout({ children }) {
  return (
    <QueryProvider>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </QueryProvider>
  );
}
