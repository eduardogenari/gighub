"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
}

export default function Map(Map: MapProps) {
    const { } = Map;
    const center: LatLngExpression | LatLngTuple = [45, 10];
    const zoom = 2.5;
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{
                height: "100%",
                width: "100%",
                zIndex: 1,
            }}
            zoomControl={false}
            zoomSnap={0.1}
            minZoom={zoom}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <ZoomControl position="bottomright" />
        </MapContainer>
    )
}