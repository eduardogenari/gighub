import { getArtistTopTracks } from "@/lib/artists"

export const actionGetArtistTopTracks = async (artistId: string) => {
    getArtistTopTracks(artistId);
}