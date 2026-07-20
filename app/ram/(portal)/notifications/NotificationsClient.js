"use client";

import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/StateScreen";
import { NotificationItem } from "@/components/portal/NotificationItem";
import { useRamAuth } from "@/components/ram/RamAuthContext";
import { ramNotifications } from "@/lib/data/ramNotifications";

const filters = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "meeting", label: "Meetings" },
  { value: "recommendation", label: "Recommendations" },
  { value: "referral", label: "Referrals" },
  { value: "portfolio", label: "Portfolio" },
];

export function NotificationsClient() {
  const { user } = useRamAuth();
  const [items, setItems] = useState(() => ramNotifications.filter((n) => n.ramId === user?.id));
  const [filter, setFilter] = useState("all");

  function toggleRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const visible = items.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="mx-auto max-w-[70rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">Notifications</h1>
          <p className="mt-1 text-sm text-ink-muted">{unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      <Tabs tabs={filters} value={filter} onChange={setFilter} scroll className="-mx-6 px-6 md:mx-0 md:px-0" />

      <div className="mt-6 space-y-3">
        {visible.length === 0 ? (
          <EmptyState title="No notifications here" description="Check back later, or switch filters above." />
        ) : (
          visible.map((n) => <NotificationItem key={n.id} notification={n} onToggleRead={toggleRead} />)
        )}
      </div>
    </div>
  );
}
