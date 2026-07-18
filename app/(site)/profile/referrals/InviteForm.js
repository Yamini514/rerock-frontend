"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function InviteForm() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ tone: "success", title: "Invite sent", description: "We'll email your friend a referral link." });
      e.target.reset();
    }, 700);
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <Input icon={Mail} placeholder="friend@email.com" className="flex-1" required />
      <Button type="submit" loading={sending}>
        <Send className="h-4 w-4" /> Send Invite
      </Button>
    </form>
  );
}
