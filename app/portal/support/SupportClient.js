"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { AdvisorCard } from "@/components/portal/AdvisorCard";
import { useClientAuth } from "@/components/portal/ClientAuthContext";
import { faqs } from "@/lib/data/faqs";
import { required, runValidation, hasErrors } from "@/lib/validation";

const supportFaqs = faqs.filter((f) => f.category === "Portfolio" || f.category === "Legal & RERA").slice(0, 4);

export function SupportClient() {
  const { toast } = useToast();
  const { user } = useClientAuth();
  const [form, setForm] = useState({ message: "", visitDate: "", visitTime: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = runValidation({ message: [() => required(form.message, "Tell us what you need help with")] });
    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ tone: "success", title: "Request sent", description: "Your REROCK Advisory Member will follow up shortly." });
      setForm({ message: "", visitDate: "", visitTime: "" });
    }, 800);
  }

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <h1 className="mb-2 font-display text-3xl text-ink">Support</h1>
      <p className="mb-8 text-sm text-ink-muted">Reach your advisor, request a consultation, or send us a message — we&rsquo;re here to help.</p>

      <AdvisorCard />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="p-6 md:p-8">
          <p className="font-display text-lg text-ink">Send us a message</p>
          <p className="mt-1 text-sm text-ink-muted">Signed in as {user?.name} — we already have your contact details on file.</p>
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <Textarea
              label="Message"
              placeholder="Tell us what you need help with..."
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              error={errors.message}
              required
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Preferred visit date"
                type="date"
                value={form.visitDate}
                onChange={(e) => update("visitDate", e.target.value)}
              />
              <Input
                label="Preferred visit time"
                type="time"
                value={form.visitTime}
                onChange={(e) => update("visitTime", e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="w-full" loading={submitting}>
              <Send className="h-4 w-4" /> Send to my advisor
            </Button>
          </form>
        </Card>

        <Card className="p-6 md:p-8">
          <p className="flex items-center gap-2 font-display text-lg text-ink">
            <HelpCircle className="h-5 w-5 text-primary" /> Common Questions
          </p>
          <div className="mt-5 space-y-4">
            {supportFaqs.map((f) => (
              <div key={f.q} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm font-medium text-ink">{f.q}</p>
                <p className="mt-1 text-xs text-ink-muted">{f.a}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="mt-5 inline-block text-sm font-semibold text-primary">View all FAQs →</Link>
        </Card>
      </div>
    </div>
  );
}
