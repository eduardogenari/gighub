import { env } from "./env";
import type { Event } from "@/types/apiEvent";

const urlEU = `${env("URL_TICKETMASTER")}events.json?classificationName=music
)}&apikey=${env("APIKEY_TICKETMASTER")}`;

const checkResponse = async (response: Response) => {
  const json = await response.json();
  if (!response.ok) {
    const errorDetail = json.errors ? json.errors[0].detail : "Unknown error";
    throw new Error(
      `HTTP error! Status: ${response.status} - Error: ${errorDetail}`
    );
  }
  return json;
};

const processEvents = (events: any) => {
  return events
    .filter((event: any) =>
      event._embedded.venues.some(
        (venue: any) =>
          venue.location &&
          venue.location.latitude &&
          venue.location.longitude &&
          venue.address &&
          venue.address.line1
      )
    )
    .map((res: any) => ({
      ...res,
      venues: res._embedded.venues.map((venue: any) => ({
        ...venue,
        city: venue.city.name,
        country: venue.country.name,
        state: venue.state ? venue.state.name : null,
        address: venue.address.line1,
      })),
    })) as Event[];
};

export const getAllEvents = async () => {
  const allEvents: Event[] = [];
  const totalPages = 12;

  for (let page = 1; page <= totalPages; page++) {
    const events = await getEventsByPage(page);
    allEvents.push(...events);
  }

  return allEvents;
};

export const getEventById = async (id: string) => {
  const response = await fetch(
    `${env("URL_TICKETMASTER")}events.json?id=${id}&apikey=${env(
      "APIKEY_TICKETMASTER"
    )}`
  );

  const jsonConcerts = await checkResponse(response);

  try {
    return processEvents(jsonConcerts._embedded.events) as Event[];
  } catch (error) {
    console.error(`Error fetching event by id (${id}):`, error);
    return [];
  }
};

export const getEventsByDates = async (start: string, end: string) => {
  const response = await fetch(
    `${urlEU}&startDateTime=${start}&endDateTime=${end}`
  );

  const jsonConcerts = await checkResponse(response);

  try {
    return processEvents(jsonConcerts._embedded.events) as Event[];
  } catch (error) {
    console.error(`Error fetching events by dates (${start} - ${end}):`, error);
    return [];
  }
};

const getEventsByPage = async (page: number) => {
  const response = await fetch(`${urlEU}&size=80&page=${page}`);
  const jsonConcerts = await checkResponse(response);

  try {
    return processEvents(jsonConcerts._embedded.events) as Event[];
  } catch (error) {
    console.error(`Error fetching events for page ${page}:`, error);
    return [];
  }
};

export const getAllEventsByCountry = async (country: string) => {
  const allEvents: Event[] = [];
  let page = 0;
  let totalPages = 1;

  while (page < totalPages && page * 80 <= 1000) {
    const { events, pageInfo } = await getEventsByCountryPage(country, page);

    allEvents.push(...events);
    totalPages = pageInfo.totalPages;

    page++;
  }

  return allEvents;
};

const getEventsByCountryPage = async (country: string, page: number) => {
  const response = await fetch(
    `${urlEU}&countryCode=${country}&size=75&page=${page}`
  );

  const jsonConcerts = await checkResponse(response);
  const events = jsonConcerts._embedded?.events
    ? processEvents(jsonConcerts._embedded.events)
    : [];

  const pageInfo = {
    totalPages: jsonConcerts.page.totalPages,
    totalElements: jsonConcerts.page.totalElements,
  };

  try {
    return { events, pageInfo };
  } catch (error) {
    console.error(
      `Error fetching events in country ${country} for page ${page}:`,
      error
    );
    return { events: [], pageInfo: { totalPages: 0, totalElements: 0 } };
  }
};

export const getEventsEurope = async () => {
  const countries = env("NEXT_PUBLIC_EUROPE_COUNTRIES").split(",");
  const allEventsEurope = [];

  for (const country of countries) {
    try {
      const events = await getAllEventsByCountry(country);
      allEventsEurope.push(...events);
      console.log(
        `Finished getting events for country ${country}: ${events.length}`
      );
    } catch (error) {
      console.error(`Error fetching events for country ${country}:`, error);
    }
  }

  return allEventsEurope;
};
