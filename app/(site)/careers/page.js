import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { openRoles, benefits } from "@/lib/data/careers";
import { ApplyButton } from "./ApplyButton";

export const metadata = {
  title: "Careers",
  description: "Join the team building Hyderabad's most trusted real estate investment platform.",
};

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary" icon={Briefcase}>We&rsquo;re Hiring</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Build the Future of Real Estate Investing</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        We&rsquo;re a small, data-obsessed team working on one of the most trust-starved industries in India.
      </p>

      <section className="mt-14">
        <h2 className="mb-6 font-display text-2xl text-ink">Why REROCK</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <Card key={b.title} className="p-6">
              <p className="font-display text-lg text-ink">{b.title}</p>
              <p className="mt-1.5 text-sm text-ink-muted">{b.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 font-display text-2xl text-ink">Open Roles</h2>
        <div className="space-y-4">
          {openRoles.map((role) => (
            <Card key={role.id} className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium text-ink">{role.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
                  <span>{role.department}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {role.location}</span>
                  <Badge tone="neutral">{role.type}</Badge>
                </div>
              </div>
              <ApplyButton role={role.title} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
