"use client";

import type { Event } from "@/types/event";
import { Circle } from "react-leaflet";

interface MarkersProps {
    markers: Event[]
}

export default function Markers(Markers: MarkersProps) {
    const { markers } = Markers;

    return markers.map((event: Event) => {
        return (
            <Circle
                key={event.id}
                center={event.coordinates}
                radius={500}
                pathOptions={{ color: 'lightblue' }}
            ></Circle>
        );
    })
}