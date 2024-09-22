import { env } from "@/lib/env";
import { Artist, Track } from "@/types/artist";

const base64Credentials = Buffer.from(
  `${env("CLIENTID_SPOTIFY")}:${env("CLIENTSECRET_SPOTIFY")}`
).toString("base64");
const urlSpotify = "https://api.spotify.com/v1";
let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

const getAccessToken = async () => {
  if (accessToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Credentials}`,
    },
    body: "grant_type=client_credentials",
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    options
  );

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const token = await response.json();
  accessToken = token.access_token;
  tokenExpiresAt = Date.now() + token.expires_in * 1000;
  return token.access_token;
};

export const getTopTracksByArtistName = async (artistName: string) => {
  const token = await getAccessToken();
  const artist = await getFirstArtistByName(artistName);
  const response = await fetch(`${urlSpotify}/${artist?.id}/top-tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonTracks = await response.json();
  return jsonTracks.tracks as Track[];
};

export const getTopTracksByArtistId = async (artistId: string) => {
  const token = await getAccessToken();
  const response = await fetch(`${urlSpotify}/artists/${artistId}/top-tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonTracks = await response.json();
  return jsonTracks.tracks as Track[];
};

export const getArtistByName = async (artistName: string) => {
  const token = await getAccessToken();
  const response = await fetch(
    `${urlSpotify}/search?q=${artistName}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch artist: ${error.error.message}`);
  }

  try {
    const jsonArtist = await response.json();
    return jsonArtist.artists.items as Artist[];
  } catch (error) {
    console.error(`Error fetching artist  ${artistName}:`, error);
    return [];
  }
};

export const getFirstArtistByName = async (artistName: string) => {
  const token = await getAccessToken();
  const response = await fetch(
    `${urlSpotify}/search?q=${artistName}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch artist: ${error.error.message}`);
  }

  try {
    const jsonArtist = await response.json();
    return jsonArtist.artists.items[0] as Artist;
  } catch (error) {
    console.error(`Error fetching artist  ${artistName}:`, error);
    return null;
  }
};
