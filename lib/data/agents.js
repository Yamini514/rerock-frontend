import { avatar } from "@/lib/images";

export const agents = [
  {
    slug: "rahul-sharma",
    name: "Rahul Sharma",
    role: "Senior Investment Advisor",
    phone: "+91 98480 12345",
    whatsapp: "919848012345",
    avatar: avatar(11),
    specialization: "Luxury Apartments & Villas",
    dealsClosed: 214,
    rating: 4.9,
    experienceYears: 11,
  },
  {
    slug: "priya-reddy",
    name: "Priya Reddy",
    role: "Investment Advisor",
    phone: "+91 98490 22456",
    whatsapp: "919849022456",
    avatar: avatar(47),
    specialization: "Gated Communities & Townships",
    dealsClosed: 168,
    rating: 4.8,
    experienceYears: 8,
  },
  {
    slug: "arjun-varma",
    name: "Arjun Varma",
    role: "Commercial & Plots Specialist",
    phone: "+91 90003 34567",
    whatsapp: "919000334567",
    avatar: avatar(14),
    specialization: "Open Plots & Commercial Assets",
    dealsClosed: 132,
    rating: 4.7,
    experienceYears: 9,
  },
  {
    slug: "sneha-rao",
    name: "Sneha Rao",
    role: "Client Relationship Manager",
    phone: "+91 91000 45678",
    whatsapp: "919100045678",
    avatar: avatar(45),
    specialization: "Portfolio & Post-Sale Advisory",
    dealsClosed: 189,
    rating: 4.9,
    experienceYears: 10,
  },
];

export function getAgent(slug) {
  return agents.find((a) => a.slug === slug);
}
