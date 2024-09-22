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
  const locationNames = cityCountryNames.concat(countryNames, "Europe");

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
        locationNames={locationNames}
        locations={locations}
        location={location}
        hideWithoutPrice={hideWithoutPrice}
      />
    </main>
  );
}
