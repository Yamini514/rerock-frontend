import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ContactClient } from "./ContactClient";

export const metadata = {
  title: "Contact",
  description: "Get in touch with REROCK Realty's advisory team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10">
      <Badge tone="primary" icon={Mail}>Contact Us</Badge>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Let&rsquo;s Talk Real Estate</h1>
      <p className="mt-3 max-w-2xl text-ink-muted md:text-lg">
        Whether you&rsquo;re buying, investing, or exploring a partnership — our team responds within 2 hours.
      </p>

      <div className="mt-12">
        <ContactClient />
      </div>
    </div>
  );
}
