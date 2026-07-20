import {
  Bell,
  Building2,
  FileText,
  Gift,
  Headset,
  LayoutDashboard,
  MapPinned,
  PieChart,
  TrendingUp,
  User,
} from "lucide-react";

export const clientNav = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Discover",
    items: [
      { label: "Properties", href: "/properties", icon: Building2 },
      { label: "Communities", href: "/communities", icon: MapPinned },
      { label: "Pricing Trends", href: "/pricing-trends", icon: TrendingUp },
    ],
  },
  {
    label: "My Investments",
    items: [
      { label: "Portfolio", href: "/portal/portfolio", icon: PieChart },
      { label: "Documents", href: "/portal/documents", icon: FileText },
      { label: "Referrals", href: "/portal/referrals", icon: Gift },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Notifications", href: "/portal/notifications", icon: Bell },
      { label: "Support", href: "/portal/support", icon: Headset },
      { label: "Profile", href: "/portal/profile", icon: User },
    ],
  },
];

export const clientNavFlat = clientNav.flatMap((group) => group.items);
