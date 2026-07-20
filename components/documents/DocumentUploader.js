"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB per document
const ACCEPTED_TYPES = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"];

function extensionType(fileName) {
  const ext = fileName.split(".").pop();
  return ext ? ext.toUpperCase() : "FILE";
}

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Drop/click file picker for property & deal documents. No staging state of its own —
 * calls `onFilesSelected` with an array of { name, type, url, size } once files are read;
 * the caller decides whether to stage them (e.g. an add-property form) or persist immediately
 * (e.g. attaching to an already-existing client). `url` is a local blob object URL so the
 * "Download" action in DocumentsSection works for real, with no backend involved.
 */
export function DocumentUploader({ onFilesSelected, label = "Documents", hint = "PDF, Word, Excel, or image files · up to 15MB each" }) {
  const { toast } = useToast();
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  function processFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const valid = [];
    let rejectedSize = 0;

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        rejectedSize += 1;
        continue;
      }
      valid.push(file);
    }

    if (rejectedSize) toast({ tone: "warning", title: "Some files were too large", description: `${rejectedSize} file(s) exceeded 15MB.` });
    if (!valid.length) return;

    setLoading(true);
    try {
      const fileMetas = valid.map((file) => ({
        name: file.name,
        type: extensionType(file.name),
        size: formatSize(file.size),
        url: URL.createObjectURL(file),
      }));
      onFilesSelected(fileMetas);
      toast({ tone: "success", title: `${valid.length} document${valid.length > 1 ? "s" : ""} added` });
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
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
        <p className="text-sm font-medium text-ink">{loading ? "Processing..." : "Drag & drop documents, or click to browse"}</p>
        <p className="text-xs text-ink-faint">{hint}</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          multiple
          className="hidden"
          onChange={(e) => {
            processFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
