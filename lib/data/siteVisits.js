export const SITE_VISIT_STATUSES = ["Scheduled", "Completed", "Cancelled", "Rescheduled"];

export const siteVisits = [
  { id: "SV-501", leadId: "LD-2101", clientName: "Karthik Iyer", propertySlug: "sobha-royal-crest-5bhk-villa", communitySlug: "sobha-royal-crest", agentSlug: "rahul-sharma", date: "2026-07-18", time: "11:00 AM", status: "Scheduled", notes: "" },
  { id: "SV-502", leadId: "LD-2102", clientName: "Fatima Sheikh", propertySlug: "narsingi-premium-open-plot", communitySlug: "sobha-royal-crest", agentSlug: "rahul-sharma", date: "2026-07-09", time: "4:00 PM", status: "Completed", notes: "Liked the corner-facing plot #22. Requested a 3% discount before booking." },
  { id: "SV-503", leadId: "LD-2103", clientName: "Rohit Malhotra", propertySlug: "gachibowli-logistics-warehouse", communitySlug: "lodha-evergreen", agentSlug: "rahul-sharma", date: "2026-07-24", time: "10:30 AM", status: "Scheduled", notes: "" },
  { id: "SV-504", leadId: "LD-2104", clientName: "Naveen Chandra", propertySlug: "brigade-horizon-3bhk-tower-a", communitySlug: "brigade-horizon", agentSlug: "priya-reddy", date: "2026-06-14", time: "3:00 PM", status: "Completed", notes: "Toured the 14th floor unit, loved the skyline view. Proceeded to negotiation." },
  { id: "SV-505", leadId: "LD-2105", clientName: "Swathi Nair", propertySlug: "prestige-lakeside-3bhk", communitySlug: "prestige-lakeside", agentSlug: "priya-reddy", date: "2026-07-22", time: "5:00 PM", status: "Scheduled", notes: "" },
  { id: "SV-506", leadId: "LD-2106", clientName: "Imran Qureshi", propertySlug: "financial-district-grade-a-office", communitySlug: "brigade-horizon", agentSlug: "priya-reddy", date: "2026-06-15", time: "1:00 PM", status: "Cancelled", notes: "Client rescheduled twice, then went with a competitor property." },
  { id: "SV-507", leadId: "LD-2108", clientName: "Aditya Rane", propertySlug: "gachibowli-logistics-warehouse", communitySlug: "lodha-evergreen", agentSlug: "arjun-varma", date: "2026-07-18", time: "3:00 PM", status: "Scheduled", notes: "" },
  { id: "SV-508", leadId: "LD-2109", clientName: "Harini Suresh", propertySlug: "aparna-zenon-2bhk", communitySlug: "aparna-zenon", agentSlug: "arjun-varma", date: "2026-07-13", time: "11:30 AM", status: "Rescheduled", notes: "Client asked to move from the 12th to the 19th, waiting on confirmation." },
  { id: "SV-509", leadId: "LD-2110", clientName: "Devansh Oberoi", propertySlug: "aparna-zenon-2bhk", communitySlug: "aparna-zenon", agentSlug: "sneha-rao", date: "2026-07-11", time: "10:00 AM", status: "Completed", notes: "Visited two 2 BHK units, preferred the corner unit facing the park." },
  { id: "SV-510", leadId: "LD-2111", clientName: "Lavanya Menon", propertySlug: "prestige-lakeside-3bhk", communitySlug: "prestige-lakeside", agentSlug: "sneha-rao", date: "2026-06-10", time: "2:00 PM", status: "Completed", notes: "Toured the show-flat, loved the lake view — proceeded to booking." },
  { id: "SV-511", leadId: "LD-2112", clientName: "Yusuf Ali", propertySlug: "kondapur-high-street-retail", communitySlug: "my-home-avatar", agentSlug: "sneha-rao", date: "2026-07-18", time: "1:30 PM", status: "Scheduled", notes: "" },
  { id: "SV-512", leadId: "LD-2107", clientName: "Pooja Bhatt", propertySlug: "kondapur-high-street-retail", communitySlug: "my-home-avatar", agentSlug: "arjun-varma", date: "2026-07-20", time: "12:00 PM", status: "Scheduled", notes: "" },
];

export function getSiteVisit(id) {
  return siteVisits.find((v) => v.id === id);
}

export function siteVisitsForAgent(agentSlug) {
  return siteVisits.filter((v) => v.agentSlug === agentSlug);
}
