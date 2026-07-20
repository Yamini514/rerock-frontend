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

export function getRam(id) {
  return ramTeam.find((r) => r.id === id);
}

// Demo-login picker credentials for /ram/login — same "click a person to autofill" pattern as
// lib/data/agents.js's demoAgentCredentials on the Agent Portal.
export const demoRamCredentials = ramTeam.map((r) => ({ id: r.id, name: r.name, email: r.email, password: "ram123" }));

export const ROLE = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
};

// Single source of truth for the permission-flag taxonomy: one unified Admin Portal, two roles
// (Super Admin / Admin), with an Admin's actual access controlled by a per-user set of granular
// "module.action" flags rather than a fixed role template. Super Admin implicitly has every flag.
export const permissionModules = [
  { key: "dashboard", label: "Dashboard", actions: ["view"] },
  { key: "crm", label: "CRM", actions: ["view", "create", "edit", "delete"] },
  { key: "properties", label: "Properties", actions: ["view", "create", "edit", "delete"] },
  { key: "propertyTypes", label: "Property Types", actions: ["view", "create", "edit", "delete"] },
  { key: "communities", label: "Communities", actions: ["view", "create", "edit", "delete"] },
  { key: "builders", label: "Builders", actions: ["view", "create", "edit", "delete"] },
  { key: "areas", label: "Areas", actions: ["view", "create", "edit", "delete"] },
  { key: "locations", label: "Locations", actions: ["view", "create", "edit", "delete"] },
  { key: "pricing", label: "Pricing", actions: ["view", "update"] },
  { key: "agentNetwork", label: "Agent Network", actions: ["view", "create", "edit", "delete"] },
  { key: "marketing", label: "Marketing", actions: ["view", "create", "edit", "delete"] },
  { key: "mediaLibrary", label: "Media Library", actions: ["view", "upload", "delete"] },
  { key: "reports", label: "Reports", actions: ["view", "export"] },
  { key: "settings", label: "Settings", actions: ["view", "manage"] },
  { key: "administration", label: "Administration", actions: ["manageUsers", "manageRoles", "managePermissions", "viewActivityLogs"] },
];

export const ALL_FLAGS = permissionModules.flatMap((m) => m.actions.map((a) => `${m.key}.${a}`));

function flags(moduleKey, actions) {
  return actions.map((a) => `${moduleKey}.${a}`);
}

// Which flag a given admin route requires — drives both sidebar filtering and the route gate.
// Longest-prefix match against pathname, same semantics as the old canAccess().
const pageFlagMap = {
  "/admin/dashboard": "dashboard.view",
  "/admin/properties": "properties.view",
  "/admin/property-types": "propertyTypes.view",
  "/admin/communities": "communities.view",
  "/admin/builders": "builders.view",
  "/admin/areas": "areas.view",
  "/admin/locations": "locations.view",
  "/admin/pricing-history": "pricing.view",
  "/admin/bulk-pricing": "pricing.update",
  "/admin/pricing": "pricing.view",
  "/admin/enquiries": "crm.view",
  "/admin/follow-ups": "crm.view",
  "/admin/clients": "crm.view",
  "/admin/portfolio-members": "agentNetwork.view",
  "/admin/ram": "agentNetwork.view",
  "/admin/agents": "agentNetwork.view",
  "/admin/blogs": "marketing.view",
  "/admin/testimonials": "marketing.view",
  "/admin/seo": "marketing.view",
  "/admin/media-library": "mediaLibrary.view",
  "/admin/reports": "reports.view",
  "/admin/settings": "settings.view",
  "/admin/notifications": "settings.view",
  "/admin/users": "administration.manageUsers",
  "/admin/roles": "administration.manageRoles",
  "/admin/permissions": "administration.managePermissions",
  "/admin/activity-logs": "administration.viewActivityLogs",
};

export function pageRequiredFlag(pathname) {
  const match = Object.keys(pageFlagMap)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? pageFlagMap[match] : null;
}

export function hasPermission(user, flag) {
  if (!user) return false;
  if (user.role === ROLE.SUPER_ADMIN) return true;
  return (user.permissions || []).includes(flag);
}

export function canAccessPage(user, pathname) {
  const flag = pageRequiredFlag(pathname);
  if (!flag) return true;
  return hasPermission(user, flag);
}

