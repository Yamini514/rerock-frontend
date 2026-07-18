import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({ steps, current }) {
  return (
    <div className="flex w-full items-start">
      {steps.map((step, i) => {
        const state = i < current ? "done" : i === current ? "active" : "upcoming";
        return (
          <div key={step} className={cn("flex flex-1 items-center", i === steps.length - 1 && "flex-none")}>
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300",
                  state === "done" && "border-primary bg-primary text-white",
                  state === "active" && "border-primary text-primary",
                  state === "upcoming" && "border-border-strong text-ink-faint"
                )}
              >
                {state === "done" ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={cn(
                  "mt-2 max-w-[6rem] text-center text-xs font-medium",
                  state === "upcoming" ? "text-ink-faint" : "text-ink"
                )}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "mx-2 h-0.5 flex-1 rounded-pill transition-colors duration-300",
                  i < current ? "bg-primary" : "bg-border-strong"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
