"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioItem } from "@/lib/types";
import Lightbox from "./Lightbox";
import { getPosterUrl } from "@/lib/video-utils";

interface WorkGridProps {
  items: PortfolioItem[];
}

export default function WorkGrid({ items }: WorkGridProps) {
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const isVideo = (item: PortfolioItem) =>
    ["youtube", "vimeo", "local_video", "mp4"].includes(item.media_type);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const poster = getPosterUrl(item.media_type, item.url, item.poster_url);
          const videoItem = isVideo(item);

          return (
            <button
              key={item.id}
              onClick={() => setActive(item)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[6px] bg-cdm-black/5 cursor-pointer"
              aria-label={item.title || "View item"}
            >
              {poster ? (
                <Image
                  src={poster}
                  alt={item.title || "Portfolio item"}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              ) : (
                <div className="absolute inset-0 bg-cdm-black/10 flex items-center justify-center">
                  <span className="text-label text-cdm-gray-2">
                    {item.title || "View"}
                  </span>
                </div>
              )}

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Video badge */}
              {videoItem && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white rounded-full px-3 py-1">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="2,1 9,5 2,9" />
                  </svg>
                  <span className="text-label" style={{ fontSize: "0.6rem" }}>
                    Video
                  </span>
                </div>
              )}

              {/* Title */}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium truncate">
                    {item.title}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {active && <Lightbox item={active} onClose={() => setActive(null)} />}
    </>
  );
}
