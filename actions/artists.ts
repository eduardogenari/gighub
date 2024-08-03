"use server"
import { getArtistByName, getArtistTopTracks } from "@/lib/artists";

export const actionGetArtistTopTracks = async (artistId: string) => {
  const topTracks = await getArtistTopTracks(artistId);
  return topTracks;
};

export const actionGetArtistByName = async (artistName: string) => {
  const artists = await getArtistByName(artistName);
  return artists;
};
