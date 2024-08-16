"use client";

import dynamic from "next/dynamic";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";

interface MapFiltersProps {
  startDate: Date;
  endDate: Date;
  price: number[];
  artist: string;
  genre: string;
  bounds: number[];
  locations: {
    id: number;
    city: string;
    country: string;
    boundingBox: number[];
  }[];
  location: string;
}

export default function MapFilters(props: MapFiltersProps) {
  const {
    startDate,
    endDate,
    price,
    artist,
    genre,
    bounds,
    locations,
    location,
  } = props;
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

  const locationNames = locations.map(
    (location) => `${location.city}, ${location.country}`
  );

  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [eventsNumber, setEventsNumber] = useState<number>(0);
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);

  return (
    <>
      <div className="absolute z-50 w-1/5 p-4 m-4">
        <Button
        variant={"secondary"}
          className="text-lg font-bold"
          onClick={() => setFiltersVisibility(!filtersVisibility)}
        >
          Filters
        </Button>
        {filtersVisibility ? (
          <div className="bg-white p-4 mt-4 rounded">
            <Filters
              artists={artistNames}
              genres={genreNames}
              locations={locationNames}
              startDate={startDate}
              endDate={endDate}
              price={price}
              artist={artist}
              genre={genre}
              location={location}
            />
            <p className="text-sm mt-4 text-orange-600">
              Number of events: {eventsNumber}
            </p>
          </div>
        ) : null}
      </div>
      <div className="w-full bg-gray-100">
        <Map
          setArtistNames={setArtistNames}
          setGenreNames={setGenreNames}
          setEventsNumber={setEventsNumber}
          bounds={bounds}
          startDate={startDate}
          endDate={endDate}
          price={price}
          artist={artist}
          genre={genre}
        />
      </div>
    </>
  );
}
