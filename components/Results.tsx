"use client";

import dynamic from "next/dynamic";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import type { Event } from "@/types/event";
import ResultsEventCard from "./ResultsEventCard";
import ScrollToTopButton from "./ScrollToTopButton";

interface ResultsProps {
  startDate: Date;
  endDate: Date;
  price: number[];
  artist: string;
  genre: string;
  bounds: number[];
  locationNames: string[];
  location: string;
  hideWithoutPrice: string;
}

export default function Results(props: ResultsProps) {
  let {
    startDate,
    endDate,
    price,
    artist,
    genre,
    bounds,
    locationNames,
    location,
    hideWithoutPrice,
  } = props;
  // Initialise map
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => (
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
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
  const [events, setEvents] = useState<Event[]>([]);

  // Declare artist and genre as empty strings if they do not exist in options
  // This can happen if the user passes them through the url
  if (!artistNames.includes(artist)) {
    artist = "";
  }
  if (!genreNames.includes(genre)) {
    genre = "";
  }

  console.log(events[0])

  return (
    <>
      <div className="bg-gray-200 overflow-hidden">
        <div className="absolute z-50 xl:w-1/5 p-4">
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
                hideWithoutPrice={hideWithoutPrice}
              />
              <p className="text-sm mt-4 text-orange-600">
                Number of events: {eventsNumber}
              </p>
            </div>
          ) : null}
        </div>
        <div className="w-full h-[calc(100vh-4rem)] bg-gray-100 flex-grow relative">
          <Map
            setArtistNames={setArtistNames}
            setGenreNames={setGenreNames}
            setEventsNumber={setEventsNumber}
            setEvents={setEvents}
            events={events}
            bounds={bounds}
            startDate={startDate}
            endDate={endDate}
            price={price}
            artist={artist}
            genre={genre}
            hideWithoutPrice={hideWithoutPrice}
          />
        </div>
      </div>
      {events.length > 0 && events !== null ? (
        <div>
          <h2 className="flex items-center justify-center mt-0 p-4 text-2xl">
            Events in the area
          </h2>
          <div className="self-center flex-grow flex items-center justify-center flex-wrap">
            {events.map((event: Event) => (
              <ResultsEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : null}
      <ScrollToTopButton />
    </>
  );
}
