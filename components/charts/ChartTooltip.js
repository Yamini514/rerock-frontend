export function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3 shadow-[var(--shadow-md)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <div className="mt-1.5 space-y-1">
        {payload.map((p, i) => (
          <p key={i} className="font-tabular text-sm font-semibold text-ink">
            {formatter ? formatter(p.value, p) : p.value}
          </p>
        ))}
      </div>
    </div>
  );
}
