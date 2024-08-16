import * as bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { getEventsEurope } from "../lib/events";

const prisma = new PrismaClient();

async function loadLocations() {
  try {
    // Get all events
    let allEvents = await prisma.event.findMany({
      include: {
        venue: true,
      },
    });

    // Calculate bounding box for each city
    let venues = allEvents.flatMap((event) => event.venue);
    let locations: Record<string, number[]> = {};
    venues.forEach((venue) => {
      const city = `${venue.city}, ${venue.country}`;
      if (!locations[city]) {
        locations[city] = [
          venue.longitude,
          venue.longitude,
          venue.latitude,
          venue.latitude,
        ];
      } else {
        // Minimum longitude
        locations[city][0] = Math.min(locations[city][0], venue.longitude);
        // Maximum longitude
        locations[city][1] = Math.max(locations[city][1], venue.longitude);
        // Minimum latitude
        locations[city][2] = Math.min(locations[city][2], venue.latitude);
        // Maximum latitude
        locations[city][3] = Math.max(locations[city][3], venue.latitude);
      }
    });

    // Load locations
    for (const [key, value] of Object.entries(locations)) {
      await prisma.location.create({
        data: {
          city: key.split(",")[0].trim(),
          country: key.split(",")[1].trim(),
          boundingBox: value,
        },
      });
    }

    console.log("Got locations");
  } catch (error) {
    console.error("Error loading locations:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function loadData() {
  try {
    // Get events from Ticketmaster
    console.log('Getting events by country...')
    let events = await getEventsEurope();
    console.log(`Total events to save in database: ${events.length}`)

    // Load data
    console.log('Loading...')
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
            (event.classifications?.map(
              (classification) => classification.genre?.name
            ) || []).filter(name => name !== undefined),
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
    loadLocations();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
