"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { MapView } from "@/components/properties/MapView";
import { useClientAuth } from "@/components/portal/ClientAuthContext";
import { agents } from "@/lib/data/agents";
import { img } from "@/lib/images";

export function ContactClient() {
  const { toast } = useToast();
  const { user } = useClientAuth();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ tone: "success", title: "Message sent", description: "An advisor will get back to you within 2 hours." });
      e.target.reset();
    }, 900);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <Card className="p-6 md:p-10">
        <p className="font-display text-2xl text-ink">Send us a message</p>
        {user && (
          <p className="mt-1 text-sm text-ink-muted">Signed in as {user.name} — we already have your contact details on file.</p>
        )}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {!user && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Full name" placeholder="Your name" required />
                <Input label="Phone number" icon={Phone} placeholder="+91 98480 12345" required />
              </div>
              <Input label="Email" icon={Mail} type="email" placeholder="you@email.com" required />
            </>
          )}
          <Select label="I'm interested in">
            <option>Buying a property</option>
            <option>Investment advisory</option>
            <option>Selling a property</option>
            <option>Partnership / Builder enquiry</option>
            <option>Careers</option>
          </Select>
          <Textarea label="Message" placeholder="Tell us what you're looking for..." rows={5} required />
          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            Send Message
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <p className="font-display text-lg text-ink">Get in touch</p>
          <div className="mt-4 space-y-4 text-sm">
            <p className="flex items-center gap-3 text-ink-muted"><Phone className="h-4 w-4 text-primary" /> +91 98480 12345</p>
            <p className="flex items-center gap-3 text-ink-muted"><Mail className="h-4 w-4 text-primary" /> hello@rerockrealty.com</p>
            <p className="flex items-center gap-3 text-ink-muted"><MapPin className="h-4 w-4 text-primary" /> Financial District, Hyderabad, Telangana</p>
          </div>
          <a
            href="https://wa.me/919848012345"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 rounded-btn bg-success py-3 text-sm font-medium text-white"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </Card>

        <MapView properties={[{ location: "financial-district", slug: "hq", title: "REROCK Realty HQ", images: [img.buildingModern1], price: 0 }]} />

        <Card className="p-6">
          <p className="mb-4 font-display text-lg text-ink">Talk to an Advisor</p>
          <div className="space-y-4">
            {agents.slice(0, 2).map((a) => (
              <div key={a.slug} className="flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image src={a.avatar} alt={a.name} fill sizes="44px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{a.name}</p>
                  <p className="text-xs text-ink-muted">{a.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
