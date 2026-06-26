"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { PortfolioItem } from "@/lib/types";
import {
  extractYouTubeId,
  extractVimeoId,
  getYouTubeEmbedUrl,
  getVimeoEmbedUrl,
} from "@/lib/video-utils";

interface LightboxProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const renderContent = () => {
    const { media_type, url } = item;

    if (media_type === "youtube") {
      const id = extractYouTubeId(url);
      if (!id) return null;
      return (
        <iframe
          src={getYouTubeEmbedUrl(id)}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
          title={item.title || "YouTube video"}
        />
      );
    }

    if (media_type === "vimeo") {
      const id = extractVimeoId(url);
      if (!id) return null;
      return (
        <iframe
          src={getVimeoEmbedUrl(id)}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full"
          title={item.title || "Vimeo video"}
        />
      );
    }

    if (media_type === "local_video" || media_type === "mp4") {
      return (
        <video
          src={url}
          poster={item.poster_url ?? undefined}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />
      );
    }

    // Image
    return (
      <div className="relative w-full h-full">
        <Image
          src={url}
          alt={item.title || "Portfolio image"}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
    );
  };

  const isVideo = ["youtube", "vimeo", "local_video", "mp4"].includes(
    item.media_type
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Portfolio item"}
    >
      {/* Content box — stop propagation so clicks inside don't close */}
      <div
        className={`relative ${isVideo ? "w-full max-w-5xl aspect-video" : "max-w-5xl max-h-[90vh] w-full h-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-label hover:opacity-70 transition-opacity bg-white/10 rounded-full px-4 py-2"
        aria-label="Close"
      >
        Close ✕
      </button>

      {item.title && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm opacity-60">
          {item.title}
        </p>
      )}
    </div>
  );
}
