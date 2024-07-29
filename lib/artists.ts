import { env } from "@/lib/env";

const base64Credentials = Buffer.from(
  `${env("CLIENTID_SPOTIFY")}:${env("CLIENTSECRET_SPOTIFY")}`
).toString("base64");

const getAccessToken = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${base64Credentials}`,
    },
    body : "grant_type=client_credentials"
  };
console.log("1");
  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    options
  );

  console.log("2");
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
