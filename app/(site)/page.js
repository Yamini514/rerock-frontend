import { Hero } from "@/components/sections/Hero";
import { FeaturedCommunities } from "@/components/sections/FeaturedCommunities";
import { PropertyShowcase } from "@/components/sections/PropertyShowcase";
import { InvestmentOpportunities } from "@/components/sections/InvestmentOpportunities";
import { TrendingLocations } from "@/components/sections/TrendingLocations";
import { BuildersShowcase } from "@/components/sections/BuildersShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingTrends } from "@/components/sections/PricingTrends";
import { InvestmentCalculator } from "@/components/sections/InvestmentCalculator";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCommunities />
      <PropertyShowcase
        eyebrow="Premium Villas"
        title="Independent villas for those who want more"
        description="Private pools, landscaped gardens, and zero shared walls."
        type="Villa"
        href="/properties?type=Villa"
        tone="soft"
      />
      <PropertyShowcase
        eyebrow="Open Plots"
        title="Land banking, done right"
        description="RERA-approved, clear-title plots in tomorrow's growth corridors."
        type="Plot"
        href="/properties?type=Plot"
      />
      <InvestmentOpportunities />
      <PropertyShowcase
        eyebrow="Commercial Spaces"
        title="Grade A offices, retail & warehousing"
        description="Pre-leased assets with verified rental yields."
        type="Commercial"
        href="/properties?type=Commercial"
        tone="soft"
      />
      <TrendingLocations />
      <BuildersShowcase />
      <Testimonials />
      {/* <PricingTrends /> */}
      {/* <InvestmentCalculator /> */}
      <LatestBlogs />
      <FAQ />
    </>
  );
}
