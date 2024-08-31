import prisma from "@/lib/prisma";
import React from "react";
import EventCarousel from "./EventCarousel";

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

  // Define today's date
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Calculate the date 5 days from today
  const fiveDaysFromNow = new Date(today);
  fiveDaysFromNow.setDate(today.getDate() + 5);
  const fiveDaysFromNowStr = fiveDaysFromNow.toISOString().split("T")[0];

  // Filter events with startDate within the next 5 days
  const upcomingEvents = events.filter((event) => {
    const eventDateStr = event.startDate.toISOString().split("T")[0];
    return eventDateStr >= todayStr && eventDateStr <= fiveDaysFromNowStr;
  });

  // Filter events to include only those with the first image width greater than 1000
  const filteredEvents = upcomingEvents.filter(
    (event) => event.image[0] && event.image[0].width > 1000
  );

  // Create a set to keep track of unique event names based on the first 10 characters
  const uniqueEventNames = new Set<string>();

  // Filter events to exclude those with similar names
  const uniqueUpcomingEvents = filteredEvents.filter((event) => {
    const eventNameKey = event.name.substring(0, 10);
    if (uniqueEventNames.has(eventNameKey)) {
      return false;
    } else {
      uniqueEventNames.add(eventNameKey);
      return true;
    }
  });

  // Create a set to keep track of unique 10-character segments from the image URLs
  const uniqueImageSegments = new Set<string>();

  // Filter events to exclude those with repeated 10-character segments in the image URLs
  const finalFilteredEvents = uniqueUpcomingEvents.filter((event) => {
    const imageSegment = event.image[0].url.substring(24, 34);
    if (uniqueImageSegments.has(imageSegment)) {
      return false;
    } else {
      uniqueImageSegments.add(imageSegment);
      return true;
    }
  });

  return (
    <div className="h-[85vh] w-[85vw] flex items-center justify-center">
      <EventCarousel events={finalFilteredEvents} />
    </div>
  );
}