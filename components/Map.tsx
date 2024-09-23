"use client";

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
import { filter } from "@/actions/filter";
import Spinner from "./Spinner";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import MinimizedGallery from "./MinimizedGallery";
import { useTheme } from "next-themes";
import { getBounds } from "@/lib/locations";
import type { Location } from "@/types/location";

interface MapProps {
  setArtistNames: React.Dispatch<React.SetStateAction<string[]>>;
  setGenreNames: React.Dispatch<React.SetStateAction<string[]>>;
  setEventsNumber: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  events: Event[];
  locationNames: string[];
  locations: Location[];
  location: string;
  startDate: Date;
  endDate: Date;
  price: number[];
  artist: string;
  genre: string;
  hideWithoutPrice: string;
}

function CustomEvents({
  setBoundingBox,
}: {
  setBoundingBox: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const updateBounds = () => {
    let bounds = map.getBounds();
    const coordinates = [
      bounds.getWest(),
      bounds.getEast(),
      bounds.getSouth(),
      bounds.getNorth(),
    ];
    setBoundingBox(coordinates);
  };
  const debouncedUpdateBounds = useDebouncedCallback(() => {
    updateBounds();
  }, 500);
  const map = useMapEvents({
    zoomend() {
      debouncedUpdateBounds();
    },
    dragend() {
      debouncedUpdateBounds();
    },
  });

  return null;
}

function ChangeView({ boundingBox }: { boundingBox: number[] }) {
  const map = useMap();
  const mapBounds: [number, number][] = [
    [boundingBox[2], boundingBox[0]], // South - West
    [boundingBox[3], boundingBox[1]], // North - East
  ];
  useEffect(() => {
    if (boundingBox) {
      map.fitBounds(mapBounds);
    }
  }, [boundingBox, map]);
  return null;
}

export default function Map(props: MapProps) {
  const {
    setArtistNames,
    setGenreNames,
    setEventsNumber,
    setEvents,
    events,
    locationNames,
    locations,
    location,
    startDate,
    endDate,
    price,
    artist,
    genre,
    hideWithoutPrice,
  } = props;

  const getInitialBounds = () => {
    let bounds = getBounds(location, locations, locationNames);
    return bounds;
  };

  const searchParams = useSearchParams();
  const [eventsLoaded, setEventsLoaded] = useState(true);
  const [response, setResponse] = useState<any>(null);
  const [boundingBox, setBoundingBox] = useState<number[]>(getInitialBounds);

  useEffect(() => {
    let bounds = getBounds(location, locations, locationNames);
    setBoundingBox(bounds);
  }, [location]);

  useEffect(() => {
    setEventsLoaded(false);
    filter(
      startDate,
      endDate,
      boundingBox,
      price,
      artist,
      genre,
      hideWithoutPrice
    )
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [boundingBox, searchParams]);

  useEffect(() => {
    if (response) {
      setEvents(response.events);
      setArtistNames(response.artistNames);
      setGenreNames(response.genreNames);
      setEventsNumber(response.events.length);
      setEventsLoaded(true);
    }
  }, [response]);

  const mapBounds: [number, number][] = [
    [boundingBox[2], boundingBox[0]], // South - West
    [boundingBox[3], boundingBox[1]], // North - East
  ];

  const { theme } = useTheme();
  const [basemapURL, setBasemapURL] = useState("light_all");
  const [mapKey, setMapKey] = useState(0);
  useEffect(() => {
    let basemapName;
    if (theme == "dark") {
      basemapName = "dark_all";
    } else {
      basemapName = "light_all";
    }
    setBasemapURL(
      `https://{s}.basemaps.cartocdn.com/rastertiles/${basemapName}/{z}/{x}/{y}{r}.png`
    );
    setMapKey((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <>
      <MapContainer
        key={mapKey}
        bounds={mapBounds}
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
        <TileLayer url={basemapURL} />
        <ZoomControl position="topright" />
        <ChangeView boundingBox={boundingBox} />
        {!eventsLoaded ? (
          <div className="relative bg-gray-800/50 w-full flex justify-center z-[10000] items-center h-full">
            <Spinner />
          </div>
        ) : events !== null ? (
          <Markers events={events} />
        ) : null}
      </MapContainer>
      {eventsLoaded && events.length === 0 ? (
        <div className="fixed top-20 z-50 flex justify-center w-full">
          <span className="dark:bg-zinc-800 bg-white w-fit py-2 px-4 rounded">No events in this area</span>
        </div>
      ) : null}
      {events.length > 0 && events !== null ? (
        <div className="absolute bottom-0 z-50 mb-4 md:m-6 flex justify-center w-full">
          <div className="w-screen md:w-[55vw]">
            <MinimizedGallery events={events} />
          </div>
        </div>
      ) : null}
    </>
  );
}
