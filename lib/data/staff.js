import { avatar } from "@/lib/images";

export const portfolioMembers = [
  { id: "pm1", name: "Lakshmi Narayan", email: "lakshmi.n@rerockrealty.com", avatar: avatar(9), clientsManaged: 42, aum: 285000000, rating: 4.8 },
  { id: "pm2", name: "Farhan Ahmed", email: "farhan.a@rerockrealty.com", avatar: avatar(15), clientsManaged: 36, aum: 210000000, rating: 4.6 },
  { id: "pm3", name: "Ritu Choudhary", email: "ritu.c@rerockrealty.com", avatar: avatar(29), clientsManaged: 51, aum: 340000000, rating: 4.9 },
];

export const ramTeam = [
  { id: "ram1", name: "Deepak Suri", email: "deepak.s@rerockrealty.com", avatar: avatar(33), buildersHandled: ["Brigade", "Prestige"], region: "West Hyderabad", dealsThisQuarter: 18 },
  { id: "ram2", name: "Neha Kapoor", email: "neha.k@rerockrealty.com", avatar: avatar(41), buildersHandled: ["Sobha", "Lodha"], region: "Financial District", dealsThisQuarter: 22 },
  { id: "ram3", name: "Manoj Pillai", email: "manoj.p@rerockrealty.com", avatar: avatar(38), buildersHandled: ["Aparna", "My Home"], region: "North Hyderabad", dealsThisQuarter: 14 },
];

// Role names and responsibilities follow the Merock Realty functional/technical spec's "User Roles" section.
export const ROLE = {
  SUPER_ADMIN: "Super Admin",
  SALES_RM: "Sales / Relationship Manager",
  PROPERTY_MANAGER: "Property Manager",
  REFERRAL_COORDINATOR: "Referral Coordinator",
  READ_ONLY_VIEWER: "Read-only Viewer",
};

export const adminUsers = [
  { id: "u1", name: "Sneha Rao", email: "sneha.rao@rerockrealty.com", role: ROLE.SUPER_ADMIN, status: "Active", lastLogin: "2026-07-17 09:12 AM" },
  { id: "u2", name: "Rahul Sharma", email: "rahul.sharma@rerockrealty.com", role: ROLE.SALES_RM, status: "Active", lastLogin: "2026-07-17 08:40 AM" },
  { id: "u3", name: "Arjun Varma", email: "arjun.varma@rerockrealty.com", role: ROLE.PROPERTY_MANAGER, status: "Active", lastLogin: "2026-07-16 04:05 PM" },
  { id: "u4", name: "Meera Krishnan", email: "meera.krishnan@rerockrealty.com", role: ROLE.REFERRAL_COORDINATOR, status: "Active", lastLogin: "2026-07-16 06:20 PM" },
  { id: "u5", name: "Vinod Kumar", email: "vinod.kumar@rerockrealty.com", role: ROLE.READ_ONLY_VIEWER, status: "Inactive", lastLogin: "2026-06-02 11:15 AM" },
];

// Single source of truth: which admin routes each role may open.
// Enforced by app/admin/(portal)/layout.js and used to filter the sidebar in AdminSidebar.js.
export const rolePageAccess = {
  [ROLE.SUPER_ADMIN]: [
    "/admin/dashboard",
    "/admin/properties",
    "/admin/property-types",
    "/admin/communities",
    "/admin/builders",
    "/admin/areas",
    "/admin/locations",
    "/admin/pricing",
    "/admin/pricing-history",
    "/admin/bulk-pricing",
    "/admin/enquiries",
    "/admin/follow-ups",
    "/admin/clients",
    "/admin/portfolio-members",
    "/admin/ram",
    "/admin/agents",
    "/admin/blogs",
    "/admin/testimonials",
    "/admin/seo",
    "/admin/settings",
    "/admin/users",
    "/admin/roles",
    "/admin/permissions",
    "/admin/notifications",
    "/admin/reports",
    "/admin/activity-logs",
  ],
  [ROLE.SALES_RM]: ["/admin/dashboard", "/admin/enquiries", "/admin/follow-ups", "/admin/clients", "/admin/agents", "/admin/reports"],
  [ROLE.PROPERTY_MANAGER]: [
    "/admin/dashboard",
    "/admin/properties",
    "/admin/property-types",
    "/admin/communities",
    "/admin/builders",
    "/admin/areas",
    "/admin/locations",
    "/admin/pricing",
    "/admin/pricing-history",
    "/admin/bulk-pricing",
  ],
  [ROLE.REFERRAL_COORDINATOR]: ["/admin/dashboard", "/admin/portfolio-members", "/admin/ram", "/admin/clients"],
  [ROLE.READ_ONLY_VIEWER]: ["/admin/dashboard", "/admin/reports", "/admin/activity-logs"],
};

