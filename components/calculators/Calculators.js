"use client";

import { useMemo, useState } from "react";
import { IndianRupee, Percent, CalendarRange, Wallet } from "lucide-react";
import { formatINR, formatINRFull, calculateEMI, calculateROI } from "@/lib/utils";

export function Slider({ label, value, min, max, step, onChange, format, icon: Icon }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium text-ink-muted">
          {Icon && <Icon className="h-4 w-4" />} {label}
        </span>
        <span className="font-tabular text-sm font-semibold text-ink">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-pill bg-surface-soft accent-[var(--color-primary)]"
      />
    </div>
  );
}

export function EMICalculator({ defaultPrincipal = 12400000 }) {
  const [principal, setPrincipal] = useState(defaultPrincipal);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = useMemo(() => calculateEMI({ principal, annualRatePct: rate, tenureYears: tenure }), [principal, rate, tenure]);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - principal;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-8">
        <Slider label="Loan Amount" value={principal} min={2000000} max={80000000} step={100000} onChange={setPrincipal} format={(v) => formatINR(v)} icon={IndianRupee} />
        <Slider label="Interest Rate" value={rate} min={6} max={14} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} icon={Percent} />
        <Slider label="Tenure" value={tenure} min={5} max={30} step={1} onChange={setTenure} format={(v) => `${v} yrs`} icon={CalendarRange} />
      </div>
      <div className="rounded-card bg-surface-soft p-8">
        <p className="text-sm font-medium text-ink-muted">Your Monthly EMI</p>
        <p className="mt-2 font-tabular text-4xl font-semibold text-primary">{formatINRFull(emi)}</p>
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Principal Amount</span>
            <span className="font-tabular font-medium text-ink">{formatINRFull(principal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Total Interest</span>
            <span className="font-tabular font-medium text-ink">{formatINRFull(totalInterest)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Total Payment</span>
            <span className="font-tabular font-medium text-ink">{formatINRFull(totalPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ROICalculator({ defaultInvestment = 15000000, defaultGrowth = 18 }) {
  const [investment, setInvestment] = useState(defaultInvestment);
  const [expectedGrowth, setExpectedGrowth] = useState(defaultGrowth);
  const [years, setYears] = useState(5);

  const currentValue = investment * Math.pow(1 + expectedGrowth / 100, years);
  const { totalGrowthPct, cagr } = useMemo(
    () => calculateROI({ investment, currentValue, years }),
    [investment, currentValue, years]
  );

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-8">
        <Slider label="Investment Amount" value={investment} min={2000000} max={100000000} step={100000} onChange={setInvestment} format={(v) => formatINR(v)} icon={IndianRupee} />
        <Slider label="Expected Annual Growth" value={expectedGrowth} min={5} max={35} step={0.5} onChange={setExpectedGrowth} format={(v) => `${v}%`} icon={Percent} />
        <Slider label="Holding Period" value={years} min={1} max={15} step={1} onChange={setYears} format={(v) => `${v} yrs`} icon={CalendarRange} />
      </div>
      <div className="rounded-card bg-surface-soft p-8">
        <p className="text-sm font-medium text-ink-muted">Projected Value</p>
        <p className="mt-2 font-tabular text-4xl font-semibold text-primary">{formatINRFull(currentValue)}</p>
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Total Growth</span>
            <span className="font-tabular font-medium text-success">+{totalGrowthPct.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">CAGR</span>
            <span className="font-tabular font-medium text-ink">{cagr.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Absolute Gain</span>
            <span className="font-tabular font-medium text-ink">{formatINRFull(currentValue - investment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(200000);
  const [existingEMI, setExistingEMI] = useState(10000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [downPaymentPct, setDownPaymentPct] = useState(20);

  const { maxLoanEligible, maxEMI, maxPropertyValue } = useMemo(() => {
    const maxEMI = monthlyIncome * 0.5 - existingEMI;
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const maxLoanEligible =
      maxEMI > 0 ? (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, months)) : 0;
    const maxPropertyValue = maxLoanEligible / (1 - downPaymentPct / 100);
    return { maxLoanEligible, maxEMI: Math.max(maxEMI, 0), maxPropertyValue };
  }, [monthlyIncome, existingEMI, rate, tenure, downPaymentPct]);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-8">
        <Slider label="Monthly Income" value={monthlyIncome} min={30000} max={1000000} step={5000} onChange={setMonthlyIncome} format={(v) => formatINR(v)} icon={Wallet} />
        <Slider label="Existing EMI Obligations" value={existingEMI} min={0} max={200000} step={1000} onChange={setExistingEMI} format={(v) => formatINR(v)} icon={IndianRupee} />
        <Slider label="Expected Interest Rate" value={rate} min={6} max={14} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} icon={Percent} />
        <Slider label="Loan Tenure" value={tenure} min={5} max={30} step={1} onChange={setTenure} format={(v) => `${v} yrs`} icon={CalendarRange} />
        <Slider label="Down Payment" value={downPaymentPct} min={10} max={50} step={5} onChange={setDownPaymentPct} format={(v) => `${v}%`} icon={Percent} />
      </div>
      <div className="rounded-card bg-surface-soft p-8">
        <p className="text-sm font-medium text-ink-muted">You Can Afford a Property Worth Up To</p>
        <p className="mt-2 font-tabular text-4xl font-semibold text-primary">{formatINRFull(maxPropertyValue)}</p>
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Maximum Loan Eligible</span>
            <span className="font-tabular font-medium text-ink">{formatINRFull(maxLoanEligible)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Comfortable EMI</span>
            <span className="font-tabular font-medium text-ink">{formatINRFull(maxEMI)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Required Down Payment</span>
            <span className="font-tabular font-medium text-ink">{formatINRFull(maxPropertyValue - maxLoanEligible)}</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-ink-faint">
          Based on lenders typically capping EMI at 50% of monthly income, net of existing obligations.
        </p>
      </div>
    </div>
  );
}
