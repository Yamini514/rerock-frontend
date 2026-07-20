"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { useToast } from "@/components/ui/Toast";
import { useClientAuth } from "@/components/portal/ClientAuthContext";
import { avatar } from "@/lib/images";

const steps = ["Account", "Verify", "Done"];

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useClientAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleAccountSubmit(e) {
    e.preventDefault();
    setStep(1);
  }

  function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 700);
  }

  function finish() {
    login({
      name: form.name || "New Investor",
      email: form.email,
      phone: form.phone,
      avatar: avatar(23),
      memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      location: "Hyderabad, Telangana",
    });
    toast({ tone: "success", title: "Account created", description: "Welcome to REROCK Realty." });
    router.push("/portal/dashboard");
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Create your account</h1>
      <p className="mt-2 text-ink-muted">Track investments, save properties, and get pricing alerts.</p>

      <div className="my-8">
        <Stepper steps={steps} current={step} />
      </div>

      {step === 0 && (
        <form className="space-y-5" onSubmit={handleAccountSubmit}>
          <Input label="Full name" icon={User} placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
          <Input label="Email" icon={Mail} type="email" placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          <Input label="Phone number" icon={Phone} placeholder="+91 98480 12345" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          <Input label="Password" icon={Lock} type="password" placeholder="••••••••" required />
          <Button type="submit" size="lg" className="w-full">Continue</Button>
        </form>
      )}

      {step === 1 && (
        <form className="space-y-5" onSubmit={handleVerify}>
          <p className="text-sm text-ink-muted">Enter the 6-digit code we sent to your phone.</p>
          <Input label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" maxLength={6} required />
          <Button type="submit" size="lg" className="w-full" loading={loading}>Verify & Continue</Button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-6 text-center">
          <p className="text-ink-muted">Your account is verified and ready to go.</p>
          <Button size="lg" className="w-full" onClick={finish}>Go to Dashboard</Button>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-ink-muted">
        Already have an account? <Link href="/login" className="font-semibold text-primary">Sign in</Link>
      </p>
    </div>
  );
}