// Roles that can view their allowed pages but never create/edit/delete records.
export const readOnlyRoles = [ROLE.READ_ONLY_VIEWER];

export function canAccess(role, pathname) {
  const allowed = rolePageAccess[role] || [];
  return allowed.some((href) => pathname === href || pathname.startsWith(`${href}/`));
}

export function isReadOnly(role) {
  return readOnlyRoles.includes(role);
}

export const roles = [
  {
    id: "role1",
    name: ROLE.SUPER_ADMIN,
    description: "Manages users, settings, master data, properties, customers, members, referrals, matches, notifications, and dashboards.",
    accessLevel: "Full access",
    users: 1,
  },
  {
    id: "role2",
    name: ROLE.SALES_RM,
    description: "Creates and updates customers, buyer requirements, follow-ups, match statuses, and visit/meeting notes.",
    accessLevel: "Operational access to assigned and shared records",
    users: 4,
  },
  {
    id: "role3",
    name: ROLE.PROPERTY_MANAGER,
    description: "Adds/updates property data, property status, owner/source details, photos/links, and property notes.",
    accessLevel: "Property-focused access",
    users: 3,
  },
  {
    id: "role4",
    name: ROLE.REFERRAL_COORDINATOR,
    description: "Manages member profiles, referral intake, referral status, and elite tier updates.",
    accessLevel: "Member/referral-focused access",
    users: 2,
  },
  {
    id: "role5",
    name: ROLE.READ_ONLY_VIEWER,
    description: "Views dashboards and selected data for review purposes.",
    accessLevel: "Read-only access",
    users: 2,
  },
].map((r) => ({ ...r, permissions: rolePageAccess[r.name].length }));

export const demoCredentials = [
  { role: ROLE.SUPER_ADMIN, name: "Sneha Rao", email: "sneha.rao@rerockrealty.com", password: "admin123" },
  { role: ROLE.SALES_RM, name: "Rahul Sharma", email: "rahul.sharma@rerockrealty.com", password: "sales123" },
  { role: ROLE.PROPERTY_MANAGER, name: "Arjun Varma", email: "arjun.varma@rerockrealty.com", password: "property123" },
  { role: ROLE.REFERRAL_COORDINATOR, name: "Meera Krishnan", email: "meera.krishnan@rerockrealty.com", password: "referral123" },
  { role: ROLE.READ_ONLY_VIEWER, name: "Vinod Kumar", email: "vinod.kumar@rerockrealty.com", password: "viewer123" },
];

// Module-level view of rolePageAccess, used only to render the /admin/permissions matrix.
const permissionCategories = [
  { label: "Dashboard", hrefs: ["/admin/dashboard"] },
  { label: "Property Management", hrefs: ["/admin/properties", "/admin/property-types", "/admin/communities", "/admin/builders", "/admin/areas", "/admin/locations"] },
  { label: "Pricing", hrefs: ["/admin/pricing", "/admin/pricing-history", "/admin/bulk-pricing"] },
  { label: "CRM / Leads", hrefs: ["/admin/enquiries", "/admin/follow-ups", "/admin/clients"] },
  { label: "Referral & Members", hrefs: ["/admin/portfolio-members", "/admin/ram"] },
  { label: "Content", hrefs: ["/admin/blogs", "/admin/testimonials", "/admin/seo"] },
  { label: "System & Settings", hrefs: ["/admin/settings", "/admin/users", "/admin/roles", "/admin/permissions"] },
];

export const permissionMatrix = {
  categories: permissionCategories.map((c) => c.label),
  roles: Object.values(ROLE).map((role) => ({
    role,
    access: permissionCategories.map((c) => c.hrefs.some((href) => rolePageAccess[role].includes(href))),
  })),
};
