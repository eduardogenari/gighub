import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";

export default async function FeaturedEvents() {
  // Get events from Ticketmaster
  let events = await prisma.event.findMany({
    include: {
      artist: true,
      venue: true,
      priceRange: true,
      image: true,
    },
  });

  console.log("Featured Events. Number of concerts before filtering", events.length);
  console.log(events[0].startDate);

  // Define today's date
  const today = new Date().toISOString().split('T')[0];

  // Filter events with startDate equal to today
  //const todayEvents = events.filter(event => event.startDate.toISOString().split('T')[0] === today);
  const todayEvents = events.filter(event => event.startDate.toISOString().split('T')[0] === "2024-08-06");

  console.log("Featured Events. Number of concerts after filtering", todayEvents.length);
  console.log("Today: "+ today)
  console.log(todayEvents[0].startDate)
  console.log(todayEvents[0])

    // Create a set to keep track of unique event names based on the first 10 characters
    const uniqueEventNames = new Set<string>();

    // Filter events to exclude those with similar names
    const uniqueTodayEvents = todayEvents.filter(event => {
        const eventNameKey = event.name.substring(0, 10);
        if (uniqueEventNames.has(eventNameKey)) {
          return false;
        } else {
          uniqueEventNames.add(eventNameKey);
          return true;
        }
      });

      console.log(uniqueTodayEvents[5].image[0].url)
      console.log(uniqueTodayEvents[6].image[0].url)
      console.log(uniqueTodayEvents[0].image[0].url)

      console.log(todayEvents[0].image[0].url)
      console.log(todayEvents[1].image[0].url)
      console.log(todayEvents[2].image[0].url)

      return (
        <div>
          <h1>featured events</h1>
          <h1>Today: {today} </h1>
          {uniqueTodayEvents.map(event => (
            <div key={event.id}>
              <h2>{event.name}</h2>
              <p>{event.artist.map(artist => artist.name).join(', ')}</p>
              <p>{event.venue.map(venue => venue.name).join(', ')}</p>
              <p>{event.startDate.toDateString()}</p>
              <Image
                src={event.image[0].url}
                width={150}
                height={150}
                alt="Event image"
              />
            </div>
          ))}
        </div>
      );
    }