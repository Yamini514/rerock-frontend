import { img } from "@/lib/images";

export const portfolioSummary = {
  totalValue: 68400000,
  investedValue: 52200000,
  totalGrowthPct: 31,
  properties: 4,
  monthlyChange: 840000,
};

export const portfolioGrowth = [
  { month: "Feb", value: 55200000 },
  { month: "Mar", value: 57600000 },
  { month: "Apr", value: 59100000 },
  { month: "May", value: 61800000 },
  { month: "Jun", value: 64500000 },
  { month: "Jul", value: 68400000 },
];

export const myInvestments = [
  {
    id: "inv1",
    name: "Brigade Horizon — Tower A, 3 BHK",
    image: img.buildingModern1,
    purchasePrice: 11200000,
    currentValue: 12400000,
    growthPct: 18,
    status: "Under Construction",
    purchaseDate: "2024-03-12",
  },
  {
    id: "inv2",
    name: "Sobha Royal Crest — Villa 42",
    image: img.villaExterior1,
    purchasePrice: 42000000,
    currentValue: 52000000,
    growthPct: 24,
    status: "Ready To Move",
    purchaseDate: "2022-11-05",
  },
  {
    id: "inv3",
    name: "Financial District — Grade A Office",
    image: img.office1,
    purchasePrice: 22000000,
    currentValue: 28500000,
    growthPct: 34,
    status: "Available",
    purchaseDate: "2021-07-20",
  },
  {
    id: "inv4",
    name: "Aparna Zenon — 2 BHK",
    image: img.aerialCommunity1,
    purchasePrice: 5800000,
    currentValue: 6800000,
    growthPct: 22,
    status: "Ready To Move",
    purchaseDate: "2023-01-30",
  },
];

export const upcomingVisits = [
  { id: "v1", property: "Sobha Royal Crest, Villa 42", date: "2026-07-18", time: "11:00 AM", agent: "Priya Reddy" },
  { id: "v2", property: "Lodha Evergreen, Tower C", date: "2026-07-22", time: "4:30 PM", agent: "Rahul Sharma" },
];

export const savedProperties = [
  { id: "s1", title: "Lodha Evergreen — 4 BHK Duplex", image: img.buildingModern2, price: 31500000 },
  { id: "s2", title: "Prestige Lakeside — 3 BHK", image: img.villaExterior2, price: 16800000 },
  { id: "s3", title: "My Home Avatar — 3 BHK", image: img.buildingModern3, price: 18200000 },
];

export const recentEnquiries = [
  { id: "e1", property: "Brigade Horizon — Penthouse", status: "Awaiting callback", date: "2026-07-15" },
  { id: "e2", property: "Kondapur High-Street Retail", status: "Site visit scheduled", date: "2026-07-12" },
];

export const priceAlerts = [
  { id: "a1", property: "Brigade Horizon, Tower A", change: "+4.2%", period: "this quarter" },
  { id: "a2", property: "Kokapet, avg. price/sqft", change: "+2.8%", period: "this month" },
];

export const recommendations = [
  { id: "r1", title: "My Home Avatar — 4 BHK", image: img.buildingModern3, price: 24000000, reason: "Matches your saved search" },
  { id: "r2", title: "Narsingi Premium Plot", image: img.landPlot1, price: 18500000, reason: "High investment score" },
];

export const referralSummary = {
  totalEarned: 285000,
  pendingPayout: 45000,
  referralsCount: 6,
};

export const documents = [
  { id: "d1", name: "Sale Agreement — Sobha Royal Crest", date: "2022-11-05", type: "PDF" },
  { id: "d2", name: "Allotment Letter — Brigade Horizon", date: "2024-03-12", type: "PDF" },
  { id: "d3", name: "RERA Certificate — Financial District Office", date: "2021-07-20", type: "PDF" },
  { id: "d4", name: "Payment Receipt — Aparna Zenon", date: "2023-01-30", type: "PDF" },
];
