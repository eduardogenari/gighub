import { getEventById } from "@/lib/events";


console.log("detaaaaaaaaaail")

type PageProps = {
  params: {
    eventId: string;
  };
};
export default async function Page({ params }: PageProps) {

  const { eventId } = params;
  //let event = await getEventById(eventId);
  return (
    <main className="p-6">
      <h1>{eventId}</h1>
    </main>
  );
}
