"use client";

import { Bell, Send } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { notifications } from "@/lib/data/notifications";

export default function AdminNotificationsPage() {
  const { toast } = useToast();

  function handleSend(e) {
    e.preventDefault();
    toast({ tone: "success", title: "Notification broadcast sent" });
    e.target.reset();
  }

  return (
    <div>
      <AdminPageHeader title="Notifications" description="Broadcast messages and manage system notifications" />
      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Recent Notifications</p>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-2xl border border-border p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Bell className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{n.title}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{n.message}</p>
                  <p className="mt-1 text-xs text-ink-faint">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="h-fit p-6">
          <p className="mb-4 font-display text-lg text-ink">Broadcast New Notification</p>
          <form className="space-y-4" onSubmit={handleSend}>
            <Select label="Audience">
              <option>All Clients</option>
              <option>Active Investors</option>
              <option>Advisory Team</option>
            </Select>
            <Input label="Title" placeholder="Notification title" required />
            <Textarea label="Message" placeholder="Notification message" rows={3} required />
            <Button type="submit" className="w-full"><Send className="h-4 w-4" /> Send Broadcast</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
