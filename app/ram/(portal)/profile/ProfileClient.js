"use client";

import Image from "next/image";
import { Building, Mail, MapPin, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useRamAuth } from "@/components/ram/RamAuthContext";

export function ProfileClient() {
  const { user } = useRamAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-[60rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-8 flex items-center gap-4">
        <span className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image src={user.avatar} alt={user.name} fill sizes="80px" className="object-cover" />
        </span>
        <div>
          <h1 className="font-display text-2xl text-ink md:text-3xl">{user.name}</h1>
          <p className="text-sm text-ink-muted">REROCK Advisory Member</p>
          <Badge tone="primary" className="mt-2">{user.region}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="p-6 text-center">
          <TrendingUp className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 font-tabular text-2xl font-semibold text-ink">{user.dealsThisQuarter}</p>
          <p className="text-xs text-ink-faint">Deals This Quarter</p>
        </Card>
        <Card className="p-6 text-center">
          <MapPin className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 font-tabular text-lg font-semibold text-ink">{user.region}</p>
          <p className="text-xs text-ink-faint">Region</p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <p className="flex items-center gap-2 font-display text-lg text-ink">
          <Building className="h-5 w-5 text-primary" /> Builders Handled
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {user.buildersHandled?.map((b) => (
            <Badge key={b} tone="neutral">{b}</Badge>
          ))}
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <p className="font-display text-lg text-ink">Contact Information</p>
        <div className="mt-4">
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4 text-primary" /> {user.email}</p>
        </div>
      </Card>
    </div>
  );
}
