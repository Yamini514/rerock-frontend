"use client";

import Image from "next/image";
import { Award, Mail, Phone, Star, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAgentAuth } from "@/components/agent/AgentAuthContext";

export function ProfileClient() {
  const { user } = useAgentAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-[60rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex items-center gap-4">
        <span className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image src={user.avatar} alt={user.name} fill sizes="80px" className="object-cover" />
        </span>
        <div>
          <h1 className="font-display text-2xl text-ink md:text-3xl">{user.name}</h1>
          <p className="text-sm text-ink-muted">{user.role}</p>
          <Badge tone="primary" className="mt-2">{user.specialization}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <Star className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 font-tabular text-2xl font-semibold text-ink">{user.rating}</p>
          <p className="text-xs text-ink-faint">Client Rating</p>
        </Card>
        <Card className="p-6 text-center">
          <Award className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 font-tabular text-2xl font-semibold text-ink">{user.dealsClosed}</p>
          <p className="text-xs text-ink-faint">Deals Closed</p>
        </Card>
        <Card className="p-6 text-center">
          <Target className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 font-tabular text-2xl font-semibold text-ink">{user.experienceYears}y</p>
          <p className="text-xs text-ink-faint">Experience</p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <p className="font-display text-lg text-ink">Contact Information</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4 text-primary" /> {user.email}</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Phone className="h-4 w-4 text-primary" /> {user.phone}</p>
        </div>
      </Card>
    </div>
  );
}
