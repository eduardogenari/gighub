"use client";

import type { Event } from "@/types/event";
import MinimizedEvent from "./MinimizedEvent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

interface MinimizedGalleryProps {
  events: Event[];
}

export default function MinimizedGallery(props: MinimizedGalleryProps) {
  const { events } = props;
  return (
    <div className="w-[55vw] mx-auto">
      <Carousel className="w-full overflow-x-auto no-scrollbar">
        <CarouselContent>
          {events.map((event: Event) => (
            <CarouselItem key={event.id} className="basis-auto py-1 pl-1">
              <Card>
                <CardContent className="p-0">
                  <MinimizedEvent event={event} key={event.id} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
