export const faqs = [
  {
    category: "Buying",
    q: "Is REROCK Realty a builder or an advisory?",
    a: "REROCK Realty is a registered real estate investment advisory. We don't construct properties — we curate verified inventory from India's most trusted builders and guide you through the entire buying journey.",
  },
  {
    category: "Buying",
    q: "What's your fee structure for buyers?",
    a: "Our advisory services are free for buyers — we're compensated by our builder partners, and pricing shown to you always matches the builder's official price list.",
  },
  {
    category: "Buying",
    q: "Can I negotiate the price shown on the platform?",
    a: "Listed prices reflect the builder's current price list. Our advisors can flag applicable festive or bulk-booking offers, but we don't alter builder pricing directly.",
  },
  {
    category: "Legal & RERA",
    q: "How do you verify RERA approval and legal title?",
    a: "Every listing on our platform is cross-checked against the Telangana RERA portal, and our legal team independently verifies encumbrance certificates before a property is published.",
  },
  {
    category: "Legal & RERA",
    q: "What happens if a project's possession is delayed?",
    a: "RERA entitles you to compensation for delays beyond the committed date. Our advisory team helps clients file and track these claims where applicable.",
  },
  {
    category: "Financing",
    q: "Do you help with home loans and EMI planning?",
    a: "Our advisors work with 12+ leading banks and NBFCs to help you secure the best rate, and our built-in EMI calculator helps you plan affordability before you commit.",
  },
  {
    category: "Financing",
    q: "What's the typical down payment expected?",
    a: "Most lenders finance 75-80% of the property value, meaning a 20-25% down payment. Our affordability calculator can model this against your income.",
  },
  {
    category: "Portfolio",
    q: "Can I track my portfolio after purchase?",
    a: "Yes — every client gets access to a personal dashboard showing live portfolio valuation, growth charts, documents, and price alerts for their properties.",
  },
  {
    category: "Portfolio",
    q: "How often is pricing data updated?",
    a: "Community and location pricing data is refreshed quarterly, with select high-velocity markets like Kokapet updated monthly.",
  },
  {
    category: "Investing",
    q: "Do you offer investment advisory for commercial properties?",
    a: "Yes — our commercial team specializes in pre-leased Grade A offices, retail, and warehousing with verified rental yield data.",
  },
  {
    category: "Investing",
    q: "What's the minimum investment ticket size?",
    a: "Open plots start around ₹18 L, while apartments typically start from ₹65-70 L depending on location. Commercial assets generally require ₹80 L+.",
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));
