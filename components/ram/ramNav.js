import {
  Bell,
  CalendarClock,
  FileBarChart,
  FileText,
  Gift,
  LayoutDashboard,
  ListChecks,
  PieChart,
  Settings,
  Sparkles,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

export const ramNav = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/ram/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Advisory",
    items: [
      { label: "Clients", href: "/ram/clients", icon: Users },
      { label: "Portfolio Reviews", href: "/ram/portfolio-reviews", icon: PieChart },
      { label: "Recommendations", href: "/ram/recommendations", icon: Sparkles },
      { label: "Investment Opportunities", href: "/ram/investment-opportunities", icon: TrendingUp },
    ],
  },
  {
    label: "Schedule",
    items: [
      { label: "Meetings", href: "/ram/meetings", icon: CalendarClock },
      { label: "Tasks", href: "/ram/tasks", icon: ListChecks },
    ],
  },
  {
    label: "Growth",
    items: [
      { label: "Referrals", href: "/ram/referrals", icon: Gift },
      { label: "Reports", href: "/ram/reports", icon: FileBarChart },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Notifications", href: "/ram/notifications", icon: Bell },
      { label: "Documents", href: "/ram/documents", icon: FileText },
      { label: "Profile", href: "/ram/profile", icon: User },
      { label: "Settings", href: "/ram/settings", icon: Settings },
    ],
  },
];

export const ramNavFlat = ramNav.flatMap((group) => group.items);
