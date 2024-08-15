import {
  MapContainer,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Markers from "./Markers";
import type { Event } from "@/types/event";
import { useEffect, useState } from "react";
import { updateEventsFromBounds, updateFilterOptions } from "@/actions/markers";
import Spinner from "./Spinner";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { useSearchParams } from "next/navigation";

interface MapProps {
  setArtistNames: React.Dispatch<React.SetStateAction<string[]>>;
  setGenreNames: React.Dispatch<React.SetStateAction<string[]>>;
  setLocationNames: React.Dispatch<React.SetStateAction<string[]>>;
  setEventsNumber: React.Dispatch<React.SetStateAction<number>>;
  startDate: Date;
  endDate: Date;
  bounds: number[];
  price: number[];
  artist: string;
  genre: string;
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
  const map = useMapEvents({
    zoomend() {
      updateBounds();
    },
    dragend() {
      updateBounds();
    },
  });

  return null;
}

export default function Map(props: MapProps) {
  const {
    setArtistNames,
    setGenreNames,
    setLocationNames,
    setEventsNumber,
    startDate,
    endDate,
    bounds,
    price,
    artist,
    genre,
  } = props;

  const searchParams = useSearchParams();
  const [markers, setMarkers] = useState<Event[] | null>(null);
  const [boundingBox, setBoundingBox] = useState<number[]>(bounds);
  const center: LatLngExpression | LatLngTuple = [41.38, 2.17];
  const zoom = 12;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    updateFilterOptions().then((response) => {
      setArtistNames(response.artistNames);
      setGenreNames(response.genreNames);
      setLocationNames(response.locationNames);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    updateEventsFromBounds(
      startDate,
      endDate,
      boundingBox,
      price,
      artist,
      genre
    )
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [boundingBox, searchParams]);

  useEffect(() => {
    if (response) {
      setMarkers(response.events);
      setEventsNumber(response.events.length);
    }
  }, [response]);

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
