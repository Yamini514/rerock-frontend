"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/utils";

const positions = {
  kokapet: { x: 32, y: 58 },
  tellapur: { x: 14, y: 40 },
  "financial-district": { x: 40, y: 66 },
  gachibowli: { x: 46, y: 44 },
  miyapur: { x: 20, y: 16 },
  narsingi: { x: 38, y: 78 },
  kondapur: { x: 56, y: 30 },
};

export function MapView({ properties }) {
  const [active, setActive] = useState(null);

  const byLocation = properties.reduce((acc, p) => {
    (acc[p.location] ||= []).push(p);
    return acc;
  }, {});

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-card border border-border bg-surface-soft">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {Object.entries(byLocation).map(([loc, props]) => {
        const pos = positions[loc];
        if (!pos) return null;
        return (
          <button
            key={loc}
            onClick={() => setActive(active === loc ? null : loc)}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full"
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1 rounded-pill bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-[var(--shadow-md)]"
            >
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {props.length}
              </span>
            </motion.span>
            <span className="mx-auto mt-0.5 block h-2 w-2 rotate-45 bg-primary" />
          </button>
        );
      })}

      {active && byLocation[active] && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 flex gap-4 overflow-x-auto sm:right-auto"
        >
          {byLocation[active].map((p) => (
            <Link
              key={p.slug}
              href={`/properties/${p.slug}`}
              className="flex w-64 shrink-0 gap-3 rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow-md)]"
            >
              <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={p.images[0]} alt={p.title} fill sizes="64px" className="object-cover" />
              </span>
              <span>
                <span className="block text-sm font-medium text-ink line-clamp-1">{p.title}</span>
                <span className="block font-tabular text-sm font-semibold text-primary">{formatINR(p.price)}</span>
              </span>
            </Link>
          ))}
        </motion.div>
      )}

      <p className="absolute right-4 top-4 rounded-pill bg-surface/90 px-3 py-1.5 text-xs text-ink-muted backdrop-blur">
        Illustrative map — click a pin to preview listings
      </p>
    </div>
  );
}
