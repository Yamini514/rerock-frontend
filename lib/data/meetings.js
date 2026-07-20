export const MEETING_STATUSES = ["Scheduled", "Completed", "Cancelled", "Rescheduled"];

export const meetings = [
  { id: "MT-301", ramId: "ram2", clientName: "Kiran Kumar Reddy", type: "Online", date: "2026-07-19", time: "5:00 PM", status: "Scheduled", link: "https://meet.rerockrealty.com/kiran-reddy", notes: "" },
  { id: "MT-302", ramId: "ram2", clientName: "Ayesha Khan", type: "Site", date: "2026-07-18", time: "2:00 PM", status: "Scheduled", link: "", notes: "" },
  { id: "MT-303", ramId: "ram2", clientName: "Kiran Kumar Reddy", type: "Online", date: "2026-06-20", time: "4:00 PM", status: "Completed", link: "https://meet.rerockrealty.com/kiran-reddy", notes: "Reviewed Q2 portfolio growth and discussed diversifying into commercial assets." },
  { id: "MT-304", ramId: "ram1", clientName: "Vikram Malhotra", type: "Site", date: "2026-07-21", time: "11:00 AM", status: "Scheduled", link: "", notes: "" },
  { id: "MT-305", ramId: "ram1", clientName: "Meenal Deshpande", type: "Online", date: "2026-07-15", time: "6:00 PM", status: "Completed", link: "https://meet.rerockrealty.com/meenal-deshpande", notes: "Discussed EMI restructuring options for her Aparna Zenon unit." },
  { id: "MT-306", ramId: "ram1", clientName: "Vikram Malhotra", type: "Online", date: "2026-07-10", time: "3:00 PM", status: "Rescheduled", link: "https://meet.rerockrealty.com/vikram-malhotra", notes: "Client requested to move to the 21st due to travel." },
  { id: "MT-307", ramId: "ram3", clientName: "Srinivas Rao", type: "Online", date: "2026-07-20", time: "10:00 AM", status: "Scheduled", link: "https://meet.rerockrealty.com/srinivas-rao", notes: "" },
  { id: "MT-308", ramId: "ram3", clientName: "Divya Prasad", type: "Site", date: "2026-07-08", time: "1:00 PM", status: "Completed", notes: "Walked through her Aparna Zenon unit ahead of a potential resale listing.", link: "" },
];

export function meetingsForRam(ramId) {
  return meetings.filter((m) => m.ramId === ramId);
}
