"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Markers from "./Markers";
import type { Event } from "@/types/event";

interface MapProps {
  markers: Event[];
}

export default function Map(Map: MapProps) {
  const { markers } = Map;
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
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/spotify_dark/{z}/{x}/{y}{r}.png" />
      <ZoomControl position="bottomright" />
      <Markers markers={markers} />
    </MapContainer>
  );
}
