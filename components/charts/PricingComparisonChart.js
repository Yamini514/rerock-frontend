"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompactNumber } from "@/lib/utils";

const seriesColors = ["var(--color-primary)", "var(--color-accent)", "var(--color-info)", "var(--color-success)", "var(--color-warning)"];

/** series: [{ key, label, data: [{year, pricePerSqft}] }] — merges into one dataset keyed by year */
export function PricingComparisonChart({ series, height = 360 }) {
  const years = series[0]?.data.map((d) => d.year) || [];
  const merged = years.map((year, i) => {
    const row = { year };
    series.forEach((s) => {
      row[s.key] = s.data[i]?.pricePerSqft;
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={merged} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
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
          contentStyle={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "0.75rem",
            fontSize: "0.8rem",
          }}
          formatter={(value) => [`₹${value.toLocaleString("en-IN")}/sq.ft`]}
        />
        <Legend wrapperStyle={{ fontSize: "0.8rem", color: "var(--color-ink-muted)" }} />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={seriesColors[i % seriesColors.length]}
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 0, fill: seriesColors[i % seriesColors.length] }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
