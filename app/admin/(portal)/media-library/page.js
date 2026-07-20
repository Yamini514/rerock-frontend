"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AddModal } from "@/components/admin/AddModal";
import { MediaLibraryGrid } from "@/components/admin/MediaLibraryGrid";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { hasPermission } from "@/lib/data/staff";
import { mediaItems as initialItems } from "@/lib/data/media";

export default function MediaLibraryPage() {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const canUpload = hasPermission(user, "mediaLibrary.upload");
  const canDelete = hasPermission(user, "mediaLibrary.delete");

  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { title: "", tags: "" } });

  function closeModal() {
    setOpen(false);
    setPhotos([]);
    reset();
  }

  function onSubmit(data) {
    if (photos.length === 0) {
      toast({ tone: "warning", title: "Add at least one photo before saving" });
      return;
    }
    const tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const today = new Date().toISOString().slice(0, 10);
    const newItems = photos.map((photo, i) => ({
      id: photo.id,
      src: photo.src,
      name: photos.length > 1 ? `${data.title} (${i + 1})` : data.title,
      tags,
      uploadedBy: user?.name || "Admin",
      uploadedAt: today,
    }));
    setItems((list) => [...newItems, ...list]);
    closeModal();
    toast({ tone: "success", title: `${newItems.length} file${newItems.length > 1 ? "s" : ""} uploaded` });
  }

  function handleDelete(id) {
    setItems((list) => list.filter((item) => item.id !== id));
  }

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description={`${items.length} files across properties, communities, and marketing`}
        action={canUpload && <Button onClick={() => setOpen(true)}><Upload className="h-4 w-4" /> Upload</Button>}
      />
      <div className="p-6 md:p-10">
        <MediaLibraryGrid items={items} canDelete={canDelete} onDelete={handleDelete} />
      </div>

      <AddModal open={open} onClose={closeModal} title="Upload Media" description="Add photos, renders, or documents to the shared library" onSubmit={handleSubmit(onSubmit)} submitLabel="Save to Library" size="lg">
        <ImageUploader images={photos} onChange={setPhotos} max={12} label="Files" />
        <Input
          label="Title"
          placeholder="e.g. Brigade Horizon — Tower A exterior"
          error={errors.title?.message}
          {...register("title", { required: "Give this upload a title" })}
        />
        <Input label="Tags" placeholder="exterior, brigade (comma separated)" {...register("tags")} />
      </AddModal>
    </div>
  );
}
