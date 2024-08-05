import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { YYYYMMDDToDate } from "@/lib/utils";
import { withinRange } from "@/lib/utils";
import prisma from "@/lib/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: any };
}) {
  // Get filter values from URL
  let { startDate, endDate, artist, genre, price, country, city } =
    searchParams ?? {};

  // Set default values
  if (!startDate) {
    startDate = new Date();
  }
  if (!endDate) {
    endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
  }
  if (!country && !city) {
    // TODO: Detect user location
    country = "Spain";
    city = "Barcelona";
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
  console.log("Country:", country);
  console.log("City:", city);

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
        country && {
          venue: {
            some: {
              country: country,
            },
          },
        },
        city && {
          venue: {
            some: {
              city: city,
            },
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

  // Get all countries
  let venues = await prisma.venue.findMany();
  let countryAllNames = venues.map((venue) => venue.country);
  let countryNames = [...new Set(countryAllNames.flat(1))];

  // Get all cities
  let cityAllNames = venues.map((venue) => venue.city);
  let cityNames = [...new Set(cityAllNames.flat(1))];

  return (
    <main className="flex-grow flex">
      <div className="flex-grow flex overflow-hidden bg-gray-200">
        <div className="w-1/5 bg-white p-4">
          <h1 className="text-lg font-bold">Filters</h1>
          <NavigationMenu></NavigationMenu>
          <Filters
            artists={artistNames}
            genres={genreNames}
            countries={countryNames}
            cities={cityNames}
            startDate={startDate}
            endDate={endDate}
            country={country}
            city={city}
            price={price}
            artist={artist}
            genre={genre}
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
