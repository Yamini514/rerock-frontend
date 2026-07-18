import { properties } from "@/lib/data/properties";
import { communities } from "@/lib/data/communities";
import { builders } from "@/lib/data/builders";
import { locations } from "@/lib/data/locations";
import { blogs } from "@/lib/data/blogs";
import { siteConfig } from "@/lib/seo";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/properties", priority: 0.9, changeFrequency: "daily" },
  { path: "/communities", priority: 0.9, changeFrequency: "weekly" },
  { path: "/builders", priority: 0.8, changeFrequency: "weekly" },
  { path: "/locations", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/pricing-trends", priority: 0.7, changeFrequency: "weekly" },
  { path: "/investment-calculator", priority: 0.6, changeFrequency: "monthly" },
  { path: "/compare", priority: 0.5, changeFrequency: "monthly" },
  { path: "/search", priority: 0.4, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();

  const toEntry = (path, priority = 0.6, changeFrequency = "weekly") => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    ...staticRoutes.map((r) => toEntry(r.path, r.priority, r.changeFrequency)),
    ...properties.map((p) => toEntry(`/properties/${p.slug}`, 0.8, "weekly")),
    ...communities.map((c) => toEntry(`/communities/${c.slug}`, 0.8, "weekly")),
    ...builders.map((b) => toEntry(`/builders/${b.slug}`, 0.6, "monthly")),
    ...locations.map((l) => toEntry(`/locations/${l.slug}`, 0.7, "weekly")),
    ...blogs.map((post) => toEntry(`/blog/${post.slug}`, 0.6, "monthly")),
  ];
}
