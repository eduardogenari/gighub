"use server";

import { YYYYMMDDToDate } from "@/lib/utils";
import { getLocations } from "@/actions/filter";
import Results from "@/components/Results";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: any };
}) {
  // Get filter values from URL
  let { startDate, endDate, artist, genre, price, location, hideWithoutPrice } =
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
  if (!hideWithoutPrice) {
    hideWithoutPrice = "off";
  }

  let locations = await getLocations();
  const cityCountryNames = locations.map(
    (location) => `${location.city}, ${location.country}`
  );
  const countryNames = [
    ...new Set(locations.map((location) => location.country)),
  ];
  const locationNames = cityCountryNames.concat(countryNames);

  if (!location || !locationNames.includes(location)) {
    // TODO: Detect user location
    location = "Barcelona, Spain";
  }

  let bounds;
  if (location.includes(",")) {
    bounds = locations
      .filter(
        (dbLocation) =>
          dbLocation.city == location.split(",")[0].trim() &&
          dbLocation.country == location.split(",")[1].trim()
      )
      .map((dbLocation) => dbLocation.boundingBox)[0];
  } else {
    let allBounds = locations
      .filter((dbLocation) => dbLocation.country == location.replace("- ", ""))
      .map((dbLocation) => dbLocation.boundingBox);
    const west = Math.min(...allBounds.map((bounds) => bounds[0]));
    const east = Math.max(...allBounds.map((bounds) => bounds[1]));
    const south = Math.min(...allBounds.map((bounds) => bounds[2]));
    const north = Math.max(...allBounds.map((bounds) => bounds[3]));
    bounds = [west, east, south, north];
  }

  console.log(location, bounds);
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
        hideWithoutPrice={hideWithoutPrice}
      />
    </main>
  );
}
