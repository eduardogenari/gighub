"use client";

import dynamic from "next/dynamic";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import type { Event } from "@/types/event";
import ResultsEventCard from "./ResultsEventCard";
import ScrollToTopButton from "./ScrollToTopButton";
import { IoMdOptions } from "react-icons/io";
import type { Location } from "@/types/location";

interface ResultsProps {
  startDate: Date;
  endDate: Date;
  price: number[];
  artist: string;
  genre: string;
  locationNames: string[];
  locations: Location[];
  location: string;
  hideWithoutPrice: string;
  initialArtistNames: string[];
  initialGenreNames: string[];
}

export default function Results(props: ResultsProps) {
  let {
    startDate,
    endDate,
    price,
    artist,
    genre,
    locationNames,
    locations,
    location,
    hideWithoutPrice,
    initialArtistNames,
    initialGenreNames
  } = props;
  // Initialise map
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => (
          <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
            <Spinner/>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const [artistNames, setArtistNames] = useState<string[]>(initialArtistNames);
  const [genreNames, setGenreNames] = useState<string[]>(initialGenreNames);
  const [eventsNumber, setEventsNumber] = useState<number>(0);
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<number>(50);

  const loadMoreEvents = () => {
    setVisibleEvents((prev) => prev + 50);
  };

  return (
    <>
      <div className="bg-gray-200 overflow-hidden">
        <div className="fixed top-20 left-7 z-50">
          <Button
            variant={"destructive"}
            className="text-lg font-bold h-[50px] w-[50px] rounded-full transform hover:scale-110"
            onClick={() => setFiltersVisibility(!filtersVisibility)}
          >
            <IoMdOptions />
          </Button>
          {filtersVisibility ? (
            <div className="bg-background p-4 mt-2 rounded">
              <Filters
                artists={artistNames}
                genres={genreNames}
                locationNames={locationNames}
                startDate={startDate}
                endDate={endDate}
                price={price}
                artist={artist}
                genre={genre}
                location={location}
                hideWithoutPrice={hideWithoutPrice}
                setArtistNames={setArtistNames}
                setGenreNames={setGenreNames}
              />
            </div>
          ) : null}
        </div>
        <div className="w-full h-[calc(100vh-6rem)] bg-gray-100 flex-grow relative">
          <Map
            setArtistNames={setArtistNames}
            setGenreNames={setGenreNames}
            setEventsNumber={setEventsNumber}
            setEvents={setEvents}
            events={events}
            locationNames={locationNames}
            locations={locations}
            location={location}
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
        <>
          <div className="mt-28 w-full flex justify-center">
            <div className="w-[65vw] flex items-center justify-center flex-wrap">
              {events.slice(0, visibleEvents).map((event: Event) => (
                <ResultsEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          {visibleEvents < events.length && (
            <div className="w-full flex justify-center mt-4">
              <Button
                onClick={loadMoreEvents}
                variant={"secondary"}
                className="w-[250px] mt-6 mb-16"
              >
                Load More Events
              </Button>
            </div>
          )}
        </>
      ) : null}
      <ScrollToTopButton />
    </>
  );
}
