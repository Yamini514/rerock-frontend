export const commissionByAgent = {
  "rahul-sharma": {
    current: 428000,
    pending: 156000,
    paid: 3840000,
    performanceBonus: 75000,
    history: [
      { id: "CM-901", client: "Vikram Malhotra", property: "Financial District — Grade A Office", amount: 570000, status: "Paid", date: "2026-05-18" },
      { id: "CM-902", client: "Divya Prasad", property: "Prestige Lakeside — 3 BHK", amount: 336000, status: "Paid", date: "2026-03-02" },
      { id: "CM-903", client: "Fatima Sheikh", property: "Narsingi Premium Open Plot", amount: 156000, status: "Pending", date: "2026-07-20" },
    ],
  },
  "priya-reddy": {
    current: 312000,
    pending: 256000,
    paid: 4120000,
    performanceBonus: 60000,
    history: [
      { id: "CM-904", client: "Kiran Kumar Reddy", property: "Sobha Royal Crest — Villa 42", amount: 1040000, status: "Paid", date: "2022-11-05" },
      { id: "CM-905", client: "Naveen Chandra", property: "Brigade Horizon — Tower A, 3 BHK", amount: 248000, status: "Paid", date: "2026-06-28" },
      { id: "CM-906", client: "Swathi Nair", property: "Prestige Lakeside — 3 BHK", amount: 256000, status: "Pending", date: "2026-07-25" },
    ],
  },
  "arjun-varma": {
    current: 184000,
    pending: 98000,
    paid: 2760000,
    performanceBonus: 40000,
    history: [
      { id: "CM-907", client: "Srinivas Rao", property: "Financial District Office", amount: 570000, status: "Paid", date: "2021-07-20" },
      { id: "CM-908", client: "Aditya Rane", property: "Gachibowli Logistics Warehouse", amount: 840000, status: "Pending", date: "2026-07-28" },
      { id: "CM-909", client: "Harini Suresh", property: "Aparna Zenon — 2 BHK", amount: 98000, status: "Pending", date: "2026-07-26" },
    ],
  },
  "sneha-rao": {
    current: 296000,
    pending: 0,
    paid: 3480000,
    performanceBonus: 65000,
    history: [
      { id: "CM-910", client: "Lavanya Menon", property: "Prestige Lakeside — 3 BHK", amount: 258000, status: "Paid", date: "2026-06-25" },
      { id: "CM-911", client: "Divya Prasad", property: "Aparna Zenon — 2 BHK", amount: 102000, status: "Paid", date: "2023-01-30" },
      { id: "CM-912", client: "Ayesha Khan", property: "Brigade Horizon — Tower A, 3 BHK", amount: 186000, status: "Paid", date: "2024-01-20" },
    ],
  },
};

export function commissionForAgent(agentSlug) {
  return commissionByAgent[agentSlug] || { current: 0, pending: 0, paid: 0, performanceBonus: 0, history: [] };
}
