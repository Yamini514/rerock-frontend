"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { useClientAuth } from "@/components/portal/ClientAuthContext";
import { currentUser } from "@/lib/data/profile";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useClientAuth();
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ ...currentUser, email: email.trim() || currentUser.email });
      toast({ tone: "success", title: "Welcome back", description: "Redirecting to your dashboard..." });
      router.push("/portal/dashboard");
    }, 800);
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Welcome back</h1>
      <p className="mt-2 text-ink-muted">Sign in to access your portfolio, saved properties, and documents.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <Input label="Email" icon={Mail} type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" icon={Lock} type="password" placeholder="••••••••" required />
        <div className="flex items-center justify-between">
          <Checkbox checked={remember} onChange={() => setRemember((r) => !r)} label="Remember me" />
          <Link href="/forgot-password" className="text-sm font-medium text-primary">Forgot password?</Link>
        </div>
        <Button type="submit" size="lg" className="w-full" loading={loading}>Sign In</Button>
      </form>

      <p className="mt-4 text-center text-xs text-ink-faint">This is a demo portal — any email/password signs you in.</p>

      <p className="mt-4 text-center text-sm text-ink-muted">
        Don&rsquo;t have an account? <Link href="/register" className="font-semibold text-primary">Create one</Link>
      </p>
    </div>
  );
}
