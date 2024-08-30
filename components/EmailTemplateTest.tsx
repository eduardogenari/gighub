import { Event } from "@/types/event";
import * as React from "react";

interface EmailTemplateTestProps {
  event: Event;
}

export const EmailTemplateTest: React.FC<Readonly<EmailTemplateTestProps>> = ({ event }) => (
  <div>
    <h1>{event.name}</h1>
    <p>Date: {new Date(event.startDate).toLocaleDateString()}</p>
    <p>Artists: {event.artist.map((artist) => artist.name).join(", ")}</p>
    <p>Venue: {event.venue.map((venue) => `${venue.name}, ${venue.address}`).join(", ")}</p>
    <p>Genre: {event.genre.join(", ")}</p>
    <p>Price: {event.priceRange.filter((priceRange) => priceRange.type == "standard").map((priceRange) => `${priceRange.min} ${priceRange.currency}`).join(", ")}</p>
  </div>
);