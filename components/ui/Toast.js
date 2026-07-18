"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastContext = createContext(null);

const iconFor = {
  success: CheckCircle2,
  error: XCircle,
  warning: TriangleAlert,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, tone = "info", duration = 4200 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((t) => [...t, { id, title, description, tone }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex w-full max-w-sm flex-col gap-3 md:bottom-8 md:right-8">
            <AnimatePresence>
              {toasts.map((t) => {
                const Icon = iconFor[t.tone] || Info;
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 60, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-lg)]"
                    )}
                  >
                    <Icon
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0",
                        t.tone === "success" && "text-success",
                        t.tone === "error" && "text-danger",
                        t.tone === "warning" && "text-warning",
                        t.tone === "info" && "text-info"
                      )}
                    />
                    <div className="flex-1 text-sm">
                      {t.title && <p className="font-semibold text-ink">{t.title}</p>}
                      {t.description && <p className="mt-0.5 text-ink-muted">{t.description}</p>}
                    </div>
                    <button
                      onClick={() => dismiss(t.id)}
                      className="text-ink-faint transition-colors hover:text-ink"
                      aria-label="Dismiss"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
