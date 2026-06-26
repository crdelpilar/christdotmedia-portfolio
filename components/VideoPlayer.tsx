import {
  extractYouTubeId,
  extractVimeoId,
  getYouTubeEmbedUrl,
  getVimeoEmbedUrl,
} from "@/lib/video-utils";
import type { MediaType } from "@/lib/types";

interface VideoPlayerProps {
  mediaType: MediaType;
  url: string;
  posterUrl?: string | null;
  title?: string;
  className?: string;
}

export default function VideoPlayer({
  mediaType,
  url,
  posterUrl,
  title = "Video",
  className = "",
}: VideoPlayerProps) {
  if (mediaType === "youtube") {
    const id = extractYouTubeId(url);
    if (!id) return null;
    return (
      <iframe
        src={getYouTubeEmbedUrl(id)}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={title}
        className={className}
      />
    );
  }

  if (mediaType === "vimeo") {
    const id = extractVimeoId(url);
    if (!id) return null;
    return (
      <iframe
        src={getVimeoEmbedUrl(id)}
        allow="autoplay; fullscreen"
        allowFullScreen
        title={title}
        className={className}
      />
    );
  }

  return (
    <video
      src={url}
      poster={posterUrl ?? undefined}
      controls
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
