import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { Event } from "@/types/api_event";
import Image from "next/image";
import Link from 'next/link';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.dates.start.localDate);
  return (
    <Link href={`/app/events/${event.id}/page`}>
      <Card className="m-3 w-72 aspect-[1/2] border border-white rounded-none shadow-none transition duration-200 transform hover:scale-105 cursor-pointer">
        <CardHeader className="p-0 w-72 h-72 border-red-500">
          <div className="relative h-full w-full">
            <Image
              layout="fill"
              objectFit="cover"
              alt={event.name}
              src={event.images[2].url}
              className="rounded-[0px]"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 w-72 h-64">
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>{startDate.toLocaleDateString()}</CardDescription>
          <CardDescription>{event.venues[0].name}</CardDescription>
        </CardContent>
        <CardFooter className="p-0 w-72 h-8">
          <CardDescription>{event.id}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}