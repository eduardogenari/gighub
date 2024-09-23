"use client";

import { useEffect, useState } from "react";
import { Artist } from "@/types/artist";
import {
  actionGetTopTracksByArtistId,
  actionGetFirstArtistByName,
} from "@/actions/artists";
import Image from "next/image";
import ReactAudioPlayer from "react-audio-player";
import Spinner from "./Spinner";

type ArtistTopTracksProps = {
  artistName: string;
};

export default function ArtistTopTracks({ artistName }: ArtistTopTracksProps) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchArtist = async () => {
      try {
        const artist = await actionGetFirstArtistByName(artistName);
        {
          artist ? setArtist(artist) : setError("Artist not found");
        }
      } catch (err) {
        setError("Failed to fetch artist");
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
    setTopTracks(null);
  }, [artistName]);

  useEffect(() => {
    setLoading(true);
    const fetchTopTracks = async () => {
      if (artist) {
        try {
          const tracks = await actionGetTopTracksByArtistId(artist.id);
          setTopTracks(tracks);
        } catch (err) {
          setError("Failed to fetch top tracks");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTopTracks();
  }, [artist]);

  if (error) {
    return <div className="p-4">{error}</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Spinner />
      </div>
    );
  }

  if (topTracks !== null) {
    return (
      <ul className="flex justify-center w-full flex-wrap gap-5">
        {topTracks.map((track, index) => (
          <li key={track.id} className="flex flex-col items-start">
            {track.album &&
              track.album.images &&
              track.album.images.length > 0 && (
                <div>
                  <Image
                    src={track.album.images[0].url}
                    alt={`${track.name} song album`}
                    width={280}
                    height={280}
                  />
                </div>
              )}
            {track.preview_url && (
              <div>
                <ReactAudioPlayer
                  src={track.preview_url}
                  controls
                  className="w-[280px] mt-3 "
                />
              </div>
            )}
            <div className="mt-3 mb-3 w-[280px]">
              {index + 1}. {track.name}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