export const adminUsers = [
  {
    id: "u1",
    name: "Sneha Rao",
    email: "sneha.rao@rerockrealty.com",
    role: ROLE.SUPER_ADMIN,
    status: "Active",
    lastLogin: "2026-07-17 09:12 AM",
    permissions: ALL_FLAGS,
  },
  {
    id: "u2",
    name: "Rahul Sharma",
    email: "rahul.sharma@rerockrealty.com",
    role: ROLE.ADMIN,
    status: "Active",
    lastLogin: "2026-07-17 08:40 AM",
    permissions: [...flags("crm", ["view", "create", "edit", "delete"]), "agentNetwork.view", "reports.view", "dashboard.view"],
  },
  {
    id: "u3",
    name: "Arjun Varma",
    email: "arjun.varma@rerockrealty.com",
    role: ROLE.ADMIN,
    status: "Active",
    lastLogin: "2026-07-16 04:05 PM",
    permissions: [
      ...flags("properties", ["view", "create", "edit", "delete"]),
      ...flags("propertyTypes", ["view", "create", "edit", "delete"]),
      ...flags("communities", ["view", "create", "edit", "delete"]),
      ...flags("builders", ["view", "create", "edit", "delete"]),
      ...flags("areas", ["view", "create", "edit", "delete"]),
      ...flags("locations", ["view", "create", "edit", "delete"]),
      ...flags("pricing", ["view", "update"]),
      "dashboard.view",
    ],
  },
  {
    id: "u4",
    name: "Meera Krishnan",
    email: "meera.krishnan@rerockrealty.com",
    role: ROLE.ADMIN,
    status: "Active",
    lastLogin: "2026-07-16 06:20 PM",
    permissions: [...flags("agentNetwork", ["view", "create", "edit", "delete"]), "crm.view", "dashboard.view"],
  },
  {
    id: "u5",
    name: "Vinod Kumar",
    email: "vinod.kumar@rerockrealty.com",
    role: ROLE.ADMIN,
    status: "Inactive",
    lastLogin: "2026-06-02 11:15 AM",
    permissions: ["dashboard.view", "reports.view", "administration.viewActivityLogs"],
  },
];

export const demoCredentials = [
  { role: ROLE.SUPER_ADMIN, name: "Sneha Rao", email: "sneha.rao@rerockrealty.com", password: "admin123" },
  { role: ROLE.ADMIN, name: "Rahul Sharma", email: "rahul.sharma@rerockrealty.com", password: "sales123" },
  { role: ROLE.ADMIN, name: "Arjun Varma", email: "arjun.varma@rerockrealty.com", password: "property123" },
  { role: ROLE.ADMIN, name: "Meera Krishnan", email: "meera.krishnan@rerockrealty.com", password: "referral123" },
  { role: ROLE.ADMIN, name: "Vinod Kumar", email: "vinod.kumar@rerockrealty.com", password: "viewer123" },
];

// Default flags handed to a brand-new Admin invite/login before a Super Admin customizes them.
export const defaultAdminPermissions = ["dashboard.view", "reports.view"];

export function permissionsForEmail(email) {
  const match = adminUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  return match?.permissions || null;
}

// Mutates the shared adminUsers record in place so a permissions edit is visible to that user's
// next login within the same browser session (there's no backend to persist this to yet).
export function updateUserPermissions(userId, permissions) {
  const user = adminUsers.find((u) => u.id === userId);
  if (user) user.permissions = permissions;
  return user;
}

export const roles = [
  {
    id: "role1",
    name: ROLE.SUPER_ADMIN,
    description: "Full, unrestricted access to every module — property catalog, CRM, pricing, marketing, media, reports, and platform administration.",
    accessLevel: "Full access",
    users: adminUsers.filter((u) => u.role === ROLE.SUPER_ADMIN).length,
  },
  {
    id: "role2",
    name: ROLE.ADMIN,
    description: "Operational access scoped per person via granular permission flags — see the Permissions matrix for exactly what each Admin can view, create, edit, or delete.",
    accessLevel: "Configurable, per-user access",
    users: adminUsers.filter((u) => u.role === ROLE.ADMIN).length,
  },
];
