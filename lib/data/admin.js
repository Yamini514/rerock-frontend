export const revenueSummary = [
  { label: "Total Revenue", value: 184500000, changePct: 12.4, icon: "IndianRupee" },
  { label: "Active Leads", value: 342, changePct: 8.1, icon: "Users", isCount: true },
  { label: "Site Visits (MTD)", value: 96, changePct: -4.2, icon: "CalendarClock", isCount: true },
  { label: "Units Sold (MTD)", value: 28, changePct: 15.6, icon: "KeyRound", isCount: true },
];

export const revenueTrend = [
  { month: "Feb", revenue: 12800000 },
  { month: "Mar", revenue: 14200000 },
  { month: "Apr", revenue: 13600000 },
  { month: "May", revenue: 16100000 },
  { month: "Jun", revenue: 17800000 },
  { month: "Jul", revenue: 18450000 },
];

export const leadFunnel = [
  { stage: "New Leads", count: 1240 },
  { stage: "Contacted", count: 860 },
  { stage: "Site Visit", count: 412 },
  { stage: "Negotiation", count: 168 },
  { stage: "Closed Won", count: 82 },
];

export const propertyStatusBoard = [
  { status: "Available", count: 214, color: "success" },
  { status: "Reserved", count: 58, color: "warning" },
  { status: "Sold", count: 342, color: "primary" },
  { status: "Under Construction", count: 412, color: "info" },
];

export const pricingUpdates = [
  { id: "pu1", community: "Brigade Horizon", change: "+4.2%", updatedBy: "Rahul Sharma", date: "2026-07-16" },
  { id: "pu2", community: "Financial District Offices", change: "+3.1%", updatedBy: "System", date: "2026-07-14" },
  { id: "pu3", community: "Aparna Zenon", change: "+1.8%", updatedBy: "Sneha Rao", date: "2026-07-10" },
];

export const followUps = [
  { id: "f1", client: "Kiran Kumar Reddy", property: "Sobha Royal Crest", dueDate: "2026-07-18", priority: "High" },
  { id: "f2", client: "Ayesha Khan", property: "Brigade Horizon", dueDate: "2026-07-19", priority: "Medium" },
  { id: "f3", client: "Vikram Malhotra", property: "Financial District Office", dueDate: "2026-07-21", priority: "Low" },
];

export const recentActivities = [
  { id: "ac1", text: "New lead assigned to Priya Reddy — Prestige Lakeside", time: "12 min ago" },
  { id: "ac2", text: "Site visit completed — Lodha Evergreen, Tower C", time: "1 hr ago" },
  { id: "ac3", text: "Payment received — ₹18.5 L, Aparna Zenon", time: "3 hr ago" },
  { id: "ac4", text: "Document uploaded — RERA Certificate, Brigade Horizon", time: "5 hr ago" },
];

export const adminTasks = [
  { id: "t1", title: "Approve pricing update for Kokapet listings", done: false },
  { id: "t2", title: "Review RERA renewal for Sobha Royal Crest", done: false },
  { id: "t3", title: "Publish Q3 investment outlook blog", done: true },
  { id: "t4", title: "Onboard 2 new agents to CRM", done: false },
];

export const leadsTable = [
  { id: "L-1042", name: "Kiran Kumar Reddy", phone: "+91 98480 xxxxx", source: "Website", stage: "Site Visit", agent: "Priya Reddy", value: 28500000, date: "2026-07-10" },
  { id: "L-1041", name: "Ayesha Khan", phone: "+91 90003 xxxxx", source: "Referral", stage: "Negotiation", agent: "Rahul Sharma", value: 12400000, date: "2026-07-09" },
  { id: "L-1040", name: "Vikram Malhotra", phone: "+91 91000 xxxxx", source: "Instagram", stage: "Contacted", agent: "Sneha Rao", value: 28500000, date: "2026-07-08" },
  { id: "L-1039", name: "Meenal Deshpande", phone: "+91 98490 xxxxx", source: "Website", stage: "Closed Won", agent: "Arjun Varma", value: 6800000, date: "2026-07-05" },
  { id: "L-1038", name: "Srinivas Rao", phone: "+91 99000 xxxxx", source: "Walk-in", stage: "New Lead", agent: "Priya Reddy", value: 42000000, date: "2026-07-03" },
  { id: "L-1037", name: "Divya Prasad", phone: "+91 90100 xxxxx", source: "Referral", stage: "Site Visit", agent: "Rahul Sharma", value: 16800000, date: "2026-07-01" },
];
