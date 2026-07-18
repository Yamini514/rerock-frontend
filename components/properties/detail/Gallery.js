"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  function next() {
    setActive((a) => (a + 1) % images.length);
  }
  function prev() {
    setActive((a) => (a - 1 + images.length) % images.length);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:h-[520px] md:grid-cols-4 md:grid-rows-2">
        <button
          onClick={() => {
            setActive(0);
            setLightbox(true);
          }}
          className="group relative h-72 overflow-hidden rounded-card md:col-span-2 md:row-span-2 md:h-full"
        >
          <Image src={images[0]} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i + 1);
              setLightbox(true);
            }}
            className="group relative hidden h-full overflow-hidden rounded-card md:block"
          >
            <Image src={img} alt={`${title} ${i + 2}`} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-semibold text-white">
                +{images.length - 5} photos
              </span>
            )}
          </button>
        ))}
        <button
          onClick={() => setLightbox(true)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-pill bg-white/90 px-3.5 py-2 text-xs font-semibold text-ink shadow-[var(--shadow-sm)] md:hidden"
        >
          <Expand className="h-3.5 w-3.5" /> View all {images.length} photos
        </button>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4"
          >
            <button onClick={() => setLightbox(false)} className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <button onClick={prev} className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white md:left-8" aria-label="Previous">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[70vh] w-full max-w-4xl"
            >
              <Image src={images[active]} alt={`${title} ${active + 1}`} fill sizes="90vw" className="object-contain" />
            </motion.div>
            <button onClick={next} className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white md:right-8" aria-label="Next">
              <ChevronRight className="h-6 w-6" />
            </button>
            <p className="absolute bottom-6 font-tabular text-sm text-white/70">{active + 1} / {images.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
