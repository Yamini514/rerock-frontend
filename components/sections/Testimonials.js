"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { testimonials } from "@/lib/data/testimonials";

const CARD_STEP = 392; // card width (380) + gap (24), matches the sm:w-[380px] card
const AUTOPLAY_INTERVAL = 4000;

export function Testimonials() {
  const scrollerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function scroll(dir) {
    scrollerRef.current?.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });
  }

  function goTo(index) {
    scrollerRef.current?.scrollTo({ left: index * CARD_STEP, behavior: "smooth" });
  }

  function advance() {
    const el = scrollerRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: CARD_STEP, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(advance, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    function onScroll() {
      const index = Math.round(el.scrollLeft / CARD_STEP);
      setActiveIndex(Math.max(0, Math.min(testimonials.length - 1, index)));
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="mx-auto max-w-[90rem] px-6 py-16 md:px-10 md:py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by investors across Hyderabad"
          description="Real outcomes from clients who built their portfolio with REROCK."
          className="mb-0"
        />
        <div className="flex gap-1">
          <button
            onClick={() => scroll(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:bg-surface-soft"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:bg-surface-soft"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none]"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="w-[85%] shrink-0 snap-start rounded-card border border-border bg-surface p-8 sm:w-[380px]"
          >
            <Quote className="h-8 w-8 text-primary/30" />
            <p className="mt-4 min-h-24 text-lg leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink-muted">{t.role}</p>
              </div>
              <div className="ml-auto flex">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-pill transition-all duration-300 ${i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border-strong hover:bg-ink-faint"}`}
          />
        ))}
      </div>
    </section>
  );
}
