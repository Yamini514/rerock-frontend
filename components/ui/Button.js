"use client";

import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionButtonTag = motion.create("button");
const MotionAnchorTag = motion.create("a");

const variants = {
  primary:
    "bg-primary text-white shadow-[var(--shadow-glow)] hover:bg-primary-dark",
  secondary:
    "bg-[#1c1c1e] text-white hover:bg-[#1c1c1e]/90 dark:bg-white dark:text-[#1c1c1e] dark:hover:bg-white/90",
  outline:
    "border border-border-strong bg-transparent text-ink hover:border-primary hover:text-primary",
  ghost: "bg-transparent text-ink hover:bg-surface-soft",
  soft: "bg-primary-soft text-primary hover:bg-primary-soft/70",
  destructive: "bg-danger text-white hover:opacity-90",
};

const sizes = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
  icon: "h-11 w-11",
};

export const Button = forwardRef(function Button(
  {
    as: Comp = "button",
    variant = "primary",
    size = "md",
    className,
    children,
    loading = false,
    disabled = false,
    ...props
  },
  ref
) {
  const MotionComp = useMemo(() => {
    if (Comp === "button") return MotionButtonTag;
    if (Comp === "a") return MotionAnchorTag;
    return motion.create(Comp);
  }, [Comp]);
  return (
    <MotionComp
      ref={ref}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-btn font-medium tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </MotionComp>
  );
});
