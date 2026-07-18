import {
  Activity,
  Bell,
  Building,
  Building2,
  FileBarChart,
  Headset,
  History,
  Inbox,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Layers,
  MapPin,
  Newspaper,
  Percent,
  Quote,
  Search,
  Settings,
  Shield,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";

export const adminNav = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Inventory",
    items: [
      { label: "Properties", href: "/admin/properties", icon: Building2 },
      { label: "Property Types", href: "/admin/property-types", icon: Layers },
      { label: "Communities", href: "/admin/communities", icon: Building },
      { label: "Builders", href: "/admin/builders", icon: Landmark },
      { label: "Areas", href: "/admin/areas", icon: MapPin },
      { label: "Locations", href: "/admin/locations", icon: MapPin },
    ],
  },
  {
    label: "Pricing",
    items: [
      { label: "Pricing", href: "/admin/pricing", icon: Percent },
      { label: "Pricing History", href: "/admin/pricing-history", icon: History },
      { label: "Bulk Pricing", href: "/admin/bulk-pricing", icon: Layers },
    ],
  },
  {
    label: "CRM",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
      { label: "Follow Ups", href: "/admin/follow-ups", icon: Bell },
      { label: "Clients", href: "/admin/clients", icon: Users },
      { label: "Portfolio Members", href: "/admin/portfolio-members", icon: UserCog },
      { label: "RAM", href: "/admin/ram", icon: Headset },
      { label: "Agents", href: "/admin/agents", icon: UserCheck },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
      { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
      // { label: "SEO", href: "/admin/seo", icon: Search },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Users", href: "/admin/users", icon: UserCog },
      { label: "Roles", href: "/admin/roles", icon: Shield },
      { label: "Permissions", href: "/admin/permissions", icon: KeyRound },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Reports", href: "/admin/reports", icon: FileBarChart },
      { label: "Activity Logs", href: "/admin/activity-logs", icon: Activity },
    ],
  },
];
