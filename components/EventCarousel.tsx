"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { Event } from "@/types/event";
import Autoplay from "embla-carousel-autoplay";

interface EventCarouselProps {
  events: Event[];
}

export default function EventCarousel({ events }: EventCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      className="h-[85vh] w-[85vw] flex flex-col"
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className="pl-0">
            <div className="h-[85vh] w-[85vw] flex flex-col">
              <div className="relative h-full w-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  alt={event.name}
                  src={event.image[0].url}
                  className="rounded-[0px]"
                />
              </div>
              <div>
                <h3>
                  {event.name} |{" "}
                  {new Date(event.startDate).toLocaleDateString()} |{" "}
                  {event.venue[0].city}, {event.venue[0].country}
                </h3>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}