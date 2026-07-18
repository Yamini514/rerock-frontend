import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing use of the REROCK Realty platform and advisory services.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using the REROCK Realty platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please discontinue use of the platform.",
    ],
  },
  {
    id: "advisory-nature",
    title: "2. Nature of Our Services",
    body: [
      "REROCK Realty is a real estate advisory platform. We are not a builder, developer, or registered real estate agent under RERA in our own right for the properties we advise on — all transactions are conducted directly between the client and the respective builder.",
      "Pricing, availability, and possession timelines displayed on the platform are sourced from builder price lists and RERA filings, and are subject to change without notice.",
    ],
  },
  {
    id: "accounts",
    title: "3. Client Accounts",
    body: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
      "You agree to provide accurate and current information when creating an account or submitting an enquiry.",
    ],
  },
  {
    id: "no-guarantee",
    title: "4. No Guarantee of Investment Returns",
    body: [
      "Pricing trends, ROI projections, and investment scores displayed on the platform are estimates based on historical data and are not guarantees of future performance.",
      "Real estate investments carry inherent market risk, and REROCK Realty does not guarantee any specific rate of return or appreciation.",
    ],
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property",
    body: [
      "All content on this platform, including design, text, graphics, and data visualizations, is the property of REROCK Realty and may not be reproduced without written consent.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "6. Limitation of Liability",
    body: [
      "REROCK Realty shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform or reliance on any information presented.",
    ],
  },
  {
    id: "governing-law",
    title: "7. Governing Law",
    body: [
      "These terms are governed by the laws of India, with courts in Hyderabad, Telangana having exclusive jurisdiction over any disputes.",
    ],
  },
];

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms of Service" updatedDate="1 June 2026" sections={sections} />;
}
