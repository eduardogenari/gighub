import { Event, getAllConcerts } from "@/lib/concerts";

export default async function Page() {
  let concerts: Event[] = [];
  concerts = await getAllConcerts();

  return (
    <main className="p-6">
      {concerts.map((concert) => (
        <div key={concert.id}>{concert.name}</div>
      ))}
    </main>
  );
}
