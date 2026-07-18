"use client";

import { motion } from "framer-motion";

export function LeadFunnelChart({ data }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="space-y-3">
      {data.map((stage, i) => {
        const widthPct = 100 - i * (60 / data.length);
        const convPct = i === 0 ? 100 : Math.round((stage.count / data[0].count) * 100);
        return (
          <div key={stage.stage} className="flex items-center gap-4">
            <div className="w-32 shrink-0 text-sm font-medium text-ink-muted">{stage.stage}</div>
            <div className="relative flex-1">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${widthPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="flex h-10 items-center justify-end rounded-lg bg-gradient-to-r from-primary-soft to-primary/90 px-4"
                style={{ minWidth: "3rem" }}
              >
                <span className="font-tabular text-sm font-semibold text-white mix-blend-difference">
                  {stage.count.toLocaleString("en-IN")}
                </span>
              </motion.div>
            </div>
            <div className="w-14 shrink-0 text-right font-tabular text-sm font-medium text-ink-faint">{convPct}%</div>
          </div>
        );
      })}
    </div>
  );
}
