export const ramTasks = [
  { id: "RT-701", ramId: "ram2", title: "Prepare Q3 portfolio review for Kiran Kumar Reddy", dueDate: "2026-07-18", done: false, relatedClient: "Kiran Kumar Reddy" },
  { id: "RT-702", ramId: "ram2", title: "Follow up on Prestige Lakeside recommendation", dueDate: "2026-07-18", done: false, relatedClient: "Ayesha Khan" },
  { id: "RT-703", ramId: "ram2", title: "Send market analysis — Financial District", dueDate: "2026-07-20", done: false, relatedClient: null },
  { id: "RT-704", ramId: "ram1", title: "Confirm site meeting with Vikram Malhotra", dueDate: "2026-07-18", done: false, relatedClient: "Vikram Malhotra" },
  { id: "RT-705", ramId: "ram1", title: "Review EMI restructuring options for Meenal Deshpande", dueDate: "2026-07-16", done: true, relatedClient: "Meenal Deshpande" },
  { id: "RT-706", ramId: "ram3", title: "Prepare rental yield analysis for Srinivas Rao", dueDate: "2026-07-18", done: false, relatedClient: "Srinivas Rao" },
  { id: "RT-707", ramId: "ram3", title: "Coordinate with agent on Divya Prasad's resale listing", dueDate: "2026-07-19", done: false, relatedClient: "Divya Prasad" },
];

export function tasksForRam(ramId) {
  return ramTasks.filter((t) => t.ramId === ramId);
}
