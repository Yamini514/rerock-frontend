"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({ open, onClose, title, description, children, className, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-dialog bg-surface p-8 shadow-[var(--shadow-lg)]",
              sizes[size],
              className
            )}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
            {title && <h3 className="font-display text-2xl text-ink pr-10">{title}</h3>}
            {description && <p className="mt-2 text-sm text-ink-muted">{description}</p>}
            <div className={cn(title ? "mt-6" : "")}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
