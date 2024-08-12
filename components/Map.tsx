"use client";

import { latLngBounds, LatLngExpression, LatLngTuple, PointExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Markers from "./Markers";
import type { Event } from "@/types/event";
import { useEffect, useState } from "react";
import { updateEventsFromBounds } from "@/actions/markers";
import Spinner from "./Spinner";
interface MapProps {
  events: Event[];
}

function ZoomCustomEvent({
  setBoundingBox,
}: {
  setBoundingBox: React.Dispatch<React.SetStateAction<number[] | null>>;
}) {
  const map = useMapEvents({
    zoomend() {
      let bounds = map.getBounds();
      const coordinates = [
        bounds.getWest(),
        bounds.getEast(),
        bounds.getSouth(),
        bounds.getNorth(),
      ];
      setBoundingBox(coordinates);
    },
  });

  return null;
}

export default function Map(Map: MapProps) {
  const { events } = Map;
  const [markers, setMarkers] = useState(events);
  const [boundingBox, setBoundingBox] = useState<number[] | null>(null);
  const center: LatLngExpression | LatLngTuple = [53, 20];
  const zoom = 4;
  const [isLoading, setIsLoading] = useState(false);

  // Fit view
  // function ChangeView({ markers }: { markers: Event[] }) {
  //   const map = useMap();
  //   if (markers.length > 0) {
  //     let markerBounds = latLngBounds([]);
  //     markers.forEach((marker) => {
  //       markerBounds.extend([
  //         marker.venue[0].latitude,
  //         marker.venue[0].longitude,
  //       ]);
  //     });
  //     var padding: PointExpression = [150, 150];
  //     map.fitBounds(markerBounds, { padding: padding });
  //     return null;
  //   }
  // }

  useEffect(() => {
    if (boundingBox) {
      setIsLoading(true);
      updateEventsFromBounds(boundingBox)
        .then((response) => {
          console.log("hello", response);
          setMarkers(response.events);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [boundingBox]);


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
      <ZoomCustomEvent setBoundingBox={setBoundingBox} />
      {/* <ChangeView markers={markers} /> */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/spotify_dark/{z}/{x}/{y}{r}.png" />
      <ZoomControl position="bottomright" />
      {isLoading ? (
        <div className="relative bg-gray-800/50 w-full flex justify-center z-[10000] items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <Markers markers={markers} />
      )}
    </MapContainer>
  );
}
