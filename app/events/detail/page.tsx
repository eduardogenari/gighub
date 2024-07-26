import { actionGetAllEvents, actionGetEventById } from "@/actions/events";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Event } from "@/types/event";
import Image from "next/image";
import React from "react";

export default async function EventDetailPage() {
  // Get events from Ticketmaster
  let events = await actionGetAllEvents();

  let event = await actionGetEventById("17u8vOG6u3qwf3R");

  console.log("Number of concerts before filtering", events.length);
  console.log("Number of concerts before filtering", events[0].name);
  console.log("event" + event);

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header />
      <div className="w-4/5 self-center flex-grow flex items-center justify-center flex-wrap">
        <h1>{event?.id}</h1>
        <div className="relative h-full w-full">
            <Image
              layout="fill"
              objectFit="cover"
              alt={event?.name}
              src={event?.imageUrl}
              className="rounded-[0px]"
            />
          </div>
    
      </div>
      <Footer />
    </main>
  );
}
