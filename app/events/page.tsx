"use server";

import { YYYYMMDDToDate } from "@/lib/utils";
import { getArtistsAndGenres, getLocations } from "@/actions/filter";
import Results from "@/components/Results";
import { getBounds } from "@/lib/locations";

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
    startDate = new Date("2024-08-01");
  }
  if (!endDate) {
    endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 4);
  }
  if (!price) {
    price = [0, 1000];
  }
  if (!hideWithoutPrice) {
    hideWithoutPrice = "off";
  }

  let [locations, locationNames] = await getLocations();
  let bounds = getBounds(location, locations, locationNames);
  const [initialArtistNames, initialGenreNames] = await getArtistsAndGenres(bounds);
  
  // Declare artist and genre as empty strings if they do not exist in options
  // This can happen if the user passes them through the url
  if (!initialArtistNames.includes(artist)) {
    artist = "";
  }
  if (!initialGenreNames.includes(genre)) {
    genre = "";
  }

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
        initialArtistNames={initialArtistNames}
        initialGenreNames={initialGenreNames}
      />
    </main>
  );
}
