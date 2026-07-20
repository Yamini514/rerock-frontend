"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { roles, demoCredentials, adminUsers, ROLE, ALL_FLAGS, defaultAdminPermissions } from "@/lib/data/staff";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, login } = useAdminAuth();
  const [form, setForm] = useState({ email: "", password: "", role: roles[0]?.name || "Admin" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/admin/dashboard");
  }, [user, router]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function autofill(cred) {
    setForm({ email: cred.email, password: cred.password, role: cred.role });
    toast({ tone: "info", title: `Autofilled — ${cred.role}`, description: `${cred.name}'s demo credentials are ready to sign in.` });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const matched = demoCredentials.find((c) => c.email.toLowerCase() === form.email.trim().toLowerCase());
      const matchedUser = adminUsers.find((u) => u.email.toLowerCase() === form.email.trim().toLowerCase());
      const derivedName = form.email ? form.email.split("@")[0].replace(/[.]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Admin User";
      const role = matched?.role || form.role;
      login({
        name: matched?.name || derivedName,
        email: form.email || "admin@rerockrealty.com",
        role,
        permissions: matchedUser?.permissions || (role === ROLE.SUPER_ADMIN ? ALL_FLAGS : defaultAdminPermissions),
      });
      router.push("/admin/dashboard");
    }, 700);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1c1c1e] px-6 py-14">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo dark variant="full" priority />
          <span className="mt-4 flex items-center gap-1.5 rounded-pill border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
            <ShieldCheck className="h-3.5 w-3.5" /> Staff & Admin Portal
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Card className="p-8">
            <h1 className="font-display text-2xl text-ink">Sign in to the Portal</h1>
            <p className="mt-1.5 text-sm text-ink-muted">Access leads, pricing, inventory, and reports.</p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <Input label="Work Email" icon={Mail} type="email" placeholder="you@rerockrealty.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
              <Input label="Password" icon={Lock} type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} required />
              <Select label="Sign in as" value={form.role} onChange={(e) => update("role", e.target.value)}>
                {roles.map((r) => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </Select>
              <Button type="submit" size="lg" className="w-full" loading={loading}>
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-ink-faint">
              This is a demo portal — use a sample credential, or any email/password with a role.
            </p>
          </Card>

          <Card className="p-8">
            <p className="flex items-center gap-1.5 font-display text-lg text-ink">
              <Sparkles className="h-4.5 w-4.5 text-primary" /> Demo Credentials
            </p>
            <p className="mt-1.5 text-sm text-ink-muted">Tap a role to autofill the form — one for every access level.</p>

            <div className="mt-6 space-y-3">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => autofill(cred)}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-border p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary-softer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge tone="primary">{cred.role}</Badge>
                      <span className="text-sm font-medium text-ink">{cred.name}</span>
                    </div>
                    <div className="mt-2 space-y-0.5 font-tabular text-xs text-ink-muted">
                      <p className="truncate">{cred.email}</p>
                      <p className="flex items-center gap-1"><KeyRound className="h-3 w-3" /> {cred.password}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-pill bg-surface-soft px-3 py-1.5 text-xs font-semibold text-ink-muted transition-colors group-hover:bg-primary group-hover:text-white">
                    Use
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <p className="mt-8 text-center text-xs text-white/40">© 2026 REROCK Realty. Internal use only.</p>
      </div>
    </div>
  );
}
