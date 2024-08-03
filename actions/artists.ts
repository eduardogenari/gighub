"use server"
import { getArtistByName, getArtistTopTracks, getFirstArtistByName } from "@/lib/artists";

export const actionGetArtistTopTracks = async (artistId: string) => {
  const topTracks = await getArtistTopTracks(artistId);
  return topTracks;
};

export const actionGetArtistByName = async (artistName: string) => {
  const artists = await getArtistByName(artistName);
  return artists;
};

export const actionGetFirstArtistByName = async (artistName: string) => {
    const artists = await getFirstArtistByName(artistName);
    return artists;
  };


