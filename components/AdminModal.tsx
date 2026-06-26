"use client";

import { useState, useEffect } from "react";
import type { PortfolioItem, Category, MediaType } from "@/lib/types";
import { detectMediaType } from "@/lib/video-utils";

interface AdminModalProps {
  item?: PortfolioItem | null;
  category: Category;
  supportsVideo: boolean;
  onSave: (data: Partial<PortfolioItem>) => Promise<void>;
  onClose: () => void;
}

const IMAGE_ONLY_TYPES: MediaType[] = ["image"];
const ALL_MEDIA_TYPES: { value: MediaType; label: string }[] = [
  { value: "image",       label: "Image URL" },
  { value: "youtube",     label: "YouTube" },
  { value: "vimeo",       label: "Vimeo" },
  { value: "local_video", label: "Local Video (/videos/…)" },
  { value: "mp4",         label: "External MP4 URL" },
];

export default function AdminModal({
  item,
  category,
  supportsVideo,
  onSave,
  onClose,
}: AdminModalProps) {
  const availableTypes = supportsVideo
    ? ALL_MEDIA_TYPES
    : ALL_MEDIA_TYPES.filter((t) => IMAGE_ONLY_TYPES.includes(t.value));

  const [title, setTitle] = useState(item?.title ?? "");
  const [url, setUrl] = useState(item?.url ?? "");
  const [posterUrl, setPosterUrl] = useState(item?.poster_url ?? "");
  const [mediaType, setMediaType] = useState<MediaType>(
    item?.media_type ?? "image"
  );
  const [saving, setSaving] = useState(false);

  // Auto-detect media type from URL
  useEffect(() => {
    if (!item && url) {
      setMediaType(detectMediaType(url));
    }
  }, [url, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        title,
        url,
        poster_url: posterUrl || null,
        media_type: mediaType,
        category,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-cdm-black text-lg mb-5">
          {item ? "Edit Item" : "Add Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-label text-cdm-gray-2 block mb-1">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              className="w-full border border-cdm-rule rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cdm-orange/40"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-label text-cdm-gray-2 block mb-1">
              URL / Path *
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://… or /videos/filename.mp4"
              required
              className="w-full border border-cdm-rule rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cdm-orange/40"
            />
          </div>

          {/* Media type */}
          <div>
            <label className="text-label text-cdm-gray-2 block mb-1">
              Media Type
            </label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as MediaType)}
              className="w-full border border-cdm-rule rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cdm-orange/40 bg-white"
            >
              {availableTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Poster URL — for video types */}
          {["local_video", "mp4", "vimeo"].includes(mediaType) && (
            <div>
              <label className="text-label text-cdm-gray-2 block mb-1">
                Poster / Thumbnail URL (optional)
              </label>
              <input
                type="text"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                placeholder="https://… or /videos/posters/name.jpg"
                className="w-full border border-cdm-rule rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cdm-orange/40"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 py-2.5"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-cdm-rule text-cdm-gray-1 text-sm font-semibold hover:bg-cdm-off-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
