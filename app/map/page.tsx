import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import type { Event } from "@/types/event";
import { YYYYMMDDToDate } from "@/lib/utils";
import { actionGetAllEvents } from "@/actions/events";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  // Get dates and artist from URL query paramters
  let startDate;
  let endDate;
  let artist;
  let price;
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
    if (searchParams.hasOwnProperty("price")) {
      price = searchParams.price;
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
  let events = await actionGetAllEvents();

  // Get all names in these events
  let names = events.map((event) => {
    return (
      event._embedded.attractions?.map((attraction) => attraction.name) || []
    );
  });

  // Create a list and remove duplicates
  let artistNames = [...new Set(names.flat(1))];

  console.log("Number of concerts before filtering", events.length);

  // Filter by start date
  if (startDate) {
    events = events.filter((event: Event) => {
      return new Date(event.dates.start.localDate) >= YYYYMMDDToDate(startDate);
    });
  }

  // Filter by end date
  if (endDate) {
    events = events.filter((event: Event) => {
      return new Date(event.dates.start.localDate) <= YYYYMMDDToDate(endDate);
    });
  }

  // Filter by artist
  if (artist) {
    events = events.filter((event: Event) => {
      return event._embedded.attractions?.some((attraction) => {
        return attraction.name == artist;
      });
    });
  }

  if (price) {
    events = events.filter((event: Event) => {
      if (
        event.priceRanges &&
        event.priceRanges[0].min !== undefined &&
        event.priceRanges[0].max !== undefined
      ) {
        return (
          (parseFloat(price.split(",")[0]) >= event.priceRanges[0].min &&
            parseFloat(price.split(",")[0]) <= event.priceRanges[0].max) ||
          (parseFloat(price.split(",")[1]) >= event.priceRanges[0].min &&
            parseFloat(price.split(",")[1]) <= event.priceRanges[0].max)
        );
      } else {
        return true; // TODO: Decide if I want to include events without price range
      }
    });
  }

  console.log("Number of concerts after filtering", events.length);

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex overflow-hidden bg-gray-200">
        <div className="w-1/5 bg-white p-4">
          <h1 className="text-lg font-bold mb-4">Filters</h1>
          <NavigationMenu></NavigationMenu>
          <Filters artists={artistNames} />
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
