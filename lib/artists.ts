import { env } from "@/lib/env";

const base64Credentials = Buffer.from(
  `${env("CLIENTID_SPOTIFY")}:${env("CLIENTSECRET_SPOTIFY")}`
).toString("base64");

const getAccessToken = async () => {
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
  console.log(token);
  return token.access_token;
};

export const getArtistTopTracks = async (artistId: string) => {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const jsonTracks = await response.json();
  console.log(jsonTracks);
  return jsonTracks.tracks;
};

export const getArtistByName = async (artistName: string) => {
  const token = await getAccessToken();
  console.log('Using Access Token for getArtistByName:', token);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
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
  const jsonArtist = await response.json();
  console.log(jsonArtist);
 // console.log(jsonArtist.items);
  return jsonArtist.artists.items;
};
