import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { YYYYMMDDToDate } from "@/lib/utils";
import { withinRange } from "@/lib/utils";
import prisma from "@/lib/prisma";
import type { Venue } from "@/types/event";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: any };
}) {
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

  console.log("Filters");
  console.log("Start date:", startDate);
  console.log("End date:", endDate);
  console.log("Artist:", artist);
  console.log("Genre:", genre);
  console.log("Price:", price);
  console.log("Location:", location);

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

  // Convert strings for comparison
  startDate =
    typeof startDate === "string" ? YYYYMMDDToDate(startDate) : startDate;
  endDate = typeof endDate === "string" ? YYYYMMDDToDate(endDate) : endDate;
  price =
    typeof price === "string"
      ? [parseFloat(price.split(",")[0]), parseFloat(price.split(",")[1])]
      : price;

  // Get events from Ticketmaster
  let events = await prisma.event.findMany({
    include: {
      artist: true,
      venue: true,
      priceRange: true,
      image: true,
    },
    where: {
      AND: [
        startDate && {
          startDate: {
            gte: startDate,
          },
        },
        endDate && {
          endDate: {
            lte: endDate,
          },
        },
        artist && {
          artist: {
            some: {
              name: artist,
            },
          },
        },
        genre && {
          genre: {
            has: genre,
          },
        },
        price && {
          priceRange: {
            some: {
              OR: [
                {
                  AND: [
                    {
                      min: {
                        gte: price[0],
                      },
                    },
                    {
                      max: {
                        lte: price[1],
                      },
                    },
                    {
                      type: "standard",
                    },
                  ],
                },
                {
                  AND: [
                    {
                      min: {
                        lte: price[1],
                      },
                    },
                    {
                      max: {
                        gte: price[0],
                      },
                    },
                    {
                      type: "standard",
                    },
                  ],
                },
              ],
            },
          },
        },
      ].filter(Boolean),
    },
  });

  // Get artists in current location
  let artistAllNames = events.map((event) => {
    return event.artist?.map((artist) => artist.name || "") || [];
  });
  let artistNames = [...new Set(artistAllNames.flat(1))];

  // Get genres in current location
  let genreAllNames = events.map((event) => {
    return event.genre || [];
  });
  let genreNames = [...new Set(genreAllNames.flat(1))];

  // Group cities by country
  let venues = events.flatMap((event) => event.venue);
  let citiesByCountry: Record<string, string[]> = venues.reduce(
    (accumulator: Record<string, string[]>, venue: Venue) => {
      if (!accumulator[venue.country]) {
        accumulator[venue.country] = [];
      }
      if (!accumulator[venue.country].includes(venue.city)) {
        accumulator[venue.country].push(venue.city);
      }
      return accumulator;
    },
    {}
  );

  // Get city, country combinations
  let locationNames: string[] = Object.entries(citiesByCountry).flatMap(
    ([country, cities]) => cities.map((city) => `${city}, ${country}`)
  );

  // Filter by country and city
  events = events.filter((event) => {
    if (
      location &&
      !event.venue.some(
        (venue) => venue.country === location.split(",")[1].trim()
      )
    ) {
      return false;
    }
    if (
      location &&
      !event.venue.some((venue) => venue.city === location.split(",")[0].trim())
    ) {
      return false;
    }
    return true;
  });

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
            Number of events: {events.length}
          </p>
        </div>
        <div className="w-4/5 bg-gray-100">
          <Map markers={events} />
        </div>
      </div>
    </main>
  );
}
