import ArtistTopTracks from "@/components/ArtistTopTracks";
import prisma from "@/lib/prisma";

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

  console.log("event detail page");
  console.log(event);

  // Find the image with the largest width
  const largestImage = event.image.reduce((max, img) => (img.width > max.width ? img : max), event.image[0]);

  return (
    <main className="p-6">
      <div className="image-gallery">
        {largestImage && (
          <img key={largestImage.id} src={largestImage.url} alt={`Image ${largestImage.id}`} width={largestImage.width} height={largestImage.height} />
        )}
      </div>
      <h1>{event.name}</h1>
      <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
      <p>Genre: {event.genre.join(", ")}</p>
      <h2>Artist</h2>
      <ul>
        {event.artist.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
      <h2>Venue</h2>
      <ul>
        {event.venue.map((venue) => (
          <li key={venue.id}>
            {venue.name}, {venue.address}, {venue.city}, {venue.country}
          </li>
        ))}
      </ul>
      <div>
        {event.artist.map((artist) => (
          <ArtistTopTracks key={artist.id} artistName={artist.name} />
        ))}
      </div>
    </main>
  );
}