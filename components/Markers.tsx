"use client";

import type { Event } from "@/types/event";
import Image from "next/image";
import { Circle, Popup } from "react-leaflet";
import { Button } from "./ui/button";
import { CalendarIcon, MapPinIcon, CoinsIcon } from "lucide-react";

interface MarkersProps {
  markers: Event[];
}

export default function Markers(Markers: MarkersProps) {
  const { markers } = Markers;

  return markers.map((event: Event) => {
    return (
      <Circle
        key={event.id}
        center={[
          parseFloat(event.venues[0].location.latitude),
          parseFloat(event.venues[0].location.longitude),
        ]}
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
              className="rounded-t-[12px]"
            ></Image>
          </div>
          <div className="p-4 leading-3">
            <h2 className="font-bold text-orange-600 text-base">
              {event.name}
            </h2>
            <p className="flex justify-start gap-2 items-center">
              <CalendarIcon className="h-4 w-4 shrink-0" />
              {event.dates.start.localDate.toString()}
            </p>

            {event.venues[0].name !== undefined ? (
              <p className="flex justify-start gap-2 items-center">
                <MapPinIcon className="h-4 w-4 shrink-0" />
                {event.venues[0].name} ({event.venues[0].city},{" "}
                {event.venues[0].country})
              </p>
            ) : (
              <p className="flex justify-start gap-2 items-center">
                <MapPinIcon className="h-4 w-4 shrink-0" />
                {event.venues[0].city}, {event.venues[0].country}
              </p>
            )}

            {event.priceRanges &&
            event.priceRanges[0].min !== undefined &&
            event.priceRanges[0].max !== undefined &&
            event.priceRanges[0].currency !== undefined ? (
              <p className="flex justify-start gap-2 items-center">
                <CoinsIcon className="h-4 w-4 shrink-0" />
                {event.priceRanges[0].min} - {event.priceRanges[0].max}{" "}
                {event.priceRanges[0].currency}
              </p>
            ) : null}
            <Button className="bg-orange-600">Go to event &rarr;</Button>
          </div>
        </Popup>
      </Circle>
    );
  });
}
