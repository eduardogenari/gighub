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
  locationNames: string[];
  location: string;
}

export default function MapFilters(props: MapFiltersProps) {
  let {
    startDate,
    endDate,
    price,
    artist,
    genre,
    bounds,
    locationNames,
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

  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [eventsNumber, setEventsNumber] = useState<number>(0);
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);

  // Declare artist and genre as empty strings if they do not exist in options
  // This can happen if the user passes them through the url
  if (!artistNames.includes(artist)){
    artist = ""
  }
  if (!genreNames.includes(genre)){
    genre = ""
  }

  return (
    <>
      <div className="absolute z-50 md:w-1/5 p-4">
        <Button
        variant={"secondary"}
          className="text-lg font-bold"
          onClick={() => setFiltersVisibility(!filtersVisibility)}
        >
          Filters
        </Button>
        {filtersVisibility ? (
          <div className="bg-white p-4 mt-2 rounded">
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
      <div className="w-screen h-full w-full bg-gray-100">
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
