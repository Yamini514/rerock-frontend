import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FAB } from "@/components/layout/FAB";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <FAB />
    </>
  );
}
