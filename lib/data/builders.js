export const builders = [
  {
    slug: "brigade",
    name: "Brigade Group",
    established: 1986,
    projectsCount: 250,
    rating: 4.7,
    headquarters: "Bengaluru, Karnataka",
    sqftDelivered: "70 million sq.ft",
    description:
      "One of South India's most trusted developers, known for large-scale integrated townships and consistent delivery.",
    headline: "40 years of building trust across South India",
    awards: ["Developer of the Year — Realty+ 2025", "Best Integrated Township — CREDAI 2024"],
  },
  {
    slug: "prestige",
    name: "Prestige Group",
    established: 1986,
    projectsCount: 300,
    rating: 4.8,
    headquarters: "Bengaluru, Karnataka",
    sqftDelivered: "180 million sq.ft",
    description:
      "Award-winning developer with a diversified portfolio spanning residential, commercial and hospitality.",
    headline: "India's most awarded real estate brand, 3 years running",
    awards: ["India's Most Trusted Real Estate Brand — 2023, 2024, 2025", "Best Luxury Project — ET RealEstate 2025"],
  },
  {
    slug: "sobha",
    name: "Sobha Limited",
    established: 1995,
    projectsCount: 180,
    rating: 4.9,
    headquarters: "Bengaluru, Karnataka",
    sqftDelivered: "140 million sq.ft",
    description:
      "Renowned for backward-integrated construction and uncompromising build quality — the benchmark for premium delivery.",
    headline: "Engineering excellence in every square foot",
    awards: ["Best Construction Quality — CNBC Awaaz 2024", "Villa Developer of the Year — CREDAI 2025"],
  },
  {
    slug: "lodha",
    name: "Lodha Group",
    established: 1980,
    projectsCount: 220,
    rating: 4.6,
    headquarters: "Mumbai, Maharashtra",
    sqftDelivered: "300 million sq.ft",
    description:
      "India's largest residential developer by sales value, delivering iconic addresses across metros.",
    headline: "India's No.1 real estate developer, 8 years running",
    awards: ["No.1 Real Estate Developer — Forbes India 2025", "Best High-Rise Development — ET RealEstate 2024"],
  },
  {
    slug: "aparna",
    name: "Aparna Constructions",
    established: 1990,
    projectsCount: 120,
    rating: 4.5,
    headquarters: "Hyderabad, Telangana",
    sqftDelivered: "60 million sq.ft",
    description: "Hyderabad's homegrown developer trusted for large gated townships with resort-style amenities.",
    headline: "Building Hyderabad's skyline for three decades",
    awards: ["Best Township — Telangana Real Estate Awards 2024"],
  },
  {
    slug: "my-home",
    name: "My Home Group",
    established: 1981,
    projectsCount: 90,
    rating: 4.7,
    headquarters: "Hyderabad, Telangana",
    sqftDelivered: "45 million sq.ft",
    description: "Diversified conglomerate delivering landmark high-rises and integrated townships in Hyderabad.",
    headline: "Landmark addresses, engineered to last generations",
    awards: ["Best Mixed-Use Development — Telangana Real Estate Awards 2025"],
  },
];

export function getBuilder(slug) {
  return builders.find((b) => b.slug === slug);
}
