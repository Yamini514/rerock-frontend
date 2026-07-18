"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  }

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-2xl text-ink">Check your email</h1>
        <p className="mt-2 text-ink-muted">We&rsquo;ve sent a password reset link. It may take a minute to arrive.</p>
        <Link href="/login" className="mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Reset your password</h1>
      <p className="mt-2 text-ink-muted">Enter your email and we&rsquo;ll send you a link to reset your password.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <Input label="Email" icon={Mail} type="email" placeholder="you@email.com" required />
        <Button type="submit" size="lg" className="w-full" loading={loading}>Send Reset Link</Button>
      </form>

      <Link href="/login" className="mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </div>
  );
}
