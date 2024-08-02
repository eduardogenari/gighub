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
  const center: LatLngExpression | LatLngTuple = [53, 20];
  const zoom = 4.3;

  // Fit view
  // function ChangeView({ markers }: { markers: Event[] }) {
  //   const map = useMap();
  //   if (markers.length > 0) {
  //     let markerBounds = latLngBounds([]);
  //     markers.forEach((marker) => {
  //       markerBounds.extend([
  //         parseFloat(marker.venues[0].location.latitude),
  //         parseFloat(marker.venues[0].location.longitude),
  //       ]);
  //     });
  //     map.fitBounds(markerBounds);
  //     return null;
  //   }
  // }

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
      {/* <ChangeView markers={markers} /> */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/spotify_dark/{z}/{x}/{y}{r}.png" />
      <ZoomControl position="bottomright" />
      <Markers markers={markers} />
    </MapContainer>
  );
}
