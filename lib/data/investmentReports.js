export const REPORT_TYPES = ["Investment Report", "Market Analysis", "Portfolio Report", "Recommendation Report"];

export const investmentReports = [
  { id: "RPT-601", ramId: "ram2", clientName: "Kiran Kumar Reddy", type: "Portfolio Report", title: "Q2 2026 Portfolio Review — Kiran Kumar Reddy", date: "2026-07-01", fileType: "PDF" },
  { id: "RPT-602", ramId: "ram2", clientName: "Ayesha Khan", type: "Recommendation Report", title: "Prestige Lakeside — Investment Rationale", date: "2026-07-16", fileType: "PDF" },
  { id: "RPT-603", ramId: "ram2", clientName: null, type: "Market Analysis", title: "Financial District — Q3 2026 Outlook", date: "2026-07-10", fileType: "PDF" },
  { id: "RPT-604", ramId: "ram1", clientName: "Vikram Malhotra", type: "Investment Report", title: "Commercial Office Diversification Plan", date: "2026-06-30", fileType: "PDF" },
  { id: "RPT-605", ramId: "ram1", clientName: "Meenal Deshpande", type: "Portfolio Report", title: "H1 2026 Portfolio Summary — Meenal Deshpande", date: "2026-06-28", fileType: "PDF" },
  { id: "RPT-606", ramId: "ram3", clientName: "Srinivas Rao", type: "Investment Report", title: "Grade A Office — Rental Yield Analysis", date: "2026-07-17", fileType: "PDF" },
  { id: "RPT-607", ramId: "ram3", clientName: null, type: "Market Analysis", title: "North Hyderabad — Miyapur Growth Corridor", date: "2026-07-05", fileType: "PDF" },
];

export function investmentReportsForRam(ramId) {
  return investmentReports.filter((r) => r.ramId === ramId);
}
