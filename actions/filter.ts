"use server";

import prisma from "@/lib/prisma";
import type { Location } from "@/types/location";

export async function getLocations(): Promise<[Location[], string[]]> {
  let locations = await prisma.location.findMany({});

  const cityCountryNames = locations.map(
    (location) => `${location.city}, ${location.country}`
  );
  const countryNames = [
    ...new Set(locations.map((location) => location.country)),
  ];
  const locationNames = cityCountryNames.concat(countryNames, "Europe");

  return [locations, locationNames];
}

export async function getArtistsAndGenres(bounds: number[]) {
  // Get artists and genres in current location
  let locationEvents = await prisma.event.findMany({
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
    },
  });
  const artistNames = [
    ...new Set(
      locationEvents.flatMap(
        (event) => event.artist?.map((artist) => artist.name) || []
      )
    ),
  ];
  const genreNames = [
    ...new Set(locationEvents.flatMap((event) => event.genre || [])),
  ];

  return [artistNames, genreNames];
}

export async function filter(
  startDate: Date,
  endDate: Date,
  bounds: number[],
  price: number[],
  artist: string,
  genre: string,
  hideWithoutPrice: string
) {
  const priceFilter = [
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
  ];

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
      ...(hideWithoutPrice === "on"
        ? {
            priceRange: {
              some: {
                OR: priceFilter,
              },
            },
          }
        : {
            OR: [
              {
                priceRange: {
                  some: {
                    OR: priceFilter,
                  },
                },
              },
              {
                priceRange: {
                  none: {},
                },
              },
            ],
          }),
    },
  });

  const [artistNames, genreNames] = await getArtistsAndGenres(bounds);

  return {
    success: true,
    events: events,
    artistNames: artistNames,
    genreNames: genreNames,
  };
}
