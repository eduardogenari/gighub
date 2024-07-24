import { env } from "@/lib/env";
import { writeFile } from "fs/promises";
import type { Event } from "@/types/event";

export const getAllEvents = async () => {
  const allEvents: Event[] = [];
  const totalPages = 12;

  for (let page = 1; page <= totalPages; page++) {
    const events = await getEventsByPage(page);
    allEvents.push(...events);
  }

  return allEvents;
};

const getEventsByPage = async (page: number) => {
  const response = await fetch(
    `${env(
      "URL_TICKETMASTER"
    )}events.json?classificationName=music&size=80&page=${page}&apikey=${env(
      "APIKEY_TICKETMASTER"
    )}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  try {
    const jsonConcerts = await response.json();

    // await writeFile(jsonFilePath, JSON.stringify(jsonConcerts));
    return jsonConcerts._embedded.events.map((res: any) => ({
      ...res,
      venues: res._embedded.venues.map((res: any) => ({
        ...res,
        city: res.city.name,
        country: res.country.name,
        state: res.state ? res.state.name : null,
        address: res.address.line1,
      })),
    })) as Event[];
  } catch (error) {
    console.error(`Error fetching events for page ${page}:`, error);
    return [];
  }
};
