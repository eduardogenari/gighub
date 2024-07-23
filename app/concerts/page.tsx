import { actionGetAllEvents } from "@/actions/events";
import { Event, getAllEvents } from "@/lib/concerts";




export default async function Page() {
 // let concerts: Event[] = [];
  const concerts = await actionGetAllEvents();
 
  return (
    <main className="p-6">
      {concerts.map((concert) => (
        <div key={concert.id}>

<h2>{concert.name}</h2>
      <img src={concert.images.find((img) => img.width === 305 && img.ratio === "4_3")?.url} alt={concert.name} />
          <p>{`Date: ${concert.dates.start.localDate}`}</p>
          <p>{`Time: ${concert.dates.start.localTime}`}</p>
    
          {concert.venues.map((venue) => (
            <div key={venue.id}>
              <h3>{venue.name}</h3>
              <p>{`Location: ${venue.location.latitude}, ${venue.location.longitude}`}</p>
              <p>{`Address: ${venue.address}`}</p>
              </div>
          ))}
        </div>
      ))}
    </main>
  );
}
