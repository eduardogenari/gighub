"use server";

import prisma from "@/lib/prisma";
import type { Venue } from "@/types/event";

export async function updateFilterOptions() {
  let allEvents = await prisma.event.findMany({
    include: {
      artist: true,
      venue: true,
    },
  });

  // Get artists and genres in current location
  const artistNames = [
    ...new Set(
      allEvents.flatMap(
        (event) => event.artist?.map((artist) => artist.name) || []
      )
    ),
  ];
  const genreNames = [
    ...new Set(allEvents.flatMap((event) => event.genre || [])),
  ];

  // Group cities by country
  let venues = allEvents.flatMap((event) => event.venue);
  let citiesByCountry: Record<string, string[]> = venues.reduce(
    (accumulator: Record<string, string[]>, venue: Venue) => {
      if (!accumulator[venue.country]) {
        accumulator[venue.country] = [];
      }
      if (!accumulator[venue.country].includes(venue.city)) {
        accumulator[venue.country].push(venue.city);
      }
      return accumulator;
    },
    {}
  );

  // Get city, country combinations
  let locationNames: string[] = Object.entries(citiesByCountry).flatMap(
    ([country, cities]) => cities.map((city) => `${city}, ${country}`)
  );

  console.log(`Got all filter options!`);
  return {
    success: true,
    artistNames: artistNames,
    genreNames: genreNames,
    locationNames: locationNames,
  };
}

export async function updateEventsFromBounds(
  startDate: Date,
  endDate: Date,
  bounds: number[],
  price: number[],
  artist: string,
  genre: string
) {
  console.log("Filters");
  console.log("Start date:", startDate);
  console.log("End date:", endDate);
  console.log("Artist:", artist);
  console.log("Genre:", genre);
  console.log("Price:", price);
  console.log("Location:", bounds);

  let events = await prisma.event.findMany({
    include: {
      artist: true,
      venue: true,
      priceRange: true,
      image: true,
    },
    where: {
      venue: {
        some: {
          AND: [
            {
              latitude: { gte: bounds[2], lte: bounds[3] }, // South - North
            },
            {
              longitude: { gte: bounds[0], lte: bounds[1] }, // West - East
            },
          ],
        },
      },
      startDate: {
        gte: startDate,
      },
      endDate: {
        lte: endDate,
      },
      ...(genre && {
        genre: {
          has: genre,
        },
      }),
      ...(artist && {
        artist: {
          some: {
            name: artist,
          },
        },
      }),
      priceRange: {
        some: {
          OR: [
            {
              AND: [
                {
                  min: {
                    gte: price[0],
                  },
                },
                {
                  max: {
                    lte: price[1],
                  },
                },
                {
                  type: "standard",
                },
              ],
            },
            {
              AND: [
                {
                  min: {
                    lte: price[1],
                  },
                },
                {
                  max: {
                    gte: price[0],
                  },
                },
                {
                  type: "standard",
                },
              ],
            },
          ],
        },
      },
    },
  });

  console.log(`Got ${events.length} events after filtering!`);
  return {
    success: true,
    events: events,
  };
}


export async function getBoundsFromLocation(location: string) {

  //     let markerBounds = latLngBounds([]);
  //     markers.forEach((marker) => {
  //       markerBounds.extend([
  //         marker.venue[0].latitude,
  //         marker.venue[0].longitude,
  //       ]);
  //     });

}