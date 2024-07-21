import { LatLngExpression, LatLngTuple } from "leaflet";

export type Event = {
    id: number;
    name: string;
    artists: number[];
    venue: string;
    coordinates: LatLngExpression | LatLngTuple;
    city: string;
    country: string;
    images: string[];
    date: string;
};
