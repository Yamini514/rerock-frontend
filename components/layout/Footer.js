"use client";

import Link from "next/link";
import { Globe, MessageCircle, Mail, MapPin, Phone, Rss, Send } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Properties", href: "/properties" },
      { label: "Communities", href: "/communities" },
      { label: "Builders", href: "/builders" },
      { label: "Locations", href: "/locations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing Trends", href: "/pricing-trends" },
      { label: "Investment Calculator", href: "/investment-calculator" },
      { label: "Compare Properties", href: "/compare" },
      { label: "Blog & Insights", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Client",
    links: [
      { label: "Client Dashboard", href: "/dashboard" },
      { label: "My Profile", href: "/profile" },
      { label: "Documents", href: "/profile/documents" },
      { label: "Admin Portal", href: "/admin" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface pb-28 pt-16 md:pb-16">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Logo variant="full" />
            <p className="mt-5 max-w-sm text-sm text-ink-muted">
              Your Trusted Real Estate Investment Partner — where dreams meet strategy.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Globe, label: "Website" },
                { icon: Send, label: "Instagram" },
                { icon: Rss, label: "LinkedIn" },
                { icon: MessageCircle, label: "YouTube" },
              ].map(({ icon: Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-ink-muted">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98480 12345</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Financial District, Hyderabad, Telangana, India</p>
            </div>
          </div>

          <div className="lg:max-w-sm lg:justify-self-end">
            <p className="text-sm font-semibold text-ink">Stay Ahead of the Market</p>
            <p className="mt-2 text-sm text-ink-muted">Weekly pricing insights, straight to your inbox.</p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input icon={Mail} placeholder="you@email.com" className="h-11" />
              <Button size="sm" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-12 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-ink-muted transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>© 2026 REROCK Realty. All rights reserved.</p>
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-primary">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="max-w-2xl">
            RERA Disclaimer: All project information is sourced from respective builders&rsquo; RERA filings. REROCK Realty
            is a registered real estate advisory and does not construct or develop properties. Prices and availability
            subject to change.
          </p>
        </div>
      </div>
    </footer>
  );
}
