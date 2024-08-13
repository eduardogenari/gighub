"use client";

import {
  latLngBounds,
  LatLngExpression,
  LatLngTuple,
  PointExpression,
} from "leaflet";
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
  bounds: number[];
}

function CustomEvents({
  setBoundingBox,
}: {
  setBoundingBox: React.Dispatch<React.SetStateAction<number[]>>;
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
    moveend() {
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
  const { bounds } = Map;
  const [markers, setMarkers] = useState<Event[] | null>(null);
  const [boundingBox, setBoundingBox] = useState<number[]>(bounds);
  const center: LatLngExpression | LatLngTuple = [41.38, 2.17];
  const zoom = 12;
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
      minZoom={4}
      attributionControl={false}
    >
      <CustomEvents setBoundingBox={setBoundingBox} />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/spotify_dark/{z}/{x}/{y}{r}.png" />
      <ZoomControl position="bottomright" />
      {isLoading ? (
        <div className="relative bg-gray-800/50 w-full flex justify-center z-[10000] items-center h-full">
          <Spinner />
        </div>
      ) : markers !== null ? (
        <Markers markers={markers} />
      ) : null}
    </MapContainer>
  );
}
