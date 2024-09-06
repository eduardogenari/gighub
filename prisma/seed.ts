import * as bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { getEventsEurope } from "../lib/events";
import { stripe } from "../lib/stripe";
import { dateToYYYYMMDD } from "../lib/utils";

const prisma = new PrismaClient();

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

async function loadData() {
  try {
    // Get events from Ticketmaster
    console.log("Getting events by country...");
    let events = await getEventsEurope();
    console.log(`Total events to save in database: ${events.length}`);

    // Load data
    console.log("Loading events...");
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
          genre: (
            event.classifications?.map(
              (classification) => classification.genre?.name
            ) || []
          ).filter((name) => name !== undefined),
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
              height: image.height,
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

async function updateVenue(
  venues: number[],
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  city: string,
  country: string
) {
  console.log(`Updating location of ${name}...`);

  await prisma.venue.updateMany({
    where: {
      id: {
        in: venues,
      },
    },
    data: {
      latitude,
      longitude,
      name,
      address,
      city,
      country,
    },
  });
}

async function updateVenues() {
  let venues;
  let latitude;
  let longitude;
  let name;
  let address;
  let city;
  let country;

  // Update Zemppi Areena Oy venue
  venues = [6015, 6044];
  latitude = 64.902056;
  longitude = 25.54208;
  name = "Zemppi Areena Oy";
  address = "Pekurintie 2";
  city = "Kempele";
  country = "Finland";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Sodankylä
  venues = [6050];
  latitude = 67.415999;
  longitude = 26.588973;
  name = "";
  address = "Sodankylä";
  city = "Sodankylä";
  country = "Finland";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Klub Proxima
  venues = [6048, 6054, 6047, 6049];
  latitude = 52.21267;
  longitude = 20.987586;
  name = "Klub Proxima";
  address = "ul. Żwirki i Wigury 99a";
  city = "Warsaw";
  country = "Poland";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Polska Filharmonia Bałtycka
  venues = [6051, 6052, 6046, 6045, 5232, 4937];
  latitude = 54.35239;
  longitude = 18.660415;
  name = "Polska Filharmonia Bałtycka";
  address = "ul. Ołowianka 1";
  city = "Gdansk";
  country = "Poland";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Olympiahalle
  venues = [1770];
  latitude = 48.173659;
  longitude = 11.549663;
  name = "Olympiahalle";
  address = "Spiridon-Louis-Ring 21";
  city = "Munich";
  country = "Germany";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Open Air Arena - Messe Munchen
  venues = [2160, 2300, 2271, 2417, 2161, 2545, 2672, 2690, 2348, 2570];
  latitude = 48.140701;
  longitude = 11.68427;
  name = "Open Air Arena - Messe Munchen";
  address = "Am Messefreigelände";
  city = "Munich";
  country = "Germany";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update KK's Steel Mill
  venues = [2669, 2147, 2642];
  latitude = 52.5786863;
  longitude = -2.1297049;
  name = "KK's Steel Mill";
  address = "Frederick Street";
  city = "Wolverhampton";
  country = "Great Britain";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update La Scène - Malmedy
  venues = [494];
  latitude = 50.431666;
  longitude = 6.027924;
  name = "La Scène - Malmedy";
  address = "Avenue de la Libération 1";
  city = "Malmedy";
  country = "Belgium";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Larnaca Marina
  venues = [2875, 2844];
  latitude = 34.91764;
  longitude = 33.63933;
  name = "Larnaca Marina";
  address = "Marina";
  city = "Larnaca";
  country = "Cyprus";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Curraghmore House
  venues = [2929, 2930];
  latitude = 52.290224;
  longitude = -7.35937;
  name = "Curraghmore House";
  address = "Portlaw";
  city = "Portlaw";
  country = "Ireland";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Collins Barracks
  venues = [2922, 3266, 2951, 2955, 2959];
  latitude = 53.34891;
  longitude = -6.28755;
  name = "Collins Barracks";
  address = "Benburb Street";
  city = "Dublin";
  country = "Ireland";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update Queen Maeves Square
  venues = [3448];
  latitude = 54.2718;
  longitude = -8.4732;
  name = "Queen Maeves Square";
  address = "Queen Maeves Square";
  city = "Sligo";
  country = "Ireland";
  updateVenue(venues, name, latitude, longitude, address, city, country);

  // Update all venues from Antwerp to have the same city name
  await prisma.venue.updateMany({
    where: {
      city: {
        in: ["Merksem (Antwerpen)", "Antwerpen", "Antwerpen 1"],
      },
    },
    data: {
      city: "Antwerp",
    },
  });
}

async function loadLocations() {
  console.log("Loading locations...");
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

    // Delete everything (in case something had to be updated)
    await prisma.location.deleteMany({});

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

async function loadToStripe() {
  console.log("Loading events as products into Stripe dashboard...");

  const events = await prisma.event.findMany({
    include: {
      artist: true,
      venue: true,
      priceRange: true,
      image: true,
    },
  });

  for (const event of events) {
    // Save only minimum prices
    const standardPrice = event.priceRange
      .filter((priceRange) => priceRange.type == "standard")
      .map((priceRange) => priceRange)[0];

    // If price is defined, save product
    if (standardPrice !== undefined && standardPrice.min !== null) {
      const price = standardPrice.min;
      const currency = standardPrice.currency;
      const location =
        event.venue[0].name !== null
          ? `${event.venue[0].name} (${event.venue[0].city}, ${event.venue[0].country})`
          : `${event.venue[0].city}, ${event.venue[0].country}`;

      // Create product with associated price
      const product = await stripe.products.create({
        name: `${dateToYYYYMMDD(event.startDate)} - ${
          event.name
        } - ${location}`,
        description: `Ticket for ${event.name} in ${location} on ${event.startDate}`,
        images: [event.image[0].url !== null ? event.image[0].url : ""],
        metadata: {
          id: event.id,
        },
      });
      await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(price * 100),
        currency: currency,
      });
    }
  }
}

main()
  .then(async () => {
    // loadData();
    // updateVenues();
    // loadLocations();
    loadToStripe();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
