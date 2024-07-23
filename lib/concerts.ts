import { env } from "@/lib/env";
import { writeFile } from "fs/promises";
import { LatLngExpression, LatLngTuple } from "leaflet";

type EventDateTime = {
  localDate: Date;
  localTime: Date;
};

type Location = {
  longitude: string;
  latitude: string;
};

type ImageEvent = {
  ratio : string;
  url : string;
  width : number;
  height : number;
}
type Venue = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  address: string;
  location: Location;
};

export type Event = {
  id: number;
  name: string;
  images: ImageEvent[];
  dates: {
    start: EventDateTime;
  };
  venues: Venue[];
};

export const getAllEvents = async () => {
  const response = await fetch(
    `${env("URL_TICKETMASTER")}events.json?countryCode=ES&apikey=${env(
      "APIKEY_TICKETMASTER"
    )}`
  );
  const jsonConcerts = await response.json();

  const events = jsonConcerts._embedded.events;
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
