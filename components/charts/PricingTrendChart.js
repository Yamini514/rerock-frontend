"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { formatCompactNumber } from "@/lib/utils";

export function PricingTrendChart({ data, dataKey = "pricePerSqft", height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="pricingTrendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.32} />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 8" />
        <XAxis dataKey="year" tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${formatCompactNumber(v)}`}
          width={56}
        />
        <Tooltip
          content={<ChartTooltip formatter={(v) => `₹${v.toLocaleString("en-IN")} / sq.ft`} />}
          cursor={{ stroke: "var(--color-primary)", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          fill="url(#pricingTrendFill)"
          dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
