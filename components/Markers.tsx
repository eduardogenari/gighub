"use client";

import type { Event } from "@/types/event";
import Image from "next/image";
import { Circle, Popup } from "react-leaflet";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  MapPinIcon,
  CoinsIcon,
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import Spinner from "./Spinner";
import { LatLngTuple } from "leaflet";
import { useRouter } from "next/navigation";

interface MarkersProps {
  events: Event[];
}

export default function Markers(props: MarkersProps) {
  const { events } = props;
  const [isImageLoaded, setImageLoading] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<number[]>([]);
  const router = useRouter();

  function onImageLoad() {
    setImageLoading(false);
  }

  // Memoize unique coordinates
  const uniqueCoordinates = useMemo(() => {
    const coordinates: LatLngTuple[] = events.flatMap((event) =>
      event.venue.map(
        (venue) => [venue.latitude, venue.longitude] as LatLngTuple
      )
    );
    const uniquePairs = new Set<string>();
    const uniqueCoords: LatLngTuple[] = [];

    coordinates.forEach((pair) => {
      const pairString = pair.toString();
      if (!uniquePairs.has(pairString)) {
        uniquePairs.add(pairString);
        uniqueCoords.push(pair);
      }
    });

    setCurrentEvents(new Array(uniqueCoords.length).fill(0));
    return uniqueCoords;
  }, [events]);

  // Memoize event filtering
  const filteredEventsByCoord = useMemo(() => {
    return uniqueCoordinates.map((coordinates) =>
      events.filter(
        (event) =>
          event.venue[0].latitude === coordinates[0] &&
          event.venue[0].longitude === coordinates[1]
      )
    );
  }, [events, uniqueCoordinates]);

  // Callback to go to next event in popup
  const handleNext = useCallback((index: number) => {
    setCurrentEvents((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] += 1;
      return newArray;
    });
  }, []);

  // Callback to go to previous event in popup
  const handlePrevious = useCallback((index: number) => {
    setCurrentEvents((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] -= 1;
      return newArray;
    });
  }, []);

  // Callback to set circle colors
  const handleColor = useCallback((eventsNumber: number) => {
    if (eventsNumber == 1) {
      return "#eab308";
    } else if (eventsNumber > 1 && eventsNumber <= 3) {
      return "#f97316";
    } else if (eventsNumber > 3 && eventsNumber <= 10) {
      return "#f59e0b";
    } else {
      return "#ef4444";
    }
  }, []);

  return uniqueCoordinates.map((coordinates, index) => {
    const filteredEvents = filteredEventsByCoord[index];
    const event = filteredEvents[currentEvents[index]];
    const eventsNumber = filteredEvents.length;

    if (event !== undefined) {
      return (
        <Circle
          key={index}
          center={coordinates}
          radius={200}
          pathOptions={{ color: handleColor(eventsNumber) }}
        >
          <Popup>
            <div className="">
              <div key={event.id}>
                {event?.image[0].url !== null ? (
                  <div className="h-[200px] relative">
                    {!isImageLoaded && (
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
                  <h2 className="font-bold text-[hsl(var(--destructive))] text-base">
                    {event.name}
                  </h2>
                  <p className="flex justify-start gap-2 items-center">
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    {event.startDate.toString().split('(')[0]}
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
                        .filter((priceRange) => priceRange.type == "standard")
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
                  <Button
                    variant="destructive"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      const url = `/events/${event.id}`;
                      window.open(url, "_blank");
                    }}
                  >
                    Go to event &rarr;
                  </Button>
                </div>
              </div>
              {filteredEvents.length > 1 ? (
                <>
                  <div className="absolute top-0 flex gap-2 px-10 py-2 z-10 w-full items-center">
                    {filteredEvents.map((filteredEvent, filteredEventIndex) => {
                      return (
                        <hr
                          key={filteredEventIndex}
                          className={
                            "w-full h-1 border-0 rounded " +
                            (currentEvents[index] === filteredEventIndex
                              ? "bg-[hsl(var(--destructive))]"
                              : "bg-gray-300 hover:cursor-pointer")
                          }
                          onClick={() => {
                            const newArray = [...currentEvents];
                            newArray[index] = filteredEventIndex;
                            setCurrentEvents(newArray);
                          }}
                        ></hr>
                      );
                    })}
                  </div>
                  <div className="absolute top-[100px] flex justify-between gap-4 z-10 w-full px-2">
                    <CircleArrowLeftIcon
                      className={
                        "h-6 w-6 shrink-0 text-gray-200 hover:cursor-pointer " +
                        (currentEvents[index] === 0 ? "invisible" : "")
                      }
                      onClick={() => handlePrevious(index)}
                    />
                    <CircleArrowRightIcon
                      className={
                        "h-6 w-6 shrink-0 text-gray-200 hover:cursor-pointer " +
                        (currentEvents[index] === filteredEvents.length - 1
                          ? "invisible"
                          : "")
                      }
                      onClick={() => handleNext(index)}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </Popup>
        </Circle>
      );
    }
  });
}
