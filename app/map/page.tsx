import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { YYYYMMDDToDate } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { withinRange } from "@/lib/utils";
import prisma from "@/lib/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: any };
}) {
  let {
    startDate,
    endDate,
    artist,
    genre,
    price,
    hideWithoutPrice,
    country,
    city,
  } = searchParams ?? {};
  if (!startDate) {
    startDate = new Date();
  }
  if (!endDate) {
    endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
  }
  console.log(startDate, endDate);

  console.log("Filters");
  console.log("Start date:", startDate);
  console.log("End date:", endDate);
  console.log("Artist:", artist);
  console.log("Genre:", genre);
  console.log("Price:", price);
  console.log("Hide without price:", hideWithoutPrice);
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

  // Convert date strings to Date objects for comparison
  const start =
    typeof startDate === "string" ? YYYYMMDDToDate(startDate) : startDate;
  const end = typeof endDate === "string" ? YYYYMMDDToDate(endDate) : endDate;

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
        start && {
          startDate: {
            gte: start,
          },
        },
        end && {
          endDate: {
            lte: end,
          },
        },
      ].filter(Boolean),
    },
  });

  // Get all names in these events
  let artistAllNames = events.map((event) => {
    return event.artist?.map((artist) => artist.name || "") || [];
  });

  // Create a list and remove duplicates
  let artistNames = [...new Set(artistAllNames.flat(1))];

  // Get all genres in these events
  let genreAllNames = events.map((event) => {
    return event.genre || [];
  });
  let genreNames = [...new Set(genreAllNames.flat(1))];

  // Get all countries in these events
  let countryAllNames = events.flatMap((event) => {
    return event.venue.map((venue) => venue.country);
  });
  let countryNames = [...new Set(countryAllNames.flat(1))];

  // Get all cities in these events (in selected country if any)
  let cityAllNames = events.flatMap((event) => {
    return event.venue.map((venue) => venue.city);
  });
  let cityNames = [...new Set(cityAllNames.flat(1))];

  console.log("Number of concerts before filtering", events.length);

  events = events.filter((event) => {

    // Filter by artist
    if (artist && !event.artist?.some((dbArtist) => dbArtist.name === artist)) {
      return false;
    }

    // Filter by genre
    if (genre && !event.genre.some((dbGenre) => dbGenre === genre)) {
      return false;
    }

    // Filter by country
    if (country && !event.venue.some((venue) => venue.country === country)) {
      return false;
    }

    // Filter by city
    if (city && !event.venue.some((venue) => venue.city === city)) {
      return false;
    }

    // Filter by price
    if (
      price &&
      event.priceRange &&
      event.priceRange[0] &&
      event.priceRange[0]?.min !== null &&
      event.priceRange[0]?.max !== null
    ) {
      return withinRange(price.split(",").map(Number), [
        event.priceRange[0].min,
        event.priceRange[0].max,
      ]);
    } else {
      if (hideWithoutPrice === "on") {
        // Hide events that have no information on price
        return false;
      } else {
        // Show events that have no information on price
        return true;
      }
    }
  });

  console.log("Number of concerts after filtering", events.length);

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
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
          />
          <p className="text-sm mt-4 text-orange-600">
            Number of events: {events.length}
          </p>
        </div>
        <div className="w-4/5 bg-gray-100">
          <Map markers={events} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
