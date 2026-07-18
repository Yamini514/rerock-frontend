"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Move3d, Play, X } from "lucide-react";

export function Tour360({ image, title }) {
  const [open, setOpen] = useState(false);
  const constraintsRef = useRef(null);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="group relative h-72 w-full overflow-hidden rounded-card md:h-96"
      >
        <Image src={image} alt={`${title} 360 tour`} fill sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 fill-white" />
          </span>
          <p className="flex items-center gap-1.5 font-display text-xl">
            <Move3d className="h-5 w-5" /> Launch 360° Virtual Tour
          </p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] flex flex-col bg-black">
          <div className="flex items-center justify-between p-5 text-white">
            <p className="flex items-center gap-2 text-sm font-medium"><Move3d className="h-4 w-4" /> Drag to look around</p>
            <button onClick={() => setOpen(false)} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div ref={constraintsRef} className="relative flex-1 overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: -600, right: 0 }}
              dragElastic={0.08}
              className="relative h-full w-[160%] cursor-grab active:cursor-grabbing"
            >
              <Image src={image} alt={`${title} panorama`} fill sizes="160vw" className="object-cover" />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
