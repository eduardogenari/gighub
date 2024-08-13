"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { YYYYMMDDToDate } from "@/lib/utils";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: any };
}) {
  // Initialise map
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => (
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  // // Filter by country and city
  // events = events.filter((event) => {
  //   if (
  //     location &&
  //     !event.venue.some(
  //       (venue) => venue.country === location.split(",")[1].trim()
  //     )
  //   ) {
  //     return false;
  //   }
  //   if (
  //     location &&
  //     !event.venue.some((venue) => venue.city === location.split(",")[0].trim())
  //   ) {
  //     return false;
  //   }
  //   return true;
  // });

  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [locationNames, setLocationNames] = useState<string[]>([]);
  const [eventsNumber, setEventsNumber] = useState<number>(0);

  // Get filter values from URL
  let { startDate, endDate, artist, genre, price, location } =
    searchParams ?? {};

  // Set default values
  if (!startDate) {
    startDate = new Date();
  }
  if (!endDate) {
    endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
  }
  // if (!location) {
  //   //   // TODO: Detect user location
  //   //   location = "Barcelona, Spain";
  // }
  let bounds = [1.86, 2.49, 41.25, 41.5];
  if (!price) {
    price = [0, 1000];
  }

  // Convert strings for comparison
  startDate =
    typeof startDate === "string" ? YYYYMMDDToDate(startDate) : startDate;
  endDate = typeof endDate === "string" ? YYYYMMDDToDate(endDate) : endDate;
  price =
    typeof price === "string"
      ? [parseFloat(price.split(",")[0]), parseFloat(price.split(",")[1])]
      : price;

  return (
    <main className="flex-grow flex">
      <div className="flex-grow flex overflow-hidden bg-gray-200">
        <div className="w-1/5 bg-white p-4">
          <h1 className="text-lg font-bold">Filters</h1>
          <NavigationMenu></NavigationMenu>
          <Filters
            artists={artistNames}
            genres={genreNames}
            startDate={startDate}
            endDate={endDate}
            location={location}
            price={price}
            artist={artist}
            genre={genre}
            locationNames={locationNames}
          />
          <p className="text-sm mt-4 text-orange-600">
            Number of events: {eventsNumber}
          </p>
        </div>
        <div className="w-4/5 bg-gray-100">
          <Map
            setArtistNames={setArtistNames}
            setGenreNames={setGenreNames}
            setLocationNames={setLocationNames}
            setEventsNumber={setEventsNumber}
            startDate={startDate}
            endDate={endDate}
            bounds={bounds}
            price={price}
            artist={artist}
            genre={genre}
          />
        </div>
      </div>
    </main>
  );
}
