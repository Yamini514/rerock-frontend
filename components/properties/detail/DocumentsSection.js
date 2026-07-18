"use client";

import { Download, FileText } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function DocumentsSection({ documents }) {
  const { toast } = useToast();

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <button
          key={doc.name}
          onClick={() => toast({ tone: "info", title: "Download started", description: doc.name })}
          className="flex w-full items-center gap-4 rounded-2xl border border-border p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary-softer"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-ink-muted">
            <FileText className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-ink">{doc.name}</p>
            <p className="text-xs text-ink-faint">{doc.type} · {doc.date}</p>
          </div>
          <Download className="h-4 w-4 shrink-0 text-ink-faint" />
        </button>
      ))}
    </div>
  );
}
