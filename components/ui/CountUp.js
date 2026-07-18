"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export function CountUp({ value, duration = 1.4, format = (n) => Math.round(n).toLocaleString("en-IN"), className }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const controls = animate(0, value, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setDisplay(v),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  );
}
