"use client";

import type { Event } from "@/types/event";
import MinimizedEvent from "./MinimizedEvent";
interface MinimizedGalleryProps {
  markers: Event[];
}

export default function MinimizedGallery(props: MinimizedGalleryProps) {
  const { markers } = props;
  return (
    <div className="w-screen overflow-x-auto bg-slate-100">
      <div className="flex justify-center gap-2 p-2">
        {markers.map((event: Event) => (
          <MinimizedEvent event={event} key={event.id}/>
        ))}
      </div>
    </div>
  );
}
