import { Event, getAllConcerts } from "@/lib/concerts";

export default async function Page() {
  let concerts: Event[] = [];
  concerts = await getAllConcerts();

  return (
    <main className="p-6">
      {concerts.map((concert) => (
        <div key={concert.id}>

<h2>{concert.name}</h2>
          <p>{`Date: ${concert.dates.start.localDate}`}</p>
          <p>{`Time: ${concert.dates.start.localTime}`}</p>
          {concert._embedded.venues.map((venue) => (
            <div key={venue.id}>
              <h3>{venue.name}</h3>
              <p>{`Location: ${venue.location.latitude}, ${venue.location.longitude}`}</p>
              </div>
          ))}
        </div>
      ))}
    </main>
  );
}
