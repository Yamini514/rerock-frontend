import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description: "How REROCK Realty collects, uses, and protects your personal information.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    body: [
      "We collect information you provide directly, such as your name, phone number, and email address when you submit an enquiry, book a site visit, or create a client account.",
      "We also collect usage data automatically, including pages visited, search queries, and properties viewed or shortlisted, to improve recommendations and platform performance.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    body: [
      "Your information is used to respond to enquiries, schedule site visits, share relevant property recommendations, and maintain your client portfolio dashboard.",
      "We may use aggregated, anonymized data to publish market insights and pricing trend reports, such as those featured in the REROCK Journal.",
    ],
  },
  {
    id: "sharing-of-information",
    title: "3. Sharing of Information",
    body: [
      "We share your contact details with the relevant builder partner only after you express interest in a specific property, and only to the extent necessary to facilitate a site visit or booking.",
      "We do not sell your personal information to third parties for marketing purposes.",
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    body: [
      "We use industry-standard encryption and access controls to protect your data. Documents uploaded to your client dashboard are stored with restricted, role-based access.",
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information at any time by contacting privacy@rerockrealty.com.",
      "You can opt out of marketing communications while continuing to receive transactional updates related to an active enquiry or booking.",
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies",
    body: [
      "We use cookies to remember your preferences (such as dark mode), keep you signed in, and understand aggregate usage patterns across the platform.",
    ],
  },
  {
    id: "contact",
    title: "7. Contact Us",
    body: [
      "For any privacy-related questions, reach us at privacy@rerockrealty.com or write to our Financial District, Hyderabad office.",
    ],
  },
];

export default function PrivacyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" updatedDate="1 June 2026" sections={sections} />;
}
