"use client";

import type { Event } from "@/types/event";
import Image from "next/image";
import { Circle, Popup } from "react-leaflet";
import { Button } from "./ui/button";
import { CalendarIcon, MapPinIcon, CoinsIcon } from "lucide-react";
import { useState } from "react";
import Spinner from "./Spinner";
import { filter } from "@/actions/filter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MarkersProps {
  markers: Event[];
}

export default function Markers(Markers: MarkersProps) {
  const { markers } = Markers;

  const [isLoaded, setLoading] = useState(true);
  function onImageLoad() {
    setLoading(false);
  }

  // Get unique coordinates
  const coordinates = markers.map((marker) =>
    marker.venue.map((venue) => [venue.latitude, venue.longitude])
  );
  const uniquePairs: Set<string> = new Set();
  const uniqueCoordinates: Array<number[][]> = [];

  coordinates.forEach((pair) => {
    const pairString = pair.toString();
    if (!uniquePairs.has(pairString)) {
      uniquePairs.add(pairString);
      uniqueCoordinates.push(pair);
    }
  });

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return uniqueCoordinates.map((event, index) => {
    let filteredEvents = markers.filter((marker) => {
      return (
        marker.venue[0].latitude === event[0][0] &&
        marker.venue[0].longitude === event[0][1]
      );
    });
    return (
      <Circle
        key={index}
        center={[event[0][0], event[0][1]]}
        radius={200}
        pathOptions={{ color: "orange" }}
      >
        <Popup>
          <Carousel>
            <CarouselContent>
              {filteredEvents.map((event) => {
                return (
                  <CarouselItem>
                    <div key={event.id}>
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

                        {event.priceRange
                          ? event.priceRange
                              .filter(
                                (priceRange) => priceRange.type == "standard"
                              )
                              .map((priceRange, rangeIndex) => (
                                <p
                                  key={rangeIndex}
                                  className="flex justify-start gap-2 items-center"
                                >
                                  <CoinsIcon className="h-4 w-4 shrink-0" />
                                  {priceRange.min === priceRange.max ? (
                                    <>{priceRange.min}</>
                                  ) : (
                                    <>
                                      {priceRange.min} - {priceRange.max}
                                    </>
                                  )}{" "}
                                  {priceRange.currency}
                                </p>
                              ))
                          : null}
                        <Button className="bg-orange-600">
                          Go to event &rarr;
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
              <CarouselPrevious className="z-100000" onClick={stopPropagation}/>
              <CarouselNext className="z-100000" onClick={stopPropagation}/>
            </CarouselContent>
          </Carousel>
        </Popup>
      </Circle>
    );
  });
}
