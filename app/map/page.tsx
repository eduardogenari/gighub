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
  searchParams?: { [key: string]: string | undefined };
}) {
  // Get dates imageand artist from URL query paramters
  let startDate: string | undefined;
  let endDate: string | undefined;
  let artist: string | undefined;
  let genre: string | undefined;
  let price: string | undefined;
  let hideWithoutPrice: string | undefined;
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
    if (searchParams.hasOwnProperty("genre")) {
      genre = searchParams.genre;
    }
    if (searchParams.hasOwnProperty("price")) {
      price = searchParams.price;
    }
    if (searchParams.hasOwnProperty("hideWithoutPrice")) {
      hideWithoutPrice = searchParams.hideWithoutPrice;
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

  // Get events from Ticketmaster
  let events = await prisma.event.findMany({
    include: {
      artist: true,
      venue: true,
      priceRange: true,
      image: true,
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

  console.log("Number of concerts before filtering", events.length);

  // Filter by start date
  if (startDate) {
    events = events.filter((event) => {
      return new Date(event.startDate) >= YYYYMMDDToDate(startDate);
    });
  }

  // Filter by end date
  if (endDate) {
    events = events.filter((event) => {
      return new Date(event.endDate) <= YYYYMMDDToDate(endDate);
    });
  }

  // Filter by artist
  if (artist) {
    events = events.filter((event) => {
      return event.artist?.some((dbArtist) => {
        return dbArtist.name == artist;
      });
    });
  }

  // Filter by genre
  if (genre) {
    events = events.filter((event) => {
      return event.genre.some((dbGenre) => {
        return dbGenre == genre;
      });
    });
  }

  console.log("Before price filter", events.length);
  if (price) {
    events = events.filter((event) => {
      if (
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
  }

  console.log("Number of concerts after filtering", events.length);

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex overflow-hidden bg-gray-200">
        <div className="w-1/5 bg-white p-4">
          <h1 className="text-lg font-bold">Filters</h1>
          <NavigationMenu></NavigationMenu>
          <Filters artists={artistNames} genres={genreNames} />
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
