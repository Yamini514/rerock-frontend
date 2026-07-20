// Agent-scoped follow-up tasks — richer than lib/data/admin.js's {client,property,dueDate,priority}
// shape (kept separate so the Admin Portal's Follow Ups page is untouched).
export const FOLLOW_UP_TYPES = ["Call", "WhatsApp", "Email", "Meeting"];

export const followUps = [
  { id: "FU-701", leadId: "LD-2101", clientName: "Karthik Iyer", type: "Call", dueDate: "2026-07-19", priority: "High", done: false, note: "Confirm site visit time and directions to Sobha Royal Crest.", agentSlug: "rahul-sharma" },
  { id: "FU-702", leadId: "LD-2102", clientName: "Fatima Sheikh", type: "WhatsApp", dueDate: "2026-07-20", priority: "High", done: false, note: "Send revised pricing with the 3% discount approval.", agentSlug: "rahul-sharma" },
  { id: "FU-703", leadId: "LD-2103", clientName: "Rohit Malhotra", type: "Email", dueDate: "2026-07-21", priority: "Medium", done: false, note: "Share warehouse lease-back proposal document.", agentSlug: "rahul-sharma" },
  { id: "FU-704", leadId: "LD-2105", clientName: "Swathi Nair", type: "Call", dueDate: "2026-07-22", priority: "Medium", done: false, note: "Confirm loan pre-approval amount before the visit.", agentSlug: "priya-reddy" },
  { id: "FU-705", leadId: "LD-2104", clientName: "Naveen Chandra", type: "Meeting", dueDate: "2026-07-08", priority: "Low", done: true, note: "Registration appointment at the sub-registrar office.", agentSlug: "priya-reddy" },
  { id: "FU-706", leadId: "LD-2109", clientName: "Harini Suresh", type: "WhatsApp", dueDate: "2026-07-19", priority: "Medium", done: false, note: "Send EMI calculator link and possession timeline.", agentSlug: "arjun-varma" },
  { id: "FU-707", leadId: "LD-2108", clientName: "Aditya Rane", type: "Call", dueDate: "2026-07-18", priority: "High", done: false, note: "Reconfirm facilities-team site visit at 3 PM today.", agentSlug: "arjun-varma" },
  { id: "FU-708", leadId: "LD-2107", clientName: "Pooja Bhatt", type: "Email", dueDate: "2026-07-20", priority: "Low", done: false, note: "Share retail frontage floor plan and footfall data.", agentSlug: "arjun-varma" },
  { id: "FU-709", leadId: "LD-2110", clientName: "Devansh Oberoi", type: "Call", dueDate: "2026-07-20", priority: "High", done: false, note: "Negotiate on floor-rise charges before Friday.", agentSlug: "sneha-rao" },
  { id: "FU-710", leadId: "LD-2112", clientName: "Yusuf Ali", type: "WhatsApp", dueDate: "2026-07-19", priority: "Medium", done: false, note: "Send retail unit size options ahead of the visit.", agentSlug: "sneha-rao" },
  { id: "FU-711", leadId: "LD-2111", clientName: "Lavanya Menon", type: "Meeting", dueDate: "2026-07-01", priority: "Low", done: true, note: "Handover walkthrough and key handover coordination.", agentSlug: "sneha-rao" },
];

export function followUpsForAgent(agentSlug) {
  return followUps.filter((f) => f.agentSlug === agentSlug);
}
