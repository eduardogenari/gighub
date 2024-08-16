"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { YYYYMMDDToDate } from "@/lib/utils";
import { updateFilterOptions } from "@/actions/markers";

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

  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [boundingBoxesByCity, setBoundingBoxesByCity] = useState<any>([]);
  const [eventsNumber, setEventsNumber] = useState<number>(0);

  useEffect(() => {
    updateFilterOptions().then((response) => {
      setBoundingBoxesByCity(response.boundingBoxesByCity)
    });
  }, []);

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
  if (!location) {
    // TODO: Detect user location
    location = "Barcelona, Spain";
  }
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
            price={price}
            artist={artist}
            genre={genre}
          />
          <p className="text-sm mt-4 text-orange-600">
            Number of events: {eventsNumber}
          </p>
        </div>
        <div className="w-4/5 bg-gray-100">
          <Map
            setArtistNames={setArtistNames}
            setGenreNames={setGenreNames}
            setEventsNumber={setEventsNumber}
            boundingBoxesByCity={boundingBoxesByCity}
            startDate={startDate}
            endDate={endDate}
            location={location}
            price={price}
            artist={artist}
            genre={genre}
          />
        </div>
      </div>
    </main>
  );
}
