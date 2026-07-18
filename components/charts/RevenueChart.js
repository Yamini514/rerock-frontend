"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { formatINR, formatCompactNumber } from "@/lib/utils";

export function RevenueChart({ data, dataKey = "revenue", xKey = "month", height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 8" />
        <XAxis dataKey={xKey} tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${formatCompactNumber(v)}`}
          width={56}
        />
        <Tooltip content={<ChartTooltip formatter={(v) => formatINR(v)} />} cursor={{ fill: "var(--color-surface-soft)" }} />
        <Bar dataKey={dataKey} fill="var(--color-primary)" radius={[8, 8, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}
