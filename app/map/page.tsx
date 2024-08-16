"use server";

import { YYYYMMDDToDate } from "@/lib/utils";
import { getLocations } from "@/actions/markers";
import MapFilters from "@/components/MapFilters";

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
  if (!price) {
    price = [0, 1000];
  }

  // TODO: Detect user location
  let city = "Barcelona";
  let country = "Spain";
  let locations = await getLocations();
  let bounds = locations
    .filter((location) => location.city == city && location.country == country)
    .map((location) => location.boundingBox)[0];

  // Convert strings for comparison
  startDate =
    typeof startDate === "string" ? YYYYMMDDToDate(startDate) : startDate;
  endDate = typeof endDate === "string" ? YYYYMMDDToDate(endDate) : endDate;
  price =
    typeof price === "string"
      ? [parseFloat(price.split(",")[0]), parseFloat(price.split(",")[1])]
      : price;

  return (
    <main className="flex-grow flex">
      <div className="flex-grow flex overflow-hidden bg-gray-200">
        <MapFilters
          startDate={startDate}
          endDate={endDate}
          artist={artist}
          genre={genre}
          price={price}
          bounds={bounds}
        />
      </div>
    </main>
  );
}
