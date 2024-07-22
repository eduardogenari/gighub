import { env } from "@/lib/env";
import { writeFile } from "fs/promises";


type EventDateTime = {
  localDate: Date; 
  localTime: Date;
};

type Location = {
  longitude: string;
  latitude: string;
}
type Venue = {
  id : number;
  name : string;
  location : Location;

}
export type Event = {
  id: number;
  name: string;
  images : { url: string }[];
  dates: {
    start: EventDateTime;
  };

  _embedded: {
    venues: Venue[];
  };

};

//const jsonFilePath = "concerts.json";

  export const getAllConcerts = async () => {
    const response = await fetch(`${env("URL_TICKETMASTER")}events.json?countryCode=ES&apikey=${env("APIKEY_TICKETMASTER")}`);
    const jsonConcerts = await response.json();
   // await writeFile(jsonFilePath, JSON.stringify(jsonConcerts));
    return  jsonConcerts._embedded.events;

  }

