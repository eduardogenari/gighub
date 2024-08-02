import * as bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { getAllEvents } from "../lib/events";

const prisma = new PrismaClient();

export default async function loadData() {
  try {
    // Get events from Ticketmaster
    let events = await getAllEvents();

    // Load data
    for (const event of events) {
      await prisma.event.create({
        data: {
          name: event.name,
          artist: {
            create:
              event._embedded.attractions?.map((attraction) => ({
                name: attraction.name,
              })) || [],
          },
          venue: {
            create: event.venues.map((venue) => ({
              name: venue.name,
              address: venue.address,
              city: venue.city,
              country: venue.country,
              latitude: parseFloat(venue.location.latitude),
              longitude: parseFloat(venue.location.longitude),
            })),
          },
          startDate: new Date(event.dates.start.localDate),
          endDate: new Date(
            event.dates.end?.localDate || event.dates.start.localDate
          ),
          genre:
            event.classifications?.map(
              (classification) => classification.genre.name
            ) || [],
          priceRange: {
            create:
              event.priceRanges?.map((priceRange) => ({
                type: priceRange.type,
                min: priceRange.min,
                max: priceRange.max,
                currency: priceRange.currency,
              })) || [],
          },
          image: {
            create: event.images?.map((image) => ({
              url: image.url,
              width: image.width,
              height: image.height
            })),
          },
        },
      });
    }

    console.log("Data was loaded successfully");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  try {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash("password", salt);
    const users = await prisma.user.createMany({
      data: [
        {
          firstName: "Laia",
          lastName: "Valentí",
          password: password,
          role: "admin",
          email: "dave.testingson@test.com",
          isAdmin: false,
        },
        {
          firstName: "Eduardo",
          lastName: "Genari",
          password: password,
          role: "admin",
          email: "eduardo.genari@test.com",
          isAdmin: true,
        },
        {
          firstName: "Alba",
          lastName: "Vilanova",
          password: password,
          role: "admin",
          email: "alba.vilanova@test.com",
          isAdmin: false,
        },
      ],
    });
    console.log("Users have been created successfully");
  } catch (error) {
    console.error("Error creating users:", error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    loadData();
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
