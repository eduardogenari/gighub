"use client";

import type { Event } from "@/types/event";
import Image from "next/image";
import { Circle, Popup } from "react-leaflet";
import { Button } from "./ui/button";
import { CalendarIcon, MapPinIcon, CoinsIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Suspense, useState } from "react";
import Spinner from "./Spinner";

interface MarkersProps {
  markers: Event[];
}

export default function Markers(Markers: MarkersProps) {
  const { markers } = Markers;

  const [isLoaded, setLoading] = useState(true);
  function onImageLoad() {
    setLoading(false);
  }

  return markers.map((event) => {
    if (event.venue[0].latitude !== null && event.venue[0].longitude !== null) {
      return (
        <Circle
          key={uuidv4()}
          center={[event.venue[0].latitude, event.venue[0].longitude]}
          radius={1000}
          pathOptions={{ color: "orange" }}
        >
          <Popup>
            {event.image[0].url !== null ? (
              <div className="h-[200px] relative">
                {!isLoaded && (
                  <div className="flex justify-center items-center h-[200px]">
                    <Spinner />
                  </div>
                )}
                <Image
                  layout="fill"
                  objectFit="cover"
                  alt={event.name}
                  src={event.image[0].url}
                  className="rounded-t-[12px]"
                  onLoad={() => onImageLoad()}
                ></Image>
              </div>
            ) : null}

            <div className="px-4 pb-4 leading-3">
              <h2 className="font-bold text-orange-600 text-base">
                {event.name}
              </h2>
              <p className="flex justify-start gap-2 items-center">
                <CalendarIcon className="h-4 w-4 shrink-0" />
                {event.startDate.toString()}
              </p>

              {event.venue[0].name !== null ? (
                <p className="flex justify-start gap-2 items-center">
                  <MapPinIcon className="h-4 w-4 shrink-0" />
                  {event.venue[0].name} ({event.venue[0].city},{" "}
                  {event.venue[0].country})
                </p>
              ) : (
                <p className="flex justify-start gap-2 items-center">
                  <MapPinIcon className="h-4 w-4 shrink-0" />
                  {event.venue[0].city}, {event.venue[0].country}
                </p>
              )}

              {event.priceRange && event.priceRange[0] !== undefined ? (
                <p className="flex justify-start gap-2 items-center">
                  <CoinsIcon className="h-4 w-4 shrink-0" />
                  {event.priceRange[0].min} - {event.priceRange[0].max}{" "}
                  {event.priceRange[0].currency}
                </p>
              ) : null}
              <Button className="bg-orange-600">Go to event &rarr;</Button>
            </div>
          </Popup>
        </Circle>
      );
    }
  });
}
