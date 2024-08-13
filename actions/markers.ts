"use server";

import prisma from "@/lib/prisma";

export async function updateEventsFromBounds(bounds: number[]) {
  console.log("Bounds:", bounds);
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
    },
  });
  console.log("Got events for bounds!");
  console.log(events.length);
  return { success: true, events: events };
}
