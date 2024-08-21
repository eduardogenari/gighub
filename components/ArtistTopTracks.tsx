"use client";

import { useEffect, useState } from "react";
import { Artist } from "@/types/artist";
import {
  actionGetTopTracksByArtistId,
  actionGetFirstArtistByName,
} from "@/actions/artists";
import Image from "next/image";
import ReactAudioPlayer from "react-audio-player";

type ArtistTopTracksProps = {
  artistName: string;
};

export default function ArtistTopTracks({ artistName }: ArtistTopTracksProps) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artist = await actionGetFirstArtistByName(artistName);
        {
          artist ? setArtist(artist) : setError("Artist not found");
        }
      } catch (err) {
        setError("Failed to fetch artist");
      }
    };

    fetchArtist();
    setTopTracks(null);
  }, [artistName]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      if (artist) {
        try {
          const tracks = await actionGetTopTracksByArtistId(artist.id);
          setTopTracks(tracks);
        } catch (err) {
          setError("Failed to fetch top tracks");
        }
      }
    };

    fetchTopTracks();
  }, [artist]);

  if (error) {
    return <div className="p-4">{error}</div>;
  }

  if (topTracks === null) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-6">
      {artist && (
        <div>
          <h3>{artist.name} Top Tracks</h3>
        </div>
      )}
      <div className="flex justify-center w-full">
        <div className="w-[65vw]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {topTracks.map((track, index) => (
              <li key={track.id} className="flex flex-col items-start">
                {track.album &&
                  track.album.images &&
                  track.album.images.length > 0 && (
                    <div>
                      <Image
                        src={track.album.images[0].url}
                        alt={`${track.name} song album`}
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                {track.preview_url && (
                  <div>
                    <ReactAudioPlayer
                      src={track.preview_url}
                      controls
                      className="w-[200px] mt-3 "
                    />
                  </div>
                )}
                <div className="mt-3 mb-3">
                  {index + 1}. {track.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
