import React from "react";
import ArtistTopTracks from "@/components/ArtistTopTracks";

export default async function Page() {
  // const artists: Artist  = await getFirstArtistByName("The Tyets");

  return (
    <div>
      <ArtistTopTracks artistName="The Tyets" />
    </div>
  );
}
