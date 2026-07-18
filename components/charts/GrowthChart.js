"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { formatINR, formatCompactNumber } from "@/lib/utils";

export function GrowthChart({ data, dataKey = "value", xKey = "month", height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 8" />
        <XAxis dataKey={xKey} tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${formatCompactNumber(v)}`}
          width={56}
        />
        <Tooltip content={<ChartTooltip formatter={(v) => formatINR(v)} />} cursor={{ stroke: "var(--color-accent)", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="var(--color-accent)"
          strokeWidth={2.5}
          fill="url(#growthFill)"
          dot={{ r: 3, fill: "var(--color-accent)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
