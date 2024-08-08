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
import { useState } from "react";
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

  // Initialise array with 0, as many as unique locations
  const [currentEvents, setCurrentEvents] = useState(
    new Array(uniqueCoordinates.length).fill(0)
  );

  // Show a circle per unique location
  return uniqueCoordinates.map((coordinates, index) => {
    // Get events in unique location
    let filteredEvents = markers.filter((marker) => {
      return (
        marker.venue[0].latitude === coordinates[0][0] &&
        marker.venue[0].longitude === coordinates[0][1]
      );
    });

    const handleNext = () => {
      setCurrentEvents((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] += 1;
        return newArray;
      });
    };

    const handlePrevious = () => {
      setCurrentEvents((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] -= 1;
        return newArray;
      });
    };

    // Get visible event
    let event = filteredEvents[currentEvents[index]];

    return (
      <Circle
        key={index}
        center={[coordinates[0][0], coordinates[0][1]]}
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
                    onClick={() => handlePrevious()}
                  />
                  <CircleArrowRightIcon
                    className={
                      "h-6 w-6 shrink-0 text-gray-200 hover:cursor-pointer " +
                      (currentEvents[index] === filteredEvents.length - 1
                        ? "invisible"
                        : "")
                    }
                    onClick={() => handleNext()}
                  />
                </div>
              </>
            ) : null}
          </div>
        </Popup>
      </Circle>
    );
  });
}
