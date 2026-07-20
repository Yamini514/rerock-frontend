"use client";

import Image from "next/image";
import { CalendarClock, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useClientAuth } from "@/components/portal/ClientAuthContext";
import { getAgent } from "@/lib/data/agents";
import { ramTeam } from "@/lib/data/staff";
import { currentUser } from "@/lib/data/profile";

export function AdvisorCard() {
  const { toast } = useToast();
  const { user } = useClientAuth();

  const agent = getAgent(user?.assignedAgentSlug || currentUser.assignedAgentSlug);
  const ram = ramTeam.find((r) => r.id === (user?.assignedRamId || currentUser.assignedRamId));

  function requestConsultation() {
    toast({ tone: "success", title: "Consultation requested", description: `${ram?.name} will reach out within 24 hours.` });
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {ram && (
        <Card className="p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">Your REROCK Advisory Member</p>
          <div className="flex items-center gap-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image src={ram.avatar} alt={ram.name} fill sizes="56px" className="object-cover" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{ram.name}</p>
              <p className="truncate text-xs text-ink-muted">{ram.region} · REROCK Advisory Member</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm" onClick={requestConsultation}>
              <Sparkles className="h-4 w-4" /> Request Consultation
            </Button>
            <Button variant="outline" size="sm" onClick={requestConsultation}>
              <CalendarClock className="h-4 w-4" /> Schedule Meeting
            </Button>
          </div>
        </Card>
      )}

      {agent && (
        <Card className="p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">Your Assigned Agent</p>
          <div className="flex items-center gap-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image src={agent.avatar} alt={agent.name} fill sizes="56px" className="object-cover" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{agent.name}</p>
              <p className="truncate text-xs text-ink-muted">{agent.role}</p>
              <Badge tone="primary" className="mt-1.5">{agent.specialization}</Badge>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button as="a" href={`tel:${agent.phone}`} size="sm">
              <Phone className="h-4 w-4" /> Call
            </Button>
            <Button as="a" href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
