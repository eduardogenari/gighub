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
import { CiCalendar, CiLocationOn } from "react-icons/ci";

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

  const suitableImage = event.image.find((img) => img.height > 300);

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card className="ml-5 mr-5 w-[200px] aspect-[1/2] border border-none rounded-none shadow-none transition duration-200 transform hover:scale-105">
        <CardHeader className="p-0 w-[200px] h-[200px]">
          <div className="relative h-full w-full">
            {suitableImage && (
              <Image
                layout="fill"
                objectFit="cover"
                alt={event.name}
                src={suitableImage.url}
                className="rounded-[0px]"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0 w-[200px]">
          <CardTitle className="text-base">{event.name}</CardTitle>
          <div className="flex items-center space-x-2 text-sm">
            <CiCalendar />
            <CardDescription>{startDate.toLocaleDateString()}</CardDescription>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <CiLocationOn />
            <CardDescription>
              {event.venue[0].name}, {event.venue[0].city},{" "}
              {event.venue[0].country}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}