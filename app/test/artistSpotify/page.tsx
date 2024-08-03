import { actionGetArtistByName } from "@/actions/artists";
import { Artist } from "@/types/artist";

export default async function Page() {
    // let concerts: Event[] = [];
    //const concerts = await actionGetAllEvents();
  
    //const artist = await actionGetArtistTopTracks("0TnOYISbd1XYRBk9myaseg");
    const artists = await actionGetArtistByName("The Tyets");

    return (
        
        <main className="p-6">
          {artists.map((artist, index) => (
            <div key={artist.id}>
              <h2>
                {artist.name}
              </h2>
                
            </div>
          ))}
        </main>
        
      );
}