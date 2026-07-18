"use client";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { useState } from "react";

const toggleDefaults = [
  { key: "maintenanceMode", label: "Maintenance mode", description: "Show a maintenance banner across the public site." },
  { key: "leadAutoAssign", label: "Auto-assign new leads", description: "Automatically round-robin new enquiries to available advisors." },
  { key: "priceAlertEmails", label: "Send price alert emails", description: "Notify clients automatically when tracked pricing changes." },
];

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [toggles, setToggles] = useState(toggleDefaults.map((t) => ({ ...t, enabled: t.key === "leadAutoAssign" })));

  function toggle(key) {
    setToggles((t) => t.map((item) => (item.key === key ? { ...item, enabled: !item.enabled } : item)));
  }

  function handleSave(e) {
    e.preventDefault();
    toast({ tone: "success", title: "Settings saved" });
  }

  return (
    <div>
      <AdminPageHeader title="Settings" description="General platform configuration and branding" />
      <div className="space-y-8 p-6 md:p-10">
        <Card className="p-6 md:p-8">
          <p className="font-display text-lg text-ink">Brand Information</p>
          <form className="mt-5 grid gap-5 sm:grid-cols-2" onSubmit={handleSave}>
            <Input label="Company Name" defaultValue="REROCK Realty" />
            <Input label="Tagline" defaultValue="Your Trusted Real Estate Investment Partner" />
            <Input label="Support Phone" defaultValue="+91 98480 12345" />
            <Input label="Support Email" defaultValue="hello@rerockrealty.com" />
            <Textarea label="Office Address" defaultValue="Financial District, Hyderabad, Telangana" className="sm:col-span-2" rows={2} />
            <Button type="submit" className="sm:col-span-2">Save Brand Settings</Button>
          </form>
        </Card>

        <Card className="p-6 md:p-8">
          <p className="font-display text-lg text-ink">Platform Behavior</p>
          <div className="mt-5 space-y-5">
            {toggles.map((t) => (
              <div key={t.key} className="flex items-center justify-between gap-4 border-b border-border pb-5 last:border-b-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink">{t.label}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{t.description}</p>
                </div>
                <Switch checked={t.enabled} onChange={() => toggle(t.key)} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
