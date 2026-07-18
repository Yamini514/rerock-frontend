"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({ className, children, hover = false, as: Comp = "div", ...props }) {
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-card bg-surface border border-border shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <Comp
      className={cn(
        "rounded-card bg-surface border border-border shadow-[var(--shadow-sm)]",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn("p-6 md:p-8", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("p-6 md:p-8 pb-0 md:pb-0", className)} {...props}>
      {children}
    </div>
  );
}
