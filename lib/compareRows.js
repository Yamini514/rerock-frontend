import { formatINR } from "@/lib/utils";
import { getLocation } from "@/lib/data/locations";
import { getBuilder } from "@/lib/data/builders";

export const compareRows = [
  { label: "Price", get: (p) => formatINR(p.price) },
  { label: "Price / sq.ft", get: (p) => `₹${p.pricePerSqft.toLocaleString("en-IN")}` },
  { label: "Area", get: (p) => `${p.area.toLocaleString("en-IN")} sq.ft` },
  { label: "Bedrooms", get: (p) => p.bedrooms ?? "—" },
  { label: "Bathrooms", get: (p) => p.bathrooms ?? "—" },
  { label: "Status", get: (p) => p.status },
  { label: "Type", get: (p) => p.type },
  { label: "Builder", get: (p) => getBuilder(p.builder)?.name },
  { label: "Location", get: (p) => getLocation(p.location)?.name },
  { label: "RERA", get: (p) => (p.rera ? "Approved" : "Pending") },
];
