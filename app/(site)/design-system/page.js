"use client";

import { useState } from "react";
import {
  Building2,
  Heart,
  IndianRupee,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox, Radio, Switch } from "@/components/ui/Checkbox";
import { Tabs } from "@/components/ui/Tabs";
import { Alert } from "@/components/ui/Alert";
import { Modal } from "@/components/ui/Modal";
import { BottomSheet, SideDrawer } from "@/components/ui/Sheet";
import { useToast } from "@/components/ui/Toast";
import { Skeleton, SkeletonCard, SkeletonGrid } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState, SuccessState, PermissionState, NoResultsState } from "@/components/ui/StateScreen";
import { Stepper } from "@/components/ui/Stepper";
import { Timeline } from "@/components/ui/Timeline";
import { StatCard } from "@/components/ui/StatCard";
import { CountUp } from "@/components/ui/CountUp";
import { PricingTrendChart } from "@/components/charts/PricingTrendChart";
import { LeadFunnelChart } from "@/components/charts/LeadFunnelChart";
import { communities } from "@/lib/data/communities";
import { leadFunnel } from "@/lib/data/admin";

const colorGroups = [
  { name: "Background", token: "bg", cls: "bg-bg" },
  { name: "Surface", token: "surface", cls: "bg-surface" },
  { name: "Surface Soft", token: "surface-soft", cls: "bg-surface-soft" },
  { name: "Ink", token: "ink", cls: "bg-ink" },
  { name: "Ink Muted", token: "ink-muted", cls: "bg-ink-muted" },
  { name: "Primary — Burnt Orange", token: "primary", cls: "bg-primary" },
  { name: "Primary Dark", token: "primary-dark", cls: "bg-primary-dark" },
  { name: "Accent — Copper", token: "accent", cls: "bg-accent" },
  { name: "Success", token: "success", cls: "bg-success" },
  { name: "Warning", token: "warning", cls: "bg-warning" },
  { name: "Danger", token: "danger", cls: "bg-danger" },
  { name: "Info", token: "info", cls: "bg-info" },
];

