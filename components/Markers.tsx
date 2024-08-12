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

interface MarkersProps {
  markers: Event[];
}

export default function Markers({ markers }: MarkersProps) {
  const [isLoaded, setLoading] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<number[]>([]);

  function onImageLoad() {
    setLoading(false);
  }

  // Memoize unique coordinates
  const uniqueCoordinates = useMemo(() => {
    const coordinates: LatLngTuple[] = markers.flatMap((marker) =>
      marker.venue.map(
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
  }, [markers]);

  // Memoize event filtering
  const filteredEventsByCoord = useMemo(() => {
    return uniqueCoordinates.map((coordinates) =>
      markers.filter(
        (marker) =>
          marker.venue[0].latitude === coordinates[0] &&
          marker.venue[0].longitude === coordinates[1]
      )
    );
  }, [markers, uniqueCoordinates]);

  const handleNext = useCallback((index: number) => {
    setCurrentEvents((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] += 1;
      return newArray;
    });
  }, []);

  const handlePrevious = useCallback((index: number) => {
    setCurrentEvents((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] -= 1;
      return newArray;
    });
  }, []);

  return uniqueCoordinates.map((coordinates, index) => {
    const filteredEvents = filteredEventsByCoord[index];
    const event = filteredEvents[currentEvents[index]];

    if (event !== undefined) {
      return (
        <Circle
          key={index}
          center={coordinates}
          radius={200}
          pathOptions={{ color: "orange" }}
        >
          <Popup>
            <div className="">
              <div key={event.id}>
                {event?.image[0].url !== null ? (
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
                  <Button className="bg-orange-600">Go to event &rarr;</Button>
                </div>
              </div>
              {filteredEvents.length > 1 ? (
                <>
                  <div className="absolute top-0 flex gap-2 px-10 py-2 z-10 w-full items-center">
                    {/* <input type="button" onClick={handlePrevious} value="Previous" /> */}
                    {filteredEvents.map((filteredEvent, filteredEventIndex) => {
                      return (
                        <hr
                          key={filteredEventIndex}
                          className={
                            "w-full h-1 border-0 rounded " +
                            (currentEvents[index] === filteredEventIndex
                              ? "bg-orange-500"
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
