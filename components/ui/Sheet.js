"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** BottomSheet — native-app style sheet for mobile (filters, "More" nav, actions) */
export function BottomSheet({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose?.();
            }}
            className={cn(
              "relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-dialog bg-surface pb-safe shadow-[var(--shadow-lg)]",
              className
            )}
          >
            <div className="sticky top-0 z-10 flex justify-center bg-surface pt-3">
              <span className="h-1.5 w-12 rounded-pill bg-border-strong" />
            </div>
            {title && (
              <div className="flex items-center justify-between px-6 pb-2 pt-4">
                <h3 className="font-display text-xl text-ink">{title}</h3>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-soft"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/** SideDrawer — desktop drawer (e.g. filters, cart/compare, notifications) */
export function SideDrawer({ open, onClose, title, children, side = "right", className }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={cn("fixed inset-0 z-[100] flex", side === "right" ? "justify-end" : "justify-start")}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 h-full w-full max-w-md overflow-y-auto bg-surface shadow-[var(--shadow-lg)]",
              className
            )}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 px-6 py-5 backdrop-blur">
              <h3 className="font-display text-xl text-ink">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
