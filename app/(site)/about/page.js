import Image from "next/image";
import { Award, Heart, Target, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";
import { CountUp } from "@/components/ui/CountUp";
import { agents } from "@/lib/data/agents";
import { img } from "@/lib/images";

export const metadata = {
  title: "About Us",
  description: "REROCK Realty's story, mission, and the team behind Hyderabad's most trusted investment advisory.",
};

const milestones = [
  { title: "REROCK Realty founded", time: "2018", description: "Started as a two-person advisory focused on Gachibowli apartments.", done: true },
  { title: "Crossed 1,000 transactions", time: "2021", description: "Expanded coverage to Kokapet, Tellapur, and Narsingi.", done: true },
  { title: "Launched client portfolio dashboard", time: "2023", description: "Gave every client live visibility into their portfolio's growth.", done: true },
  { title: "₹2,000 Cr+ in assets advised", time: "2025", description: "Crossed ₹2,000 crore in cumulative transaction value.", done: true },
  { title: "Expanding beyond Hyderabad", time: "2027", description: "Bengaluru and Chennai coverage currently in pilot.", done: false },
];

const values = [
  { icon: Heart, title: "Client-first advisory", description: "We're compensated by builders, but our recommendations are judged solely on client outcomes." },
  { icon: Target, title: "Data over hype", description: "Every recommendation is backed by verified pricing, absorption, and RERA data — not sales pressure." },
  { icon: Award, title: "Uncompromising verification", description: "Every listing is independently checked for RERA status and legal title before it goes live." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[46vh] min-h-[360px] w-full overflow-hidden">
        <Image src={img.heroSkyline} alt="Hyderabad skyline" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[90rem] px-6 pb-12 md:px-10">
          <Badge tone="primary">Our Story</Badge>
          <h1 className="mt-4 font-display text-4xl text-white md:text-6xl">Where Dreams Meet Strategy</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">Built to make real estate investing effortless</h2>
            <p className="mt-4 leading-relaxed text-ink-muted md:text-lg">
              REROCK Realty was founded on a simple observation: Hyderabad&rsquo;s real estate market had plenty of listings,
              but almost no independent, data-backed advisory. We built the platform we wished existed — one that
              verifies every RERA filing, tracks real pricing trends, and gives clients a live view of their portfolio
              long after the sale closes.
            </p>
            <p className="mt-4 leading-relaxed text-ink-muted md:text-lg">
              Today, we work alongside six of the region&rsquo;s most trusted builders and advise on everything from a first
              apartment purchase to multi-crore commercial portfolios.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <Card className="p-4 text-center sm:p-6">
              <p className="font-tabular text-xl font-semibold text-primary sm:text-3xl"><CountUp value={2400} />+</p>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">Transactions Advised</p>
            </Card>
            <Card className="p-4 text-center sm:p-6">
              <p className="font-tabular text-xl font-semibold text-primary sm:text-3xl">₹<CountUp value={2000} />Cr+</p>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">Assets Under Advisory</p>
            </Card>
            <Card className="p-4 text-center sm:p-6">
              <p className="font-tabular text-xl font-semibold text-primary sm:text-3xl"><CountUp value={6} /></p>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">Builder Partners</p>
            </Card>
            <Card className="p-4 text-center sm:p-6">
              <p className="font-tabular text-xl font-semibold text-primary sm:text-3xl"><CountUp value={98} />%</p>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">Client Satisfaction</p>
            </Card>
          </div>
        </div>

        <section className="mt-20 border-t border-border pt-14">
          <h2 className="mb-8 font-display text-3xl text-ink">What we stand for</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title} className="p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-lg text-ink">{v.title}</p>
                <p className="mt-1.5 text-sm text-ink-muted">{v.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t border-border pt-14 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 font-display text-3xl text-ink">Our Journey</h2>
            <Card className="p-8">
              <Timeline items={milestones} />
            </Card>
          </div>
          {/* <div>
            <h2 className="mb-8 flex items-center gap-2 font-display text-3xl text-ink">
              <Users className="h-6 w-6 text-primary" /> Meet the Team
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {agents.map((a) => (
                <Card key={a.slug} className="flex items-center gap-3 p-4">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image src={a.avatar} alt={a.name} fill sizes="56px" className="object-cover" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{a.name}</p>
                    <p className="text-xs text-ink-muted">{a.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
}
