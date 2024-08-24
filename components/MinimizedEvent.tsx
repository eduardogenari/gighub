"use client";

import type { Event } from "@/types/event";
import Image from "next/image";

interface MinimizedEventProps {
  event: Event;
}

export default function MinimizedEvent(props: MinimizedEventProps) {
  const { event } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `/events/${event.id}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      {event?.image[0].url !== null ? (
        <div
          className="w-[100px] h-[100px] relative hover:cursor-pointer"
          onClick={handleClick}
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