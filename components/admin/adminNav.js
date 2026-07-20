import {
  Activity,
  Bell,
  Building,
  Building2,
  FileBarChart,
  Headset,
  History,
  Image,
  Inbox,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Layers,
  MapPin,
  Newspaper,
  Percent,
  Quote,
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
    label: "CRM",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
      { label: "Follow Ups", href: "/admin/follow-ups", icon: Bell },
      { label: "Clients", href: "/admin/clients", icon: Users },
    ],
  },
  {
    label: "Property Catalog",
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
    label: "Agent Network",
    items: [
      { label: "Portfolio Members", href: "/admin/portfolio-members", icon: UserCog },
      { label: "RAM", href: "/admin/ram", icon: Headset },
      { label: "Agents", href: "/admin/agents", icon: UserCheck },
    ],
  },
  {
    label: "Marketing",
    items: [
      { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
      { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
      // { label: "SEO", href: "/admin/seo", icon: Search },
    ],
  },
  {
    label: "Media Library",
    items: [{ label: "Media Library", href: "/admin/media-library", icon: Image }],
  },
  {
    label: "Reports",
    items: [{ label: "Reports", href: "/admin/reports", icon: FileBarChart }],
  },
  {
    label: "Settings",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Users", href: "/admin/users", icon: UserCog },
      { label: "Roles", href: "/admin/roles", icon: Shield },
      { label: "Permissions", href: "/admin/permissions", icon: KeyRound },
      { label: "Activity Logs", href: "/admin/activity-logs", icon: Activity },
    ],
  },
];
