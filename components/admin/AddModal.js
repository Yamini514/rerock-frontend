"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function AddModal({ open, onClose, title, description, onSubmit, submitLabel = "Create", size = "lg", children }) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size={size}>
      <form onSubmit={onSubmit} className="space-y-5">
        {children}
        <div className="flex gap-3 border-t border-border pt-5">
          <Button type="button" variant="outline" className="w-full" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
