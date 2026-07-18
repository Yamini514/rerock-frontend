import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { img } from "@/lib/images";

const stats = [
  { icon: TrendingUp, label: "Avg. portfolio growth", value: "+22%" },
  { icon: Users, label: "Investors advised", value: "2,400+" },
  { icon: ShieldCheck, label: "RERA-verified listings", value: "100%" },
];

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src={img.heroDusk2} alt="Luxury Hyderabad skyline" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo dark variant="full" priority />
          <div>
            <p className="max-w-md font-display text-3xl leading-snug text-white">
              &ldquo;Portfolio tracking is incredibly useful — I can see appreciation across all four of my properties in one view.&rdquo;
            </p>
            <p className="mt-4 text-sm text-white/70">Vikram Malhotra, Portfolio Client</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <s.icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 font-tabular text-xl font-semibold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-bg px-6 py-14">
        <div className="mb-10 lg:hidden">
          <Logo />
        </div>
        <div className="w-full max-w-md">{children}</div>
        <p className="mt-10 max-w-md text-center text-xs text-ink-faint">
          By continuing you agree to REROCK Realty&rsquo;s{" "}
          <Link href="/terms" className="underline hover:text-ink">Terms of Service</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
