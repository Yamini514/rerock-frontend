import { avatar } from "@/lib/images";

export const currentUser = {
  name: "Kiran Kumar Reddy",
  email: "kiran.reddy@example.com",
  phone: "+91 98480 55210",
  avatar: avatar(23),
  memberSince: "March 2022",
  location: "Hyderabad, Telangana",
  // Links to lib/data/agents.js (assigned property advisor) and lib/data/staff.js's ramTeam
  // (assigned REROCK Advisory Member) — same "Priya Reddy" already referenced by name in
  // portfolio.js's upcomingVisits and notifications.js's site-visit note.
  assignedAgentSlug: "priya-reddy",
  assignedRamId: "ram2",
  referralCode: "KIRAN2022",
};

export const notificationPreferences = [
  { key: "priceAlerts", label: "Price change alerts", description: "Get notified when a saved property or community changes price.", enabled: true },
  { key: "siteVisitReminders", label: "Site visit reminders", description: "Reminders 24 hours before a scheduled visit.", enabled: true },
  { key: "newsletter", label: "Weekly market newsletter", description: "Pricing trends and investment insights, every Monday.", enabled: false },
  { key: "whatsappUpdates", label: "WhatsApp updates", description: "Enquiry and booking updates sent directly to WhatsApp.", enabled: true },
];

export const referralHistory = [
  { id: "r1", name: "Ananya Krishnan", status: "Purchase Completed", date: "2026-05-12", reward: 75000 },
  { id: "r2", name: "Rohit Malhotra", status: "Site Visit Scheduled", date: "2026-06-20", reward: 0 },
  { id: "r3", name: "Divya Prasad", status: "Purchase Completed", date: "2026-03-02", reward: 60000 },
  { id: "r4", name: "Karthik Iyer", status: "Enquiry Stage", date: "2026-07-01", reward: 0 },
];
