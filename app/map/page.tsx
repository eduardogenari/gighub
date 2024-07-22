import dynamic from "next/dynamic";
import { promises as fs } from "fs";
import React, { useMemo } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import type { Event } from "@/types/event";
import type { Artist } from "@/types/artist";
import { YYYYMMDDToDate } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Get dates and artist from URL query paramters
  let startDate;
  let endDate;
  let artist;
  if (searchParams) {
    if (searchParams.hasOwnProperty("startDate")) {
      startDate = searchParams.startDate;
    }
    if (searchParams.hasOwnProperty("endDate")) {
      endDate = searchParams.endDate;
    }
    if (searchParams.hasOwnProperty("artist")) {
      artist = searchParams.artist;
    }
  }

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

  // Read events from file
  console.log(process.cwd());
  const eventsFile = await fs.readFile(
    process.cwd() + "/public/events.json",
    "utf8"
  );
  let events = JSON.parse(eventsFile);

  // Read artists from file
  const artistsFile = await fs.readFile(
    process.cwd() + "/public/artists.json",
    "utf8"
  );
  let artists = JSON.parse(artistsFile);
  let artistsNames = artists.map((artist: Artist) => artist.name);

  // Filter by start date
  if (startDate) {
    events = events.filter((event: Event) => {
      return new Date(event.date) >= YYYYMMDDToDate(startDate);
    });
  }

  // Filter by end date
  if (endDate) {
    events = events.filter((event: Event) => {
      return new Date(event.date) <= YYYYMMDDToDate(endDate);
    });
  }

  // Filter by artist
  if (artist) {
    events = events.filter((event: Event) => {
      const foundArtist = artists.find((key: Artist) => key.name === artist);
      return event.artists.includes(foundArtist.id);
    });
  }

  return (
    <main className="h-screen w-screen flex overflow-hidden bg-gray-200">
      <div className="w-1/5 bg-white p-4">
        <h1 className="text-lg font-bold mb-4">Filters</h1>
        <NavigationMenu></NavigationMenu>
        <Filters artists={artistsNames} />
      </div>
      <div className="w-4/5 bg-gray-100">
        <Map markers={events} />
      </div>
    </main>
  );
}
