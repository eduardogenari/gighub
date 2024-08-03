"use client";

import { useEffect, useState } from "react";
import { Artist } from "@/types/artist";
import {
  actionGetArtistTopTracks,
  actionGetFirstArtistByName,
} from "@/actions/artists";

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
          const tracks = await actionGetArtistTopTracks(artist.id);
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
          <h2>{artist.name}</h2>
        </div>
      )}
      <h3>Top Tracks</h3>
      <ul>
        {topTracks.map((track, index) => (
          <li key={track.id}>
            {index + 1}. {track.name}
            {track.preview_url && (
              <div>
                <audio controls>
                  <source src={track.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
