"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/StateScreen";

export function MediaLibraryGrid({ items, canDelete, onDelete }) {
  if (items.length === 0) {
    return <EmptyState title="No media yet" description="Upload photos, renders, or documents to see them here." className="min-h-[40vh]" />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.id} className="group overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="relative aspect-square">
            <Image src={item.src} alt={item.name} fill sizes="240px" className="object-cover" unoptimized={item.src.startsWith("data:")} />
            {canDelete && (
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                aria-label="Delete media"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="p-3">
            <p className="truncate text-sm font-medium text-ink">{item.name}</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {item.tags?.map((tag) => <Badge key={tag} tone="neutral" className="text-[10px]">{tag}</Badge>)}
            </div>
            <p className="mt-2 text-xs text-ink-faint">{item.uploadedBy} · {item.uploadedAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
