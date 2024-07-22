import dynamic from "next/dynamic";
import { promises as fs } from "fs";
import React, { useMemo } from "react";
import Filters from "@/components/Filters";
import Spinner from "@/components/Spinner";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import type { Event } from "@/types/event";
import { YYYYMMDDToDate } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  // Get start date and end date from URL query paramters
  let startDate;
  let endDate;
  if (searchParams) {
    if (searchParams.hasOwnProperty("startDate")) {
      startDate = searchParams.startDate;
    }
    if (searchParams.hasOwnProperty("endDate")) {
      endDate = searchParams.endDate;
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
  const eventsFile = await fs.readFile(
    process.cwd() + "/app/map/events.json",
    "utf8"
  );
  let events = JSON.parse(eventsFile);

  // Filter by start date and end date
  if (startDate && endDate) {
    events = events.filter((event: { date: string }) => {
      return (
        new Date(event.date) >= YYYYMMDDToDate(startDate) &&
        new Date(event.date) <= YYYYMMDDToDate(endDate)
      );
    });
  }

  return (
    <main className="h-screen w-screen flex overflow-hidden bg-gray-200">
      <div className="w-1/5 bg-white p-4">
        <h1 className="text-lg font-bold mb-4">Filters</h1>
        <NavigationMenu></NavigationMenu>
        <Filters />
      </div>
      <div className="w-4/5 bg-gray-100">
        <Map markers={events} />
      </div>
    </main>
  );
}
