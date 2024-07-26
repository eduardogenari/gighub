import { actionGetAllEvents } from "@/actions/events";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Event } from "@/types/event";

export default async function EventsPage() {

    // Get events from Ticketmaster
    let events = await actionGetAllEvents();

    console.log("Number of concerts before filtering", events.length);
    console.log("Number of concerts before filtering", events[0].name);

    return (
      <main className="h-screen w-screen flex flex-col">
          <Header />
          <div className="flex-grow flex items-center justify-center flex-wrap">
              {events.map((event: Event) => (
                  <EventCard key={event.id} event={event} />
              ))}
          </div>
          <Footer />
      </main>
  );
}
