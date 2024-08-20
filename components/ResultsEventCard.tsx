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

export default function ResultsEventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startDate);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `/events/${event.id}`;
    window.open(url, "_blank");
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card className="m-3 w-72 aspect-[1/2] border border-white rounded-none shadow-none transition duration-200 transform hover:scale-105">
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
    </div>
  );
}