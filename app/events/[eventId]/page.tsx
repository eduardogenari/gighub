import { getEventByIdEdu } from "@/lib/events";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

type PageProps = {
  params: {
    eventId: string;
  };
};
export default async function EventDetailPage({ params }: PageProps) {

  const router = useRouter();

  const eventId = params.eventId

  console.log(eventId)

  const event = await getEventByIdEdu(eventId);

  console.log(event?.id);

  if (event === null) {
    notFound();
  }

  return (
    <main className="p-6">
      <h1>{eventId}</h1>
    </main>
  );
}

