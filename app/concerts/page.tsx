import { actionGetAllEvents, actionGetEventById, actionGetEventsByDate } from "@/actions/events";
import { formatDateToISO } from "@/lib/utils";
import { formatISO } from "date-fns";
export default async function Page() {
  // let concerts: Event[] = [];
  //const concerts = await actionGetAllEvents();

  const concerts = await actionGetEventsByDate(
    formatDateToISO("2024-08-11"),
    formatDateToISO("2024-08-31")
  );

  const concert = await actionGetEventById("G5d0Z9YlaQsP_");
  //console.log(concert);
  return (
    <main className="p-6">
      {concerts.map((concert, index) => (
        <div key={concert.id}>
          <h2>
            {index + 1} - {concert.id} - {concert.name}
          </h2>
          <img
            src={
              concert.images.find(
                (img) => img.width === 305 && img.ratio === "4_3"
              )?.url
            }
            alt={concert.name}
          />
          <p>{`Date: ${concert.dates.start.localDate}`}</p>
          <p>{`Time: ${concert.dates.start.localTime}`}</p>

          {concert.venues.map((venue) => (
            <div key={venue.id}>
              <h3>{venue.name}</h3>
              <p>{`Location: ${venue.location.latitude}, ${venue.location.longitude}`}</p>
              <p>{`Address: ${venue.address}`}</p>
              <p>{`Country: ${venue.address}`}</p>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
