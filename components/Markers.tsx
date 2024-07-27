"use client";

import type { Event } from "@/types/event";
import Image from "next/image";
import { Circle, Popup } from "react-leaflet";
import { Button } from "./ui/button";

interface MarkersProps {
  markers: Event[];
}

export default function Markers(Markers: MarkersProps) {
  const { markers } = Markers;

  return markers.map((event: Event) => {
    return (
      <Circle
        key={event.id}
        center={[parseFloat(event.venues[0].location.latitude), 
                 parseFloat(event.venues[0].location.longitude)]}
        radius={1000}
        pathOptions={{ color: "orange" }}
      >
        <Popup>
          <div className="h-[200px] relative">
            <Image
              layout="fill"
              objectFit="cover"
              alt={event.name}
              src={event.images[0].url}
              className="rounded-[12px]"
            ></Image>
          </div>
          <div className="p-4 leading-3">
            <h2 className="font-bold text-orange-600 text-base">
              {event.name}
            </h2>
            <p className="text-sm">{event.dates.start.localDate.toString()}</p>
            <p className="text-sm">
              {event.venues[0].name} ({event.venues[0].city}, {event.venues[0].country})
            </p>
            <Button className="bg-orange-600">Go to event &rarr;</Button>
          </div>
        </Popup>
      </Circle>
    );
  });
}
