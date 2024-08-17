"use server";

import { YYYYMMDDToDate } from "@/lib/utils";
import { getLocations } from "@/actions/markers";
import Results from "@/components/Results";

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

  let locations = await getLocations();
  const locationNames = locations.map(
    (location) => `${location.city}, ${location.country}`
  );
  if (!location || !locationNames.includes(location)) {
    // TODO: Detect user location
    location = "Barcelona, Spain";
  }
  let bounds = locations
    .filter(
      (dbLocation) =>
        dbLocation.city == location.split(",")[0].trim() &&
        dbLocation.country == location.split(",")[1].trim()
    )
    .map((dbLocation) => dbLocation.boundingBox)[0];

  // Convert strings for comparison
  startDate =
    typeof startDate === "string" ? YYYYMMDDToDate(startDate) : startDate;
  endDate = typeof endDate === "string" ? YYYYMMDDToDate(endDate) : endDate;
  price =
    typeof price === "string"
      ? [parseFloat(price.split(",")[0]), parseFloat(price.split(",")[1])]
      : price;

  return (
    <main>
      <Results
        startDate={startDate}
        endDate={endDate}
        artist={artist}
        genre={genre}
        price={price}
        bounds={bounds}
        locationNames={locationNames}
        location={location}
      />
    </main>
  );
}
