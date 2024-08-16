"use client";

import type { Event } from "@/types/event";
import MinimizedEvent from "./MinimizedEvent";
import { ChevronsUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface MinimizedGalleryProps {
  markers: Event[];
}

export default function MinimizedGallery(props: MinimizedGalleryProps) {
  const { markers } = props;
  const router = useRouter();
  return (
    <div className="w-screen overflow-hidden">
      <div className="bg-orange-400 p-0.5 flex justify-center">
        <div>
          <ChevronsUpIcon
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => router.push("/events")}
          />
        </div>
      </div>
      <div className="bg-slate-300 flex justify-center gap-2 p-2">
        {markers.map((event: Event) => (
          <MinimizedEvent event={event} key={event.id}/>
        ))}
      </div>
    </div>
  );
}
