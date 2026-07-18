"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Mail, Phone, User } from "lucide-react";

export function ApplyButton({ role }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  function submit(e) {
    e.preventDefault();
    setOpen(false);
    toast({ tone: "success", title: "Application received", description: `Thanks for applying to ${role}. We'll be in touch within 5 business days.` });
  }

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>Apply Now</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={`Apply — ${role}`} size="sm">
        <form className="space-y-4" onSubmit={submit}>
          <Input label="Full name" icon={User} placeholder="Your name" required />
          <Input label="Email" icon={Mail} type="email" placeholder="you@email.com" required />
          <Input label="Phone" icon={Phone} placeholder="+91 98480 12345" required />
          <Button type="submit" className="w-full">Submit Application</Button>
        </form>
      </Modal>
    </>
  );
}
