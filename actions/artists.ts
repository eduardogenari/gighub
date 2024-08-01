import { getArtistByName, getArtistTopTracks } from "@/lib/artists"

export const actionGetArtistTopTracks = async (artistId: string) => {
    getArtistTopTracks(artistId);
}

export const actionGetArtistByName = async (artistName : string) => {
    getArtistByName(artistName);
}