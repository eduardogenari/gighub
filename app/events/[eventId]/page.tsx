import ArtistTopTracks from "@/components/ArtistTopTracks";
import BuyTicketButton from "@/components/BuyTicketButton";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiMicrophoneThin } from "react-icons/pi";
import { IoMdOptions } from "react-icons/io";

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

  //console.log(event);

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
      <div className="w-[85vw] mt-4 flex flex-col items-start">
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
          <p>
            {event.venue
              .map((venue) => `${venue.name}, ${venue.address}`)
              .join(", ")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <IoMdOptions />
          <p>{event.genre.join(", ")}</p>
        </div>
        <BuyTicketButton event={event} />
      </div>
      <div className="w-[65vw] mt-4">
        {event.artist.map((artist) => (
          <ArtistTopTracks key={artist.id} artistName={artist.name} />
        ))}
      </div>
    </main>
  );
}