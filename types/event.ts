import { LatLngExpression, LatLngTuple } from "leaflet";

export type Event = {
    id: number;
    name: string;
    venue: string;
    coordinates: LatLngExpression | LatLngTuple;
};
