import PaymentButtons from "@/components/PaymentButtons";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiMicrophoneThin } from "react-icons/pi";
import { IoMdOptions } from "react-icons/io";
import { CoinsIcon } from "lucide-react";
import ArtistTopTracksGrid from "@/components/ArtistTopTracksGrid";

type PageProps = {
  params: {
    eventId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { eventId } = params;
  const eventIdInt = parseInt(eventId, 10);

  if (isNaN(eventIdInt)) {
    return (
      <main className="p-6">
        <h1>Invalid Event ID</h1>
      </main>
    );
  }

  // Retrieve event by ID from Prisma
  let event = await prisma.event.findUnique({
    where: { id: eventIdInt },
    include: {
      artist: true,
      venue: true,
      priceRange: true,
      image: true,
    },
  });

  if (!event) {
    return (
      <main className="p-6">
        <h1>Event not found</h1>
      </main>
    );
  }

  // Find the image with the largest width
  const largestImage = event.image.reduce(
    (max, img) => (img.width > max.width ? img : max),
    event.image[0]
  );

  // Concatenate artist names
  const artistNames = event.artist.map((artist) => artist.name).join(", ");

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="h-[85vh] w-[85vw]">
        {largestImage && (
          <div className="relative h-full w-full">
            <Image
              fill
              style={{ objectFit: "cover" }}
              alt={`Image ${largestImage.id}`}
              src={largestImage.url}
              className="rounded-[0px]"
            />
          </div>
        )}
      </div>
      <div className="w-[75vw] mt-4 flex flex-col md:flex-row items-center justify-center gap-20">
        <div>
          <h2 className="mb-8">{event.name}</h2>
          <div className="flex items-center space-x-2">
            <CiCalendar />
            <p>{new Date(event.startDate).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <PiMicrophoneThin />
            <p>{artistNames}</p>
          </div>
          <div className="flex items-center space-x-2">
            <CiLocationOn />

            {event.venue[0].name ? (
              <p>
                {event.venue[0].name}, {event.venue[0].address},{" "}
                {event.venue[0].city}, {event.venue[0].country}
              </p>
            ) : (
              <p>
                {event.venue[0].address}, {event.venue[0].city}, ,{" "}
                {event.venue[0].country}
              </p>
            )}
          </div>
          {event.genre ? (
            <div className="flex items-center space-x-2">
              <IoMdOptions />
              <p>{event.genre.join(", ")}</p>
            </div>
          ) : null}
          {event.priceRange
            ? event.priceRange
                .filter((priceRange) => priceRange.type == "standard")
                .map((priceRange, rangeIndex) =>
                  priceRange.min !== null && priceRange.currency !== null ? (
                    <span key={rangeIndex}>
                      <p className="flex justify-start gap-2 items-center">
                        <CoinsIcon className="h-4 w-4 shrink-0" />
                        {priceRange.min} {priceRange.currency}
                      </p>
                    </span>
                  ) : null
                )
            : null}
        </div>
        {event.priceRange
          ? event.priceRange
              .filter((priceRange) => priceRange.type == "standard")
              .map((priceRange, rangeIndex) =>
                priceRange.min !== null && priceRange.currency !== null ? (
                  <div key={rangeIndex}>
                    <PaymentButtons event={event} />
                  </div>
                ) : null
              )
          : null}
      </div>
      <ArtistTopTracksGrid event={event} />
    </main>
  );
}