function Section({ title, description, children }) {
  return (
    <section className="border-t border-border py-14 first:border-t-0 first:pt-0">
      <div className="mb-8">
        <h2 className="font-display text-3xl text-ink">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-ink-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [radioVal, setRadioVal] = useState("a");
  const [switchOn, setSwitchOn] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16 md:px-10">
      <div className="mb-16">
        <Badge tone="primary">Living Style Guide</Badge>
        <h1 className="mt-4 font-display text-5xl text-ink md:text-6xl">Design System</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Every color, type scale, and component that powers REROCK REALTY — one source of truth for
          desktop and mobile.
        </p>
      </div>

      <Section title="Color Palette" description="Semantic tokens driven by CSS variables — flip automatically with dark mode.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {colorGroups.map((c) => (
            <div key={c.token} className="overflow-hidden rounded-2xl border border-border">
              <div className={`h-24 ${c.cls}`} />
              <div className="p-3">
                <p className="text-sm font-medium text-ink">{c.name}</p>
                <p className="font-tabular text-xs text-ink-faint">--color-{c.token}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography" description="Fraunces for editorial headlines, Inter for UI, JetBrains Mono for tabular figures.">
        <div className="space-y-6">
          <p className="font-display text-6xl text-ink">Rerock Realty</p>
          <p className="font-display text-4xl text-ink">Where dreams meet strategy</p>
          <p className="font-display text-2xl text-ink">Section headline, Fraunces Medium</p>
          <p className="text-lg text-ink">Body large — Inter Regular, for lead paragraphs and descriptions.</p>
          <p className="text-sm text-ink-muted">Body small / muted — Inter, for supporting metadata.</p>
          <p className="font-tabular text-3xl text-primary">₹2,84,50,000 · +18.4%</p>
        </div>
      </Section>

      <Section title="Radius & Elevation" description="Cards 24px · Buttons/Inputs 16px · Dialogs 28px — soft, layered shadows only.">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="flex h-28 items-center justify-center rounded-btn bg-surface shadow-[var(--shadow-sm)] text-xs text-ink-muted">rounded-btn / shadow-sm</div>
          <div className="flex h-28 items-center justify-center rounded-card bg-surface shadow-[var(--shadow-md)] text-xs text-ink-muted">rounded-card / shadow-md</div>
          <div className="flex h-28 items-center justify-center rounded-dialog bg-surface shadow-[var(--shadow-lg)] text-xs text-ink-muted">rounded-dialog / shadow-lg</div>
          <div className="glass flex h-28 items-center justify-center rounded-card text-xs text-ink-muted">glass utility</div>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Book Site Visit</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" size="icon" aria-label="Like"><Heart className="h-5 w-5" /></Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge tone="primary">RERA Approved</Badge>
          <Badge tone="success" icon={ShieldCheck}>Ready To Move</Badge>
          <Badge tone="warning">Reserved</Badge>
          <Badge tone="danger">Sold</Badge>
          <Badge tone="info">Under Construction</Badge>
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="dark">Premium</Badge>
        </div>
      </Section>

      <Section title="Forms">
        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Full name" placeholder="Kiran Kumar Reddy" />
          <Input label="Phone number" icon={Phone} placeholder="+91 98480 12345" />
          <Input label="Email" icon={Mail} placeholder="you@email.com" error="Enter a valid email address" />
          <Select label="Preferred location">
            <option>Kokapet</option>
            <option>Gachibowli</option>
            <option>Financial District</option>
          </Select>
          <Textarea label="Message" placeholder="Tell us what you're looking for..." className="md:col-span-2" />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-8">
          <Checkbox checked={checked} onChange={() => setChecked((c) => !c)} label="RERA approved only" />
          <Radio checked={radioVal === "a"} onChange={() => setRadioVal("a")} label="Buy" />
          <Radio checked={radioVal === "b"} onChange={() => setRadioVal("b")} label="Invest" />
          <Switch checked={switchOn} onChange={setSwitchOn} label="Email price alerts" />
        </div>
      </Section>

      <Section title="Tabs">
        <Tabs
          tabs={[
            { value: "overview", label: "Overview", content: <p className="text-ink-muted">Community overview content renders here.</p> },
            { value: "amenities", label: "Amenities", content: <p className="text-ink-muted">Amenities grid renders here.</p> },
            { value: "pricing", label: "Pricing", content: <p className="text-ink-muted">Pricing trend chart renders here.</p> },
          ]}
        />
      </Section>

      <Section title="Alerts">
        <div className="space-y-3">
          <Alert tone="success" title="Site visit confirmed">Your advisor will call 30 minutes prior.</Alert>
          <Alert tone="warning" title="Limited units remaining">Only 6 units left at this price point.</Alert>
          <Alert tone="danger" title="Payment failed">Please retry or use a different payment method.</Alert>
          <Alert tone="info" title="New RERA update">Possession timelines updated for this project.</Alert>
        </div>
      </Section>

      <Section title="Overlays" description="Modal, Bottom Sheet (mobile), Side Drawer (desktop), Toasts.">
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="outline" onClick={() => setSheetOpen(true)}>Open Bottom Sheet</Button>
          <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open Side Drawer</Button>
          <Button
            variant="soft"
            onClick={() =>
              toast({ tone: "success", title: "Shortlisted", description: "Brigade Horizon 3 BHK added to your shortlist." })
            }
          >
            Trigger Toast
          </Button>
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Book a Site Visit" description="Pick a date and our advisor will confirm within the hour.">
          <div className="space-y-4">
            <Input label="Preferred date" type="date" />
            <Input label="Phone number" icon={Phone} placeholder="+91 98480 12345" />
            <Button className="w-full" onClick={() => setModalOpen(false)}>Confirm Visit</Button>
          </div>
        </Modal>
        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Filters">
          <div className="space-y-4">
            <Select label="Bedrooms"><option>Any</option><option>2 BHK</option><option>3 BHK</option></Select>
            <Select label="Budget"><option>Any</option><option>Under ₹1 Cr</option><option>₹1 Cr – ₹3 Cr</option></Select>
            <Button className="w-full" onClick={() => setSheetOpen(false)}>Show 42 Results</Button>
          </div>
        </BottomSheet>
        <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Notifications">
          <p className="text-sm text-ink-muted">Notification list renders here in the client dashboard.</p>
        </SideDrawer>
      </Section>

      <Section title="Loading & Skeletons">
        <div className="mb-4">
          <Button size="sm" variant="outline" onClick={() => setShowSkeleton((s) => !s)}>
            Toggle skeleton
          </Button>
        </div>
        {showSkeleton ? (
          <SkeletonGrid count={3} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {communities.slice(0, 3).map((c) => (
              <Card key={c.slug} className="p-6">
                <p className="font-display text-xl text-ink">{c.name}</p>
                <p className="text-sm text-ink-muted">Loaded content</p>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section title="Empty / Error / Success / Permission / No-results States">
        <div className="grid gap-6 md:grid-cols-2">
          <Card><EmptyState title="No saved properties yet" description="Properties you shortlist will appear here." action={<Button size="sm">Browse Properties</Button>} /></Card>
          <Card><NoResultsState /></Card>
          <Card><ErrorState onRetry={() => {}} /></Card>
          <Card><SuccessState title="Enquiry sent" description="Our advisor will reach out within 2 hours." /></Card>
          <Card className="md:col-span-2"><PermissionState /></Card>
        </div>
      </Section>

      <Section title="Stepper & Timeline">
        <div className="grid gap-10 md:grid-cols-2">
          <Card className="p-8">
            <Stepper steps={["Enquiry", "Site Visit", "Booking", "Registration"]} current={1} />
          </Card>
          <Card className="p-8">
            <Timeline
              items={[
                { title: "Enquiry received", time: "12 Jul 2026", done: true },
                { title: "Site visit completed", time: "15 Jul 2026", done: true, description: "With advisor Priya Reddy" },
                { title: "Booking amount paid", time: "Pending", done: false },
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section title="Stat Cards & Counters">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Portfolio Value" value="₹6.84 Cr" changePct={12.4} icon={IndianRupee} />
          <StatCard label="Active Leads" value="342" changePct={8.1} icon={Users} />
          <StatCard label="Total Communities" value="6" changePct={-2.4} icon={Building2} />
          <StatCard label="Avg. ROI" value="+22%" changePct={22} icon={TrendingUp} />
        </div>
        <Card className="mt-6 p-8 text-center">
          <p className="font-tabular text-5xl font-semibold text-primary">
            <CountUp value={92} format={(n) => Math.round(n)} />%
          </p>
          <p className="mt-2 text-sm text-ink-muted">Average Investment Score across REROCK communities</p>
        </Card>
      </Section>

      <Section title="Charts" description="Recharts, re-themed to design tokens.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <p className="mb-4 font-display text-lg text-ink">Pricing Trend — Kokapet</p>
            <PricingTrendChart data={communities[0].pricingTrend} />
          </Card>
          <Card className="p-6">
            <p className="mb-4 font-display text-lg text-ink">Lead Funnel</p>
            <LeadFunnelChart data={leadFunnel} />
          </Card>
        </div>
      </Section>

      <Section title="Icons" description="Lucide icons exclusively — consistent stroke weight across the platform.">
        <div className="flex flex-wrap gap-6 text-ink-muted">
          {[Search, Heart, ShieldCheck, TrendingUp, Building2, Users, IndianRupee, Phone, Mail].map((Icon, i) => (
            <span key={i} className="flex h-12 w-12 items-center justify-center rounded-xl border border-border">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
