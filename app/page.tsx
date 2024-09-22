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
  const locationNames = cityCountryNames.concat(countryNames, "Europe");

  return (
    <main className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <FeaturedEvents />
      <div className="absolute top-14 left-0 right-0 bottom-14 flex items-center justify-center z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <LocationSearch locations={locationNames} />
        </div>
      </div>
    </main>
  );
}
