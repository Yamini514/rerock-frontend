export const performanceByAgent = {
  "rahul-sharma": {
    leadsConverted: 42,
    siteVisits: 96,
    salesClosed: 18,
    revenueGenerated: 268000000,
    commissionTotal: 4268000,
    monthlyRanking: 1,
    trend: [
      { month: "Feb", revenue: 32000000 },
      { month: "Mar", revenue: 38400000 },
      { month: "Apr", revenue: 41200000 },
      { month: "May", revenue: 46800000 },
      { month: "Jun", revenue: 52600000 },
      { month: "Jul", revenue: 57000000 },
    ],
  },
  "priya-reddy": {
    leadsConverted: 34,
    siteVisits: 78,
    salesClosed: 14,
    revenueGenerated: 198000000,
    commissionTotal: 4432000,
    monthlyRanking: 3,
    trend: [
      { month: "Feb", revenue: 24000000 },
      { month: "Mar", revenue: 27600000 },
      { month: "Apr", revenue: 30100000 },
      { month: "May", revenue: 33800000 },
      { month: "Jun", revenue: 38400000 },
      { month: "Jul", revenue: 43200000 },
    ],
  },
  "arjun-varma": {
    leadsConverted: 26,
    siteVisits: 61,
    salesClosed: 10,
    revenueGenerated: 156000000,
    commissionTotal: 2944000,
    monthlyRanking: 4,
    trend: [
      { month: "Feb", revenue: 18200000 },
      { month: "Mar", revenue: 20100000 },
      { month: "Apr", revenue: 21800000 },
      { month: "May", revenue: 24600000 },
      { month: "Jun", revenue: 27200000 },
      { month: "Jul", revenue: 29800000 },
    ],
  },
  "sneha-rao": {
    leadsConverted: 38,
    siteVisits: 84,
    salesClosed: 16,
    revenueGenerated: 224000000,
    commissionTotal: 3776000,
    monthlyRanking: 2,
    trend: [
      { month: "Feb", revenue: 28000000 },
      { month: "Mar", revenue: 31600000 },
      { month: "Apr", revenue: 34200000 },
      { month: "May", revenue: 39800000 },
      { month: "Jun", revenue: 44600000 },
      { month: "Jul", revenue: 48200000 },
    ],
  },
};

export function performanceForAgent(agentSlug) {
  return performanceByAgent[agentSlug];
}
