import { env } from "@/lib/env";
import { writeFile } from "fs/promises";
import type { Event } from "@/types/event";

export const getAllEvents = async () => {
  const response = await fetch(
    `${env("URL_TICKETMASTER")}events.json?countryCode=ES&apikey=${env(
      "APIKEY_TICKETMASTER"
    )}`
  );
  const jsonConcerts = await response.json();

  // await writeFile(jsonFilePath, JSON.stringify(jsonConcerts));
  return jsonConcerts._embedded.events.map((res: any) => ({
    ...res,
    venues: res._embedded.venues.map((res: any) => ({
      ...res,
      city: res.city.name,
      state: res.state.name,
      country: res.country.name,
      address: res.address.line1,
    })),
  })) as Event[];
};
