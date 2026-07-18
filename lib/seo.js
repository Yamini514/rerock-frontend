// Single source of truth for brand/SEO/geo facts, reused across metadata, JSON-LD, sitemap, and robots.
export const siteConfig = {
  name: "REROCK REALTY",
  tagline: "Where Dreams Meet Strategy",
  description:
    "A premium real estate investment platform for luxury villas, apartments, plots and commercial spaces across Hyderabad's most trusted communities and builders.",
  url: "https://www.rerockrealty.com",
  ogImage: "/opengraph-image",
  keywords: [
    "REROCK Realty",
    "Hyderabad real estate",
    "luxury villas Hyderabad",
    "apartments Kokapet",
    "Gachibowli property investment",
    "Financial District Hyderabad real estate",
    "real estate investment advisory",
    "RERA approved properties Hyderabad",
    "commercial real estate Hyderabad",
    "property investment calculator",
  ],
  phone: "+91 98480 12345",
  email: "hello@rerockrealty.com",
  social: {
    instagram: "https://instagram.com/rerockrealty",
    linkedin: "https://linkedin.com/company/rerockrealty",
    youtube: "https://youtube.com/@rerockrealty",
  },
  address: {
    street: "Financial District",
    locality: "Nanakramguda",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500032",
    country: "IN",
  },
  // Approximate coordinates for Financial District, Hyderabad — used for geo meta tags and JSON-LD.
  geo: {
    latitude: 17.4239,
    longitude: 78.3776,
  },
  areaServed: ["Kokapet", "Tellapur", "Financial District", "Gachibowli", "Miyapur", "Narsingi", "Kondapur", "Hyderabad"],
};

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Organization / RealEstateAgent structured data (schema.org), used site-wide for local SEO. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "City", name })),
    sameAs: Object.values(siteConfig.social),
  };
}
