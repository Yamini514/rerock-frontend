import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Formats a raw rupee amount into Indian Lakh/Crore shorthand, e.g. 12400000 -> "1.24 Cr" */
export function formatINR(amount, { withSymbol = true } = {}) {
  const symbol = withSymbol ? "₹" : "";
  if (amount >= 1_00_00_000) {
    return `${symbol}${trimZero(amount / 1_00_00_000)} Cr`;
  }
  if (amount >= 1_00_000) {
    return `${symbol}${trimZero(amount / 1_00_000)} L`;
  }
  return `${symbol}${amount.toLocaleString("en-IN")}`;
}

function trimZero(n) {
  return Number(n.toFixed(2)).toString();
}

/** Full Indian-grouped currency string, e.g. 12400000 -> "₹1,24,00,000" */
export function formatINRFull(amount) {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatCompactNumber(n) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

/** Standard reducing-balance EMI calculation */
export function calculateEMI({ principal, annualRatePct, tenureYears }) {
  const monthlyRate = annualRatePct / 12 / 100;
  const months = tenureYears * 12;
  if (monthlyRate === 0) return principal / months;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return emi;
}

export function calculateROI({ investment, currentValue, years }) {
  const totalGrowthPct = ((currentValue - investment) / investment) * 100;
  const cagr = (Math.pow(currentValue / investment, 1 / years) - 1) * 100;
  return { totalGrowthPct, cagr };
}

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
