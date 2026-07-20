// RAM-scoped referral tracking across their book of clients — distinct from the Client Portal's
// single-persona lib/data/profile.js referralHistory (that one is Kiran's own referrals sent).
export const referrals = [
  { id: "RF-501", ramId: "ram2", type: "Client Referral", referrer: "Kiran Kumar Reddy", referred: "Ananya Krishnan", status: "Purchase Completed", reward: 75000, date: "2026-05-12" },
  { id: "RF-502", ramId: "ram2", type: "Client Referral", referrer: "Kiran Kumar Reddy", referred: "Rohit Malhotra", status: "Site Visit Scheduled", reward: 0, date: "2026-06-20" },
  { id: "RF-503", ramId: "ram2", type: "Agent Referral", referrer: "Priya Reddy (Agent)", referred: "Naveen Chandra", status: "Purchase Completed", reward: 25000, date: "2026-06-28" },
  { id: "RF-504", ramId: "ram1", type: "Client Referral", referrer: "Vikram Malhotra", referred: "Rakesh Bhalla", status: "Enquiry Stage", reward: 0, date: "2026-07-01" },
  { id: "RF-505", ramId: "ram1", type: "Client Referral", referrer: "Meenal Deshpande", referred: "Sunita Verma", status: "Purchase Completed", reward: 45000, date: "2026-03-02" },
  { id: "RF-506", ramId: "ram3", type: "Client Referral", referrer: "Srinivas Rao", referred: "Ganesh Iyer", status: "Purchase Completed", reward: 60000, date: "2026-04-18" },
  { id: "RF-507", ramId: "ram3", type: "Agent Referral", referrer: "Sneha Rao (Agent)", referred: "Lavanya Menon", status: "Purchase Completed", reward: 30000, date: "2026-06-25" },
];

export function referralsForRam(ramId) {
  return referrals.filter((r) => r.ramId === ramId);
}
