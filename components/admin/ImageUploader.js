"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GripVertical, ImagePlus, Star, UploadCloud, X } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB per image

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Reusable drag-and-drop / bulk image uploader.
 * `images`: array of { id, src, name }. `onChange(nextImages)` receives the full updated array.
 */
export function ImageUploader({ images, onChange, max = 12, label = "Property Photos" }) {
  const { toast } = useToast();
  const inputRef = useRef(null);
  const dragIndex = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  async function processFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const room = max - images.length;
    if (room <= 0) {
      toast({ tone: "warning", title: `You can upload up to ${max} photos`, description: "Remove a photo before adding more." });
      return;
    }

    const valid = [];
    let rejectedType = 0;
    let rejectedSize = 0;

    for (const file of files.slice(0, room)) {
      if (!file.type.startsWith("image/")) {
        rejectedType += 1;
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        rejectedSize += 1;
        continue;
      }
      valid.push(file);
    }

    if (rejectedType) toast({ tone: "warning", title: "Some files were skipped", description: `${rejectedType} file(s) weren't images.` });
    if (rejectedSize) toast({ tone: "warning", title: "Some files were too large", description: `${rejectedSize} file(s) exceeded 8MB.` });
    if (files.length > room) toast({ tone: "info", title: `Only ${room} more photo(s) could be added`, description: `Limit is ${max} photos per property.` });

    if (!valid.length) return;

    setLoading(true);
    try {
      const dataUrls = await Promise.all(valid.map(readAsDataURL));
      const next = [
        ...images,
        ...dataUrls.map((src, i) => ({ id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2)}`, src, name: valid[i].name })),
      ];
      onChange(next);
      toast({ tone: "success", title: `${valid.length} photo${valid.length > 1 ? "s" : ""} added` });
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  }

  function removeAt(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  function handleThumbDragStart(index) {
    dragIndex.current = index;
  }

  function handleThumbDrop(index) {
    const from = dragIndex.current;
    if (from === null || from === index) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(index, 0, moved);
    dragIndex.current = null;
    onChange(next);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span className="text-xs text-ink-faint">{images.length}/{max}</span>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragActive ? "border-primary bg-primary-softer" : "border-border-strong hover:border-primary/50 hover:bg-surface-soft"
        )}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <UploadCloud className="h-5 w-5" />
          )}
        </span>
        <p className="text-sm font-medium text-ink">
          {loading ? "Processing photos..." : "Drag & drop photos, or click to browse"}
        </p>
        <p className="text-xs text-ink-faint">Bulk upload supported · JPG, PNG, WEBP · up to 8MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            processFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          <AnimatePresence initial={false}>
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                draggable
                onDragStart={() => handleThumbDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleThumbDrop(index)}
                className="group relative aspect-square cursor-grab overflow-hidden rounded-xl border border-border active:cursor-grabbing"
              >
                <Image src={img.src} alt={img.name || `Photo ${index + 1}`} fill sizes="120px" className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
                {index === 0 && (
                  <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-pill bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                    <Star className="h-2.5 w-2.5 fill-white" /> Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAt(index);
                  }}
                  aria-label="Remove photo"
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <span className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 rounded-pill bg-black/50 px-1.5 py-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-3 w-3" />
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border-strong text-ink-faint transition-colors hover:border-primary/50 hover:text-primary"
            aria-label="Add more photos"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
