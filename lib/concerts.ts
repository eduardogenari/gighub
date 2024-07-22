import { env } from "@/lib/env";
import { writeFile } from "fs/promises";


export type Event = {
  id: number;
  name: string;

};

//const jsonFilePath = "concerts.json";

  export const getAllConcerts = async () => {
    const response = await fetch(`${env("URL_TICKETMASTER")}events.json?countryCode=ES&apikey=${env("APIKEY_TICKETMASTER")}`);
    const jsonConcerts = await response.json();
   // await writeFile(jsonFilePath, JSON.stringify(jsonConcerts));
    return  jsonConcerts._embedded.events;

  }

