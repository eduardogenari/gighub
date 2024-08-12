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
  });
  console.log('Got events for bounds!');
  return { success: true, events: events };
}
