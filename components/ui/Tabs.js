"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs({ tabs, defaultValue, value, onChange, className, panelClassName, scroll = false }) {
  const layoutId = useId();
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.value);
  const active = value ?? internal;

  function select(v) {
    setInternal(v);
    onChange?.(v);
  }

  const activeTab = tabs.find((t) => t.value === active);

  return (
    <div className={className}>
      <div
        className={cn(
          "flex gap-1 rounded-pill bg-surface-soft p-1.5",
          scroll ? "overflow-x-auto [scrollbar-width:none] flex-nowrap" : "flex-wrap w-fit"
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => select(tab.value)}
            className={cn(
              "relative shrink-0 rounded-pill px-5 py-2.5 text-sm font-medium transition-colors duration-200",
              active === tab.value ? "text-white" : "text-ink-muted hover:text-ink"
            )}
          >
            {active === tab.value && (
              <motion.span
                layoutId={`tabs-pill-${layoutId}`}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 rounded-pill bg-primary"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon && <tab.icon className="h-4 w-4" />}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      {activeTab?.content && <div className={cn("mt-6", panelClassName)}>{activeTab.content}</div>}
    </div>
  );
}
