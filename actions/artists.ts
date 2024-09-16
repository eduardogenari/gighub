"use server";

import {
  getArtistByName,
  getTopTracksByArtistId,
  getFirstArtistByName,
  getTopTracksByArtistName,
} from "@/lib/artists";

export const actionGetArtistByName = async (artistName: string) => {
  const artists = await getArtistByName(artistName);
  return artists;
};

export const actionGetFirstArtistByName = async (artistName: string) => {
  const artists = await getFirstArtistByName(artistName);
  return artists;
};

export const actionGetTopTracksByArtistId = async (artistId: string) => {
  const topTracks = await getTopTracksByArtistId(artistId);
  return topTracks;
};

export const actionGetTopTracksByArtistName = async (artistName: string) => {
  const topTracks = await getTopTracksByArtistName(artistName);
  return topTracks;
};
