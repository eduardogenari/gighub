"use server";

import { getLocations } from "@/actions/filter";
import FeaturedEvents from "@/components/FeaturedEvents";
import LocationSearch from "@/components/LocationSearch";

export default async function Home() {
  let locations = await getLocations();
  const cityCountryNames = locations.map(
    (location) => `${location.city}, ${location.country}`
  );
  const countryNames = [
    ...new Set(locations.map((location) => location.country)),
  ];
  const locationNames = cityCountryNames.concat(countryNames);

  return (
    <main className="w-[65vw] mx-2 md:mx-auto flex-1 flex flex-row items-center justify-start gap-20">
      <LocationSearch locations={locationNames} />
      <FeaturedEvents />
    </main>
  );
}
