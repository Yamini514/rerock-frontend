"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Search, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { img, avatar } from "@/lib/images";
import { locations } from "@/lib/data/locations";
import { builders } from "@/lib/data/builders";
import { cn } from "@/lib/utils";

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

const collage = [
  { image: img.heroDusk1, alt: "Hyderabad skyline at dusk" },
  { image: img.buildingModern1, alt: "Modern residential tower" },
  { image: img.villaExterior2, alt: "Premium villa exterior" },
];

const avatarSeeds = [12, 45, 23, 31];

function HeroSelect({ value, onChange, children }) {
  return (
    <span className="relative flex items-center">
      <select
        value={value}
        onChange={onChange}
        className="h-12 w-full appearance-none rounded-input border border-border-strong bg-surface px-4 pr-10 text-sm text-ink outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-ink-faint" strokeWidth={2} />
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
    <section className="relative">
      {/* Ambient gradient blobs — depth without a full-bleed photo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-12%] h-[36rem] w-[36rem] rounded-full bg-primary-soft/70 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent-soft/60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid grid-cols-1 max-w-[90rem] gap-10 px-6 pb-10 pt-4 md:gap-14 md:px-10 md:pb-16 md:pt-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10">
        {/* Left — copy, search, stats */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Where Dreams Meet Strategy
          </span>
          <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.1] text-ink sm:mt-6 sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[4.25rem]">
            Real estate investing,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">made effortless.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-ink-muted sm:mt-6 sm:text-lg">
            REROCK REALTY curates Hyderabad&rsquo;s most trusted communities, builders, and commercial assets —
            backed by transparent pricing data and dedicated advisory.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass mt-8 rounded-dialog p-3 shadow-[var(--shadow-lg)] sm:mt-10 md:p-4"
          >
            <div className="flex w-fit gap-1 rounded-pill bg-surface-soft p-1.5">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "rounded-pill px-5 py-2 text-sm font-medium transition-colors",
                    tab === t.key ? "bg-primary text-white" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto]">
              <div className="col-span-2 md:col-span-1">
                <HeroSelect value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Any Location</option>
                  {locations.map((l) => (
                    <option key={l.slug} value={l.slug}>{l.name}</option>
                  ))}
                </HeroSelect>
              </div>
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
              <Button size="lg" onClick={handleSearch} className="col-span-2 md:col-span-1 md:w-14 md:px-0">
                <Search className="h-5 w-5" />
                <span className="md:hidden">Search Properties</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 flex flex-nowrap gap-x-6 overflow-x-auto pb-1 [scrollbar-width:none] sm:mt-10 md:gap-x-10"
          >
            {stats.map((s, i) => (
              <div key={s.label} className={cn("shrink-0", i > 0 && "border-l border-border pl-6 md:pl-8")}>
                <p className="whitespace-nowrap font-tabular text-xl font-semibold text-ink sm:text-2xl md:text-3xl">
                  <CountUp value={s.value} />
                  {s.suffix}
                </p>
                <p className="whitespace-nowrap mt-1 text-xs text-ink-muted sm:text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — bento photo collage + floating social-proof card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative pb-8 sm:pb-10 lg:pb-0"
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="relative col-span-2 h-48 overflow-hidden rounded-card sm:h-56 md:h-64">
              <Image src={collage[0].image} alt={collage[0].alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" priority />
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }} className="relative -mt-4 hidden h-40 overflow-hidden rounded-card sm:block md:h-48">
              <Image src={collage[1].image} alt={collage[1].alt} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }} className="relative mt-4 hidden h-40 overflow-hidden rounded-card sm:block md:h-48">
              <Image src={collage[2].image} alt={collage[2].alt} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass absolute -bottom-4 left-4 rounded-card p-3 shadow-[var(--shadow-lg)] sm:-bottom-6 sm:left-8 sm:p-4"
          >
            <div className="flex -space-x-3">
              {avatarSeeds.map((seed) => (
                <span key={seed} className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-[var(--color-surface)]">
                  <Image src={avatar(seed)} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="mt-2.5 text-sm font-semibold text-ink">900+ Investors</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
              <Star className="h-3 w-3 fill-primary text-primary" /> 4.9 average rating
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip — scrolling builder wordmarks */}
      <div className="relative border-t border-border py-6 sm:py-8">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-faint sm:mb-5">
          Trusted by Hyderabad&rsquo;s Leading Developers
        </p>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
            {[...builders, ...builders].map((b, i) => (
              <span key={`${b.slug}-${i}`} className="whitespace-nowrap font-display text-xl text-ink-faint">
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
