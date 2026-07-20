import {
  Bell,
  Building,
  Building2,
  CalendarClock,
  CalendarDays,
  FileText,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Settings,
  User,
  Users,
  Wallet,
} from "lucide-react";

export const agentNav = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Pipeline",
    items: [
      { label: "Leads", href: "/agent/leads", icon: Users },
      { label: "Clients", href: "/agent/clients", icon: User },
      { label: "Follow-ups", href: "/agent/follow-ups", icon: ListChecks },
      { label: "Site Visits", href: "/agent/site-visits", icon: CalendarClock },
      { label: "Calendar", href: "/agent/calendar", icon: CalendarDays },
    ],
  },
  {
    label: "My Book",
    items: [
      { label: "Communities", href: "/agent/communities", icon: Building },
      { label: "Properties", href: "/agent/properties", icon: Building2 },
    ],
  },
  {
    label: "Earnings",
    items: [
      { label: "Commission", href: "/agent/commission", icon: Wallet },
      { label: "Performance", href: "/agent/performance", icon: Gauge },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Notifications", href: "/agent/notifications", icon: Bell },
      { label: "Documents", href: "/agent/documents", icon: FileText },
      { label: "Profile", href: "/agent/profile", icon: User },
      { label: "Settings", href: "/agent/settings", icon: Settings },
    ],
  },
];

export const agentNavFlat = agentNav.flatMap((group) => group.items);
