import type { MediaType } from "./types";

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]+)/,
    /youtube\.com\/shorts\/([^&?/\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export function getVimeoEmbedUrl(videoId: string): string {
  return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
}

export function detectMediaType(url: string): MediaType {
  if (extractYouTubeId(url)) return "youtube";
  if (extractVimeoId(url)) return "vimeo";
  if (url.startsWith("/videos/")) return "local_video";
  if (url.match(/\.(mp4|webm|ogg)$/i)) return "mp4";
  return "image";
}

export function getPosterUrl(
  mediaType: MediaType,
  url: string,
  posterUrl: string | null
): string | null {
  if (posterUrl) return posterUrl;
  if (mediaType === "youtube") {
    const id = extractYouTubeId(url);
    return id ? getYouTubeThumbnail(id) : null;
  }
  return null;
}
