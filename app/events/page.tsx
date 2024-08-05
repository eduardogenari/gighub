import { actionGetAllEvents } from "@/actions/events";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/api_event";

export default async function EventsPage() {
  // Get events from Ticketmaster
  let events = await actionGetAllEvents();

  console.log("Number of concerts before filtering", events.length);
  console.log("Number of concerts before filtering", events[0].name);

  return (
    <main className="flex-grow flex items-center justify-center">
      <div className="w-4/5 self-center flex-grow flex items-center justify-center flex-wrap">
        {events.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
