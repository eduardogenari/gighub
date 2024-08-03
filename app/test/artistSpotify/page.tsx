import React from 'react';
import ArtistTopTracks from '@/components/ArtistTopTracks';
import { Artist } from '@/types/artist';
import { getFirstArtistByName } from '@/lib/artists';

export default async function Page() {


   // const artists: Artist  = await getFirstArtistByName("The Tyets");

  return (
    <div>
      <ArtistTopTracks artistName="The Tyets"/>
    </div>
  );
};

