"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { img } from "@/lib/images";
import { locations } from "@/lib/data/locations";

const tabs = [
  { key: "buy", label: "Buy" },
  { key: "invest", label: "Invest" },
  { key: "commercial", label: "Commercial" },
];

const stats = [
  { label: "Properties Curated", value: 900, suffix: "+" },
  { label: "Avg. Portfolio Growth", value: 22, suffix: "%" },
  { label: "Trusted Builders", value: 6 },
  { label: "Cr+ Transacted", value: 480, suffix: "+" },
];

// Deliberately theme-independent — the search card is a light "control surface"
// floating over the photo in both light and dark mode, like Airbnb/Zillow-style heroes.
function HeroSelect({ value, onChange, children }) {
  return (
    <span className="relative flex items-center">
      <select
        value={value}
        onChange={onChange}
        className="h-12 w-full appearance-none rounded-input border border-zinc-200 bg-white px-4 pr-10 text-sm text-zinc-900 outline-none transition-shadow focus:ring-4 focus:ring-primary/10"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-zinc-400" strokeWidth={2} />
    </span>
  );
}

export function Hero() {
  const [tab, setTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const router = useRouter();

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (budget) params.set("budget", budget);
    if (tab) params.set("intent", tab);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={img.heroDusk1} alt="Luxury Hyderabad skyline" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-6 pb-24  md:px-10 md:pb-32 pt-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur">
            Where Dreams Meet Strategy
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-white md:text-7xl">
            Real estate investing, made effortless.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            REROCK REALTY curates Hyderabad&rsquo;s most trusted communities, builders, and commercial assets —
            backed by transparent pricing data and dedicated advisory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-4xl rounded-dialog border border-black/5 bg-white/95 p-3 shadow-[var(--shadow-lg)] backdrop-blur md:p-4"
        >
          <div className="flex gap-1 rounded-pill bg-zinc-100 p-1.5 w-fit">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-pill px-5 py-2 text-sm font-medium transition-colors ${
                  tab === t.key ? "bg-primary text-white" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto]">
            <HeroSelect value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Any Location</option>
              {locations.map((l) => (
                <option key={l.slug} value={l.slug}>{l.name}</option>
              ))}
            </HeroSelect>
            <HeroSelect value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </HeroSelect>
            <HeroSelect value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Any Budget</option>
              <option value="0-10000000">Under ₹1 Cr</option>
              <option value="10000000-30000000">₹1 Cr – ₹3 Cr</option>
              <option value="30000000-100000000">₹3 Cr+</option>
            </HeroSelect>
            <Button size="lg" onClick={handleSearch} className="md:w-14">
              <Search className="h-5 w-5" />
              <span className="md:hidden">Search Properties</span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-white/15 pt-8 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-tabular text-3xl font-semibold text-white md:text-4xl">
                <CountUp value={s.value} />
                {s.suffix}
              </p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
