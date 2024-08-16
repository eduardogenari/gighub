"use client";

import type { Event } from "@/types/event";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MinimizedEventProps {
  event: Event;
}

export default function MinimizedGallery(props: MinimizedEventProps) {
  const { event } = props;
  const router = useRouter();
  return (
    <div>
      {event?.image[0].url !== null ? (
        <div
          className="w-[100px] h-[100px] relative hover:cursor-pointer"
          onClick={() => router.push(`/events/${event.id}/`)}
        >
          <Image
            layout="fill"
            objectFit="cover"
            alt={event.name}
            src={event.image[0].url}
            className="rounded-[12px]"
          ></Image>
        </div>
      ) : null}
    </div>
  );
}
