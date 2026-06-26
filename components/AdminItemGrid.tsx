"use client";

import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import type { PortfolioItem } from "@/lib/types";
import { getPosterUrl } from "@/lib/video-utils";

interface AdminItemGridProps {
  items: PortfolioItem[];
  onReorder: (items: PortfolioItem[]) => void;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: string) => void;
  onToggleVisible: (id: string, visible: boolean) => void;
}

export default function AdminItemGrid({
  items,
  onReorder,
  onEdit,
  onDelete,
  onToggleVisible,
}: AdminItemGridProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...items];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onReorder(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {items.map((item, index) => {
              const poster = getPosterUrl(
                item.media_type,
                item.url,
                item.poster_url
              );
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(drag, snapshot) => (
                    <div
                      ref={drag.innerRef}
                      {...drag.draggableProps}
                      {...drag.dragHandleProps}
                      className={`group relative aspect-[4/5] rounded-md overflow-hidden bg-cdm-black/10 cursor-grab ${
                        snapshot.isDragging ? "ring-2 ring-cdm-orange shadow-2xl" : ""
                      } ${!item.visible ? "opacity-40" : ""}`}
                    >
                      {poster ? (
                        <Image
                          src={poster}
                          alt={item.title || "Item"}
                          fill
                          sizes="20vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-cdm-black/10">
                          <span className="text-label text-cdm-gray-2 text-center px-2">
                            {item.media_type}
                          </span>
                        </div>
                      )}

                      {/* Action overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => onEdit(item)}
                          className="bg-white text-cdm-black text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-cdm-off-white transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onToggleVisible(item.id, !item.visible)}
                          className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                        >
                          {item.visible ? "Hide" : "Show"}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete this item?")) onDelete(item.id);
                          }}
                          className="bg-red-500/80 text-white text-xs px-3 py-1.5 rounded-full hover:bg-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Drag handle indicator */}
                      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-60 transition-opacity">
                        <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-white rounded-full" />
                          ))}
                        </div>
                      </div>

                      {!item.visible && (
                        <div className="absolute bottom-2 left-2">
                          <span className="text-label bg-black/60 text-white px-2 py-0.5 rounded-full" style={{ fontSize: "0.55rem" }}>
                            Hidden
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
