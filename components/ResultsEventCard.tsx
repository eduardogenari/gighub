import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { Event } from "@/types/event";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export default function ResultsEventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startDate);
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="m-3 w-72 aspect-[1/2] border border-white rounded-none shadow-none transition duration-200 transform hover:scale-105 cursor-pointer">
        <CardHeader className="p-0 w-72 h-72 border-red-500">
          <div className="relative h-full w-full">
            <Image
              layout="fill"
              objectFit="cover"
              alt={event.name}
              src={event.image[2].url}
              className="rounded-[0px]"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 w-72">
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>{startDate.toLocaleDateString()}</CardDescription>
          <CardDescription>{event.venue[0].name}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
