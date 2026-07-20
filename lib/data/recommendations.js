export const RECOMMENDATION_STATUSES = ["Sent", "Viewed", "Interested", "Site Visit Booked", "Declined"];

export const recommendations = [
  { id: "RC-401", ramId: "ram2", clientName: "Kiran Kumar Reddy", type: "Property", title: "Aparna Zenon — 2 BHK", refSlug: "aparna-zenon-2bhk", status: "Interested", date: "2026-07-14" },
  { id: "RC-402", ramId: "ram2", clientName: "Kiran Kumar Reddy", type: "Location", title: "Narsingi — high growth corridor", refSlug: "narsingi", status: "Viewed", date: "2026-07-10" },
  { id: "RC-403", ramId: "ram2", clientName: "Ayesha Khan", type: "Community", title: "Prestige Lakeside Habitat", refSlug: "prestige-lakeside", status: "Sent", date: "2026-07-16" },
  { id: "RC-404", ramId: "ram1", clientName: "Vikram Malhotra", type: "Builder", title: "Sobha — premium villa portfolio", refSlug: "sobha", status: "Site Visit Booked", date: "2026-07-05" },
  { id: "RC-405", ramId: "ram1", clientName: "Meenal Deshpande", type: "Property", title: "My Home Avatar — 3 BHK", refSlug: "aparna-zenon-2bhk", status: "Declined", date: "2026-06-28" },
  { id: "RC-406", ramId: "ram3", clientName: "Srinivas Rao", type: "Property", title: "Financial District — Grade A Office", refSlug: "financial-district-grade-a-office", status: "Sent", date: "2026-07-17" },
  { id: "RC-407", ramId: "ram3", clientName: "Divya Prasad", type: "Community", title: "Lodha Evergreen", refSlug: "lodha-evergreen", status: "Viewed", date: "2026-07-12" },
];

export function recommendationsForRam(ramId) {
  return recommendations.filter((r) => r.ramId === ramId);
}
