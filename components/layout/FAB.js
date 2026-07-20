"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { label: "Call Advisor", icon: Phone, href: "tel:+919848012345", cls: "bg-[#1c1c1e] text-white" },
  { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/919848012345", cls: "bg-success text-white" },
];

export function FAB() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Property detail pages already surface Call/WhatsApp prominently in their own sticky CTA bar —
  // showing the floating action button there too would duplicate it and overlap that bar on mobile.
  const hasOwnStickyCTA = pathname?.startsWith("/properties/");
  if (hasOwnStickyCTA) return null;

  return (
    <div className="fixed bottom-24 right-5 z-40 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="mb-3 flex flex-col items-end gap-3"
          >
            {actions.map((a, i) => (
              <motion.a
                key={a.label}
                href={a.href}
                target={a.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn("flex items-center gap-2 rounded-pill px-4 py-3 text-sm font-medium shadow-[var(--shadow-md)]", a.cls)}
              >
                <a.icon className="h-4 w-4" /> {a.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.9 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-glow)]"
        aria-label="Quick actions"
      >
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.25 }}>
          <Plus className="h-6 w-6" />
        </motion.span>
      </motion.button>
    </div>
  );
}
