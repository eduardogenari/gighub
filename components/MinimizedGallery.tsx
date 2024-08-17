"use client";

import type { Event } from "@/types/event";
import MinimizedEvent from "./MinimizedEvent";
interface MinimizedGalleryProps {
  events: Event[];
}

export default function MinimizedGallery(props: MinimizedGalleryProps) {
  const { events } = props;
  return (
    // TODO: Remove right padding
    <div className="w-screen bg-slate-100 overflow-x-auto flex justify-center gap-2 p-2">
      {events.map((event: Event) => (
        <MinimizedEvent event={event} key={event.id} />
      ))}
    </div>
  );
}
