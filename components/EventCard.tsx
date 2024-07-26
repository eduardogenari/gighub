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

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
      <div className="relative h-20 w-full">
          <Image
            layout="fill"
            objectFit="cover"
            alt={event.name}
            src={event.images[0].url}
            className="rounded-[12px]"
          />
        </div>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>{event.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.id}</p>
      </CardContent>
      <CardFooter>
        <p>{event.id}</p>
      </CardFooter>
    </Card>
  );
}