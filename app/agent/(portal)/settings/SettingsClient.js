"use client";

import { useState } from "react";
import { Lock, Mail, Phone, User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";

const defaultPrefs = [
  { key: "newLeadAlerts", label: "New lead alerts", description: "Get notified the moment a lead is assigned to you.", enabled: true },
  { key: "visitReminders", label: "Site visit reminders", description: "Reminders 1 hour before a scheduled visit.", enabled: true },
  { key: "followUpReminders", label: "Follow-up reminders", description: "Daily digest of pending follow-ups.", enabled: true },
  { key: "commissionAlerts", label: "Commission alerts", description: "Get notified when a commission is credited.", enabled: true },
];

export function SettingsClient() {
  const { toast } = useToast();
  const { user } = useAgentAuth();
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [saving, setSaving] = useState(false);

  function togglePref(key) {
    setPrefs((p) => p.map((item) => (item.key === key ? { ...item, enabled: !item.enabled } : item)));
  }

  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ tone: "success", title: "Settings saved", description: "Your profile has been updated." });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-[60rem] space-y-8 px-6 py-10 md:px-10 md:py-14">
      <h1 className="font-display text-3xl text-ink">Settings</h1>

      <Card className="p-6 md:p-8">
        <p className="font-display text-lg text-ink">Personal Information</p>
        <form className="mt-5 grid gap-5 sm:grid-cols-2" onSubmit={handleSave}>
          <Input label="Full name" icon={User} defaultValue={user?.name} />
          <Input label="Email" icon={Mail} type="email" defaultValue={user?.email} />
          <Input label="Phone" icon={Phone} defaultValue={user?.phone} />
          <Button type="submit" className="sm:col-span-2" loading={saving}>Save Changes</Button>
        </form>
      </Card>

      <Card className="p-6 md:p-8">
        <p className="font-display text-lg text-ink">Notification Preferences</p>
        <div className="mt-5 space-y-5">
          {prefs.map((p) => (
            <div key={p.key} className="flex items-center justify-between gap-4 border-b border-border pb-5 last:border-b-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-ink">{p.label}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{p.description}</p>
              </div>
              <Switch checked={p.enabled} onChange={() => togglePref(p.key)} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 md:p-8">
        <p className="font-display text-lg text-ink">Change Password</p>
        <form className="mt-5 grid gap-5 sm:grid-cols-2">
          <Input label="Current password" icon={Lock} type="password" placeholder="••••••••" className="sm:col-span-2" />
          <Input label="New password" icon={Lock} type="password" placeholder="••••••••" />
          <Input label="Confirm new password" icon={Lock} type="password" placeholder="••••••••" />
          <Button type="submit" variant="outline" className="sm:col-span-2">Update Password</Button>
        </form>
      </Card>
    </div>
  );
}
